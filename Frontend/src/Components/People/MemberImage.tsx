import { MemberImageProps } from "../../Types";

function MemberImage({ firstName, lastName, imageColor }: MemberImageProps) {

  function getInitials(): string {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  }

  return (
    <div
      style={{ backgroundColor: imageColor }}
      className="w-12 h-12 md:w-14 md:h-14 rounded-full">
      <p className="font-semibold text-xl md:text-2xl text-neutral">{getInitials()}</p>
    </div>
  )
}

export default MemberImage;