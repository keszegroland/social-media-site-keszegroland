function SaveButton() {

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input type="checkbox" />
      <img className="swap-on" src="/saved.svg" alt="Saved"></img>
      <img className="swap-off" src="/save.svg" alt="Save"></img>
    </label>
  )
}

export default SaveButton;