function MemberBadge() {

  return (
    <div className="hidden md:flex md:flex-row md:pl-3 md:gap-3 md:w-11/12 md:justify-start md:text-lg">
      <svg width="53" height="53" viewBox="0 0 54 54">
        <g clipPath="url(#clip0_1574_2829)">
          <ellipse cx="27.0338" cy="26.9662" rx="26.4937" ry="25.9537" fill="white" />
          <path d="M27 0.00146484C12.0899 0.00146484 0 12.089 0 27.0003C0 41.9116 12.0887 53.9991 27 53.9991C41.9125 53.9991 54 41.9116 54 27.0003C54 12.089 41.9125 0.00146484 27 0.00146484ZM27 8.07443C31.9337 8.07443 35.9316 12.0735 35.9316 17.0048C35.9316 21.9373 31.9337 25.9353 27 25.9353C22.0687 25.9353 18.0708 21.9373 18.0708 17.0048C18.0708 12.0735 22.0687 8.07443 27 8.07443ZM26.9941 46.9401C22.0734 46.9401 17.5667 45.1481 14.0906 42.182C13.2438 41.4597 12.7552 40.4007 12.7552 39.2894C12.7552 34.2881 16.803 30.2854 21.8054 30.2854H32.197C37.2006 30.2854 41.2329 34.2881 41.2329 39.2894C41.2329 40.4018 40.7467 41.4586 39.8987 42.1808C36.4238 45.1481 31.9159 46.9401 26.9941 46.9401Z" fill="#877EFF" />
        </g>
        <defs>
          <clipPath id="clip0_1574_2829">
            <rect width="54" height="54" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="md:flex md:flex-col items-start">
        <p className="font-bold leading-3 mb-1">username</p>
        <p className="text-sm leading-3">@username</p>
      </div>
    </div>
  )
}

export default MemberBadge;