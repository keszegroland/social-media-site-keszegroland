import { useEffect, useState } from "react";
import { JWTTokenType, SavedPost } from "../Types/PostTypes";
import PageHeader from "../Components/PageHeader";
import OpenModal from "../Components/Saved/OneSavedPost";
import useAuth from "../Utils/UseAuth";

async function getSavedPosts(token: JWTTokenType): Promise<SavedPost[]> {
  const response: Response = await fetch("/api/savedPosts/my-savedPosts", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return await response.json();
}

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchSavedPosts() {
      const response: SavedPost[] = await getSavedPosts(token);
      setSavedPosts(response);
    }
    fetchSavedPosts();
  }, [token])

  return (
    <div className="grid grid-cols-1 w-full h-full">
      <div className="h-full w-full md:py-8 lg:px-20 xl:px-28">
        <div className="w-auto h-full flex flex-col md:gap-5">
          <PageHeader headerName="Saved Posts" />
          <div className="h-full w-full p-4 lg:pb-8 mb-36 md:mb-0 min-w-80">
            <ul className="w-full grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {savedPosts.map((savedPost) => (
                <OpenModal key={savedPost.postPublicId} savedPost={savedPost} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedPosts;