import { useState } from "react";
import { Picture } from "../../../../Types/PostTypes";
import CarouselNavigationButtons from "./CarouselNavigationButtons";

interface CarouselProps {
  pictures: Picture[];
}

function Carousel({ pictures }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function showPreviousPicture() {
    setCurrentIndex((previousIndex) => previousIndex === 0 ? pictures.length - 1 : previousIndex - 1);
  }

  function showNextPicture() {
    setCurrentIndex((previousIndex) => previousIndex === pictures.length - 1 ? previousIndex = 0 : previousIndex + 1);
  }

  return (
    <div className="carousel w-full sm:max-h-full 2xl:h-full relative">
      {pictures.length > 0 && (
        <div className="flex flex-col">
          <img className="w-[468px] h-[585px] object-cover sm:rounded-[16px]" src={pictures[currentIndex].picture} alt={pictures[currentIndex].picturePublicId}></img>
          {pictures.length > 1 && <CarouselNavigationButtons onPrevious={showPreviousPicture} onNext={showNextPicture}></CarouselNavigationButtons>}
        </div>
      )
      }
    </div>
  )
}

export default Carousel;