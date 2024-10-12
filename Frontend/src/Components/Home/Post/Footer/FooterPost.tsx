import { useEffect, useState } from "react";
import getToken from "../../../../Utils/getToken";
import SaveButton from "./SaveButton";
import LikeButton from "./LikeButton";
import LikeText from "./LikeText";
import CommentButton from "./CommentButton";
import { FooterPostProps, JWTTokenType, LikeData, MethodType } from "../../../../Types";

async function handleLikeRequest(method: MethodType, path: string, token: JWTTokenType): Promise<LikeData | string> {
  const response = await fetch(`/api/likes/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data: LikeData | string = await response.json();

  if (method === "GET") {
    return data as LikeData;
  }

  return data as string;
}

function FooterPost({ postPublicId }: FooterPostProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [usernameOfTheFirstLiker, setUsernameOfTheFirstLiker] = useState<string>("");
  const token = getToken();

  useEffect(() => {
    async function getLikeDataForPost() {
      const response = await handleLikeRequest("GET", `data/${postPublicId}`, token);
      if (typeof response === "object" && "isPostLiked" in response && "usernameOfTheFirstLiker" in response && "numberOfLikes" in response) {
        const { isPostLiked, usernameOfTheFirstLiker, numberOfLikes } = response;
        setIsLiked(isPostLiked);
        setNumberOfLikes(numberOfLikes);
        setUsernameOfTheFirstLiker(usernameOfTheFirstLiker);
      }
    }
    getLikeDataForPost();
  }, [postPublicId, token])

  async function handleLikeAction() {
    const updatedIsLiked = !isLiked;
    const updatedNumberOfLikes = updatedIsLiked ? (numberOfLikes + 1) : (numberOfLikes - 1);
    setIsLiked(updatedIsLiked);
    setNumberOfLikes(updatedNumberOfLikes);

    try {
      const method = updatedIsLiked ? "POST" : "DELETE";
      await handleLikeRequest(method, `${updatedIsLiked ? "like" : "unlike"}/${postPublicId}`, token);
    } catch (error) {
      console.error(error);
      setIsLiked(isLiked);
      setNumberOfLikes(numberOfLikes);
    }
  }

  return (
    <div className="fle flex-col x w-full">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <LikeButton isLiked={isLiked} handleLikeAction={handleLikeAction} />
          <CommentButton />
        </div>
        <SaveButton />
      </div>
      <LikeText numberOfLikes={numberOfLikes} usernameOfTheFirstLiker={usernameOfTheFirstLiker} />
    </div>
  )

}

export default FooterPost;