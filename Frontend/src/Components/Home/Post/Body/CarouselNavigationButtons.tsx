import { CarouselControlProps } from "../../../../Types/PostTypes";

function CarouselNavigationButtons({ onPrevious, onNext }: CarouselControlProps) {

  return (
    <div className="flex absolute justify-between w-full p-2">
      <button type="button" className="btn btn-circle btn-sm bg-transparent text-white border-white pr-0.5" onClick={onPrevious}>❮</button>
      <button type="button" className="btn btn-circle btn-sm bg-transparent text-white border-white pl-0.5" onClick={onNext}>❯</button>
    </div>
  )
}

export default CarouselNavigationButtons;