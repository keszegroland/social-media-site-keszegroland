import { PostProps } from "../../../Types/PostTypes";

function BodyPost({ post }: PostProps) {

  return (
    <>
      <div className="flex flex-col w-full items-start justify-center">
        <p className='font-semibold text-sm md:text-base'>{post.description}</p>
        <ul className="flex items-center gap-1 text-sm">
          <li>#art</li>
          <li>#coding</li>
          <li>#challenge</li>
        </ul>
      </div>
      <img
        className="w-[468px] h-[585px] object-cover sm:rounded-[16px]"
        src={post.picture}
        alt="Post Picture"
      />
    </>
  )
}

export default BodyPost;