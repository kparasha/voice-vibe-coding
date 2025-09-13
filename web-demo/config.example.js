// Configuration file for Voice Vibe Coding
// Copy this file to config.js and add your actual API keys
// DO NOT commit config.js to version control!

const CONFIG = {
    // API Configuration - Replace with your actual API key
    CLAUDE_API_KEY: 'your-claude-api-key-here',
    
    // API Endpoints
    CLAUDE_API_URL: 'https://api.anthropic.com/v1/messages',
    CLAUDE_MODEL: 'claude-3-haiku-20240307',
    
    // App Settings
    MAX_TOKENS: 300,
    TEMPERATURE: 0.3,
    
    // Speech Recognition
    SPEECH_LANG: 'en-US',
    CONTINUOUS_RECOGNITION: false,
    INTERIM_RESULTS: true
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
