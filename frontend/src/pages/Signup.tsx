import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/SignupForm";

const Signup = () => {
  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Start tracking your marketing campaigns today."
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;