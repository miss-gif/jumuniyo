const useButtonClass = (selectedPayment, selectedPaymentMethod) => {
  const getButtonClass = (method, isPaymentMethod = false) => {
    if (isPaymentMethod) {
      return `payment-page__button ${selectedPaymentMethod === method ? "btn--active" : "btn--default"}`;
    }
    return `payment-page__button ${selectedPayment === method ? "btn--active" : "btn--default"}`;
  };

  return getButtonClass;
};

export default useButtonClass;
