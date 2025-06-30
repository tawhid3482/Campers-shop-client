/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Input, Button, Rate, Typography } from "antd";

const { Title } = Typography;

const Reviews = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      form.resetFields();
      setSubmitting(false);
    }, 1000); // Simulate a network request
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Post Your Review
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Item
          name="name"
          label="Your Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please provide a rating" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Comment"
          rules={[{ required: true, message: "Please write a comment" }]}
        >
          <Input.TextArea rows={4} placeholder="Write your review here" />
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-[#832b38]"
            htmlType="submit"
            loading={submitting}
            block
          >
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Reviews;
