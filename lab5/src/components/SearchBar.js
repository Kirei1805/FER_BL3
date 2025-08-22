import React, { useState, useMemo } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const SearchBar = ({ products, onFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sử dụng useMemo để tối ưu hóa việc filter và sort
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter theo search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter theo category
    if (categoryFilter) {
      filtered = filtered.filter(product =>
        product.category === categoryFilter
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = parseFloat(a.price);
          bValue = parseFloat(b.price);
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [products, searchTerm, categoryFilter, sortBy, sortOrder]);

  // Lấy danh sách categories duy nhất
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Gọi callback khi products thay đổi
  React.useEffect(() => {
    onFilteredProducts(filteredAndSortedProducts);
  }, [filteredAndSortedProducts, onFilteredProducts]);

  return (
    <div className="search-bar-container mb-4">
      <Row className="g-3">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        
        <Col md={3}>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
        
        <Col md={2}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Tên</option>
            <option value="price">Giá</option>
            <option value="rating">Đánh giá</option>
          </Form.Select>
        </Col>
        
        <Col md={2}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </Form.Select>
        </Col>
        
        <Col md={1}>
          <div className="d-flex justify-content-end">
            <span className="text-muted">
              {filteredAndSortedProducts.length} sản phẩm
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
