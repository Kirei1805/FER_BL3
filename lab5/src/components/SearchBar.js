import React, { useState, useMemo } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const SearchBar = ({ products, onFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
 const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setSortOrder('asc');
  };
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

    // Filter theo price range
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(product => {
        const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
        const min = priceRange.min !== '' ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max !== '' ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
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
          // Ensure price is a number and handle edge cases
          aValue = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
          bValue = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;
          break;
        case 'rating':
          aValue = typeof a.rating === 'number' ? a.rating : parseFloat(a.rating) || 0;
          bValue = typeof b.rating === 'number' ? b.rating : parseFloat(b.rating) || 0;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }

      // Handle number comparison
      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [products, searchTerm, categoryFilter, priceRange, sortBy, sortOrder]);

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
        <Col md={3}>
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
        
        <Col md={2}>
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
          <InputGroup>
            <InputGroup.Text>💰</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Từ"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              min="0"
              step="0.01"
            />
          </InputGroup>
        </Col>

        <Col md={2}>
          <InputGroup>
            <InputGroup.Text>💰</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Đến"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              min="0"
              step="0.01"
            />
          </InputGroup>
        </Col>
      
        
        <Col md={1}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">↑</option>
            <option value="desc">↓</option>
          </Form.Select>
        </Col>
        
        <Col md={1}>
          <div className="d-flex justify-content-end">
            <span className="search-results-counter">
              {filteredAndSortedProducts.length} sản phẩm
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
