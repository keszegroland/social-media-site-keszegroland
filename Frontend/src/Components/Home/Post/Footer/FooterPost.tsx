import { useEffect, useState } from "react";
import LikeText from "./LikeText";
import CommentButton from "./CommentButton";
import { EndpointType, FooterPostProps, JWTTokenType, LikeData, MethodType } from "../../../../Types/PostTypes";
import ReactionButton from "./ReactionButton";
import useAuth from "../../../../Utils/UseAuth";

async function fetchLikeDataForPost(postPublicId: string, token: JWTTokenType): Promise<LikeData> {
  const response: Response = await fetch(`/api/likes/data/${postPublicId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return await response.json();
}

async function fetchSaveDataForPost(postPublicId: string, token: JWTTokenType): Promise<boolean> {
  const response: Response = await fetch(`/api/savedPosts/data/${postPublicId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return await response.json();
}

async function handleReactionToggle(method: MethodType, endpoint: EndpointType, token: JWTTokenType): Promise<string> {
  const response: Response = await fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return await response.json();
}

function FooterPost({ postPublicId }: FooterPostProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [usernameOfTheFirstLiker, setUsernameOfTheFirstLiker] = useState<string>("");
  const { token } = useAuth();

  useEffect(() => {
    async function getLikeDataForPost() {
      const response = await fetchLikeDataForPost(postPublicId, token);
      const { isPostLiked, usernameOfTheFirstLiker, numberOfLikes } = response;
      setIsLiked(isPostLiked);
      setNumberOfLikes(numberOfLikes);
      setUsernameOfTheFirstLiker(usernameOfTheFirstLiker);
    }

    async function getSaveDataForPost() {
      const response = await fetchSaveDataForPost(postPublicId, token);
      setIsSaved(response);
    }

    getLikeDataForPost();
    getSaveDataForPost();
  }, [postPublicId, token])

  async function handleLikeAction() {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setNumberOfLikes((prevNum) => (isLiked ? prevNum - 1 : prevNum + 1));

    try {
      await handleReactionToggle(isLiked ? "DELETE" : "POST", `/api/likes/${isLiked ? "unlike" : "like"}/${postPublicId}`, token);
    } catch (error) {
      console.error(error);
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setNumberOfLikes((prevNum) => (isLiked ? prevNum + 1 : prevNum - 1));
    }
  }

  async function handleSaveAction() {
    try {
      setIsSaved((prevIsSaved) => !prevIsSaved);
      await handleReactionToggle(isSaved ? "DELETE" : "POST", `/api/savedPosts/${isSaved ? "unSave" : "save"}/${postPublicId}`, token);
    } catch (error) {
      console.error(error);
      setIsSaved((prevIsSaved) => !prevIsSaved);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <ReactionButton status={isLiked} handleAction={handleLikeAction} activeImgPath="/liked.svg" activeImgText="liked" unActiveImgPath="/like.svg" unActiveImgText="like" />
          <CommentButton postPublicId={postPublicId} />
        </div>
        <ReactionButton status={isSaved} handleAction={handleSaveAction} activeImgPath="/saved.svg" activeImgText="saved" unActiveImgPath="/save.svg" unActiveImgText="save" />
      </div>
      <LikeText numberOfLikes={numberOfLikes} usernameOfTheFirstLiker={usernameOfTheFirstLiker} />
    </div>
  )

}

export default FooterPost;