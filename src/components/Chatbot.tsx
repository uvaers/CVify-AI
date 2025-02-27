'use client';

import { useEffect, useRef, useState } from 'react';
import { chatBotReply } from '@/lib/ChatBot';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  

  const handleToggle = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };  

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: { sender: 'user' | 'bot'; text: string } = { sender: 'user', text: input };
    console.log('User Message:', userMessage);


    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const reply = await chatBotReply(input);
const botMessage: { sender: 'user' | 'bot'; text: string } = {
  sender: 'bot',
  text: reply || 'Default message',
};

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong. Try again!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col border-black border-2">
          <div ref={chatRef} className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-center text-sm text-gray-500">Thinking...</div>}
          </div>
          <div className="p-2 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className={`mt-2 w-full py-2 rounded-lg ${
                loading ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
     <button
  onClick={handleToggle}
  className="bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
>
  {isOpen ? 'Close' : 'Chat'}
</button>

    </div>
  );
};

export default Chatbot;
