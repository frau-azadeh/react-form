import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full fixed bg-blue-950 top-0">
      <div className="flex justify-around items-center container mx-auto p-2 ">
        <h1 className="text-xl font-bold">
          <NavLink
            to="/"
            className="hover:text-yellow-300 transition text-white"
          >
            My App
          </NavLink>
        </h1>
        <nav>
          <ul className="flex space-x-6 text-lg">
            {["/", "/auth", "setting"].map((path, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `rounded p-2 transition ${
                      isActive
                        ? "bg-yellow-300 text-white"
                        : "bg-white text-blue-900"
                    }`
                  }
                >
                  {path === "/"
                    ? "Home"
                    : path.replace("/", "").charAt(0).toUpperCase() +
                      path.slice(2)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
