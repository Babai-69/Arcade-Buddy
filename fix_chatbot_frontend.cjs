const fs = require('fs');
let chatBotCode = fs.readFileSync('src/components/ChatBot.tsx', 'utf8');

const callGeminiRegex = /try \{\s*const history = messages\.slice\(-10\)\.map\(m => \(\{\s*role: m\.role === 'user' \? 'user' : 'model',\s*parts: \[\{ text: m\.content \}\]\s*\}\)\);\s*const response = await fetch\('\/api\/chat', \{\s*method: 'POST',\s*headers: \{ 'Content-Type': 'application\/json' \},\s*body: JSON\.stringify\(\{ message: text\.trim\(\), history \}\)\s*\}\);\s*if \(!response\.ok\) throw new Error\('API Error'\);\s*const data = await response\.json\(\);/s;

const newCallGemini = `try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-10)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Chat API error:', errorData);
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();`;

chatBotCode = chatBotCode.replace(callGeminiRegex, newCallGemini);

const catchRegex = /\} catch \(err\) \{\s*console\.error\(err\);\s*setMessages\(prev => \[\.\.\.prev, \{\s*id: Date\.now\(\)\.toString\(\),\s*role: 'bot',\s*content: "Sorry, I'm having trouble connecting right now\. Please try again in a moment! 🔄",\s*timestamp: new Date\(\)\s*\}\]\);\s*\}/s;

const newCatch = `} catch (error: any) {
      console.error('Chatbot error:', error.message);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        content: \`I'm having trouble connecting right now. \\nPlease try again in a moment! \\nFor urgent help email: 📧 abir.facilitator@gmail.com\`,
        timestamp: new Date()
      }]);
    }`;

chatBotCode = chatBotCode.replace(catchRegex, newCatch);

fs.writeFileSync('src/components/ChatBot.tsx', chatBotCode);
