'use client';

import { useState, useRef, useEffect } from 'react';
import { PhoneOff, Send, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'otto';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onHangUp: () => void;
}

export default function ChatInterface({ onHangUp }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! So great to connect with you! 🎉 How's your day going?",
      sender: 'otto',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOttoTyping, setIsOttoTyping] = useState(false);
  const [ottoMood, setOttoMood] = useState<'happy' | 'thinking' | 'excited'>('happy');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated Otto responses based on conversation flow
  const getOttoResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('fine')) {
      return "That's awesome! 😊 So, I'm really curious - what kind of work gets you excited? Like, what makes you feel energized rather than drained?";
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('stressed')) {
      return "Oof, I hear you. Work can be draining sometimes. 😔 What do you think would make your workday feel less exhausting? Maybe more flexibility, different tasks, or better team vibes?";
    } else if (lowerMessage.includes('creative') || lowerMessage.includes('design') || lowerMessage.includes('art')) {
      return "Ooh, a creative soul! 🎨 I love that! Do you prefer working solo on your creative projects, or do you thrive when bouncing ideas off others?";
    } else if (lowerMessage.includes('team') || lowerMessage.includes('people') || lowerMessage.includes('collaborate')) {
      return "Nice! Team player energy! 🤝 What size team feels right to you? Like, intimate squad of 5, or bigger crew?";
    } else if (messages.length < 4) {
      return "Interesting! 🤔 Tell me more about that - what drew you to that specifically?";
    } else if (messages.length < 7) {
      return "I'm getting a good sense of who you are! By the way, have you uploaded your resume yet? It helps me understand your background better. Or we can keep chatting first - totally up to you!";
    } else {
      return "You know what? Based on what you've told me, I think I have some ideas brewing... 💭 Would you like to hear about some roles that might be perfect for you?";
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate Otto thinking and responding
    setIsOttoTyping(true);
    setOttoMood('thinking');
    
    setTimeout(() => {
      const ottoMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getOttoResponse(inputValue),
        sender: 'otto',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, ottoMessage]);
      setIsOttoTyping(false);
      setOttoMood('happy');
    }, 1500 + Math.random() * 1000); // Random delay for natural feel
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this to a server
      const uploadMessage: Message = {
        id: Date.now().toString(),
        text: `📄 Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, uploadMessage]);
      
      setIsOttoTyping(true);
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfect! I've got your resume. Let me take a quick look... 📝 Wow, you've got some great experience! This is super helpful for finding your ideal match!",
          sender: 'otto',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, responseMessage]);
        setIsOttoTyping(false);
      }, 2000);
    }
  };

  const ottoEmojis = {
    happy: '🦦',
    thinking: '🤔',
    excited: '🎉'
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl">
      {/* Header - Call Info */}
      <div className="bg-gradient-to-r from-ghibli-grass to-ghibli-forest text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-float">
            <span className="text-2xl">{ottoEmojis[ottoMood]}</span>
          </div>
          <div>
            <h3 className="font-bold">Otto the Otter</h3>
            <p className="text-xs text-white/80">
              {isOttoTyping ? 'typing...' : 'Online'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onHangUp}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Hang up"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-ghibli-cloud to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-enter`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-ghibli-ocean to-blue-400 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm border-2 border-ghibli-warm'
              }`}
            >
              <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
              <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isOttoTyping && (
          <div className="flex justify-start message-enter">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border-2 border-ghibli-warm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end gap-2">
          {/* File Upload */}
          <label className="cursor-pointer group">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            <div className="p-3 rounded-full bg-ghibli-sand hover:bg-ghibli-sunset transition-colors duration-300 group-hover:scale-110 transform">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </div>
          </label>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... or just ramble, I'm here for it! 😊"
              className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-300 focus:border-ghibli-grass focus:outline-none resize-none transition-colors duration-300"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-3 rounded-full bg-gradient-to-br from-ghibli-grass to-ghibli-forest text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          💡 Feel free to upload your resume anytime using the 📎 button!
        </p>
      </div>
    </div>
  );
}
