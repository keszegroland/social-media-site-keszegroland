function Header() {
  return (
    <div className="navbar px-4 sm:px-0 flex-none w-full sm:top-1 sm:w-4/5 items-center justify-between min-w-[300px] bg-base-100 border-b border-solid sm:border-none">
      <div className="flex-none gap-1">
        <img src="/logo.svg" alt="logo" className="w-8 h-8 sm:w-10 sm:h-10"></img>
        <h1 className="font-bold text-3xl sm:text-4xl">Snapify</h1>
      </div>
      <label className="flex-none swap swap-rotate">
        <input type="checkbox"></input>
        <img className="swap-on h-7 w-7 fill-current" src="/sun.svg" alt="sun"></img>
        <img className="swap-off h-7 w-7 fill-current" src="/moon.svg" alt="moon"></img>
      </label>
    </div>
  )
}

export default Header;