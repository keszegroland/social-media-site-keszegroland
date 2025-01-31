import { PostProps } from "../../../../Types/PostTypes";
import Carousel from "./Carousel";

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
      <Carousel pictures={post.pictures}></Carousel>
    </>
  )
}

export default BodyPost;