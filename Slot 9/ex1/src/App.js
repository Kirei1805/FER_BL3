import React from "react";
import FormValidation from "./components/FormValidation";
import { Container } from "react-bootstrap";

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
    alert("Form đã được submit thành công! Kiểm tra console để xem dữ liệu.");
  };

  return (
    <div className="App">
      <Container className="mt-4">
        <h1 className="text-center mb-5">FormValidation với PropTypes</h1>
        
        <FormValidation title="Đăng Ký Tài Khoản" onSubmit={handleFormSubmit} />
      </Container>
    </div>
  );
};

export default App;
