import { getSession } from "next-auth/react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const Home = (props) => {
  const { session } = props;
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${session.user.token}`;

  if (session.user.token)
    return (
      <>
        <Head>
          <title>Orenda Digital</title>
        </Head>
      </>
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

export default Home;
