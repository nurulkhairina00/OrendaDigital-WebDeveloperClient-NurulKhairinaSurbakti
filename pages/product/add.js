import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/layout/main/breadcrumb";
import FormProduct from "../../components/layout/main/product/FormProduct";

const Add = (props) => {
  const { session } = props;
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${session.user.token}`;

  // breadcrumb
  const breadcrumbData = [
    {
      label: "Main Menu Product",
      link: "/product",
    },
    {
      label: "Add",
      link: "/product/add",
    },
  ];

  const [input, setInput] = useState({
    name: "",
    unit: "",
    price: "",
  });

  const [disableButton, setDisableButton] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: `${process.env.API_PATH}:${process.env.API_PORT}/api/products`,
      data: {
        input,
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Successfully added product data",
          icon: "success",
          timer: 1500,
        }).then(() => Router.push("/product"));
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleBack = () => {
    Router.push("/product");
  };

  useEffect(() => {
    if (!input.name || !input.unit || !input.price) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [input]);

  return (
    <div className="">
      <Head>
        <title>Product | Orenda Digital</title>
      </Head>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <div className="card p-4">
        <h2>Add Product</h2>
        <div className="container-fluid p-sm-2 p-lg-4">
          <FormProduct
            input={input}
            handleInputChange={handleInputChange}
            disableButton={disableButton}
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

  return {
    props: { session },
  };
}

export default Add;
