import { Link } from "react-router-dom";
import { HomeHeaderProps } from "../Types";

function PageHeader({ headerName }: HomeHeaderProps) {

  return (
    <div className="w-full px-2 md:px-5 h-16 z-0">
      <h2 className="font-bold w-full text-left md:text-right md:text-3xl text-xl">{headerName}</h2>
      <Link className="md:hidden cursor-pointer w-5 h-5" to="/signin"><img src="signOut.svg" alt="Sign Out"></img></Link>
    </div>
  )
}

export default PageHeader;