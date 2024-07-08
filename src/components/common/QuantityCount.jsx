import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityCount = () => {
  return (
    <div className="quantity-count">
      <div className="quantity-count__decrease-button">
        <RemoveIcon />
      </div>
      <div className="quantity-count__current-quantity">1</div>
      <div className="quantity-count__increase-button">
        <AddIcon />
      </div>
    </div>
  );
};

export default QuantityCount;
