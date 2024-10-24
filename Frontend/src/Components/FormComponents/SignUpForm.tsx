import { FormEvent, useState } from "react";
import CustomInput from "./CustomInput";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { NewMember } from "../../Types";

async function createMember(newMember: NewMember): Promise<string> {
  const res = await fetch('/api/member/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMember),
  });
  const data: string = await res.json();
  return data;
}

function SignUpForm() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  async function handleCreateMember(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newMember: NewMember = { firstName, lastName, username, password, email };
    await createMember(newMember);
    navigate('/signin');
  }

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="sm:w-auto sm:h-auto bg-clip-padding backdrop-blur-lg bg-opacity-0 z-10 bg-base-300 p-2 sm:shadow-custom-shadow sm:border sm:border-solid sm:border-black sm:rounded-2xl border-opacity-20 sm:border-opacity-5 sm:min-w-[327px] sm:m-4 sm:bg-opacity-100 sm:backdrop-blur-none min-w-[300px]">
      <form className="flex-col pt-5 p-6" onSubmit={handleCreateMember}>
        <h1 className="text-[38px] sm:text-[45px] text-left font-bold">Sign up</h1>
        <p className="text-[14px] sm:text-[15px] text-left">Create your account in seconds.</p>
        <div className="flex gap-2 max-w-[340px]">
          <CustomInput
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <CustomInput
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <CustomInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          icon={<img src="/person.svg" alt="person"></img>}
        />
        <CustomInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<img src="/atSign.svg" alt="at sign"></img>}
        />
        <CustomInput
          label="Password"
          type={showPassword ? "text" : "password"}
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
          className="btn bg-neutral btn-block border-0 outline-none rounded-2xl cursor-pointer font-bold text-base mt-6 mb-3 text-base-100 hover:bg-base-100 hover:text-neutral sm:mt-8 sm:mb-3"
          type="submit"
        >
          Create an account
        </button>
        <p className="text-[14px] sm:text-[15px] text-left">Already have an account? <Link to={"/signin"} className="font-bold">Sign in</Link></p>
      </form>
    </div>
  )
}

export default SignUpForm;