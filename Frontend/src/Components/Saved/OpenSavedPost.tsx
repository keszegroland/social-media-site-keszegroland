import { useEffect, useState } from "react";
import { JWTTokenType, OpenSavedPostProps, Post } from "../../Types/PostTypes";
import ModalHeader from "./ModalHeader";
import ModalRightSide from "./ModalRightSide";
import { useAuth } from "../../Utils/AuthProvider";
import { MemberData } from "../../Types/MemberTypes";

async function fetchSavedPostDetails(token: JWTTokenType, postPublicId: string): Promise<Post> {
  const response: Response = await fetch(`/api/saves/${postPublicId}`, {
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
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" style={{ justifyContent: "unset" }}>
        {savedPost && <div className="modal-box flex flex-col max-w-full w-4/5 p-0 overflow-hidden rounded-2xl md:w-3/5 md:h-full md:flex-row min-w-[300px]">
          <ModalHeader memberData={memberData} />
          <div className="flex flex-[1_1_80%] md:h-full overflow-hidden">
            <img className="w-full h-full object-cover" src={savedPost?.picture}></img>
          </div>
          <ModalRightSide memberData={memberData} postPublicId={savedPost.postPublicId} />
        </div>}
        <div className="modal-action mt-0 absolute top-1 right-7">
          <label htmlFor="my_modal_6" onClick={onClose} className="btn btn-sm btn-circle btn-ghost btn-active text-base-100 absolute right-2 top-2 text-xl">✕</label>
        </div>
      </div>
    </>
  )
}

export default OpenSavedPost;