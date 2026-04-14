import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4">
        <section className="animate__animated animate__fadeInLeft animate__slower h-[50vh] flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Secure Authentication <br />
            Made Simple 🔐
          </h2>

          <p className="mt-4 max-w-xl text-lg opacity-90">
            A modern authentication system with secure login, JWT sessions, and
            seamless user experience.
          </p>

          <div className="mt-6">
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Get Started
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
