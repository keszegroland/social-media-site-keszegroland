import { OneMemberProps } from "../../Types";
import MemberImage from "./MemberImage";

function OneMember({ member }: OneMemberProps) {

  return (
    <li className="bg-base-300 px-5 py-6 border-neutral border rounded-2xl flex flex-col items-center gap-5 justify-center min-w-44">
      <MemberImage firstName={member.firstName} lastName={member.lastName} imageColor={member.imageColor} />
      <div className="flex flex-col">
        <p className="font-bold leading-3 text-base md:text-lg md:leading-none">{member.firstName} {member.lastName}</p>
        <p className="text-xs md:text-sm md:leading-3">@{member.username}</p>
      </div>
      <button className="btn bg-neutral text-base-100 rounded-xl hover:bg-base-100 hover:text-neutral text-base border-none btn-sm md:btn-md">Follow</button>
    </li>
  )
}

export default OneMember;