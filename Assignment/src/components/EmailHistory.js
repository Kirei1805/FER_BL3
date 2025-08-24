import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Badge } from 'react-bootstrap';
import { getEmailHistory, clearEmailHistory, testEmailService } from '../services/emailService';
import './EmailHistory.css';

const EmailHistory = () => {
  const [emailHistory, setEmailHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    loadEmailHistory();
  }, []);

  const loadEmailHistory = () => {
    const history = getEmailHistory();
    setEmailHistory(history);
  };

  const handleClearHistory = () => {
    clearEmailHistory();
    setEmailHistory([]);
  };

  const handleTestEmail = async () => {
    setIsTesting(true);
    try {
      await testEmailService();
      loadEmailHistory(); // Reload after test
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleViewEmail = (email) => {
    setSelectedEmail(email);
    setShowModal(true);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  return (
    <div className="email-history-container">
      <Card className="email-history-card">
        <Card.Header className="email-history-header">
          <h3 className="email-history-title">
            📧 Lịch Sử Email
          </h3>
          <div className="email-history-actions">
            <Button 
              variant="success" 
              size="sm"
              onClick={handleTestEmail}
              disabled={isTesting}
              className="test-email-btn"
            >
              {isTesting ? '🔄 Đang test...' : '🧪 Test Email'}
            </Button>
            <Button 
              variant="danger" 
              size="sm"
              onClick={handleClearHistory}
              className="clear-history-btn"
            >
              🗑️ Xóa Lịch Sử
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="email-history-body">
          {emailHistory.length === 0 ? (
            <div className="no-email-message">
              <div className="no-email-icon">📭</div>
              <p>Chưa có email nào được gửi</p>
              <Button 
                variant="primary" 
                onClick={handleTestEmail}
                disabled={isTesting}
              >
                Gửi Email Test
              </Button>
            </div>
          ) : (
            <div className="email-list">
              {emailHistory.map((email, index) => (
                <div key={index} className="email-item">
                  <div className="email-item-header">
                    <div className="email-info">
                      <Badge bg="success" className="email-status">
                        ✅ Đã gửi
                      </Badge>
                      <span className="email-order-id">
                        Đơn hàng: #{email.orderId}
                      </span>
                    </div>
                    <div className="email-actions">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleViewEmail(email)}
                      >
                        👁️ Xem
                      </Button>
                    </div>
                  </div>
                  <div className="email-details">
                    <div className="email-detail">
                      <strong>📧 Email:</strong> {email.email}
                    </div>
                    <div className="email-detail">
                      <strong>⏰ Thời gian:</strong> {formatDate(email.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Email Content Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        className="email-modal"
      >
        <Modal.Header closeButton className="email-modal-header">
          <Modal.Title>
            📧 Chi Tiết Email - Đơn hàng #{selectedEmail?.orderId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="email-modal-body">
          {selectedEmail && (
            <div className="email-content">
              <div className="email-content-header">
                <div className="email-content-info">
                  <p><strong>📧 Gửi đến:</strong> {selectedEmail.email}</p>
                  <p><strong>⏰ Thời gian:</strong> {formatDate(selectedEmail.timestamp)}</p>
                  <p><strong>🆔 Mã đơn hàng:</strong> #{selectedEmail.orderId}</p>
                </div>
              </div>
              <div className="email-content-body">
                <pre className="email-text">{selectedEmail.content}</pre>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="email-modal-footer">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailHistory; 