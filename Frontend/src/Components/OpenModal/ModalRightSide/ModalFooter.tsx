import { CommentProps } from "../../../Types/PostTypes";
import FooterPost from "../../Home/Post/Footer/FooterPost";
import CommentInput from "./CommentInput";

function ModalFooter({ postPublicId, onNewCommentCreation }: CommentProps) {

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full py-2 px-4 border-t border-neutral items-start justify-start">
        <FooterPost postPublicId={postPublicId} />
      </div>
      <div className="hidden md:relative md:flex md:border-t md:border-neutral md:w-full">
        <CommentInput postPublicId={postPublicId} onNewCommentCreation={onNewCommentCreation}></CommentInput>
      </div>
    </div>
  )
}

export default ModalFooter;