import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ButtonGroup, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCartPlus, FaHeart } from 'react-icons/fa';
import CustomNavbar from '../components/Navbar';
import api from '../services/api';
import { formatPrice } from '../utils/format';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        console.log('Product data:', data);
        console.log('Image path:', data.image);
        console.log('Final image URL:', data.image?.startsWith('/') ? data.image : `/${data.image}`);
        setProduct(data);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', product);
  };

  const handleFavourite = () => {
    // TODO: Implement favourite functionality
    console.log('Added to favourites:', product);
  };

  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-4">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Đang tải thông tin sản phẩm...</div>
          </div>
        </Container>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-4">
          <Alert variant="danger">
            {error || 'Không tìm thấy sản phẩm'}
          </Alert>
          <Button variant="primary" onClick={() => navigate('/products')}>
            <FaArrowLeft className="me-1" />
            Quay lại danh sách sản phẩm
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <CustomNavbar />
      <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        className="mb-3"
        onClick={() => navigate('/products')}
      >
        <FaArrowLeft className="me-1" />
        Quay lại
      </Button>

      <Row>
        <Col md={6}>
          <Card className="product-details-image">
            <Card.Img
              variant="top"
              src={product.image?.startsWith('/') ? product.image : `/${product.image}`}
              alt={product.name}
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = `https://picsum.photos/seed/${product.id}/600/400`;
              }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 product-details-info">
            <Card.Body>
              <Card.Title className="h3 mb-3">{product.name}</Card.Title>
              
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">
                  {product.category}
                </Badge>
              </div>

              <div className="mb-4">
                <Badge bg="primary" className="fs-4">
                  {formatPrice(product.price)}
                </Badge>
              </div>

              <Card.Text className="mb-4">
                {product.description}
              </Card.Text>

              <ButtonGroup className="w-100 mb-3">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-fill"
                >
                  <FaCartPlus className="me-2" />
                  Thêm vào giỏ hàng
                </Button>
                
                <Button
                  variant="outline-danger"
                  size="lg"
                  onClick={handleFavourite}
                  className="flex-fill"
                >
                  <FaHeart className="me-2" />
                  Yêu thích
                </Button>
              </ButtonGroup>

              <div className="text-muted small">
                <p><strong>Mã sản phẩm:</strong> #{product.id}</p>
                <p><strong>Danh mục:</strong> {product.category}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </>
  );
}
