import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { products } from '../data/products';
import { useTheme } from '../context/ThemeContext';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { isDarkMode } = useTheme();

  return (
    <div className={`products-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="display-4 fw-bold text-center mb-3">
              🍽️ Danh sách sản phẩm
            </h1>
            <p className="lead text-center text-muted">
              Khám phá những món ăn ngon nhất của chúng tôi
            </p>
          </Col>
        </Row>

        {/* Search Bar */}
        <SearchBar 
          products={products} 
          onFilteredProducts={setFilteredProducts} 
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="no-products">
              <h3>🔍 Không tìm thấy sản phẩm</h3>
              <p className="text-muted">
                Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.
              </p>
            </div>
          </div>
        )}

        {/* Pagination hoặc Load More */}
        {filteredProducts.length > 0 && (
          <Row className="mt-5">
            <Col className="text-center">
              <p className="text-muted">
                Hiển thị {filteredProducts.length} trong tổng số {products.length} sản phẩm
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Products;




