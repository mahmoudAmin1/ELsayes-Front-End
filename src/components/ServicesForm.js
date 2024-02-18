import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function Item(label, name, message, type, placeHolder, icon) {
  return {
    label,
    name,
    message,
    type,
    placeHolder,
    icon,
  };
}
const items = [
  Item(
    "First name",
    "first name",
    "Please enter your first name",
    "Input",
    "first name",
    ""
  ),
];
const formItems = (items) => {
  return (
    <Form>
      {items.map((item) => {
        return (
          <Form.Item
            label={item.label}
            name={item.name}
            rules={[
              {
                required: true,
                message: item.message,
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 3, offset: 0 }}
          >
            {/* <Input placeHolder={item.placeHolder} /> */}
          </Form.Item>
        );
      })}
    </Form>
  );
};

function MyForm() {
  // formItems(items);
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default MyForm;
