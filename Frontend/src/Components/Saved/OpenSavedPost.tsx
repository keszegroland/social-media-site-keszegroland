import { useEffect, useState } from "react";
import { JWTTokenType, OpenSavedPostProps, Post } from "../../Types/PostTypes";
import ModalHeader from "./ModalHeader";
import ModalRightSide from "./ModalRightSide";
import { MemberData } from "../../Types/MemberTypes";
import useAuth from "../../Utils/UseAuth";

async function fetchSavedPostDetails(token: JWTTokenType, postPublicId: string): Promise<Post> {
  const response: Response = await fetch(`/api/savedPosts/${postPublicId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return await response.json();
}

function OpenSavedPost({ postPublicId, onClose }: OpenSavedPostProps) {
  const [savedPost, setSavedPost] = useState<Post | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    async function getSavedPostDetails() {
      const data: Post = await fetchSavedPostDetails(token, postPublicId);
      setSavedPost(data);
    }
    getSavedPostDetails();
  }, [token, postPublicId])

  if (!savedPost) {
    return null;
  }

  const { memberImageColor, memberFirstName, memberLastName, username, creationDate } = savedPost;
  const memberData: MemberData = { badgeColor: memberImageColor, firstLetter: memberFirstName.charAt(0), lastLetter: memberLastName.charAt(0), username, creationDate };

  return (
    <div className="fixed justify-center items-center inset-0 bg-black bg-opacity-40 z-50">
      <div className="modal-box flex flex-col max-w-full w-4/5 p-0 overflow-hidden rounded-2xl md:w-3/5 md:h-full md:flex-row min-w-[300px]">
        <ModalHeader memberData={memberData} />
        <div className="flex flex-[1_1_80%] md:h-full overflow-hidden">
          <img className="w-full h-full object-cover" src={savedPost?.picture}></img>
        </div>
        <ModalRightSide memberData={memberData} postPublicId={savedPost.postPublicId} />
      </div>
      <div className="modal-action mt-0 absolute top-1 right-7" onClick={onClose}>
        <button className="btn btn-sm btn-circle btn-ghost btn-active text-base-100 absolute right-2 top-2 text-xl">
          ✕
        </button>
      </div>
    </div>
  )
}

export default OpenSavedPost;