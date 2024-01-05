/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "/components/layout/main/breadcrumb";
import Table from "/components/layout/main/table";

const Index = (props) => {
  const { session, order } = props;

  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${session.user.token}`;

  // breadcrumb
  const breadcrumbData = [
    {
      label: "Main Menu Order",
      link: "/order",
    },
  ];

  // column
  const columns = useMemo(() => [
    {
      Header: "No",
      accessor: "no",
      width: "10%",
    },
    {
      Header: "Customer Name",
      accessor: "customerName",
    },
    {
      Header: "Grand Total",
      accessor: "grandTotal",
    },
    {
      Header: "Action",
      accessor: "action",
      width: "10%",
    },
  ]);

  const [data, setData] = useState(
    order.map((item, index) => ({
      no: index + 1,
      customerName: item.customer.name,
      grandTotal: item.grand_total
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      action: (
        <DropdownButton
          id="dropdown-basic-button"
          title={<span>&#x2630;</span>}
          variant="danger"
        >
          <Link href={`/order/${item.id}`} passHref>
            <Dropdown.Item as="a">
              <FaEdit /> <span className="ms-2">Edit</span>
            </Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={() => handleDelete(item.id)}>
            <FaTrash /> <span className="ms-2">Delete</span>
          </Dropdown.Item>
        </DropdownButton>
      ),
    }))
  );

  const handleDelete = (id) => {
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
        axios
          .delete(
            `${process.env.API_PATH}:${process.env.API_PORT}/api/orders/${id}`
          )
          .then(() => {
            Swal.fire("Deleted!", "Data Successfully Deleted!", "success");
            location.reload();
          })
          .catch((err) => {
            throw err;
          });
      }
    });
  };

  return (
    <div className="">
      <Head>
        <title>Order | Orenda Digital</title>
      </Head>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <div className="card p-4">
        <div className="d-flex justify-content-between py-2">
          <h2>Order</h2>
          <Link href="order/add">
            <button className="btn btn-danger">Add New Order</button>
          </Link>
        </div>
        <div className="container-fluid p-4">
          <Table columns={columns} data={data} />
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

  const order = await getDataOrder();

  return {
    props: { session, order },
  };
}

const getDataOrder = async () => {
  return await axios
    .get(`${process.env.API_PATH}:${process.env.API_PORT}/api/orders`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default Index;
