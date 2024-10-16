import { useEffect, useState } from "react";
import getToken from "../../../../Utils/getToken";
import SaveButton from "./SaveButton";
import LikeButton from "./LikeButton";
import LikeText from "./LikeText";
import CommentButton from "./CommentButton";
import { FooterPostProps, JWTTokenType, LikeData, MethodType } from "../../../../Types";

async function fetchLikeDataForPost(path: string, token: JWTTokenType): Promise<LikeData> {
  const response = await fetch(`/api/likes/${path}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data: LikeData = await response.json();
  return data;
}

async function handleLikeToggle(method: MethodType, path: string, token: JWTTokenType): Promise<string> {
  const response = await fetch(`/api/likes/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data: string = await response.json();
  return data;
}

function FooterPost({ postPublicId }: FooterPostProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [usernameOfTheFirstLiker, setUsernameOfTheFirstLiker] = useState<string>("");
  const token = getToken();

  useEffect(() => {
    async function getLikeDataForPost() {
      const response = await fetchLikeDataForPost(`data/${postPublicId}`, token);
      const { isPostLiked, usernameOfTheFirstLiker, numberOfLikes } = response;
      setIsLiked(isPostLiked);
      setNumberOfLikes(numberOfLikes);
      setUsernameOfTheFirstLiker(usernameOfTheFirstLiker);
    }
    getLikeDataForPost();
  }, [postPublicId, token])

  async function handleLikeAction() {
    const oppositeOfIsLiked = !isLiked;
    const oppositeOfNumberOfLikes = oppositeOfIsLiked ? (numberOfLikes + 1) : (numberOfLikes - 1);
    setIsLiked(oppositeOfIsLiked);
    setNumberOfLikes(oppositeOfNumberOfLikes);

    try {
      const method = oppositeOfIsLiked ? "POST" : "DELETE";
      await handleLikeToggle(method, `${oppositeOfIsLiked ? "like" : "unlike"}/${postPublicId}`, token);
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