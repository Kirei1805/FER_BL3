import React from 'react';
import { motion } from 'framer-motion';
import './ChatButton.css';

const ChatButton = ({ onClick, isOpen }) => {
  return (
    <motion.div
      className="chat-button-container"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.button
        className="chat-button"
        onClick={onClick}
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 0.9 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="chat-icon"
          animate={{
            rotate: isOpen ? 180 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '✕' : '💬'}
        </motion.span>
        
        {!isOpen && (
          <motion.div
            className="notification-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>1</span>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
};

export default ChatButton; 