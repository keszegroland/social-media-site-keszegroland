function MemberBadge() {

  return (
    <div className="hidden md:flex md:flex-row md:pl-3 md:gap-3 md:w-11/12 md:justify-start md:text-lg">
      <img src="profile.svg" alt="profile-img"></img>
      <div className="md:flex md:flex-col md:items-start">
        <p className="md:font-bold md:leading-3 md:mb-1">Full Name</p>
        <p className="md:text-sm md:leading-3">@username</p>
      </div>
    </div>
  )
}

export default MemberBadge;