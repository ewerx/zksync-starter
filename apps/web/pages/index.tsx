import type { NextPage } from "next";
import Greeter from "../components/Greeter";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Greeter />
    </Layout>
  );
};

export default Home;
