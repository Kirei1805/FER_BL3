import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Auto-close chat on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Auto-close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatContainer = document.querySelector('.chatbox-container');
      const chatButton = document.querySelector('.chat-button');
      
      if (isOpen && chatContainer && !chatContainer.contains(event.target) && !chatButton.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <ChatButton onClick={handleToggle} isOpen={isOpen} />
      
      <AnimatePresence>
        {isOpen && (
          <ChatBox 
            isOpen={isOpen} 
            onToggle={handleToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget; 