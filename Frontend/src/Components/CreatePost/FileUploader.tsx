import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileUploaderProps } from "../../Types/PostTypes";
import PicturesCarousel from "./PicturesCarousel";

function FileUploader({ onUpload }: FileUploaderProps) {
  const [pictureList, setPictureList] = useState<File[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      onUpload(acceptedFiles[0]);
      setPictureList(acceptedFiles);
      setIsUploaded(true);
    }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    disabled: isUploaded,
  });

  return (
    <div className="w-full flex flex-col items-start">
      <label className="text-sm font-bold" htmlFor="addPhotos">Add Photos</label>
      <div {...getRootProps()} className="w-full min-h-[350px] xl:h-[612px] flex flex-col bg-base-300 border rounded-2xl">
        <input {...getInputProps()} className="cursor-pointer" />
        {
          pictureList.length !== 0 ? (
            <PicturesCarousel pictureList={pictureList} />
          ) : (
            <>
              <img src="./file-upload.svg" alt="file-upload"></img>
              <h1>Drag photo here</h1>
              <p>SVG, PNG, JPEG</p>
              <button>Select From Your Computer</button>
            </>
          )
        }
      </div>
    </div>
  )
}

export default FileUploader;