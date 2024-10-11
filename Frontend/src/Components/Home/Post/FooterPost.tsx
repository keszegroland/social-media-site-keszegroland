import { useEffect, useState } from "react";
import getToken, { JWTTokenType } from "../../../Utils/getToken";
import SaveButton from "./SaveButton";

interface Props {
  postPublicId: string;
};

interface LikeData {
  isPostLiked: boolean;
  usernameOfTheFirstLiker: string;
  numberOfLikes: number;
};

type MethodType = "GET" | "POST" | "DELETE";

async function handleLikeRequest(method: MethodType, path: string, token: JWTTokenType): Promise<LikeData | string> {
  const response = await fetch(`/api/likes/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (method === "GET") {
    return data as LikeData;
  }

  return data as string;
}

function FooterPost({ postPublicId }: Props) {
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

  function handleLikeText(): JSX.Element {
    if (numberOfLikes === 0) {
      return <></>;
    }

    return numberOfLikes === 1 ? (
      <><strong>{numberOfLikes}</strong> like.</>
    ) : (
      <><strong>{usernameOfTheFirstLiker}</strong> and <strong>{numberOfLikes - 1}</strong> other(s) like this.</>
    )
  }


  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <label className="swap swap-rotate cursor-pointer">
            <input type="checkbox" checked={isLiked} onChange={handleLikeAction} />
            <img className="swap-on" src="/liked.svg" alt="liked"></img>
            <img className="swap-off" src="/like.svg" alt="like"></img>
          </label>
          <img className="cursor-pointer" src="/comment.svg" alt="comment"></img>
        </div>
        <SaveButton />
      </div>
      <p className="text-xs md:text-sm text-left w-full pl-1">{handleLikeText()}</p>
    </div>
  );

}

export default FooterPost;