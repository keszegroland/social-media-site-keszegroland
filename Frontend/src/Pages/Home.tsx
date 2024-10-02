import { useEffect, useState } from "react";
import SideNavbar from "../Components/Home/SideBar/SideNavbar";
import OnePost from "../Components/Home/Post/OnePost";

interface Post {
  publicId: string;
  username: string;
  description: string;
  picture: string;
  creationDate: string;
}

async function getAllPosts() {
  const res: Response = await fetch("/api/post/all");
  const data: Post[] = await res.json();
  return data;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchAllPosts() {
      const data: Post[] = await getAllPosts();
      setPosts(data);
    }
    fetchAllPosts();
  }, [])


  return <div className="flex">
    <SideNavbar />
    <div className="flex flex-1 flex-col items-center justify-center overflow-scroll p-14 md:ml-72">
      <div className="flex w-full max-w-[650px] flex-col items-center justify-center">
        <h2 className="text-left w-full font-bold text-[30px] mb-5">Home page</h2>
        <ul className="flex flex-col flex-1 gap-10 w-[650px]">
          {posts.map((post: Post) => (
            <OnePost key={post.publicId} post={post}></OnePost>
          ))}
        </ul>
      </div>
    </div>
  </div>
}

export default Home;