import Background from "../Components/Background/Background";
import FormHeader from "../Components/FormComponents/FormHeader";
import SignUpForm from "../Components/FormComponents/SignUpForm";

function SignUp() {

  return (
    <div className="flex flex-col w-full h-full bg-base-300 sm:bg-base-100">
      <FormHeader />
      <div className="relative flex-1 w-full">
        <div className="relative w-screen max-h-[750px]">
          <SignUpForm />
          <Background />
        </div>
      </div>
    </div >
  )
}

export default SignUp;
