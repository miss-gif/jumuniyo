import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderSummary = ({
  selectedMenuItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onClearAll,
  onOrder,
  restaurantName,
  restaurantState,
}) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams(); // useParams로 얻은 id 값

  // menu_res_pk 값이 useParams로 얻은 id 값과 일치하는 객체들만 필터링
  const filteredMenuItems = selectedMenuItems.filter(
    item => item.menu_res_pk === parseInt(id, 10), // id와 item.menu_res_pk를 비교
  );

  const totalAmount = filteredMenuItems.reduce(
    (sum, item) =>
      sum +
      item.menu_price * item.quantity +
      (item.selectedOptions
        ? Object.values(item.selectedOptions).reduce(
            (optionSum, option) => optionSum + option.optionPrice,
            0,
          ) * item.quantity
        : 0),
    0,
  );

  const emptyMessageStyle = {
    padding: filteredMenuItems.length === 0 ? "20px" : "0",
    textAlign: "center",
  };

  const submitButtonStyle = {
    backgroundColor: filteredMenuItems.length > 0 ? "#333" : "#eee",
    color: filteredMenuItems.length > 0 ? "#eee" : "#aaa",
    cursor: filteredMenuItems.length > 0 ? "pointer" : "default",
  };

  const formatPrice = price => {
    return price.toLocaleString();
  };

  const handleOrderClick = () => {
    if (restaurantState === 2) {
      setOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      onOrder(restaurantName);
    }
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="order-summary">
      <div className="order-summary-content">
        <div className="order-summary__header">
          <h2 className="header__title">주문표</h2>
          <div className="header__icon" onClick={onClearAll}>
            <DeleteIcon />
          </div>
        </div>
        <div className="order-summary__content-wrapper">
          {filteredMenuItems.length === 0 ? (
            <div
              className="order-summary__empty-message"
              style={emptyMessageStyle}
            >
              선택된 메뉴가 없습니다.
            </div>
          ) : (
            filteredMenuItems.map((item, index) => (
              <div key={index}>
                <div className="order-summary__content">
                  {item.menu_name}: {item.menu_content}
                  {item.selectedOptions && (
                    <div className="order-summary__options">
                      {Object.entries(item.selectedOptions).map(
                        ([optionPk, option]) => (
                          <div key={optionPk}>
                            {option.optionName}: +
                            {formatPrice(option.optionPrice)}원
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
                <div className="order-summary__price-quantity">
                  <div className="order-summary__wrap">
                    <div
                      className="order-summary__delete-button"
                      onClick={() => onRemoveItem(item.menu_pk)}
                    >
                      <CloseIcon />
                    </div>
                    <div className="order-summary__price">
                      {formatPrice(
                        item.menu_price +
                          (item.selectedOptions
                            ? Object.values(item.selectedOptions).reduce(
                                (optionSum, option) =>
                                  optionSum + option.optionPrice,
                                0,
                              )
                            : 0),
                      )}
                      원
                    </div>
                  </div>
                  <div className="quantity-count">
                    <button
                      onClick={() => onDecreaseQuantity(item.menu_pk)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncreaseQuantity(item.menu_pk)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {filteredMenuItems.length > 0 && (
            <div className="order-summary__total-amount">
              <p>총 결제 금액</p>
              <p>{formatPrice(totalAmount)}원</p>
            </div>
          )}
        </div>
      </div>
      <button
        className="order-summary__submit-button"
        style={submitButtonStyle}
        onClick={handleOrderClick}
        disabled={filteredMenuItems.length === 0}
      >
        주문하기
      </button>
      <button
        className="order-summary__submit-buttonforphone"
        style={submitButtonStyle}
        onClick={handleOrderClick}
        disabled={totalAmount === 0}
      >
        {totalAmount > 0 ? `${totalAmount}원 주문하기` : "음식을 담아주세요!"}
      </button>

      {/* 준비중입니다 모달 */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"알림"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            아직 준비중입니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderSummary;
