import Background from "../Components/Background/Background";
import Header from "../Components/FormComponents/Header";
import SignUpForm from "../Components/FormComponents/SignUpForm";

function SignUp() {

  return <div className="w-screen h-screen bg-base-300 sm:bg-base-100">
    <Header />
    <div className="relative w-screen max-h-[750px]">
      <SignUpForm />
      <Background />
    </div>
  </div>
}

export default SignUp;
