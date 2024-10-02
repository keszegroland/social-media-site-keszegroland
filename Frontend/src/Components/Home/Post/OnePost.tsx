import { formatDistanceToNowStrict } from 'date-fns';

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
    <div className="flex flex-col flex-1 rounded-[16px] p-5 min-w-[400px] md:w-4/5 bg-base-300">
      <div className="flex items-center justify-start gap-3 w-full">
        <img src="/profile.svg" alt="Profile Picture"></img>
        <div className="flex flex-col items-start">
          <p className="font-bold">{post.username}</p>
          <p>{formatDistanceToNowStrict(post.creationDate)}</p>
        </div>
      </div>
      <div className="flex flex-col py-5 w-full items-start">
        <p className='font-semibold'>{post.description}</p>
        <ul className="flex gap-1 mt-2 text-sm">
          <li>#art</li>
          <li>#coding</li>
          <li>#challenge</li>
        </ul>
      </div>
      <img
        className="w-[450px] h-[550px] object-cover mb-5"
        src={post.picture}
        alt="Post Picture"
      />
      <div className="flex w-full justify-between items-center">
        <label className="swap swap-rotate cursor-pointer">
          <input type="checkbox" />
          <img className="swap-on" src="/liked.svg" alt="liked"></img>
          <img className="swap-off" src="/like.svg" alt="like"></img>
        </label>
        <label className="swap swap-rotate cursor-pointer">
          <input type="checkbox" />
          <img className="swap-on" src="/saved.svg" alt="Saved"></img>
          <img className="swap-off" src="/save.svg" alt="Save"></img>
        </label>
      </div>
    </div>
  )
}

export default OnePost;