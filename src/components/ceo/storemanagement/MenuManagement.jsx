import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const MenuManagement = () => {
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [deleteMenuItemId, setDeleteMenuItemId] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({
    menu_name: "",
    menu_content: "",
    menu_price: "",
    menu_state: 1,
    img: null,
  });

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    //console.log("액세스 토큰: ", accessToken); // 액세스 토큰을 출력하여 확인

    const fetchMenuData = async () => {
      try {
        const response = await axios.get("/api/owner/menu", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        //console.log("Response data:", response.data); // 응답 데이터를 확인합니다

        if (response.data.statusCode === 1) {
          const updatedMenuData = response.data.resultData.map(menu => ({
            ...menu,
            menu_pic: menu.menu_pic
              ? `/pic/${menu.menu_pic}`
              : "default_image_url",
          }));
          setMenuData(updatedMenuData);
        } else {
          throw new Error(response.data.resultMsg || "Unknown error");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchMenuData();
    } else {
      setError("Access token is not provided");
      setLoading(false);
      navigate("/login");
    }
  }, [navigate]);

  const handleOpenModal = () => {
    setIsEditMode(false);
    setNewMenuItem({
      menu_name: "",
      menu_content: "",
      menu_price: "",
      menu_state: 1,
      img: null,
    });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenDeleteModal = menu_pk => {
    setDeleteMenuItemId(menu_pk);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenEditModal = menu => {
    setEditMenuItem(menu);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewMenuItem(prevState => ({
      ...prevState,
      [name]: name === "menu_state" ? parseInt(value, 10) : value,
    }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setNewMenuItem(prevState => ({
      ...prevState,
      img: file,
    }));
  };

  const handleAddMenuItem = async () => {
    const accessToken = getCookie("accessToken");

    const formData = new FormData();
    formData.append(
      "p",
      JSON.stringify({
        menu_name: newMenuItem.menu_name,
        menu_content: newMenuItem.menu_content,
        menu_price: newMenuItem.menu_price,
        menu_state: newMenuItem.menu_state,
      }),
    );
    formData.append("pic", newMenuItem.img); // 서버에서 기대하는 필드 이름 'pic'으로 파일 추가

    try {
      const response = await axios.post("/api/owner/menu", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode === 1) {
        setMenuData(prevMenuData => [
          ...prevMenuData,
          {
            ...response.data.resultData,
            menu_pic: `/pic/${response.data.resultData.menu_pic}`,
          },
        ]);
        handleCloseModal();
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = (menu_pk, e) => {
    const newStatus = parseInt(e.target.value, 10);
    setMenuData(prevMenuData =>
      prevMenuData.map(menu =>
        menu.menu_pk === menu_pk ? { ...menu, menu_state: newStatus } : menu,
      ),
    );
  };

  const handleEditMenuItem = async () => {
    const accessToken = getCookie("accessToken");

    const formData = new FormData();
    formData.append(
      "p",
      JSON.stringify({
        menu_pk: editMenuItem.menu_pk,
        menu_name: newMenuItem.menu_name || editMenuItem.menu_name,
        menu_content: newMenuItem.menu_content || editMenuItem.menu_content,
        menu_price: newMenuItem.menu_price || editMenuItem.menu_price,
        menu_state: newMenuItem.menu_state || editMenuItem.menu_state,
      }),
    );
    if (newMenuItem.img) {
      formData.append("pic", newMenuItem.img);
    }

    try {
      const response = await axios.put("/api/owner/menu", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode === 1) {
        setMenuData(prevMenuData =>
          prevMenuData.map(menu =>
            menu.menu_pk === editMenuItem.menu_pk
              ? {
                  ...menu,
                  ...response.data.resultData,
                  menu_pic: `/pic/${response.data.resultData.menu_pic}`,
                }
              : menu,
          ),
        );
        handleCloseModal();
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const handleStatusToggle = async menu => {
    const accessToken = getCookie("accessToken");
    const newStatus = menu.menu_state === 1 ? 2 : 1;

    const formData = new FormData();
    formData.append(
      "p",
      JSON.stringify({
        menu_pk: menu.menu_pk,
        menu_name: menu.menu_name,
        menu_content: menu.menu_content,
        menu_price: menu.menu_price,
        menu_state: newStatus,
      }),
    );

    // 이미지 파일이 있다면 추가
    if (menu.img) {
      formData.append("pic", menu.img);
    }

    try {
      const response = await axios.put("/api/owner/menu", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode === 1) {
        setMenuData(prevMenuData =>
          prevMenuData.map(item =>
            item.menu_pk === menu.menu_pk
              ? { ...item, menu_state: newStatus }
              : item,
          ),
        );
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteMenuItem = async () => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.delete(
        `/api/owner/menu/${deleteMenuItemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1) {
        setMenuData(prevMenuData =>
          prevMenuData.filter(menu => menu.menu_pk !== deleteMenuItemId),
        );
        handleCloseDeleteModal();
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="menu-management">
        <div className="menu-section">
          {menuData.length === 0 ? (
            <p>메뉴를 추가해주세요.</p>
          ) : (
            <div className="menu-list">
              {menuData.map(menu => (
                <div key={menu.menu_pk} className="menu-list-oneMenu">
                  <div className="menu-list-oneMenu-table">
                    <div className="picanddata">
                      <div className="menu-list-oneMenu-tablePic">
                        <img
                          src={
                            menu.menu_pic ? menu.menu_pic : "default_image_url"
                          }
                          alt={menu.menu_name}
                        />{" "}
                        {/* 이미지 URL을 확인 */}
                      </div>
                      <div className="menu-list-oneMenu-tableData">
                        <h3 className="menu-list-name">{menu.menu_name}</h3>
                        <p className="menu-list-content">{menu.menu_content}</p>
                        <p className="menu-list-price">{menu.menu_price}원</p>
                      </div>
                    </div>

                    <div className="status-action">
                      <div className="menu-list-status">
                        <button
                          className="menu-list-select"
                          onClick={() => handleStatusToggle(menu)}
                        >
                          {menu.menu_state === 1 ? "판매중" : "판매중지"}
                        </button>
                      </div>
                      <div className="menu-list-actions">
                        <button
                          className="btn"
                          onClick={() => handleOpenEditModal(menu)}
                        >
                          수정
                        </button>
                        <button
                          className="btn--cancel"
                          onClick={() => handleOpenDeleteModal(menu.menu_pk)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="menu-settings">
          <div className="menu-upper">
            <div className="menu-add">
              <button className="btn" onClick={handleOpenModal}>
                메뉴 추가
              </button>
              {/* <button className="btn" onClick={handleOpenModal}>
                카테고리 추가
              </button> */}
            </div>
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
                  value={
                    newMenuItem.menu_name ||
                    (isEditMode ? editMenuItem.menu_name : "")
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu_content">메뉴 설명</label>
                <input
                  type="text"
                  id="menu_content"
                  name="menu_content"
                  value={
                    newMenuItem.menu_content ||
                    (isEditMode ? editMenuItem.menu_content : "")
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu_price">가격</label>
                <input
                  type="text"
                  id="menu_price"
                  name="menu_price"
                  value={
                    newMenuItem.menu_price ||
                    (isEditMode ? editMenuItem.menu_price : "")
                  }
                  onChange={handleInputChange}
                />
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

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseDeleteModal}>
              &times;
            </span>
            <h2>메뉴 삭제</h2>
            <p>정말로 이 메뉴를 삭제하시겠습니까?</p>
            <button className="btn--cancel" onClick={handleDeleteMenuItem}>
              삭제
            </button>
            <button className="btn" onClick={handleCloseDeleteModal}>
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuManagement;
