import { useEffect, useState } from "react";
import OnePost from "../Components/Home/Post/OnePost";
import HomeHeader from "../Components/Home/HomeHeader";
import { Post } from "../Types";

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


  return (
    <div className="grid grid-cols-1 gap-4 w-full h-full">  
      <div className="h-full w-full md:p-8 mb-32 md:mb-0">
        <div className="w-auto flex flex-col md:gap-5 h-full">
          <HomeHeader headerName="Home Feed" />
          <ul className="flex flex-col">
            {posts.map((post) => (
              <OnePost key={post.publicId} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home;