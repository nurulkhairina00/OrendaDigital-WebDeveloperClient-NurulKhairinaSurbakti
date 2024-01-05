import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/layout/main/breadcrumb";
import FormOrder from "../../components/layout/main/order/FormOrder";

const Add = (props) => {
  const { session, listCustomer, listProduct } = props;
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${session.user.token}`;

  // breadcrumb
  const breadcrumbData = [
    {
      label: "Main Menu Order",
      link: "/order",
    },
    {
      label: "Add",
      link: "/Order/add",
    },
  ];

  const [input, setInput] = useState({
    customer_id: "",
    grand_total: 0,
  });

  const [detailsOrder, setDetailsOrder] = useState([
    {
      product_id: "",
      price: "",
      satuan: "",
      discount: 0,
      total: 0,
    },
  ]);
  const [disableButton, setDisableButton] = useState(true);

  const addDetailsOrder = () => {
    let newDetails = [...detailsOrder];
    newDetails.push({
      product_id: "",
      price: "",
      satuan: "",
      discount: 0,
      total: 0,
    });
    setDetailsOrder(newDetails);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleDetailsChange = (value, index, name) => {
    let newDetails = [...detailsOrder];
    newDetails[index][name] = value;
    setDetailsOrder(newDetails);
  };

  const deleteDetailsOrder = (index) => {
    if (detailsOrder.length > 1) {
      Swal.fire({
        title: "Deleted!",
        text: "Are you sure you want to delete the data?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#005b9e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          let newDetails = [...detailsOrder];
          newDetails.splice(index, 1);
          setDetailsOrder(newDetails);
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Cannot delete all details",
        confirmButtonColor: "#005b9e",
      });
    }
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: `${process.env.API_PATH}:${process.env.API_PORT}/api/orders`,
      data: {
        input,
        detailsOrder,
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Successfully added orders data",
          icon: "success",
          timer: 1500,
        }).then(() => Router.push("/order"));
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleBack = () => {
    Router.push("/order");
  };

  const isButtonDisabled = detailsOrder.some((item) => {
    return !item.product_id || !item.satuan;
  });

  useEffect(() => {
    if (!input.customer_id) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [input]);

  return (
    <div className="">
      <Head>
        <title>Order | Orenda Digital</title>
      </Head>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <div className="card p-4">
        <h2>Add Order</h2>
        <div className="container-fluid p-sm-2 p-lg-4">
          <FormOrder
            input={input}
            setInput={setInput}
            listCustomer={listCustomer}
            listProduct={listProduct}
            detailsOrder={detailsOrder}
            addDetailsOrder={addDetailsOrder}
            handleInputChange={handleInputChange}
            handleDetailsChange={handleDetailsChange}
            disableButton={disableButton}
            isButtonDisabled={isButtonDisabled}
            deleteDetailsOrder={deleteDetailsOrder}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const listCustomer = await getDataCustomer();
  const listProduct = await getDataProduct();

  return {
    props: { session, listCustomer, listProduct },
  };
}

const getDataCustomer = async () => {
  return await axios
    .get(`${process.env.API_PATH}:${process.env.API_PORT}/api/customers`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getDataProduct = async () => {
  return await axios
    .get(`${process.env.API_PATH}:${process.env.API_PORT}/api/products`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default Add;
