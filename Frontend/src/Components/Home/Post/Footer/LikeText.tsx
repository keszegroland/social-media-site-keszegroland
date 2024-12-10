import { LikeTextProps } from "../../../../Types/PostTypes";

function LikeText({ numberOfLikes, usernameOfTheFirstLiker }: LikeTextProps) {
  if (numberOfLikes === 0) {
    return <></>;
  }

  return (
    <p className="text-xs md:text-sm text-left w-full">
      {numberOfLikes === 1 ? (
        <><strong>{numberOfLikes}</strong> like.</>
      ) : (
        <><strong className="text-xs">{usernameOfTheFirstLiker}</strong> and <strong> {numberOfLikes - 1}</strong> other(s) like this.</>
      )}
    </p>
  )
}

export default LikeText;