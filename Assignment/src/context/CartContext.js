import { createContext, useState, useEffect, useContext } from "react"
import { toast } from 'react-toastify'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, addQuantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      const currentQty = existingItem ? existingItem.quantity : 0;
      const maxQty = product.inStock || 0;
      if (currentQty + addQuantity > maxQty) {
        toast.error(`❌ Không đủ số lượng trong kho! Chỉ còn ${maxQty} sản phẩm.`, {
          icon: '⚠️',
          style: {
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            color: 'white',
            fontWeight: 'bold'
          },
          progressStyle: {
            background: 'rgba(255,255,255,0.7)'
          }
        })
        return prevCart;
      }
      if (existingItem) {
        toast.success(`🎵 Đã thêm thêm ${addQuantity} ${product.name} vào giỏ hàng!`, {
          icon: '🎼',
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 'bold'
          },
          progressStyle: {
            background: 'rgba(255,255,255,0.7)'
          }
        })
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + addQuantity } : item))
      } else {
        toast.success(`🎸 Đã thêm ${product.name} vào giỏ hàng!`, {
          icon: '🛒',
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 'bold'
          },
          progressStyle: {
            background: 'rgba(255,255,255,0.7)'
          }
        })
        return [...prevCart, { ...product, quantity: addQuantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    const removedItem = cart.find(item => item.id === productId)
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    
    if (removedItem) {
      toast.error(`🗑️ Đã xóa ${removedItem.name} khỏi giỏ hàng`, {
        style: {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          color: 'white',
          fontWeight: 'bold'
        },
        progressStyle: {
          background: 'rgba(255,255,255,0.7)'
        }
      })
    }
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    
    toast.info(`📝 Đã cập nhật số lượng sản phẩm`, {
      autoClose: 1500,
      style: {
        background: 'linear-gradient(135deg, #3742fa 0%, #2f3542 100%)',
        color: 'white',
        fontWeight: 'bold'
      },
      progressStyle: {
        background: 'rgba(255,255,255,0.7)'
      }
    })
  }

  const clearCart = () => {
    setCart([])
    toast.success(`🧹 Đã xóa tất cả sản phẩm khỏi giỏ hàng!`, {
      style: {
        background: 'linear-gradient(135deg, #26de81 0%, #20bf6b 100%)',
        color: 'white',
        fontWeight: 'bold'
      },
      progressStyle: {
        background: 'rgba(255,255,255,0.7)'
      }
    })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getTotalItems,
      getTotalPrice,
      subtotal: getTotalPrice(),
      items: cart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

