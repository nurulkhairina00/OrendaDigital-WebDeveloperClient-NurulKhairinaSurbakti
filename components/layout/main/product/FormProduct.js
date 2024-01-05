import React from "react";
import { Form, Row, Button } from "react-bootstrap";

const FormProduct = (props) => {
  const { input, handleInputChange, disableButton, handleBack, handleSubmit } =
    props;
  return (
    <Form>
      <Form.Group as={Row} className="mb-1">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <Form.Label>
            Name<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <Form.Label>
            Unit<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="unit"
            name="unit"
            value={input.unit}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <Form.Label>
            Price<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="price"
            name="price"
            value={input.price}
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>
      <center className="pt-5">
        <Button
          variant="danger"
          className="mx-2"
          disabled={disableButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button variant="secondary" className="mx-2" onClick={handleBack}>
          Cancel
        </Button>
      </center>
    </Form>
  );
};

export default FormProduct;
