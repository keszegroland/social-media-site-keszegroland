import { useState } from "react";
import CarouselNavigationButtons from "./CarouselNavigationButtons";
import { CarouselProps } from "../../../../Types/PostTypes";

function Carousel({ pictures, divClassName, imgClassName }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function showPreviousPicture() {
    setCurrentIndex((previousIndex) => previousIndex === 0 ? pictures.length - 1 : previousIndex - 1);
  }

  function showNextPicture() {
    setCurrentIndex((previousIndex) => previousIndex === pictures.length - 1 ? previousIndex = 0 : previousIndex + 1);
  }

  return (
    <div className={`carousel ${divClassName}`}>
      {pictures.length > 0 && (
        <div className="flex flex-col relative">
          <img className={`object-cover ${imgClassName}`} src={pictures[currentIndex].picture} alt={pictures[currentIndex].picturePublicId}></img>
          {pictures.length > 1 && <CarouselNavigationButtons onPrevious={showPreviousPicture} onNext={showNextPicture}></CarouselNavigationButtons>}
        </div>
      )
      }
    </div>
  )
}

export default Carousel;