import { Link } from 'react-router-dom';

/* eslint-disable react/no-unescaped-entities */
export default function Navigation() {
  const linkStyle =
    'flex items-end text-lg font-medium px-4 py-2 hover:border-b hover:border-lime-400 hover:text-lime-400 active:border-b active:border-lime-400 active:text-lime-400 focus:border-b focus:border-lime-400 focus:text-lime-400';

  return (
    <nav className=" border-b border-[#4a4a4a]">
      <div className="mx-auto nav-links flex flex-row items-end justify-center h-nav-height max-w-screen-xl relative">
        <Link className={`text-xl px-4 py-2 absolute left-0 ml-3`} to="/home">
          .alfred
        </Link>
        <Link className={linkStyle} to="/home">
          Home
        </Link>
        <Link className={linkStyle} to="/players">
          Players
        </Link>
        <Link className={linkStyle} to="/fixtures">
          Fixtures
        </Link>
        <Link className={linkStyle} to="/myteam">
          My Team
        </Link>
        <Link className={`${linkStyle} absolute right-0 mr-3`} to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
}
