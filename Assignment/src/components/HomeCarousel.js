import { Carousel } from "react-bootstrap"
import { motion } from "framer-motion"

const HomeCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="home-carousel-container"
    >
      <Carousel 
        interval={4000} 
        pause="hover"
        fade
        indicators={true}
        controls={true}
        className="home-carousel"
      >
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src="/images/carousel1.jpg"
              alt="Premium Guitars"
            />
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="carousel-caption-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="carousel-title">🎸 Premium Guitars</h2>
              <p className="carousel-description">
                Khám phá bộ sưu tập guitar chất lượng cao từ những thương hiệu hàng đầu thế giới
              </p>
              <div className="carousel-features">
                <span className="feature-tag">Fender</span>
                <span className="feature-tag">Gibson</span>
                <span className="feature-tag">Yamaha</span>
              </div>
            </motion.div>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src="/images/carousel2.jpg"
              alt="Professional Keyboards"
            />
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="carousel-caption-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="carousel-title">🎹 Professional Keyboards</h2>
              <p className="carousel-description">
                Tìm kiếm keyboard hoàn hảo cho hành trình âm nhạc của bạn
              </p>
              <div className="carousel-features">
                <span className="feature-tag">Roland</span>
                <span className="feature-tag">Yamaha</span>
                <span className="feature-tag">Korg</span>
              </div>
            </motion.div>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src="/images/carousel3.jpg"
              alt="Drum Sets"
            />
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="carousel-caption-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="carousel-title">🥁 Drum Sets</h2>
              <p className="carousel-description">
                Bộ trống hoàn chỉnh cho người mới bắt đầu và chuyên nghiệp
              </p>
              <div className="carousel-features">
                <span className="feature-tag">Pearl</span>
                <span className="feature-tag">Tama</span>
                <span className="feature-tag">Roland</span>
              </div>
            </motion.div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </motion.div>
  )
}

export default HomeCarousel;

