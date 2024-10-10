import BodyPost from './BodyPost';
import FooterPost from './FooterPost';
import HeaderPost from './HeaderPost';

interface Post {
  publicId: string;
  username: string;
  description: string;
  picture: string;
  creationDate: string;
}

interface Prop {
  post: Post
}

function OnePost({ post }: Prop) {

  return (
    <div className="flex flex-col px-2 py-5 sm:p-4 sm:rounded-2xl md:p-5 bg-base-300 w-full border-solid border-y gap-5">
      <HeaderPost post={post} />
      <BodyPost post={post} />
      <FooterPost postPublicId={post.publicId} />
    </div>
  )
}

export default OnePost;