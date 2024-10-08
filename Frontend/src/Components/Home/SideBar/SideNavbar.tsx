import CustomMenuItem from "./CustomMenuItem";
import LogoBadge from "./LogoBadge";
import MemberBadge from "./MemberBadge";

function SideNavbar() {

  return (
    <div className="bg-base-300 fixed flex-none w-full bottom-0 md:rounded-r-2xl md:w-60 lg:w-64 xl:w-72 md:top-0 md:left-0 md:flex-col md:items-start md:justify-start md:px-6 md:py-10 md:gap-10 z-10 border-t border-solid">
      <LogoBadge />
      <MemberBadge />
      <ul className="menu menu-horizontal flex flex-nowrap w-full justify-around md:menu-vertical md:menu-lg md:flex-1">
        <CustomMenuItem fileName="home" text="Home" route="/home" />
        <CustomMenuItem fileName="people" text="People" route="/people" />
        <CustomMenuItem fileName="save" text="Saved" route="/saved" />
        <CustomMenuItem fileName="createPost" text="Create Post" route="/post/create" />
        <CustomMenuItem fileName="signOut" text="Sign Out" route="/signin" className="hidden md:block md:mt-auto" />
      </ul>
    </div>
  )
}

export default SideNavbar;