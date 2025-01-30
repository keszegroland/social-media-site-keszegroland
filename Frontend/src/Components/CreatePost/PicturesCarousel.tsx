import { useState } from "react";
import NavigationControls from "./NavigationControls";
import { PictureCarouselProps } from "../../Types/PostTypes";

function PicturesCarousel({ pictureList }: PictureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function showPreviousPicture() {
    setCurrentIndex((previousIndex) => previousIndex === 0 ? pictureList.length - 1 : previousIndex - 1);
  }

  function showNextPicture() {
    setCurrentIndex((previousIndex) => previousIndex === pictureList.length - 1 ? previousIndex = 0 : previousIndex + 1);
  }

  return (
    <div className="carousel w-full sm:max-h-full 2xl:h-full relative p-5">
      {pictureList.length > 0 && (
        <div className="carousel-item w-full h-full flex flex-col items-center">
          <img src={URL.createObjectURL(pictureList[currentIndex])} alt={pictureList[currentIndex].name} className="w-auto h-5/6 rounded-2xl"></img>
          <p className="text-sm">{pictureList[currentIndex].name}</p>
          {pictureList.length > 1 && <NavigationControls onPrevious={showPreviousPicture} onNext={showNextPicture}></NavigationControls>}
        </div>
      )}
    </div>
  )
}

export default PicturesCarousel;