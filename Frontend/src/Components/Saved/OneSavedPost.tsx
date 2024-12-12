import { useState } from "react";
import { SavedPostProps } from "../../Types/PostTypes";
import OpenSavedPost from "./OpenSavedPost";

function OneSavedPost({ savedPost }: SavedPostProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <li className="flex justify-center items-center">
      <img className="w-96 h-96 object-cover rounded-2xl border-neutral border cursor-pointer" src={savedPost.picture} alt="Saved post" onClick={handleOpenModal} />
      {isModalOpen && <OpenSavedPost postPublicId={savedPost.postPublicId} onClose={handleCloseModal} />}
    </li>
  )
}

export default OneSavedPost;