import MemberSignature from "./MemberSignature";
import CommentSection from "./CommentSection";
import { useState } from "react";
import ModalFooter from "./ModalFooter";
import { ModalRightSideProps } from "../../Types/MemberTypes";

function ModalRightSide({ memberData, postPublicId }: ModalRightSideProps) {
  const [isNewCommentAdded, setIsNewCommentAdded] = useState<boolean>(false);

  function handleNewCommentCreation(isNewCommentAdded: boolean) {
    setIsNewCommentAdded(isNewCommentAdded);
  }

  return (
    <div className="flex w-full md:w-2/5 md:h-full md:flex-col">
      <div className="hidden md:flex md:p-4 md:border-b md:border-neutral md:w-full">
        <MemberSignature memberData={memberData} />
        <img src="/threeDot.svg" alt="threeDots" className="cursor-pointer"></img>
      </div>
      <CommentSection postPublicId={postPublicId} isNewCommentAdded={isNewCommentAdded} onCommentsFetched={() => setIsNewCommentAdded(false)} />
      <ModalFooter postPublicId={postPublicId} onNewCommentCreation={handleNewCommentCreation} />
    </div>
  )
}

export default ModalRightSide;