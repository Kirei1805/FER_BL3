import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Carousel from '../components/ui/Carousel';
import { carouselImages } from '../data/products';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`home-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Hero Section với Carousel */}
      <section className="hero-section mb-5">
        <Container>
          <Carousel images={carouselImages} autoPlay={true} interval={4000} />
        </Container>
      </section>

      {/* Giới thiệu */}
      <section className="about-section mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4">
                🍽️ Chào mừng đến với Nhà hàng Delicious
              </h2>
              <p className="lead mb-4">
                Khám phá những món ăn độc đáo với hương vị tuyệt vời, 
                được chế biến từ những nguyên liệu tươi ngon nhất.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Đặc điểm nổi bật */}
      <section className="features-section mb-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 feature-card text-center">
                <Card.Body>
                  <div className="feature-icon mb-3">🌟</div>
                  <Card.Title>Chất lượng cao</Card.Title>
                  <Card.Text>
                    Sử dụng nguyên liệu tươi ngon, đảm bảo vệ sinh an toàn thực phẩm.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 feature-card text-center">
                <Card.Body>
                  <div className="feature-icon mb-3">⚡</div>
                  <Card.Title>Giao hàng nhanh</Card.Title>
                  <Card.Text>
                    Giao hàng trong vòng 30 phút, đảm bảo món ăn luôn nóng hổi.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 feature-card text-center">
                <Card.Body>
                  <div className="feature-icon mb-3">💝</div>
                  <Card.Title>Dịch vụ tốt</Card.Title>
                  <Card.Text>
                    Đội ngũ nhân viên thân thiện, phục vụ chu đáo và nhiệt tình.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Thống kê */}
      <section className="stats-section mb-5">
        <Container>
          <Row className="text-center">
            <Col md={3}>
              <div className="stat-item">
                <h3 className="display-6 fw-bold text-primary">1000+</h3>
                <p className="text-muted">Khách hàng hài lòng</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item">
                <h3 className="display-6 fw-bold text-success">50+</h3>
                <p className="text-muted">Món ăn đa dạng</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item">
                <h3 className="display-6 fw-bold text-warning">5+</h3>
                <p className="text-muted">Năm kinh nghiệm</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item">
                <h3 className="display-6 fw-bold text-info">24/7</h3>
                <p className="text-muted">Hỗ trợ khách hàng</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
