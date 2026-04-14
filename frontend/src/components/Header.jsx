import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto p-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold cursor-pointer">AuthApp 🔐</h1>

          <div className="flex items-center gap-6">
            <button className="bg-white text-indigo-600 px-5 py-2 font-semibold rounded-lg cursor-pointer transition hover:scale-105" onClick={() => navigate('/register')}>
              Sign Up
            </button>
            <button className="border border-white text-white px-5 py-2 font-semibold rounded-lg cursor-pointer transition hover:bg-white hover:text-indigo-600" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
