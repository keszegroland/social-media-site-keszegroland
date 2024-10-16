import { LikeTextProps } from "../../../../Types";

function LikeText({ numberOfLikes, usernameOfTheFirstLiker }: LikeTextProps) {
  if (numberOfLikes === 0) {
    return <></>;
  }

  return (
    <p className="text-xs md:text-sm text-left w-full pl-1">
      {numberOfLikes === 1 ? (
        <><strong>{numberOfLikes}</strong> like.</>
      ) : (
        <><strong>{usernameOfTheFirstLiker}</strong > and < strong > {numberOfLikes - 1}</strong > other(s) like this.</>
      )}
    </p>
  )
}

export default LikeText;