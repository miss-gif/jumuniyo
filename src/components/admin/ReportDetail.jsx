import React from "react";

const ReportDetail = () => {
  return (
    <>
      <div className="reportDetail-wrap">
        <h1>No. 123541</h1>
        <div className="report">
          <div className="reportTitle">이 사람 언행이 부적절 합니다.</div>
          <div className="reportWriter">
            <div className="reportWriter-tab">작성자</div>
            <div className="reportWriter-value">Alpaka1242</div>
          </div>
          <div className="reportTime">
            <div className="reportTime-tab">작성날짜</div>
            <div className="reportTime-value">2024-07-07 13:00</div>
          </div>
        </div>
        <div className="reportContent">
          <div className="reportWhyContent">
            매우 부적절한 언행을 사용하였고 아래에 이상한 사진으로 눈을 썩게
            만들었습니다.
          </div>
        </div>
        <div className="reported">
          <div className="reportedTitle">What the hell did u make</div>
          <div className="reportedWriter">
            <div className="reportedWriter-tab">작성자</div>
            <div className="reportedWriter-value">Alpaka1242</div>
          </div>
          <div className="reportedTime">
            <div className="reportedTime-tab">작성날짜</div>
            <div className="reportedTime-value">2024-07-07 13:00</div>
          </div>
        </div>
        <div className="reportedContent">
          <div className="reportedWhyContent">
            The food you made is freaking disgusting, you crazy bastard! How can
            you mess up food like this? Mine would have been much tastier!
          </div>
        </div>

        <div className="buttonforreport">
          <div className="btn">취소처리</div>
          <div className="btn">영구정지처리</div>
          <div className="btn">기한부정지처리</div>
        </div>
        <div className="reportDetail-modal">
          <label>정지 기한 설정</label>
          <input
            type="number"
            placeholder="정지개월"
            className="reportDetail-modalInput"
          />
        </div>
      </div>
    </>
  );
};

export default ReportDetail;
