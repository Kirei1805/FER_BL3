import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue, confirmOrder, orderConfirmed } =
    useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name} - ${item.price}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>{`Tổng số món: ${cartItems.length}`}</p>
            <p>{`Tổng giá trị: $${totalValue}`}</p>
            <div className="cart-buttons">
              <button onClick={clearCart} className="clear-btn">
                Clear Cart
              </button>
              <button 
                onClick={confirmOrder} 
                className="confirm-btn"
                disabled={orderConfirmed}
              >
                {orderConfirmed ? "Đang xử lý..." : "Xác nhận đơn hàng"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
