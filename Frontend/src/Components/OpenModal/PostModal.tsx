import { useEffect, useState } from "react";
import { JWTTokenType, OpenSavedPostProps, Post } from "../../Types/PostTypes";
import ModalHeader from "./ModalHeader";
import ModalRightSide from "./ModalRightSide/ModalRightSide";
import { MemberData } from "../../Types/MemberTypes";
import useAuth from "../../Utils/UseAuth";
import Carousel from "../Home/Post/Body/Carousel";
import CommentInput from "./ModalRightSide/CommentInput";

async function fetchSavedPostDetails(token: JWTTokenType, postPublicId: string): Promise<Post> {
  const response: Response = await fetch(`/api/savedPosts/${postPublicId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return await response.json();
}

function PostModal({ postPublicId, onClose }: OpenSavedPostProps) {
  const [savedPost, setSavedPost] = useState<Post | null>(null);
  const [isNewCommentAdded, setIsNewCommentAdded] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    async function getSavedPostDetails() {
      const data: Post = await fetchSavedPostDetails(token, postPublicId);
      setSavedPost(data);
    }
    getSavedPostDetails();
  }, [token, postPublicId])

  function handleNewCommentCreation(isNewCommentAdded: boolean) {
    setIsNewCommentAdded(isNewCommentAdded);
  }

  if (!savedPost) {
    return null;
  }

  const { memberImageColor, memberFirstName, memberLastName, username, creationDate } = savedPost;
  const memberData: MemberData = { badgeColor: memberImageColor, firstLetter: memberFirstName.charAt(0), lastLetter: memberLastName.charAt(0), username, creationDate };

  return (
    <div className="fixed justify-center items-center inset-0 bg-black bg-opacity-40 z-50">
      <div className="modal-box flex flex-col max-w-full w-4/5 p-0 overflow-hidden rounded-2xl md:w-3/5 md:h-full md:flex-row min-w-[300px]">
        <ModalHeader memberData={memberData} />
        <Carousel pictures={savedPost.pictures} divClassName="flex flex-[1_1_80%] md:h-full overflow-hidden" pClassName="top-5" imgClassName="w-full h-full"></Carousel>
        <div className="md:hidden w-full">
          <CommentInput postPublicId={postPublicId} onNewCommentCreation={handleNewCommentCreation} />
        </div>
        <ModalRightSide memberData={memberData} postPublicId={savedPost.postPublicId} isNewCommentAdded={isNewCommentAdded} onNewCommentCreation={handleNewCommentCreation} />
      </div>
      <div className="modal-action mt-0 absolute top-1 right-7" onClick={onClose}>
        <button className="btn btn-sm btn-circle btn-ghost btn-active text-base-100 absolute right-2 top-2 text-xl">
          ✕
        </button>
      </div>
    </div>
  )
}

export default PostModal;