import data, { Skin } from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FormEvent, useState } from "react";
import { CommentProps, JWTTokenType } from '../../../Types/PostTypes';
import useAuth from '../../../Utils/UseAuth';

async function handleAddNewCommentToPost(token: JWTTokenType, postPublicId: string, comment: string): Promise<string> {
  const response: Response = await fetch(`/api/comments/create/${postPublicId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ comment })
  });
  return await response.json();
}

function CommentInput({ postPublicId, onNewCommentCreation }: CommentProps) {
  const [comment, setComment] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const { token } = useAuth();

  async function addNewCommentToPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleAddNewCommentToPost(token, postPublicId, comment);
    onNewCommentCreation(true);
    setComment("");
    closeEmojiPicker();
  }

  function onEmojiClick() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  function handleEmojiSelect(e: Skin) {
    setComment(prev => prev + e.native);
  }

  function closeEmojiPicker() {
    setShowEmojiPicker(false);
  }

  return (
    <div className="w-full px-4 py-2">
      <form className="flex-1 flex items-center justify-center overflow-hidden" onSubmit={addNewCommentToPost}>
        <div className="cursor-pointer active:opacity-70">
          <img src="/emoji.svg" alt="emoji" onClick={onEmojiClick}></img>
        </div>
        {showEmojiPicker &&
          <div className="absolute bottom-5 left-12 md:top-auto md:left-auto md:bottom-full md:right-16 lg:-left-36 z-50">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} className="mb-2" perLine={window.innerWidth < 640 ? 6 : 8} theme="auto" searchPosition={window.innerWidth < 640 && "none"} previewPosition={window.innerWidth < 640 && "none"} />
          </div>}
        <textarea className="h-5 border-none input rounded-none focus:outline-none text-left text-sm resize-none flex-1" onChange={(e) => setComment(e.target.value)} value={comment} placeholder="Write a comment..." onFocus={closeEmojiPicker} required />
        <button type="submit" className="font-bold text-sm disabled:opacity-40" disabled={comment.trim() === ""}>Send</button>
      </form>
    </div>
  )
}

export default CommentInput; 