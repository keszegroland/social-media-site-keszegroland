import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  icon?: JSX.Element;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({ label, type, value, icon, onChange }: InputFieldProps) {

  return (<div className="relative w-full h-14 mt-5">
    <input
      className="input peer pt-2 rounded-2xl focus:outline-none w-full text-left h-14"
      type={type}
      value={value}
      placeholder=""
      required
      onChange={onChange}
    />
    {icon && <div className="absolute right-4 top-4 w-6 h-6">{icon}</div>}
    <label className="absolute left-4 top-1 text-gray-400 pointer-events-none text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all peer-focus:top-1 peer-focus:text-sm">
      {label}
    </label>
  </div>
  );
}

export default CustomInput;