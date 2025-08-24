const API_BASE_URL = 'http://localhost:3001';

class ChatService {
  // Lấy tất cả tin nhắn
  async getMessages() {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  // Gửi tin nhắn mới
  async sendMessage(message) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...message,
          timestamp: new Date().toISOString(),
          id: Date.now()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Lấy response từ bot
  async getBotResponse(userMessage) {
    try {
      // Phân tích tin nhắn để xác định category
      const category = this.analyzeMessage(userMessage);
      
      const response = await fetch(`${API_BASE_URL}/botResponses`);
      if (!response.ok) {
        throw new Error('Failed to fetch bot responses');
      }
      
      const botResponses = await response.json();
      const categoryResponses = botResponses.find(r => r.category === category);
      
      if (categoryResponses && categoryResponses.responses.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryResponses.responses.length);
        return categoryResponses.responses[randomIndex];
      }
      
      // Fallback response
      return "Cảm ơn bạn đã liên hệ! Tôi sẽ kiểm tra thông tin cho bạn. 🎵";
    } catch (error) {
      console.error('Error getting bot response:', error);
      return "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau. 😔";
    }
  }

  // Phân tích tin nhắn để xác định category
  analyzeMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('xin chào') || lowerMessage.includes('chào') || lowerMessage.includes('hello')) {
      return 'greeting';
    }
    
    if (lowerMessage.includes('giá') || lowerMessage.includes('bao nhiêu') || lowerMessage.includes('price')) {
      return 'pricing';
    }
    
    if (lowerMessage.includes('mua') || lowerMessage.includes('đặt hàng') || lowerMessage.includes('order')) {
      return 'order';
    }
    
    if (lowerMessage.includes('sản phẩm') || lowerMessage.includes('guitar') || lowerMessage.includes('piano') || 
        lowerMessage.includes('drum') || lowerMessage.includes('keyboard')) {
      return 'product_inquiry';
    }
    
    return 'support';
  }

  // Tạo session chat mới
  async createChatSession(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/chatSessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `session_${Date.now()}`,
          userId,
          startTime: new Date().toISOString(),
          status: 'active',
          agentId: 'agent001'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create chat session');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  // Lấy thông tin user
  async getUserInfo(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }

  // Lấy danh sách agents
  async getAgents() {
    try {
      const response = await fetch(`${API_BASE_URL}/agents`);
      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  }

  // Cập nhật trạng thái agent
  async updateAgentStatus(agentId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update agent status');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating agent status:', error);
      throw error;
    }
  }
}

export default new ChatService(); 