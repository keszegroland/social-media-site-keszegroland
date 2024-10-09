import { FormEvent, useState } from "react";
import CustomInput from "./CustomInput";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

interface Member {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

async function createMember(newMember: Member) {
  const res = await fetch('/api/member/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMember),
  });
  const data = await res.json();
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
    const newMember: Member = { firstName, lastName, username, password, email };
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
          icon={
            <svg
              height="22px"
              width="22px"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087
                c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512
                c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z"
                  fill="currentColor"
                />
                <path
                  d="M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0
                c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z"
                  fill="currentColor"
                />
              </g>
            </svg>
          }
        />
        <CustomInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={
            <svg
              height="22px"
              width="22px"
              viewBox="0 0 32 32"
            >
              <path d="M0 16q0-3.232 1.28-6.208t3.392-5.12 5.12-3.392 6.208-1.28q3.264 0 6.24 1.28t5.088 3.392 3.392 5.12 1.28
             6.208v6.016q0 2.496-1.76 4.224t-4.224 1.76q-2.272 0-3.936-1.472t-1.984-3.68q-1.952 1.152-4.096 1.152-2.176 0-4-1.056t-2.944-2.912-1.056-4.032q0-3.296
            2.336-5.632t5.664-2.368 5.664 2.368 2.336 5.632v6.016q0 0.8 0.608 1.408t1.408 0.576q0.8 0 1.408-0.576t0.576-1.408v-6.016q0-3.264-1.6-6.016t-4.384-4.352-6.016-1.632-6.016
            1.632-4.384 4.352-1.6 6.016 1.6 6.048 4.384 4.352 6.016 1.6h2.016q0.8 0 1.408 0.608t0.576 1.408-0.576 1.408-1.408 0.576h-2.016q-3.264
            0-6.208-1.248t-5.12-3.424-3.392-5.12-1.28-6.208zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184-1.184 2.816z" fill="currentColor">
              </path>
            </svg>

          }
        />
        <CustomInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={
            <label className="swap">
              <input type="checkbox" onClick={handleShowPassword} />
              <svg
                className="swap-off"
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g>
                  <path d="M10.7302 5.07319C11.1448 5.02485 11.5684 5 11.9999 5C16.6639 5 20.3998 7.90264 21.9999
                  12C21.6053 13.0104 21.0809 13.9482 20.4446 14.7877M6.51956 6.51944C4.47949 7.76406 2.90105 9.69259
                  1.99994 12C3.60008 16.0974 7.33597 19 11.9999 19C14.0375 19 15.8979 18.446 17.4805 17.4804M9.87871
                  9.87859C9.33576 10.4215 8.99994 11.1715 8.99994 12C8.99994 13.6569 10.3431 15 11.9999 15C12.8284
                  15 13.5785 14.6642 14.1214 14.1212" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 4L20 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </svg>

              <svg
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                fill="none"
                className="swap-on"
              >
                <g>
                  <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431
                  10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12C3.60014 7.90264 7.33603 5 12 5C16.664 5 20.3999 7.90264 22 12C20.3999
                  16.0974 16.664 19 12 19C7.33603 19 3.60014 16.0974 2 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
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