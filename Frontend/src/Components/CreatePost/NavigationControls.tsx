import { NavigationControlsProps } from "../../Types/PostTypes";

function NavigationControls({ onPrevious, onNext }: NavigationControlsProps) {

  return (
    <div className="gap-3 w-full p-1">
      <button type="button" className="btn btn-circle btn-sm md:btn-md" onClick={onPrevious}>❮</button>
      <button type="button" className="btn btn-circle btn-sm md:btn-md" onClick={onNext}>❯</button>
    </div>
  )
}

export default NavigationControls;