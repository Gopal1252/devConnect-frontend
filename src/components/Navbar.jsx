import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(store => store.user);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
      </div>
      {user && <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl || "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/profile" className="justify-between">Profile</Link></li>
            <li><Link to="/">Feed</Link></li>
            <li><Link>Logout</Link></li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Navbar
