import React from "react";
import { Link } from "react-router-dom";

const JoinFooter = () => {
  return (
    <div className="footer-title">
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
          alt="Logo"
          className="footer__logo"
        />
      </Link>
      Copyright JUMUNIYO. All Rights Reserved.
    </div>
  );
};

export default JoinFooter;
