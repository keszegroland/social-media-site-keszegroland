import { FormEvent, useState } from "react";
import CustomInput from "./CustomInput";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { JwtResponse, MemberAuth } from "../../Types/MemberTypes";
import { useAuth } from "../../Utils/AuthProvider";

async function signInWithMember(member: MemberAuth): Promise<JwtResponse> {
  const res = await fetch('/api/member/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(member),
  });
  const data: JwtResponse = await res.json();
  return data;
}

function SignInForm() {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const { setToken } = useAuth();

  async function handleMemberSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const member: MemberAuth = { username, password };
    const data: JwtResponse = await signInWithMember(member);
    setToken(data.jwt);
    navigate('/home');
  }

  function handleShowPassword() {
    setShowPassword(prev => !prev);
  }

  return (
    <div className="w-full h-full sm:w-auto sm:h-auto bg-clip-padding backdrop-blur-lg bg-opacity-0 relative z-10 bg-base-300 p-2 sm:shadow-custom-shadow sm:border sm:border-solid sm:border-black sm:rounded-2xl border-opacity-20 sm:border-opacity-5 sm:min-w-[327px] sm:m-4 sm:bg-opacity-100 sm:backdrop-blur-none min-w-[300px]">
      <form className="flex-col pt-5 p-6" onSubmit={handleMemberSignIn}>
        <h1 className="text-[38px] sm:text-[45px] text-left font-bold">Sign in</h1>
        <p className="text-[14px] sm:text-[15px] text-left">Please enter your details to access your account.</p>
        <CustomInput
          label='Username'
          type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          icon={<img src="/person.svg" alt="person"></img>}
        />
        <CustomInput
          label='Password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={
            <label className="swap">
              <input type="checkbox" onClick={handleShowPassword} />
              <img className="swap-off" src="/closedEye.svg" alt="closed-eye"></img>
              <img className="swap-on" src="/eye.svg" alt="eye"></img>
            </label>
          }
        />
        <button
          className="btn bg-neutral btn-block border-0 rounded-2xl font-bold text-base mt-6 mb-3 sm:mt-8 sm:mb-5 text-base-100 hover:bg-base-100 hover:text-neutral"
          type="submit"
        >
          Continue
        </button>
        <div className="flex items-center">
          <hr className="flex flex-1 border-neutral-400" />
          <p className="text-[14px] mr-3 ml-3">OR</p>
          <hr className="flex flex-1 border-neutral-400" />
        </div>
        <button
          className="btn bg-neutral btn-block border-0 rounded-2xl font-bold text-base mt-3 mb-3 sm:mt-5 sm:mb-3 text-base-100 hover:bg-base-100 hover:text-neutral"
          type="submit"
        >
          Continue with Google
        </button>
        <p className="text-[14px] sm:text-[15px] text-left">Don't have an account? <Link to={"/signup"} className="font-bold">Sign up</Link></p>
      </form>
    </div>
  )
}

export default SignInForm;