import { Link } from "react-router-dom";
import { PageHeaderProps } from "../Types/PostTypes";
import useAuth from "../Utils/UseAuth";

function PageHeader({ headerName }: PageHeaderProps) {
  const { signOut } = useAuth();

  return (
    <div className="w-full h-16 px-2 md:px-5 min-w-40">
      <h2 className="font-bold w-full text-left md:text-right md:text-3xl text-xl">{headerName}</h2>
      <Link className="md:hidden cursor-pointer w-5 h-5" to="/signin" onClick={signOut}><img src="signOut.svg" alt="Sign Out"></img></Link>
    </div>
  )
}

export default PageHeader;