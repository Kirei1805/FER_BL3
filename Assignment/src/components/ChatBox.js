import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Form, Badge } from 'react-bootstrap';
import chatService from '../services/chatService';
import './ChatBox.css';

const ChatBox = ({ isOpen = false, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages khi component mount
  useEffect(() => {
    if (isOpen) {
      loadMessages();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const apiMessages = await chatService.getMessages();
      setMessages(apiMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      // Fallback to default message if API fails
      setMessages([
        {
          id: 1,
          text: "Xin chào! Tôi có thể giúp gì cho bạn? 🎵",
          sender: 'bot',
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      userId: 'user123' // Mock user ID
    };

    try {
      // Gửi tin nhắn user
      const sentUserMessage = await chatService.sendMessage(userMessage);
      setMessages(prev => [...prev, sentUserMessage]);
      setInputMessage('');
      setIsTyping(true);

      // Lấy response từ bot
      const botResponseText = await chatService.getBotResponse(inputMessage);
      
      setTimeout(() => {
        const botMessage = {
          text: botResponseText,
          sender: 'bot',
          userId: null
        };

        chatService.sendMessage(botMessage).then(sentBotMessage => {
          setMessages(prev => [...prev, sentBotMessage]);
          setIsTyping(false);
        });
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to local message if API fails
      const fallbackMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, fallbackMessage]);
      setInputMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="chatbox-container"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chatbox-header">
        <div className="chatbox-title">
          <span className="chatbox-icon">🎵</span>
          <span>Hỗ trợ khách hàng</span>
          <Badge bg="success" className="ms-2">Online</Badge>
        </div>
        <Button
          variant="link"
          className="chatbox-close"
          onClick={onToggle}
        >
          ✕
        </Button>
      </div>

      <div className="chatbox-messages">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message ${message.sender}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="message bot typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbox-input">
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Nhập tin nhắn..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chatbox-textarea"
        />
        <Button
          variant="primary"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          className="chatbox-send-btn"
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            📤
          </motion.span>
        </Button>
      </div>
    </motion.div>
  );
};

export default ChatBox; 