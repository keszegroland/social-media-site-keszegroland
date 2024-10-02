import Background from "../Components/Background/Background";
import Header from "../Components/FormComponents/Header";
import SignInForm from "../Components/FormComponents/SignInForm";

function SignIn() {

  return (
    <div className="relative w-screen h-screen bg-base-300 sm:bg-base-100">
      <Header />
      <div className="relative w-screen max-h-[750px]">
        <SignInForm />
        <Background />
      </div>
    </div >
  )
}

export default SignIn;