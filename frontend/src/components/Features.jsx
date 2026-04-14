const Features = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4">
        <div className="overflow-hidden">
          <section className="animate__animated animate__fadeInRight animate__slower animate__delay-1s text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose Our Auth System?
            </h2>

            <p className="mt-3 opacity-80">
              Built with modern technologies to ensure security and performance.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-6 px-6">
              <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
                <h3 className="text-xl font-semibold">🔐 Secure JWT Auth</h3>
                <p className="mt-2 text-sm opacity-80">
                  Industry-standard authentication with JWT tokens.
                </p>
              </div>

              <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
                <h3 className="text-xl font-semibold">⚡ Fast Performance</h3>
                <p className="mt-2 text-sm opacity-80">
                  Optimized APIs and seamless user experience.
                </p>
              </div>

              <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
                <h3 className="text-xl font-semibold">🛡 Protected Routes</h3>
                <p className="mt-2 text-sm opacity-80">
                  Access control with secure route protection.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Features;
