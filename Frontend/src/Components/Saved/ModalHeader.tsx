import { MemberDataProps } from "../../Types/MemberTypes";
import MemberSignature from "./MemberSignature";

function ModalHeader({ memberData }: MemberDataProps) {

  return (
    <div className="flex flex-[1_1_10%] p-4 border-b border-neutral justify-center items-center w-full md:hidden">
      <MemberSignature memberData={memberData} />
      <img src="/threeDot.svg" alt="threeDots" className="cursor-pointer"></img>
    </div>
  )
}

export default ModalHeader;