import { useEffect, useState } from "react";
import getToken, { JWTTokenType } from "../../../Utils/getToken";

type MethodType = "GET" | "POST" | "DELETE";

async function handleLikeRequest(method: MethodType, path: string, token: JWTTokenType) {
  const response = await fetch(`/api/likes/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return await response.json();
}

interface Props {
  postPublicId: string;
}

function FooterPost({ postPublicId }: Props) {
  const [likeState, setLikeState] = useState<boolean>(false);
  const token = getToken();

  async function handleLikeAction(action: "like" | "unlike") {
    const isLiking = action === "like";
    setLikeState(isLiking);

    try {
      const method = isLiking ? "POST" : "DELETE";
      await handleLikeRequest(method, `${action}/${postPublicId}`, token);
    } catch (error) {
      console.error(error);
      setLikeState(!isLiking);
    }
  }

  useEffect(() => {
    async function getLikesForPosts() {
      const likes: string[] = await handleLikeRequest("GET", "", token);
      setLikeState(likes.includes(postPublicId));
    }
    getLikesForPosts();
  }, [token, postPublicId])

  function handleLikeMechanism() {
    if (likeState) {
      handleLikeAction("unlike");
    } else {
      handleLikeAction("like");
    }
  }

  return (
    <div className="flex w-full justify-between items-center">
      <label className="swap swap-rotate cursor-pointer">
        <input type="checkbox" checked={likeState} onChange={handleLikeMechanism} />
        <img className="swap-on" src="/liked.svg" alt="liked"></img>
        <img className="swap-off" src="/like.svg" alt="like"></img>
      </label>
      <label className="swap swap-rotate cursor-pointer">
        <input type="checkbox" />
        <img className="swap-on" src="/saved.svg" alt="Saved"></img>
        <img className="swap-off" src="/save.svg" alt="Save"></img>
      </label>
    </div>
  )
}

export default FooterPost;