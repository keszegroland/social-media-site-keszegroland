import { useEffect, useState } from "react";
import OnePost from "../Components/Home/Post/OnePost";
import PageHeader from "../Components/PageHeader";
import { JWTTokenType, Post } from "../Types/PostTypes";
import { useAuth } from "../Utils/AuthProvider";

async function getAllPosts(token: JWTTokenType) {
  const res: Response = await fetch("/api/post/all", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data: Post[] = await res.json();
  return data;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchAllPosts() {
      const data: Post[] = await getAllPosts(token);
      setPosts(data);
    }
    fetchAllPosts();
  }, [token])


  return (
    <div className="grid grid-cols-1 gap-4 w-full h-full">
      <div className="h-full w-full md:p-8 mb-32 md:mb-0">
        <div className="w-auto flex flex-col md:gap-5 h-full">
          <PageHeader headerName="Home Feed" />
          <ul className="flex flex-col">
            {posts.map((post) => (
              <OnePost key={post.postPublicId} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home;