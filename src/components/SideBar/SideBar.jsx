import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Typography,
} from "@material-tailwind/react";
import {
  ClipboardDocumentIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/solid";

function SideBar() {
  const location = useLocation();
  if(location.pathname === '/login') {
    return null;
  };
  return (
    <aside
      className="bg-white shadow-lg -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0"
    >
      <div className="relative border-b border-blue-gray-50 mb-8">
        <div className="flex items-center gap-4 py-6 px-8">
          <Avatar src="/images/pet-100.png" size="sm" />
            <Typography variant="h6" color="inherit">
              Swagger Pet Store
            </Typography>
        </div>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li key="pet-inventory">
            <NavLink to="/pets">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <ClipboardDocumentIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-bold capitalize text-base"
                  >
                    Pet Inventory
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key="orders">
            <NavLink to="/orders">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <ShoppingBagIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-bold capitalize text-base"
                  >
                    Orders
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
