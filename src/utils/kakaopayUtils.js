import axios from "axios";

/**
 * 카카오페이 결제 요청 함수
 * @param {number} amount - 결제 금액
 * @param {string} phone - 구매자 전화번호
 */
export const initiateKakaoPay = (amount, phone) => {
  return new Promise((resolve, reject) => {
    var IMP = window.IMP;
    IMP.init("imp56341203");
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "card",
        merchant_uid: "GPK_" + new Date().getTime(),
        name: "GOOTTFLEX",
        amount: amount,
        buyer_name: "buyer_name",
        buyer_tel: phone,
      },
      function (data) {
        let msg;
        if (data.success) {
          msg = "결제 완료";
          msg += "// 결제 수단 : Kakao";
          msg += "// 상점 거래ID : " + data.merchant_uid;
          msg += "// 결제 금액 : " + data.paid_amount;
          msg += "// 구매자 이름 : " + data.buyer_name;

          axios
            .post("/paySuccess", {
              ID: data.buyer_email,
              amount: data.paid_amount,
            })
            .then(response => resolve(response.data.message))
            .catch(error =>
              reject("결제 성공 후 처리 중 오류: " + error.message),
            );
        } else {
          msg = "결제 실패";
          msg += "에러 내용: " + data.error_msg;
          reject(msg);
        }
      },
    );
  });
};
