import { CarouselControlProps } from "../../../../Types/PostTypes";

function CarouselNavigationButtons({ onPrevious, onNext }: CarouselControlProps) {

  return (
    <div className="flex absolute justify-between w-full p-2">
      <button type="button" className="btn btn-sm bg-transparent text-white" onClick={onPrevious}>❮</button>
      <button type="button" className="btn btn-sm bg-transparent text-white" onClick={onNext}>❯</button>
    </div>
  )
}

export default CarouselNavigationButtons;