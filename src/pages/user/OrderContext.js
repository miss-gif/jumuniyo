/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addOrderItem = item => {
    setOrder(prevOrder => [...prevOrder, item]);
  };

  const clearOrder = () => {
    setOrder([]);
  };

  useEffect(() => {
    console.log("Current order:", order);
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, addOrderItem, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
