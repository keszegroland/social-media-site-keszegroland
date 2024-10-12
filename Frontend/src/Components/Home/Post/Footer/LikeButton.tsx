
interface LikeButtonProps {
  isLiked: boolean;
  handleLikeAction: () => void;
}

function LikeButton({ isLiked, handleLikeAction }: LikeButtonProps) {

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input type="checkbox" checked={isLiked} onChange={handleLikeAction} />
      <img className="swap-on" src="/liked.svg" alt="liked"></img>
      <img className="swap-off" src="/like.svg" alt="like"></img>
    </label>
  )
}

export default LikeButton;