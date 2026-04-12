const Home = () => {
  return (
    <main className="max-w-7xl mx-auto p-3">
      <header>
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-violet-500">MernAuth</h1>
          <button className="hover:text-purple-500 text-lg cursor-pointer">
            Logout
          </button>
        </nav>
      </header>
      <section className="mt-8">
        <h2 className="text-3xl font-semibold">Welcome Back </h2>
      </section>
    </main>
  );
};

export default Home;
