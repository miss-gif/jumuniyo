/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addOrderItem = newItem => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(
        item => item.menu_pk === newItem.menu_pk,
      );
      if (existingItem) {
        return prevOrder.map(item =>
          item.menu_pk === newItem.menu_pk
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        return [...prevOrder, newItem];
      }
    });
  };

  const clearOrder = () => {
    setOrder([]);
  };

  useEffect(() => {
    // console.log("Current order:", order);
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, addOrderItem, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
