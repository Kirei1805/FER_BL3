import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomeCarousel from "../components/HomeCarousel";
import BestSellers from "../components/BestSeller";
import Categories from "../components/Categories";
import Brands from "../components/Brands";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import {
  FadeIn,
  PopIn,
  GradientText,
  BreathingElement,
} from "../components/AnimationComponents";
import "./HomePage.css";

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    brands: 0,
    categories: 0,
    orders: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from db.json
    const fetchData = async () => {
      try {
        const [productsRes, brandsRes, categoriesRes, ordersRes] =
          await Promise.all([
            fetch("http://localhost:5000/products"),
            fetch("http://localhost:5000/brands"),
            fetch("http://localhost:5000/categories"),
            fetch("http://localhost:5000/orders"),
          ]);

        const [products, brands, categories, orders] = await Promise.all([
          productsRes.json(),
          brandsRes.json(),
          categoriesRes.json(),
          ordersRes.json(),
        ]);

        setAllProducts(products);
        setStats({
          products: products.length,
          brands: brands.length,
          categories: categories.length,
          orders: orders.length,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bestSellerProducts = allProducts.filter(
    (product) => product.isBestSeller
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: "🎵",
      title: "Chất Lượng Premium",
      description:
        "Chỉ bán những sản phẩm chính hãng từ các thương hiệu uy tín nhất thế giới",
    },
    {
      icon: "🚚",
      title: "Giao Hàng Nhanh",
      description:
        "Giao hàng toàn quốc trong 24h với đội ngũ vận chuyển chuyên nghiệp",
    },
    {
      icon: "🛠️",
      title: "Bảo Hành Tận Tâm",
      description:
        "Bảo hành chính hãng và hỗ trợ kỹ thuật 24/7 từ đội ngũ chuyên gia",
    },
    {
      icon: "💎",
      title: "Giá Cả Hợp Lý",
      description: "Cam kết giá tốt nhất thị trường với nhiều ưu đãi hấp dẫn",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="homepage">
        {/* Full Width Carousel Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="full-width-carousel-section"
        >
          <HomeCarousel />
        </motion.section>

      {/* Stats Section */}
      <motion.section
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-icon">🎼</div>
                <div className="stat-number">{stats.products}+</div>
                <div className="stat-label">Sản Phẩm</div>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-icon">🏢</div>
                <div className="stat-number">{stats.brands}+</div>
                <div className="stat-label">Thương Hiệu</div>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-icon">📂</div>
                <div className="stat-number">{stats.categories}+</div>
                <div className="stat-label">Danh Mục</div>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants} className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-number">{stats.orders}+</div>
                <div className="stat-label">Đơn Hàng</div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      <Container className="py-5">
        {/* Best Sellers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <BestSellers products={bestSellerProducts} loading={loading} />
        </motion.div>

        {/* Categories */}
        <motion.div
          className="categories-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Categories />
        </motion.div>

        {/* Features Section */}
        <motion.section
          className="features-section my-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-5">
            <h2 className="section-title">Tại Sao Chọn Chúng Tôi? ✨</h2>
            <p className="section-subtitle">
              Những lý do khiến Music Store trở thành lựa chọn hàng đầu của các
              nghệ sĩ
            </p>
          </motion.div>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card className="feature-card h-100">
                    <Card.Body className="text-center">
                      <div className="feature-icon">{feature.icon}</div>
                      <h5 className="feature-title">{feature.title}</h5>
                      <p className="feature-description">
                        {feature.description}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.section>

        {/* Brands */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Brands />
        </motion.div>

        {/* Newsletter Section */}
        <motion.section
          className="newsletter-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="newsletter-card">
            <Card.Body className="text-center p-5">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="newsletter-title">🔔 Đăng Ký Nhận Tin</h3>
                <p className="newsletter-subtitle">
                  Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và những
                  bài hướng dẫn hữu ích
                </p>
                <div className="newsletter-form">
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Nhập email của bạn..."
                  />
                  <Button className="newsletter-btn">Đăng Ký Ngay! 🚀</Button>
                </div>
                <small className="newsletter-note">
                  * Chúng tôi cam kết không spam và bảo mật thông tin của bạn
                </small>
              </motion.div>
            </Card.Body>
          </Card>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="cta-card">
            <Card.Body className="text-center p-5">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="cta-title">🎸 Sẵn Sàng Khám Phá Âm Nhạc?</h2>
                <p className="cta-subtitle">
                  Khám phá bộ sưu tập nhạc cụ đa dạng và tìm kiếm nhạc cụ phù hợp với bạn
                </p>
                <div className="cta-buttons">
                  <Button 
                    className="cta-btn-primary"
                    onClick={() => navigate('/categories')}
                  >
                    Khám Phá Danh Mục 🎯
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    className="cta-btn-secondary"
                    onClick={() => navigate('/brands')}
                  >
                    Xem Thương Hiệu 🏢
                  </Button>
                </div>
              </motion.div>
            </Card.Body>
          </Card>
        </motion.section>
      </Container>

      {/* Footer */}
      <Footer />
      </div>
    </>
  );
}

export default HomePage;
