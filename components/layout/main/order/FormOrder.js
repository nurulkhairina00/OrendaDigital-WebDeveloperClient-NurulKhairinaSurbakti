import React, { useEffect } from "react";
import { Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { FaPlus, FaTrash } from "react-icons/fa";
const FormOrder = (props) => {
  const {
    input,
    setInput,
    listCustomer,
    listProduct,
    detailsOrder,
    addDetailsOrder,
    handleInputChange,
    handleDetailsChange,
    disableButton,
    isButtonDisabled,
    deleteDetailsOrder,
    handleBack,
    handleSubmit,
  } = props;

  return (
    <Form>
      <Form.Group as={Row} className="mb-1">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <Form.Label>
            Customer<span className="text-danger">*</span>
          </Form.Label>

          <Select
            placeholder="Pilih..."
            id="long-value-select"
            instanceId="long-value-select"
            name="customer_id"
            options={listCustomer.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })}
            value={{
              value: input.customer_id,
              label: listCustomer.find((item) => item.id === input.customer_id)
                ? listCustomer.find((item) => item.id === input.customer_id)
                    .name
                : "Pilih...",
            }}
            onChange={(e) =>
              setInput((prevInput) => ({ ...prevInput, customer_id: e.value }))
            }
          />
        </div>
      </Form.Group>

      <div as={Row} className="my-3">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addDetailsOrder}
          >
            <FaPlus />
          </button>
        </div>
        <table className="table mt-2">
          <thead className="text-center">
            <tr>
              <th></th>
              <th>
                Nama Product<span className="text-danger">*</span>
              </th>
              <th>
                Satuan<span className="text-danger">*</span>
              </th>
              <th>
                Discount<span className="text-danger">*</span>
              </th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {detailsOrder.map((detail, index) => {
              return (
                <tr key={index}>
                  <td width="20">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteDetailsOrder(index)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td width="200">
                    <Select
                      placeholder="Pilih..."
                      id="long-value-select"
                      instanceId="long-value-select"
                      name="product_id"
                      value={{
                        value: detail.product_id,
                        label: listProduct.find(
                          (item) => item.id === detail.product_id
                        )
                          ? listProduct.find(
                              (item) => item.id === detail.product_id
                            ).name
                          : "Pilih...",
                      }}
                      options={listProduct.map((item) => {
                        return {
                          value: item.id,
                          label: item.name,
                          price: item.price,
                        };
                      })}
                      onChange={(e) => {
                        handleDetailsChange(e.value, index, "product_id"),
                          handleDetailsChange(e.price, index, "price"),
                          handleDetailsChange(
                            Number(e.price) * detail.satuan -
                              (Number(e.price) *
                                detail.satuan *
                                detail.discount) /
                                100,
                            index,
                            "total"
                          );
                      }}
                    />
                  </td>
                  <td width="200">
                    <Form.Control
                      type="number"
                      placeholder="satuan"
                      name="satuan"
                      value={detail.satuan}
                      onChange={(e) => {
                        handleDetailsChange(e.target.value, index, "satuan"),
                          handleDetailsChange(
                            Number(detail.price) * e.target.value -
                              (Number(detail.price) *
                                e.target.value *
                                detail.discount) /
                                100,
                            index,
                            "total"
                          ),
                          setInput({
                            ...input,
                            grand_total: detailsOrder.reduce(
                              (acc, curr) => acc + parseFloat(curr.total),
                              0
                            ),
                          });
                      }}
                    />
                  </td>
                  <td width="200">
                    <Form.Control
                      type="text"
                      placeholder="discount"
                      name="discount"
                      value={detail.discount}
                      onChange={(e) => {
                        if (
                          /^\d*\,?\d*$/.test(e.target.value) ||
                          e.target.value === ""
                        ) {
                          handleDetailsChange(
                            e.target.value,
                            index,
                            "discount"
                          ),
                            handleDetailsChange(
                              Number(detail.price) * detail.satuan -
                                (Number(detail.price) *
                                  detail.satuan *
                                  e.target.value) /
                                  100,
                              index,
                              "total"
                            ),
                            setInput({
                              ...input,
                              grand_total: detailsOrder.reduce(
                                (acc, curr) => acc + parseFloat(curr.total),
                                0
                              ),
                            });
                        }
                      }}
                    />
                  </td>
                  <td width="200">
                    <Form.Control
                      type="text"
                      placeholder="0"
                      className="text-end"
                      name="total"
                      value={detail.total}
                      disabled
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Grand Total
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="0"
                  className="text-end"
                  name="grand_total"
                  value={input.grand_total}
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <center className="pt-5">
        <Button
          variant="danger"
          className="mx-2"
          disabled={disableButton || isButtonDisabled}
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

export default FormOrder;
