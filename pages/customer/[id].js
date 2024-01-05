import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/layout/main/breadcrumb";
import FormCustomer from "../../components/layout/main/customer/FormCustomer";
import Swal from "sweetalert2";
const Edit = (props) => {
  const { session, customer } = props;
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${session.user.token}`;

  // breadcrumb
  const breadcrumbData = [
    {
      label: "Main Menu Customer",
      link: "/customer",
    },
    {
      label: "Edit",
      link: "/customer/edit",
    },
  ];

  const [input, setInput] = useState({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = () => {
    axios({
      method: "patch",
      url: `${process.env.API_PATH}:${process.env.API_PORT}/api/customers/${input.id}`,
      data: {
        input,
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Successfully updated customer data",
          icon: "success",
          timer: 1500,
        }).then(() => Router.push("/customer"));
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleBack = () => {
    Router.push("/customer");
  };

  useEffect(() => {
    if (!input.name || !input.phone || !input.email || !input.address) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [input]);

  return (
    <div className="">
      <Head>
        <title>Customer | Orenda Digital</title>
      </Head>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <div className="card p-4">
        <h2>Edit Customer</h2>
        <div className="container-fluid p-sm-2 p-lg-4">
          <FormCustomer
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

  const customer = await getDataCustomerById(context.query.id);

  return {
    props: { session, customer },
  };
}

const getDataCustomerById = async (id) => {
  return await axios
    .get(`${process.env.API_PATH}:${process.env.API_PORT}/api/customers/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default Edit;
