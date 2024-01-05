import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/layout/main/breadcrumb";
import FormCustomer from "../../components/layout/main/customer/FormCustomer";
import Swal from "sweetalert2";
const Add = (props) => {
  const { session } = props;
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
      label: "Add",
      link: "/customer/add",
    },
  ];

  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: `${process.env.API_PATH}:${process.env.API_PORT}/api/customers`,
      data: {
        input,
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Successfully added customer data",
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
        <h2>Add Customer</h2>
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

  return {
    props: { session },
  };
}

export default Add;
