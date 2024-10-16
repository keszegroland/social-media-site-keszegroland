import { formatDistanceToNowStrict } from "date-fns";
import { PostProps } from "../../../Types";

function HeaderPost({ post }: PostProps) {

  return (
    <div className="flex items-center justify-start gap-2 md:gap-3 w-full">
      <img src="/profile.svg" alt="Profile Picture" className="w-10 h-10 md:w-14 md:h-14"></img>
      <div className="flex flex-col items-start">
        <p className="font-bold text-sm md:text-base leading-tight md:leading-tight">{post.username}</p>
        <p className="text-sm md:text-base leading-tight md:leading-tight">{formatDistanceToNowStrict(post.creationDate)}</p>
      </div>
    </div>
  )
}

export default HeaderPost;