import { InputFieldProps } from "../../Types/MemberTypes";

function CustomInput({ label, type, value, icon, onChange }: InputFieldProps) {

  return (
    <div className="relative mt-4 w-8/9 sm:w-full sm:h-14 sm:mt-5">
      <input
        className="input peer rounded-2xl focus:outline-none w-full text-left h-12 sm:h-14"
        type={type}
        value={value}
        placeholder=""
        required
        onChange={onChange}
      />
      {icon && <div className="absolute right-4 w-5 h-5 sm:top-4 sm:w-6 sm:h-6">{icon}</div>}
      <label className="absolute left-4 top-0 text-gray-400 pointer-events-none text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-3 transition-all peer-focus:top-0 peer-focus:text-sm sm:peer-focus:top-0 sm:peer-placeholder-shown:top-4">
        {label}
      </label>
    </div>
  );
}

export default CustomInput;