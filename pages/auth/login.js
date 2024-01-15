import { useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Form, Container, Col, Row, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    const loginFailed = result.error;
    if (loginFailed) {
      if (result.error === "Request failed with status code 401") {
        Swal.fire({
          title: "Warning",
          text: "Invalid email or password",
          icon: "warning",
          width: 400,
          confirmButtonColor: "#005b9e",
        });
      } else {
        Swal.fire({
          title: "Warning",
          text: result.error,
          icon: "warning",
          width: 400,
          confirmButtonColor: "#005b9e",
        });
      }
    }
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Login | Orenda Digital</title>
      </Head>
      <Container fluid className="App">
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col sm={12} md={6} lg={3}>
            <div className="card">
              <div className="card-body ">
                <div className="py-3">
                  <h3 className="fw-bold">LOGIN</h3>
                  <p className="fs-6">Please log in with the account you</p>
                </div>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="mail@gmail.com"
                      ref={emailRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="password"
                      ref={passwordRef}
                    />
                  </Form.Group>
                  <center className="py-4">
                    <Button type="submit" variant="danger">
                      Login
                    </Button>
                  </center>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
