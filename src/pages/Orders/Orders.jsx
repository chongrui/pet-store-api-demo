/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import {
  CurrencyDollarIcon,
  TruckIcon,
  CheckCircleIcon,
  ChartPieIcon,
} from "@heroicons/react/24/solid";
import { OrderCard } from "../../components/OrderCard/OrderCard";

function Orders() {
  const [orders, setOrders] = useState([]);

  const convertNumbers = (orderNumber) => {
    if(typeof orderNumber !== 'number') {
      return 0;
    }
    return orderNumber;
  }

  const getAllOrders = () => fetch(`/api/v3/store/inventory`)
    .then((response) => response.json())
    .then((json) => {
      let orders = [
        {
          icon: ChartPieIcon,
          title: "Total Orders",
          value: convertNumbers( json?.approved ?? 0) + convertNumbers( json?.placed ?? 0) + convertNumbers( json?.delivered ?? 0),
        },
        {
          icon: CheckCircleIcon,
          title: "Approved Orders",
          value: json?.approved ?? '-',
        },
        {
          icon: CurrencyDollarIcon,
          title: "Placed Orders",
          value: json?.placed ?? '-',
        },
        {
          icon: TruckIcon,
          title: "Delivered Orders",
          value: json?.delivered ?? '-',
        },
      ]
      setOrders(orders);
    });

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="mt-12 flex flex-col gap-12 p-4">
      <div className="mb-12 grid gap-y-10 gap-x-12 xl:grid-cols-2">
        {orders.map(({ icon, title, ...rest }) => (
          <OrderCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
