import CommentSection from "./CommentSection";
import ModalFooter from "./ModalFooter";
import { ModalRightSideProps } from "../../../Types/MemberTypes";
import MemberSignature from "../MemberSignature";

function ModalRightSide({ memberData, postPublicId, isNewCommentAdded, onNewCommentCreation }: ModalRightSideProps) {

  return (
    <div className="flex w-full md:w-2/5 md:h-full md:flex-col border-l border-black">
      <div className="hidden md:flex md:p-4 md:border-b md:border-neutral md:w-full">
        <MemberSignature memberData={memberData} />
        <img src="/threeDot.svg" alt="threeDots" className="cursor-pointer"></img>
      </div>
      <CommentSection postPublicId={postPublicId} isNewCommentAdded={isNewCommentAdded} onCommentsFetched={onNewCommentCreation} />
      <ModalFooter postPublicId={postPublicId} onNewCommentCreation={onNewCommentCreation} />
    </div>
  )
}

export default ModalRightSide;