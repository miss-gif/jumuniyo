import axios from "axios";

/**
 * 카카오페이 결제 요청 함수
 * @param {number} amount - 결제 금액
 * @param {string} phone - 구매자 전화번호
 * @param {string} orderId - 주문 ID
 * @param {string} accessToken - 인증 토큰
 * @param {string} request - 요청 사항
 * @param {object} locationData - 위치 데이터
 * @param {string} addressDetail - 상세 주소
 * @param {array} menuPkArray - 메뉴 PK 배열
 * @returns {Promise<string>} - 결제 완료 메시지
 */
export const initiateKakaoPay = (
  amount,
  phone,
  id,
  accessToken,
  request,
  locationData,
  addressDetail,
  menuPkArray,
) => {
  return new Promise((resolve, reject) => {
    var IMP = window.IMP;
    IMP.init("imp56341203");
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "카카오페이",
        merchant_uid: "GPK_" + new Date().getTime(),
        name: "주문이요-카카오페이",
        amount: amount,
        buyer_name: "buyer_name",
        buyer_tel: phone,
      },
      function (data) {
        console.log("결제 응답:", data); // 응답을 확인
        if (data.success) {
          axios
            .post(
              "/api/order/",
              {
                order_res_pk: id,
                order_request: request,
                payment_method: "3", // 결제수단을 '카카오페이'로 설정
                order_phone: phone,
                order_address: `${locationData.geocodeAddress} ${addressDetail}`,
                menu: menuPkArray.map(pk => ({
                  menu_pk: pk, // 메뉴 PK
                  menu_count: 1, // 각 메뉴의 수량 (필요에 따라 수정)
                  menu_option_pk: [], // 옵션 (필요에 따라 설정)
                })),
                use_mileage: 0,
                coupon: null,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then(response => {
              const resultData = response.data.resultData;
              console.log("서버 응답:", resultData);

              if (response.data.statusCode === 1) {
                resolve(resultData.order_pk); // 주문 ID 반환
              } else {
                reject("서버에서 처리에 실패했습니다.");
              }
            })
            .catch(error => {
              reject("결제 성공 후 처리 중 오류: " + error.message);
            });
        } else {
          reject("결제 실패: " + data.error_msg);
        }
      },
    );
  });
};
