interface CustomMenuItemProp {
  fileName: string;
  text: string;
  route: string;
  className?: string;
}

function CustomMenuItem({ fileName, text, route, className }: CustomMenuItemProp) {
  return (
    <li className={className}>
      <a className="flex flex-col md:flex-row md:pl-4 p-0 h-full md:h-full gap-0 md:gap-3" href={route}>
        <img className="w-5 h-6" src={`/${fileName}.svg`} alt={text}></img>
        <span className="text-sm md:text-lg">{text}</span>
      </a>
    </li>
  )
}

export default CustomMenuItem;