import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderSummary = ({
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onClearAll,
  onOrder,
  restaurantName,
  restaurantState,
}) => {
  const [open, setOpen] = useState(false);
  const items = useSelector(state => state.cart.items);
  const restaurant = useSelector(state => state.cart.restaurant);
  const [store, setStore] = useState([]);

  useEffect(() => {
    if (
      restaurantName &&
      restaurant?.restaurantName &&
      restaurantName === restaurant.restaurantName
    ) {
      setStore(items);
    } else {
      setStore([]); // 일치하지 않는 경우 store를 빈 배열로 설정
    }
  }, [items, restaurant, restaurantName]); // restaurantName 추가

  const totalAmount = store.reduce(
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

  const formatPrice = price => price.toLocaleString();

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
          {store.length === 0 ? (
            <div
              className="order-summary__empty-message"
              style={{ padding: "20px", textAlign: "center" }}
            >
              선택된 메뉴가 없습니다.
            </div>
          ) : (
            store.map((item, index) => (
              <div key={index} className="order-summary__item">
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
          {store.length > 0 && (
            <div className="order-summary__total-amount">
              <p>총 결제 금액</p>
              <p>{formatPrice(totalAmount)}원</p>
            </div>
          )}
        </div>
      </div>
      <button
        className="order-summary__submit-button"
        style={{
          backgroundColor: store.length > 0 ? "#333" : "#eee",
          color: store.length > 0 ? "#eee" : "#aaa",
          cursor: store.length > 0 ? "pointer" : "default",
        }}
        onClick={handleOrderClick}
        disabled={store.length === 0}
      >
        주문하기
      </button>

      <button
        className="order-summary__submit-buttonforphone"
        style={{
          backgroundColor: store.length > 0 ? "#333" : "#eee",
          color: store.length > 0 ? "#eee" : "#aaa",
          cursor: store.length > 0 ? "pointer" : "default",
        }}
        onClick={handleOrderClick}
        disabled={store.length === 0}
      >
        {formatPrice(totalAmount)}원 주문하기
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
