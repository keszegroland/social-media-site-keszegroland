import CustomMenuItem from "./CustomMenuItem";
import MemberBadge from "./MemberBadge";

function LeftSideNavbar() {

  return (
    <div className="flex absolute bottom-0 w-screen h-17 md:h-screen md:left-0 md:flex-col md:w-72 bg-red-500 rounded-t-[16px] md:rounded-none md:rounded-r-[16px] md:gap-8">
      <h1 className="hidden md:block font-bold text-[40px] md:mt-8 md: w-full md:text-left md:pl-3">Snapify</h1>
      <MemberBadge />
      <ul className="menu menu-horizontal md:menu-lg gap-8 md:gap-3 md:menu-vertical md:w-10/12 md:p-0 md:h-screen sm:gap-20">
        <CustomMenuItem fileName="home" text="Home" route="/home" />
        <CustomMenuItem fileName="people" text="People" route="/people" />
        <CustomMenuItem fileName="saved" text="Saved" route="/saved" />
        <CustomMenuItem fileName="createPost" text="Create Post" route="/post/create" />
        <CustomMenuItem fileName="signOut" text="Sign Out" route="/signin" className="hidden md:block md:mt-auto md:mb-10" />
      </ul>
    </div>
  )
}

export default LeftSideNavbar;