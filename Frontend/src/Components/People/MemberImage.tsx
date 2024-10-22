import { MemberImageProps } from "../../Types";

function MemberImage({ firstName, lastName, imageColor }: MemberImageProps) {

  function getInitials(): string {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  }

  return (
    <div
      style={{ backgroundColor: imageColor }}
      className="w-14 h-14 rounded-full">
      <p className="font-semibold text-3xl">{getInitials()}</p>
    </div>
  )
}

export default MemberImage;