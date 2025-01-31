import { CarouselControlProps } from "../../../../Types/PostTypes";

function CarouselNavigationButtons({ onPrevious, onNext }: CarouselControlProps) {

  return (
    <div className="flex absolute justify-between w-full p-2 bg-transparent">
      <button type="button" className="btn btn-circle btn-sm btn-ghost text-white" onClick={onPrevious}>❮</button>
      <button type="button" className="btn btn-circle btn-sm btn-ghost text-white" onClick={onNext}>❯</button>
    </div>
  )
}

export default CarouselNavigationButtons;