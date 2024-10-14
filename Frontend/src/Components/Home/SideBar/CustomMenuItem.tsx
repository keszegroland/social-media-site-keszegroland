import { Location, useLocation } from "react-router-dom";

interface CustomMenuItemProp {
  fileName: string;
  text: string;
  route: string;
  className?: string;
}

function CustomMenuItem({ fileName, text, route, className }: CustomMenuItemProp) {
  const url: Location = useLocation();
  const isActive: boolean = url.pathname === route;

  return (
    <li className={className}>
      <a className={"flex flex-col md:flex-row md:pl-4 p-1 h-full gap-0 md:gap-3 text-sm md:text-lg font-semibold" + (isActive ? " active" : "")} href={route}>
        {isActive ? (
          <img className="w-4 h-5 md:w-5 md:h-6" src={`/${fileName}Light.svg`} alt={text}></img>
        ) : (
          <img className="w-4 h-5 md:w-5 md:h-6" src={`/${fileName}.svg`} alt={text}></img>
        )}
        {text}
      </a>
    </li>
  )
}

export default CustomMenuItem;