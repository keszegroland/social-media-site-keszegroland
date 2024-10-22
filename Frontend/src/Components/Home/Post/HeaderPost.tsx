import { formatDistanceToNowStrict } from "date-fns";
import { PostProps } from "../../../Types";
import MemberImage from "../../People/MemberImage";

function HeaderPost({ post }: PostProps) {

  return (

    <div className="flex items-center justify-start gap-2 md:gap-3 w-full">
      <MemberImage firstName={post.memberFirstName} lastName={post.memberLastName} imageColor={post.memberImageColor} />
      <div className="flex flex-col items-start">
        <p className="font-bold text-sm md:text-base leading-tight md:leading-tight">{post.username}</p>
        <p className="text-sm md:text-base leading-tight md:leading-tight">{formatDistanceToNowStrict(post.creationDate)}</p>
      </div>
    </div>
  )
}

export default HeaderPost;