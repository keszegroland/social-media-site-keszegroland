import { PostProps } from "../../../Types/PostTypes";

function BodyPost({ post }: PostProps) {

  function formatTags() {
    if (!post.tags) {
      return <p></p>;
    }
    return post.tags.split(", ").map(tag => <li key={tag}>#{tag.toLowerCase()}</li>);
  }

  return (
    <>
      <div className="flex flex-col w-full items-start justify-center">
        <p className='font-semibold text-sm md:text-base'>{post.description}</p>
        <ul className="flex items-center gap-1 text-sm">{formatTags()}</ul>
      </div>
      <img
        className="w-[468px] h-[585px] object-cover sm:rounded-[16px]"
        src={post.picture}
        alt={post.description || "Post Picture"}
      />
    </>
  )
}

export default BodyPost;