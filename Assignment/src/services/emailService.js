// Gửi email xác nhận đơn hàng qua Node.js Email Server
export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    // Tạo HTML content cho email
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác nhận đơn hàng - Music Store</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #667eea; }
          .product-item { padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-weight: bold; font-size: 18px; color: #667eea; }
          .footer { text-align: center; margin-top: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎵 Music Store</h1>
            <h2>Xác nhận đơn hàng</h2>
          </div>
          <div class="content">
            <p>Xin chào <strong>${orderData.userDetails.name}</strong>,</p>
            <p>Cảm ơn bạn đã mua hàng tại Music Store! Dưới đây là thông tin chi tiết đơn hàng của bạn:</p>
            
            <div class="order-details">
              <h3>📋 Thông tin đơn hàng</h3>
              <p><strong>Mã đơn hàng:</strong> #${orderData.orderId}</p>
              <p><strong>Ngày đặt:</strong> ${new Date(orderData.date).toLocaleDateString('vi-VN')}</p>
              <p><strong>Địa chỉ giao hàng:</strong> ${orderData.shipaddress}</p>
            </div>
            
            <div class="order-details">
              <h3>🛒 Sản phẩm đã đặt</h3>
              ${orderData.products.map((product, index) => `
                <div class="product-item">
                  <strong>${index + 1}. ${product.name}</strong><br>
                  Số lượng: ${product.quantity} | Giá: $${product.totalPrice.toFixed(2)}
                </div>
              `).join('')}
              <div class="total">
                <strong>Tổng tiền: $${orderData.total.toFixed(2)}</strong>
              </div>
            </div>
            
            <div class="order-details">
              <h3>🚚 Thông tin giao hàng</h3>
              <p><strong>Thời gian giao hàng:</strong> 2-5 ngày làm việc</p>
              <p><strong>Phí vận chuyển:</strong> Miễn phí toàn quốc</p>
            </div>
            
            <div class="order-details">
              <h3>📞 Hỗ trợ khách hàng</h3>
              <p><strong>Hotline:</strong> 1900-xxxx</p>
              <p><strong>Email:</strong> support@musicstore.com</p>
            </div>
            
            <div class="footer">
              <p>🎵 Music Store - Nơi âm nhạc kết nối cuộc sống 🎵</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log('Sending email to:', orderData.userDetails.email);
    
    const response = await fetch('http://localhost:5001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: orderData.userDetails.email,
        subject: `Xác nhận đơn hàng #${orderData.orderId} - Music Store`,
        html: htmlContent,
        orderData: orderData
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('Email sent successfully:', result.messageId);
      return { success: true, message: 'Email đã được gửi thành công!' };
    } else {
      throw new Error(result.message || 'Không thể gửi email');
    }

  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      message: 'Không thể gửi email xác nhận. Vui lòng thử lại sau.' 
    };
  }
}; 