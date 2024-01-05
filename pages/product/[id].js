import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/layout/main/breadcrumb";
import FormProduct from "../../components/layout/main/product/FormProduct";
import Swal from "sweetalert2";
const Edit = (props) => {
  const { session, product } = props;
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
      label: "Edit",
      link: "/product/edit",
    },
  ];

  const [input, setInput] = useState({
    id: product.id,
    name: product.name,
    unit: product.unit,
    price: product.price,
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = () => {
    axios({
      method: "patch",
      url: `${process.env.API_PATH}:${process.env.API_PORT}/api/products/${input.id}`,
      data: {
        input,
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Successfully updated product data",
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
        <h2>Edit Product</h2>
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

  const product = await getDataProductById(context.query.id);

  return {
    props: { session, product },
  };
}

const getDataProductById = async (id) => {
  return await axios
    .get(`${process.env.API_PATH}:${process.env.API_PORT}/api/products/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default Edit;
