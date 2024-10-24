import Background from "../Components/Background/Background";
import AuthPageFooter from "../Components/FormComponents/AuthPageFooter";
import FormHeader from "../Components/FormComponents/FormHeader";
import SignInForm from "../Components/FormComponents/SignInForm";

function SignIn() {

  return (
    <div className="flex flex-col w-full h-full bg-base-300 sm:bg-base-100">
      <FormHeader />
      <div className="relative flex-1 w-full">
        <div className="relative w-screen max-h-[750px]">
          <div className="flex flex-col">
            <SignInForm />
            <AuthPageFooter />
          </div>
          <Background />
        </div>
      </div>
    </div >
  )
}

export default SignIn;