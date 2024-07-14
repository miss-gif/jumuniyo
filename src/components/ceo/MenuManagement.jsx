import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// 쿠키에서 특정 이름의 값을 읽어오는 함수
const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    menu_name: "",
    menu_content: "",
    menu_price: "",
    menu_state: 1, // 상태 기본값 설정
    img: null,
  });
  const [editMenuItemId, setEditMenuItemId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  const { menuResPk } = useParams();

  useEffect(() => {
    const token = getCookie("accessToken"); // 쿠키에서 토큰 읽기
    console.log("Token from cookie:", token); // 토큰 확인
    if (!token) {
      navigate("/ceopage/login");
      return;
    }
    setAccessToken(token);
  }, [navigate]);

  useEffect(() => {
    if (accessToken) {
      console.log("Access Token set in state:", accessToken); // 상태에 설정된 토큰 확인
      fetchMenus();
    }
  }, [accessToken, menuResPk]);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`/api/menu?menu_res_pk=${menuResPk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMenus(response.data.resultData);
    } catch (error) {
      console.error("메뉴를 불러오는 중 에러 발생: ", error);
      if (error.response && error.response.status === 401) {
        // 토큰이 유효하지 않으면 로그인 페이지로 리디렉션
        console.log("토큰이 유효하지않음");
      }
    }
  };

  const handleOpenModal = (menu = null) => {
    if (menu) {
      setIsEditMode(true);
      setNewMenuItem({
        menu_name: menu.menu_name,
        menu_content: menu.menu_content,
        menu_price: menu.menu_price,
        menu_state: menu.menu_state,
        img: null, // 기존 이미지를 보여주지 않음, 새로운 이미지를 업로드할 수 있음
      });
      setEditMenuItemId(menu.menu_pk);
    } else {
      setIsEditMode(false);
      setNewMenuItem({
        menu_name: "",
        menu_content: "",
        menu_price: "",
        menu_state: 1,
        img: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMenuItemId(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleFileChange = e => {
    setNewMenuItem({ ...newMenuItem, img: e.target.files[0] });
  };

  const handleAddMenuItem = async () => {
    try {
      const menuData = {
        p: {
          menu_name: newMenuItem.menu_name,
          menu_content: newMenuItem.menu_content,
          menu_price: Number(newMenuItem.menu_price), // 가격을 숫자로 변환
          menu_state: newMenuItem.menu_state,
        },
        menu_res_pk: Number(menuResPk), // menu_res_pk를 숫자로 변환
      };

      console.log("Adding menu item with data:", JSON.stringify(menuData)); // 입력 값 콘솔에 출력

      const response = await axios.post("/api/menu", menuData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // JSON 형식 설정
        },
      });

      console.log("Response data:", response.data); // 응답 데이터 출력

      handleCloseModal();
      fetchMenus();
    } catch (error) {
      console.error("메뉴 추가 중 에러 발생: ", error);
      if (error.response) {
        console.error("응답 데이터: ", error.response.data);
        console.error("응답 상태: ", error.response.status);
        console.error("응답 헤더: ", error.response.headers); // 응답 헤더 출력
      }
    }
  };

  const handleEditMenuItem = async () => {
    try {
      const formData = new FormData();
      formData.append("menu_pk", editMenuItemId);
      formData.append("menu_name", newMenuItem.menu_name);
      formData.append("menu_content", newMenuItem.menu_content);
      formData.append("menu_price", newMenuItem.menu_price);
      formData.append("menu_state", newMenuItem.menu_state.toString());
      formData.append("menu_res_pk", menuResPk);
      if (newMenuItem.img) {
        formData.append("pic", newMenuItem.img); // "pic"이라는 이름으로 파일을 추가합니다.
      }

      await axios.put("/api/menu", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      handleCloseModal();
      fetchMenus();
    } catch (error) {
      console.error("메뉴 수정 중 에러 발생: ", error);
    }
  };

  const handleDeleteMenuItem = async menuPk => {
    try {
      console.log("Deleting menu item with PK:", menuPk); // 디버깅을 위한 로그
      console.log("Access Token:", accessToken); // 토큰 확인
      const response = await axios.delete(`/api/menu?menu_pk=${menuPk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Deleted menu item with PK:", menuPk); // 디버깅을 위한 로그
      console.log("Response:", response); // 응답 출력
      fetchMenus(); // 삭제 후 메뉴 목록 새로고침
    } catch (error) {
      console.error("메뉴 삭제 중 에러 발생: ", error); // 에러 메시지 출력
      if (error.response && error.response.status === 401) {
        // 토큰이 유효하지 않으면 로그인 페이지로 리디렉션
        console.log("토큰이 유효하지않음");
      }
    }
  };

  return (
    <>
      <div className="menu-management">
        <div className="menu-settings">
          <h2 className="settings-header">메뉴설정</h2>
        </div>
        <div className="menu-section">
          <div className="menu-tap">메뉴</div>

          <div className="menu-list">
            <div className="menu-upper">
              <div className="menu-add">
                <button className="btn" onClick={() => handleOpenModal()}>
                  메뉴 추가
                </button>
              </div>
            </div>
            {menus.map(menu => (
              <div key={menu.menu_pk} className="menu-list-oneMenu">
                <div className="menu-list-oneMenu-table">
                  <div className="picanddata">
                    <div className="menu-list-oneMenu-tablePic">
                      <img src={menu.img} alt={menu.menu_name} />
                    </div>
                    <div className="menu-list-oneMenu-tableData">
                      <h3 className="menu-list-name">{menu.menu_name}</h3>
                      <p className="menu-list-content">{menu.menu_content}</p>
                      <p className="menu-list-price">{menu.menu_price}원</p>
                    </div>
                  </div>

                  <div className="status-action">
                    <div className="menu-list-status">
                      <select className="menu-list-select">
                        <option value="판매중">판매중</option>
                        <option value="판매중지">판매중지</option>
                      </select>
                    </div>
                    <div className="menu-list-actions">
                      <button
                        className="btn"
                        onClick={() => handleOpenModal(menu)}
                      >
                        수정
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDeleteMenuItem(menu.menu_pk)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{isEditMode ? "메뉴 수정" : "새 메뉴 추가"}</h2>
            <form>
              <div className="form-group">
                <label htmlFor="menu_name">메뉴 이름</label>
                <input
                  type="text"
                  id="menu_name"
                  name="menu_name"
                  value={newMenuItem.menu_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu_content">메뉴 설명</label>
                <input
                  type="text"
                  id="menu_content"
                  name="menu_content"
                  value={newMenuItem.menu_content}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu_price">가격</label>
                <input
                  type="text"
                  id="menu_price"
                  name="menu_price"
                  value={newMenuItem.menu_price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu_state">상태</label>
                <select
                  id="menu_state"
                  name="menu_state"
                  value={newMenuItem.menu_state}
                  onChange={handleInputChange}
                >
                  <option value={1}>판매중</option>
                  <option value={0}>판매중지</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="img">이미지</label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={handleFileChange}
                />
              </div>
              <button
                className="btn"
                type="button"
                onClick={isEditMode ? handleEditMenuItem : handleAddMenuItem}
              >
                {isEditMode ? "수정" : "추가"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuManagement;
