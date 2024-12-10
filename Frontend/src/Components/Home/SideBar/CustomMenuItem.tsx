import { Location, useLocation } from "react-router-dom";
import { CustomMenuItemProps } from "../../../Types/PostTypes";

function CustomMenuItem({ fileName, text, route, className, onSignOutClick }: CustomMenuItemProps) {
  const url: Location = useLocation();
  const isButtonActive: boolean = url.pathname === route;

  return (
    <li className={className} onClick={onSignOutClick}>
      <a className={"flex flex-col md:flex-row md:pl-4 p-1 h-full gap-0 md:gap-3 text-sm md:text-lg font-semibold" + (isButtonActive ? " active" : "")} href={route}>
        <img className="w-4 h-5 md:w-5 md:h-6" src={isButtonActive ? `/${fileName}Light.svg` : `/${fileName}.svg`} alt={text}></img>
        {text}
      </a>
    </li>
  )
}

export default CustomMenuItem;