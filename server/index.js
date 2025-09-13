const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../web-demo')));

// Claude API proxy endpoint
app.post('/api/generate-code', async (req, res) => {
    try {
        const { prompt, language } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const claudeResponse = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
                model: 'claude-3-haiku-20240307',
                max_tokens: 300,
                messages: [
                    {
                        role: 'user',
                        content: `Generate clean, working ${language || 'JavaScript'} code for: ${prompt}. Only return the code, no explanations or markdown formatting.`
                    }
                ]
            },
            {
                headers: {
                    'x-api-key': process.env.CLAUDE_API_KEY,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                }
            }
        );

        const generatedCode = claudeResponse.data.content[0]?.text || '';
        
        res.json({ 
            success: true, 
            code: generatedCode,
            provider: 'Claude'
        });

    } catch (error) {
        console.error('Claude API Error:', error.response?.data || error.message);
        
        // Fallback code generation
        const fallbackCode = generateFallbackCode(req.body.prompt, req.body.language);
        
        res.json({
            success: true,
            code: fallbackCode,
            provider: 'Fallback',
            warning: 'Claude API unavailable, using template generation'
        });
    }
});

// Fallback code generation function
function generateFallbackCode(prompt, language = 'javascript') {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('function') || lowerPrompt.includes('method')) {
        return language === 'python' ? 
            `def generated_function():\n    """${prompt}"""\n    pass\n` :
            `function generatedFunction() {\n    // ${prompt}\n    return null;\n}\n`;
    } else if (lowerPrompt.includes('class')) {
        return language === 'python' ?
            `class GeneratedClass:\n    """${prompt}"""\n    def __init__(self):\n        pass\n` :
            `class GeneratedClass {\n    // ${prompt}\n    constructor() {\n        \n    }\n}\n`;
    } else if (lowerPrompt.includes('hello world')) {
        return language === 'python' ?
            `print("Hello, World!")` :
            `console.log("Hello, World!");`;
    } else {
        return `// ${prompt}\n// TODO: Implement this functionality\n`;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the web demo
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web-demo/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Voice Vibe Coding Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving web demo from: ${path.join(__dirname, '../web-demo')}`);
    console.log(`🔑 Claude API Key: ${process.env.CLAUDE_API_KEY ? 'Loaded' : 'Missing'}`);
});
