import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaMusic,
  FaGuitar,
  FaDrum,
  FaKeyboard
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { name: 'Trang Chủ', url: '/home' },
    { name: 'Sản Phẩm', url: '/products' },
    { name: 'Danh Mục', url: '/categories' },
    { name: 'Thương Hiệu', url: '/brands' },
    { name: 'Giỏ Hàng', url: '/cart' },
    { name: 'Liên Hệ', url: '/contact' }
  ];

  const categories = [
    { name: 'Guitar', icon: FaGuitar, url: '/category/guitar' },
    { name: 'Piano & Keyboard', icon: FaKeyboard, url: '/category/keyboard' },
    { name: 'Drum & Percussion', icon: FaDrum, url: '/category/drum' },
    { name: 'Phụ Kiện', icon: FaMusic, url: '/category/accessories' }
  ];

  const contactInfo = [
    { icon: FaPhone, text: '+84 123 456 789', label: 'Hotline' },
    { icon: FaEnvelope, text: 'info@musicstore.com', label: 'Email' },
    { icon: FaMapMarkerAlt, text: 'Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng', label: 'Địa chỉ' },
    { icon: FaClock, text: '8:00 - 22:00 (Thứ 2 - Chủ nhật)', label: 'Giờ làm việc' }
  ];

  return (
    <footer className="footer-section">
      {/* Main Footer Content */}
      <div className="footer-main">
        <Container>
          <Row className="g-4">
            {/* Company Info */}
            <Col lg={4} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="footer-widget"
              >
                <div className="footer-logo">
                  <FaMusic className="logo-icon" />
                  <h3>🎵 Music Store Premium</h3>
                </div>
                <p className="footer-description">
                  Chuyên cung cấp các loại nhạc cụ chất lượng cao từ những thương hiệu hàng đầu thế giới. 
                  Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
                </p>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="social-link"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="footer-widget"
              >
                <h4 className="widget-title">Liên Kết Nhanh</h4>
                <ul className="footer-links">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a href={link.url}>{link.name}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </Col>

            {/* Categories */}
            <Col lg={3} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="footer-widget"
              >
                <h4 className="widget-title">Danh Mục Sản Phẩm</h4>
                <ul className="footer-links">
                  {categories.map((category, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a href={category.url}>
                        <category.icon className="category-icon" />
                        {category.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </Col>

            {/* Contact Info */}
            <Col lg={3} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="footer-widget"
              >
                <h4 className="widget-title">Thông Tin Liên Hệ</h4>
                <div className="contact-info">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="contact-item"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="contact-icon">
                        <info.icon />
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">{info.label}</span>
                        <span className="contact-text">{info.text}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Newsletter Section */}
      <motion.div
        className="footer-newsletter"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="newsletter-content">
                <h3>🎵 Đăng Ký Nhận Tin</h3>
                <p>Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và những bài hướng dẫn hữu ích</p>
              </div>
            </Col>
            <Col lg={6}>
              <Form className="newsletter-form">
                <div className="input-group">
                  <Form.Control
                    type="email"
                    placeholder="Nhập email của bạn..."
                    className="newsletter-input"
                  />
                  <Button className="newsletter-btn">
                    Đăng Ký Ngay! 🚀
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <p className="copyright">
                © {currentYear} Music Store Premium. Made with <FaHeart className="heart-icon" /> by Music Lovers
              </p>
            </Col>
            <Col md={6}>
              <div className="footer-bottom-links">
                <a href="/privacy">Chính Sách Bảo Mật</a>
                <a href="/terms">Điều Khoản Sử Dụng</a>
                <a href="/sitemap">Sitemap</a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer; 