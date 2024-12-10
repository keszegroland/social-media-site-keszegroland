import { ReactionButtonProps } from "../../../../Types/PostTypes";

function ReactionButton({ status, handleAction, activeImgPath, activeImgText, unActiveImgPath, unActiveImgText }: ReactionButtonProps) {

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input type="checkbox" checked={status} onChange={handleAction} />
      <img className="swap-on" src={activeImgPath} alt={activeImgText}></img>
      <img className="swap-off" src={unActiveImgPath} alt={unActiveImgText}></img>
    </label>
  )
}

export default ReactionButton;