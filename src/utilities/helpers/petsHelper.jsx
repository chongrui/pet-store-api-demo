import React from "react";
import {
  Typography,
  Avatar,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";

export const renderPetImage = (petCategory) => (
  <div>
    {
      petCategory === 'Cats' ? (
        <Avatar src="/images/cat-80.png" alt="cat" size="sm" />
      ) : null
    }
    {
      petCategory === 'Dogs' ? (
        <Avatar src="/images/dog-64.png" alt="dog" size="sm" />
      ) : null
    }
    {
      petCategory === 'Lions' ? (
        <Avatar src="/images/lion-64.png" alt="lion" size="sm" />
      ) : null
    }
    {
      petCategory === 'Rabbits' ? (
        <Avatar src="/images/rabbit-100.png" alt="rabbit" size="sm" />
      ) : null
    }
    {
      petCategory !== 'Rabbits' && petCategory === 'Dogs' && petCategory === 'Lions' && petCategory === 'Cats' ? (
        <Avatar src="/images/rabbit-100.png" alt="other pet" size="sm" />
      ) : null
    }
  </div>
);

export const renderPetStatus = (petStatus) => (
  <div>
    {
      petStatus === 'available' ? (
        <div className="flex justify-start items-center gap-1">
          <CheckCircleIcon className="w-5 h-5 text-green-700" />
          <Typography className="text-sm font-semibold text-blue-gray-900">
            Available
          </Typography>
        </div>
      ) : null
    }
    {
      petStatus === 'pending' ? (
        <div className="flex justify-start items-center gap-1">
          <MinusCircleIcon className="w-5 h-5 text-yellow-700" />
          <Typography className="text-sm font-semibold text-blue-gray-900">
            Pending
          </Typography>
        </div>
      ) : null
    }
    {
      petStatus === 'sold' ? (
        <div className="flex justify-start items-center gap-1">
          <CurrencyDollarIcon className="w-5 h-5 text-blue-gray-900" />
          <Typography className="text-sm font-semibold text-blue-gray-900">
            Sold
          </Typography>
        </div>
      ) : null
    }
    {
      petStatus === 'available' && petStatus === 'pending' && petStatus === 'sold' ? (
        <div className="flex justify-start items-center gap-1">
          <Typography className="text-sm font-semibold text-blue-gray-900">
            -
          </Typography>
        </div>
      ) : null
    }
  </div>
);