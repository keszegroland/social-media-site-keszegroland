import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileUploaderProps } from "../../Types/PostTypes";

function FileUploader({ onUpload }: FileUploaderProps) {
  const [pictureList, setPictureList] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      onUpload(acceptedFiles[0]);
      setPictureList(acceptedFiles);
      console.log(acceptedFiles);
    }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    }
  });

  return (
    <div className="w-full flex flex-col items-start">
      <label className="text-sm font-bold" htmlFor="addPhotos">Add Photos</label>
      <div {...getRootProps()} className="w-full h-[612px] flex flex-col bg-base-300 border rounded-2xl">
        <input {...getInputProps()} className="cursor-pointer" />
        {
          pictureList.length !== 0 ? (
            <div className="w-full h-full">
              <img src={URL.createObjectURL(pictureList[0])} alt="Uploaded picture preview" className="max-w-full max-h-full"></img>
            </div>
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