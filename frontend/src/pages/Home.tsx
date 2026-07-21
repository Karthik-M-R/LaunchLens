import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Problem from "../components/landing/Problem";
import Solution from "../components/landing/Solution";
import Features from "../components/landing/Features";
import Workflow from "../components/landing/Workflow";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <Problem />

      <Solution />

      <Features />

      <Workflow />

      <CTA />

      <Footer />
    </>
  );
};

export default Home;