import { FormEvent, useState } from "react";
import FileUploader from "./FileUploader";
import { JWTTokenType, NewPost, Picture } from "../../Types/PostTypes";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "../../Utils/UseAuth";

async function createNewPost(post: NewPost, token: JWTTokenType): Promise<string> {
  const res = await fetch("/api/post/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(post)
  });

  return res.json();
}

function NewPostForm() {
  const [description, setDescription] = useState<string>("");
  const [base64PictureList, setBase64PictureList] = useState<Picture[]>([]);
  const [tags, setTags] = useState<string>("");
  const { token } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  function handleCreateNewPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const post: NewPost = { description, pictures: base64PictureList, tags };
    createNewPost(post, token);
  }

  async function handlePictureUpload(pictureObjList: File[]) {
    try {
      const base64Strings = await Promise.all(pictureObjList.map(getBase64));
      setBase64PictureList(
        base64Strings.map(base64String => ({ picture: base64String.split(',')[1] })));
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  }

  async function getBase64(pictureObj: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(pictureObj);
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          resolve(fileReader.result);
        } else {
          reject(new Error("FileReader result is not a string."));
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <form className="h-full w-full flex flex-col p-4 lg:pb-8 mb-36 md:mb-0 min-w-80 gap-7" onSubmit={(handleCreateNewPost)}>
      <div className="w-full flex flex-col items-start gap-1">
        <label className="text-sm font-bold" htmlFor="description">Description</label>
        <textarea className="textarea textarea-bordered text-neutral text-left w-full h-36 border rounded-2xl bg-base-300" placeholder="I like your post! :)" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <FileUploader onUpload={handlePictureUpload} />
      <div className="w-full flex flex-col items-start gap-1">
        <label className="text-sm font-bold" htmlFor="tags">Add Tags (seperated by commas " , ")</label>
        <input className="input input-bordered text-neutral text-left w-full border rounded-2xl bg-base-300" placeholder="art, coding, challenge" value={tags} onChange={(e) => setTags(e.target.value)}></input>
      </div>
      <div className="w-full gap-3 flex justify-end">
        <button className="btn bg-base-300" type="reset" onClick={() => navigate("/home")}>Cancel</button>
        <button className="btn bg-neutral text-base-100" type="submit">Create</button>
      </div>
    </form>
  )
}

export default NewPostForm;