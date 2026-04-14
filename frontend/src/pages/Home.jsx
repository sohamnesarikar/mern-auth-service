import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-linear-to-r from-violet-600 to-indigo-600 text-white">
      <Header />
      <div className="grow">
        <Hero />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
