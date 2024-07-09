import { useState } from "react";
import MypageModifyModal from "../components/common/mypage/MypageModifyModal";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    아이디: "tource",
    비밀번호: "tource",
    이름: "김민기",
    닉네임: "밍밍밍",
    연락처: "010-1234-5678",
  });

  const onModify = () => {
    setIsModalOpen(true);
  };

  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="mypage">
      <div className="mypage-inner">
        <div className="mypage__profile">
          <div className="mypage__profile-header">
            <h2 className="mypage__profile-title">프로필 사진</h2>
            <img
              className="mypage__profile-image"
              src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
              alt="profile-img"
            />
          </div>
        </div>
        <div className="mypage__info">
          {Object.keys(profile).map(key => (
            <div key={key} className="mypage__info-item">
              <p className="mypage__info-label">{key}</p>
              {isEditing ? (
                <input
                  className="mypage__info-input"
                  type="text"
                  name={key}
                  value={profile[key]}
                  onChange={handleChange}
                />
              ) : (
                <p className="mypage__info-value">{profile[key]}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mypage__actions">
          <button className="mypage__button" type="button" onClick={onEdit}>
            {isEditing ? "저장" : "수정"}
          </button>
        </div>
        {isModalOpen ? <MypageModifyModal /> : onModify}
      </div>
    </div>
  );
};

export default MyPage;
