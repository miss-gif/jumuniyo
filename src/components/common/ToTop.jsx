import React, { useState, useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";

const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    setIsVisible(scrollPosition > 0);
  };

  const clickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className="to-top" onClick={clickTop}>
        <MdArrowUpward />
      </div>
    )
  );
};

export default ToTop;
