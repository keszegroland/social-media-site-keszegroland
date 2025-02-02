import { useState } from "react";
import PostModal from "../../../OpenModal/PostModal";
import { CommentButtonProps } from "../../../../Types/PostTypes";

function CommentButton({ postPublicId }: CommentButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <img className="cursor-pointer" src="/comment.svg" alt="comment" onClick={() => setIsModalOpen(true)}></img >
      {isModalOpen && <PostModal postPublicId={postPublicId} onClose={() => setIsModalOpen(false)}></PostModal>}
    </>
  )
}

export default CommentButton;