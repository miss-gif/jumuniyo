import React, { useState, useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";

const ToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = (): void => {
    const scrollPosition = window.pageYOffset;
    setIsVisible(scrollPosition > 0);
  };

  const clickTop = (): void => {
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

  if (!isVisible) {
    return null;
  }

  return (
    <div className="to-top" onClick={clickTop}>
      <MdArrowUpward />
    </div>
  );
};

export default ToTop;
