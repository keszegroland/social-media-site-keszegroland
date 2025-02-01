import { formatDistanceToNowStrict } from "date-fns";
import { MemberData, MemberDataProps } from "../../Types/MemberTypes";

function MemberSignature({ memberData }: MemberDataProps) {
  const { badgeColor, firstLetter, lastLetter, username, creationDate, comment }: MemberData = memberData;

  return (
    <div className="flex gap-2 w-full items-center md:items-start justify-start">
      <div
        style={{ backgroundColor: badgeColor }}
        className="w-6 h-6 md:w-8 md:h-8 min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full">
        <p className="font-semibold text-sm text-neutral">{firstLetter}{lastLetter}</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm text-left">{comment}</p>
        <p className="text-xs leading-tight">{formatDistanceToNowStrict(creationDate)} ago</p>
      </div>
    </div>
  )
}

export default MemberSignature;