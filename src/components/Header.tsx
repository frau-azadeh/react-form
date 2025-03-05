import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full fixed bg-blue-950 top-0 ">
      <div className="flex justify-around items-center container mx-auto p-2">
        {/* لوگو */}
        <h1 className="text-lx font-bold ">
          <NavLink to="/" className="hover:text-yellow-300! transition text-white! ">
            My App
          </NavLink>
        </h1>

        {/* منو */}
        <nav>
          <ul className="flex space-x-7 text-lg">
            {/** لینک ها */}
            {["/", "/auth", "/settings"].map((path, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `rounded p-2 transition ${
                      isActive ? "bg-yellow-300 text-white" : "bg-white text-blue-950"
                    } hover:bg-yellow-300 hover:text-white`
                  }
                >
                  {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
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
