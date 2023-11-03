import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
} from "@material-tailwind/react";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon
} from "@heroicons/react/24/solid";
import { useAuth } from "../../utilities/hooks/useAuth";

export function NavBar() {
  const { logout }  = useAuth();
  const logoutHandler = () => {
    try {
      logout();
    } catch (error) {
      console.log('An error has occurred while logging out. Please try again or contact your admin.');
    }
  }
  const { pathname } = useLocation();
  if(pathname === '/login') {
    return null;
  };
  const [page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color="transparent"
      className="rounded-xl transition-all px-0 py-1"
      fullWidth
    >
      <div className="flex flex-row flex-nowrap	justify-between gap-6 items-center">
        <div>
          <Breadcrumbs
            className="bg-transparent p-0 transition-all"
          >
            <Link to="/">
              <HomeIcon className="h-5 w-5 text-blue-gray-900 hover:text-gray-700" />
            </Link>
            <Typography
              variant="small"
              className="font-bold cursor-auto text-blue-gray-900 transition-none hover:text-blue-gray-900"
            >
              {page === 'pets' ? 'Pet Inventory' : page}
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          <Link to="/login">
            <Button
              variant="text"
              className="hidden text-blue-gray-900 items-center gap-1 px-4 xl:flex"
              onClick={() => logoutHandler()}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-blue-gray-900" />
              Log Out
            </Button>
            <IconButton
              variant="text"
              className="flex xl:hidden text-blue-gray-900"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-blue-gray-900" />
            </IconButton>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

export default NavBar;
