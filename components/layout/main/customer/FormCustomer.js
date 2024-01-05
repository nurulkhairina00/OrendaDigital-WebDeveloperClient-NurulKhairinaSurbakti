import React from "react";
import { Form, Row, Button } from "react-bootstrap";

const FormCustomer = (props) => {
  const { input, handleInputChange, disableButton, handleBack, handleSubmit } =
    props;
  return (
    <Form>
      <Form.Group as={Row} className="mb-1">
        <div className="col-sm-12 col-md-6">
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
          <div className="row pt-2">
            <div className="col-sm-12 col-md-6">
              <Form.Label>
                Phone<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="+62"
                name="phone"
                value={input.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-sm-12 col-md-6">
              <Form.Label>
                Email address<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <Form.Label>
            Example textarea<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="address"
            value={input.address}
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

export default FormCustomer;
