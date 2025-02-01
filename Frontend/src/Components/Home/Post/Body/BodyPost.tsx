import { PostProps } from "../../../../Types/PostTypes";
import Carousel from "./Carousel";

function BodyPost({ post }: PostProps) {

  function formatTags() {
    if (!post.tags) {
      return <></>;
    }
    return post.tags.split(", ").map(tag => <li key={tag}>#{tag.toLowerCase()}</li>);
  }

  return (
    <>
      <div className="flex flex-col w-full items-start justify-center">
        <p className='font-semibold text-sm md:text-base'>{post.description}</p>
        <ul className="flex items-center gap-1 text-sm">{formatTags()}</ul>
      </div>
      <Carousel pictures={post.pictures} divClassName="w-full sm:max-h-full 2xl:h-full" pClassName="top-2" imgClassName="w-[468px] h-[585px] sm:rounded-[16px]"></Carousel>
    </>
  )
}

export default BodyPost;