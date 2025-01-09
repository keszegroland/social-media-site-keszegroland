import NewPostForm from "../Components/CreatePost/NewPostForm";
import PageHeader from "../Components/PageHeader";

function CreatePost() {

  return (
    <div className="grid grid-cols-1 w-full h-full">
      <div className="h-full w-full md:py-8 lg:px-20 xl:px-28">
        <div className="w-3/4 h-full flex flex-col md:gap-5">
          <PageHeader headerName="Create Post" />
          <NewPostForm />
        </div>
      </div>
    </div>
  )
}

export default CreatePost;