import Background from "../Components/Background/Background";
import SignInForm from "../Components/FormComponents/SignInForm";

function SignIn() {

  return (
    <div className="relative w-screen h-screen bg-base-300 sm:bg-base-100">
      <SignInForm />
      <Background />
    </div>
  )
}

export default SignIn;