function FooterPost() {
  return (
    <div className="flex w-full justify-between items-center">
      <label className="swap swap-rotate cursor-pointer">
        <input type="checkbox" />
        <img className="swap-on" src="/liked.svg" alt="liked"></img>
        <img className="swap-off" src="/like.svg" alt="like"></img>
      </label>
      <label className="swap swap-rotate cursor-pointer">
        <input type="checkbox" />
        <img className="swap-on" src="/saved.svg" alt="Saved"></img>
        <img className="swap-off" src="/save.svg" alt="Save"></img>
      </label>
    </div>
  )
}

export default FooterPost;