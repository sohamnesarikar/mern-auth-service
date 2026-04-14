import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-3xl font-semibold">Welcome Back, {user?.name} 👋</h2>
      <p className="mt-4 text-lg opacity-90">
        Your account is secure and ready to use.
      </p>
    </>
  );
};

export default Dashboard;
