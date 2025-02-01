import { useEffect, useState } from "react";
import { Comment, CommentSectionProps, JWTTokenType } from "../../../Types/PostTypes";
import useAuth from "../../../Utils/UseAuth";
import MemberSignature from "../MemberSignature";

async function fetchCommentsForPost(token: JWTTokenType, postPublicId: string): Promise<Comment[]> {
  const response: Response = await fetch(`/api/comments/${postPublicId}/all`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return await response.json();
}

function CommentSection({ postPublicId, isNewCommentAdded, onCommentsFetched }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    async function getCommentsForPost() {
      const data: Comment[] = await fetchCommentsForPost(token, postPublicId);
      setComments(data);
      onCommentsFetched();
    }
    getCommentsForPost();
  }, [token, postPublicId, isNewCommentAdded, onCommentsFetched])

  return (
    <div className="hidden md:flex md:flex-[1_1_70%] md:w-full md:justify-start md:items-start md:p-4 md:scrollbar-thin md:scrollbar-thumb-[#2E282A] md:scrollbar-track-[#ede6d4] md:overflow-y-scroll">
      <ul className="flex flex-col gap-5 w-full items-start">
        {comments.map((comment) => (
          <li key={comment.commentPublicId} className="flex items-start">
            <MemberSignature memberData={{ badgeColor: comment.member.imageColor, firstLetter: comment.member.firstName.charAt(0), lastLetter: comment.member.lastName.charAt(0), username: comment.member.username, creationDate: comment.creationDate, comment: comment.comment }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection;