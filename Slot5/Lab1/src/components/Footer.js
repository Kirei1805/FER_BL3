import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col>
            <p className="mb-0">Made with ❤️ and 🥑</p>
          </Col>
          <Col className="text-end">
            <div className="d-flex justify-content-end gap-3">
              <FaInstagram size={20} className="text-muted" />
              <FaTwitter size={20} className="text-muted" />
              <FaTiktok size={20} className="text-muted" />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
