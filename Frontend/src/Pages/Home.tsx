import { useEffect, useState } from "react";
import SideNavbar from "../Components/Home/SideBar/SideNavbar";
import OnePost from "../Components/Home/Post/OnePost";
import HomeHeader from "../Components/Home/HomeHeader";

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


  return <div className="w-full h-full flex">
    <SideNavbar />
    <div className="grid grid-cols-1 gap-4 md:ml-60 lg:ml-64 xl:ml-72 h-full w-full">
      <div className="h-full w-full md:p-8 mb-32">
        <div className="w-auto flex flex-col md:gap-5 h-full">
          <HomeHeader />
          <ul className="flex flex-col">
            {posts.map((post) => (
              <OnePost key={post.publicId} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
}

export default Home;