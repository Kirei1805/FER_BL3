import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Container, Row, Col, Spinner, Card, Form, Button, Badge } from "react-bootstrap"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import SortingControls from "../components/SortingControls"
import { motion } from "framer-motion"

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortedProducts, setSortedProducts] = useState([])
  const [sortOption, setSortOption] = useState("default")
  
  // Price filter states
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [inStockOnly, setInStockOnly] = useState(false)
  
  // Categories and brands for filters
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("http://localhost:5000/products")
        const productsData = await productsResponse.json()
        
        // Fetch categories
        const categoriesResponse = await fetch("http://localhost:5000/categories")
        const categoriesData = await categoriesResponse.json()
        
        // Fetch brands
        const brandsResponse = await fetch("http://localhost:5000/brands")
        const brandsData = await brandsResponse.json()

        setAllProducts(productsData)
        setCategories(categoriesData)
        setBrands(brandsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products based on search criteria
  useEffect(() => {
    let filtered = [...allProducts]

    // Text search filter
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Price range filter
    if (minPrice !== "") {
      filtered = filtered.filter(product => product.price >= parseFloat(minPrice))
    }
    if (maxPrice !== "") {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice))
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === selectedBrand.toLowerCase()
      )
    }

    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock)
    }

    setFilteredProducts(filtered)
    setSortedProducts(filtered)
  }, [allProducts, query, minPrice, maxPrice, selectedCategory, selectedBrand, inStockOnly])

  const handleSort = (option) => {
    setSortOption(option)
    const sorted = [...filteredProducts]

    switch (option) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "in-stock":
        sorted.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0))
        break
      default:
        // Default sorting (no specific order)
        break
    }

    setSortedProducts(sorted)
  }

  const clearFilters = () => {
    setMinPrice("")
    setMaxPrice("")
    setSelectedCategory("")
    setSelectedBrand("")
    setInStockOnly(false)
    // Update URL to remove filters but keep search query
    setSearchParams(query ? { q: query } : {})
  }

  const getPriceRange = () => {
    if (allProducts.length === 0) return { min: 0, max: 1000 }
    const prices = allProducts.map(p => p.price)
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    }
  }

  const priceRange = getPriceRange()

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="d-flex align-items-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="me-3"
              style={{ fontSize: '2rem' }}
            >
              🔍
            </motion.div>
            <h1 className="mb-0 gradient-text">
              {query ? `Tìm kiếm: "${query}"` : "Tìm kiếm sản phẩm"}
            </h1>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" style={{ color: '#667eea' }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {/* Advanced Search Filters */}
              <Card className="mb-4 shadow-sm border-0">
                <Card.Header 
                  className="text-white"
                  style={{
                    background: '#8B4513'
                  }}
                >
                  <h5 className="mb-0">🔧 Bộ lọc nâng cao</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    {/* Price Range */}
                    <Col md={3} className="mb-3">
                      <label className="form-label fw-bold">💰 Khoảng giá ($)</label>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="number"
                          placeholder={`Min (${priceRange.min})`}
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          min={priceRange.min}
                          max={priceRange.max}
                          style={{ borderRadius: '10px', marginRight: '8px' }}
                        />
                        <span className="mx-2">-</span>
                        <Form.Control
                          type="number"
                          placeholder={`Max (${priceRange.max})`}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          min={priceRange.min}
                          max={priceRange.max}
                          style={{ borderRadius: '10px', marginLeft: '8px' }}
                        />
                      </div>
                    </Col>

                    {/* Category Filter */}
                    <Col md={2} className="mb-3">
                      <label className="form-label fw-bold">🎵 Danh mục</label>
                      <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ borderRadius: '10px' }}
                      >
                        <option value="">Tất cả</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    {/* Brand Filter */}
                    <Col md={2} className="mb-3">
                      <label className="form-label fw-bold">🎸 Thương hiệu</label>
                      <Form.Select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        style={{ borderRadius: '10px' }}
                      >
                        <option value="">Tất cả</option>
                        {brands.map((brand) => (
                          <option key={brand.id} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    {/* Stock Filter */}
                    <Col md={2} className="mb-3">
                      <label className="form-label fw-bold">📦 Tình trạng</label>
                      <Form.Check
                        type="checkbox"
                        label="Chỉ sản phẩm còn hàng"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="mt-2"
                      />
                    </Col>

                    {/* Clear Filters Button */}
                    <Col md={3} className="mb-3 d-flex align-items-end">
                      <motion.div whileTap={{ scale: 0.95 }} className="w-100">
                        <Button
                          variant="outline-danger"
                          onClick={clearFilters}
                          className="w-100"
                          style={{ borderRadius: '10px' }}
                        >
                          🧹 Xóa bộ lọc
                        </Button>
                      </motion.div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Results Summary */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Badge 
                    bg="primary" 
                    pill 
                    className="me-2"
                    style={{ 
                      background: 'linear-gradient(135deg, rgb(174, 125, 90), rgb(229, 211, 179) 100%)',
                      fontSize: '1rem',
                      padding: '8px 15px'
                    }}
                  >
                    {sortedProducts.length} sản phẩm
                  </Badge>
                  {query && (
                    <span className="text-muted">
                      cho từ khóa "{query}"
                    </span>
                  )}
                </div>
                <SortingControls onSort={handleSort} sortOption={sortOption} />
              </div>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Row xs={1} md={2} lg={4} className="g-4">
                    {sortedProducts.map((product, index) => (
                      <Col key={product.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-5"
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😔</div>
                  <h3 className="text-muted">
                    {query 
                      ? `Không tìm thấy sản phẩm nào cho "${query}"`
                      : "Không tìm thấy sản phẩm nào với bộ lọc hiện tại"
                    }
                  </h3>
                  <p className="text-muted">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="primary"
                      onClick={clearFilters}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '12px 30px'
                      }}
                    >
                      🔄 Xóa bộ lọc và thử lại
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </Container>
    </>
  )
}

export default SearchPage;