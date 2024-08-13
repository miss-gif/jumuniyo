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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [deleteMenuItemId, setDeleteMenuItemId] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({
    menu_name: "",
    menu_content: "",
    menu_price: "",
    menu_state: 1,
    menu_cat_pk: "",
    img: null,
  });
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryItem, setEditCategoryItem] = useState(null); // 카테고리 수정

  const [menuOptions, setMenuOptions] = useState({});

  const [newOption, setNewOption] = useState({
    optionName: "",
    optionPrice: "",
  });

  const [editOption, setEditOption] = useState({
    optionPk: null,
    optionName: "",
    optionPrice: "",
  });

  //모달
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedMenuOptions, setSelectedMenuOptions] = useState([]);
  const [selectedMenuPk, setSelectedMenuPk] = useState(null);

  const handleOpenOptionModal = async menu_pk => {
    setSelectedMenuPk(menu_pk);
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.get(`/api/menu/option/${menu_pk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.statusCode === 1) {
        setSelectedMenuOptions(response.data.resultData);
        setIsOptionModalOpen(true);
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseOptionModal = () => {
    setIsOptionModalOpen(false);
    setSelectedMenuOptions([]);
    setSelectedMenuPk(null);
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");

    const fetchMenuData = async () => {
      try {
        const response = await axios.get("/api/owner/menu", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.statusCode === 1) {
          const categories = response.data.resultData;
          const updatedCategories = categories.map(category => ({
            ...category,
            menu: category.menu.map(menu => ({
              ...menu,
              menu_pic: menu.menu_pic
                ? `/${menu.menu_pic}`
                : "default_image_url",
            })),
          }));

          setCategories(updatedCategories);
          setMenuData(updatedCategories.map(cat => cat.menu).flat());
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
      menu_cat_pk: "",
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
    setNewMenuItem({
      menu_name: menu.menu_name,
      menu_content: menu.menu_content,
      menu_price: menu.menu_price,
      menu_state: menu.menu_state,
      menu_cat_pk: menu.menu_cat_pk,
      img: null,
    });
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
    if (!newMenuItem.menu_cat_pk) {
      setError("카테고리를 선택해주세요.");
      return;
    }

    const accessToken = getCookie("accessToken");

    const formData = new FormData();
    formData.append(
      "p",
      JSON.stringify({
        menu_name: newMenuItem.menu_name,
        menu_content: newMenuItem.menu_content,
        menu_price: newMenuItem.menu_price,
        menu_state: newMenuItem.menu_state,
        menu_cat_pk: newMenuItem.menu_cat_pk,
      }),
    );
    formData.append("pic", newMenuItem.img);

    try {
      const response = await axios.post("/api/owner/menu", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode === 1) {
        const newMenu = {
          ...response.data.resultData,
          menu_pic: `/${response.data.resultData.menu_pic}`,
        };

        setCategories(prevCategories => {
          return prevCategories
            .filter(category => category.menu_category !== null) // null이 아닌 항목만 필터링
            .map(category => {
              if (
                category.menu_category.menu_cat_pk === newMenuItem.menu_cat_pk
              ) {
                return {
                  ...category,
                  menu: [...category.menu, newMenu],
                };
              }
              return category;
            });
        });

        setMenuData(
          prevMenuData =>
            [...prevMenuData, newMenu].filter(
              menu => menu.menu_cat_pk !== null,
            ), // null이 아닌 항목만 필터링
        );
        handleCloseModal();
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
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
        menu_cat_pk: newMenuItem.menu_cat_pk || editMenuItem.menu_cat_pk,
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
                  menu_pic: `/${response.data.resultData.menu_pic}`,
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
        setCategories(prevCategories =>
          prevCategories.map(category => ({
            ...category,
            menu: category.menu.filter(
              menu => menu.menu_pk !== deleteMenuItemId,
            ),
          })),
        );
        handleCloseDeleteModal();
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 카테고리 수정 모달 열기
  const handleOpenEditCategoryModal = category => {
    setEditCategoryItem(category);
    setNewCategory(category.menu_category.menu_cat_name);
    setIsCategoryModalOpen(true);
  };

  // 카테고리 수정 처리
  const handleEditCategory = async () => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.patch(
        "/api/menu_category",
        {
          menu_cat_pk: editCategoryItem.menu_category.menu_cat_pk,
          menu_cat_name: newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1) {
        setCategories(prevCategories =>
          prevCategories
            .filter(category => category.menu_category !== null) // null이 아닌 항목만 필터링
            .map(category =>
              category.menu_category.menu_cat_pk ===
              editCategoryItem.menu_category.menu_cat_pk
                ? {
                    ...category,
                    menu_category: {
                      ...category.menu_category,
                      menu_cat_name: newCategory,
                    },
                  }
                : category,
            ),
        );
        handleCloseCategoryModal();
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 카테고리 삭제 처리
  const handleDeleteCategory = async menu_cat_pk => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.delete(`/api/menu_category/${menu_cat_pk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.statusCode === 1) {
        setCategories(prevCategories =>
          prevCategories
            .filter(category => category.menu_category !== null) // null이 아닌 항목만 필터링
            .filter(
              category => category.menu_category.menu_cat_pk !== menu_cat_pk,
            ),
        );
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenCategoryModal = () => {
    setEditCategoryItem(null); // 새 카테고리 추가 시 수정 모드 해제
    setNewCategory(""); // 새 카테고리 이름 초기화
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => setIsCategoryModalOpen(false);

  const handleAddCategory = async () => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.post(
        "/api/menu_category",
        {
          menu_category_name: newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1) {
        const newCategoryData = {
          menu_category: {
            menu_cat_pk: response.data.resultData.menu_cat_pk,
            menu_cat_name: newCategory,
          },
          menu: [],
        };

        setCategories(prevCategories => [...prevCategories, newCategoryData]);
        handleCloseCategoryModal();
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

  const validCategories = categories.filter(
    category => category.menu_category !== null,
  );

  // 카테고리 순서 바꾸 기
  const handleReorderCategory = async (menu_cat_pk, position) => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.patch(
        "/api/menu_category/position",
        {
          menu_cat_pk,
          position,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1) {
        setCategories(prevCategories => {
          // 순서 변경 로직 적용
          const updatedCategories = [...prevCategories];
          const movedCategory = updatedCategories.find(
            category => category.menu_category.menu_cat_pk === menu_cat_pk,
          );

          // 기존 위치에서 제거
          updatedCategories.splice(updatedCategories.indexOf(movedCategory), 1);

          // 새로운 위치에 삽입
          updatedCategories.splice(position - 1, 0, movedCategory);

          return updatedCategories;
        });
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFetchOptions = async menu_pk => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.get(`/api/menu/option/${menu_pk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.statusCode === 1) {
        setMenuOptions(prevOptions => ({
          ...prevOptions,
          [menu_pk]: response.data.resultData,
        }));
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddOption = async menu_pk => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.post(
        "/api/menu/option/owner",
        {
          optionMenuPk: menu_pk,
          optionName: newOption.optionName,
          optionPrice: parseInt(newOption.optionPrice, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1) {
        // 성공적으로 추가된 옵션을 상태에 반영
        setMenuOptions(prevOptions => ({
          ...prevOptions,
          [menu_pk]: [
            ...(prevOptions[menu_pk] || []),
            response.data.resultData,
          ],
        }));
        // 옵션 입력 필드 초기화
        setNewOption({ optionName: "", optionPrice: "" });
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 옵션 수정 함수
  const handleEditOption = option => {
    setEditOption({
      optionPk: option.optionPk,
      optionName: option.optionName,
      optionPrice: option.optionPrice,
    });
  };

  const handleUpdateOption = async menu_pk => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.put(
        "/api/menu/option/owner",
        {
          optionPk: editOption.optionPk,
          optionName: editOption.optionName,
          optionPrice: parseInt(editOption.optionPrice, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1) {
        setMenuOptions(prevOptions => ({
          ...prevOptions,
          [menu_pk]: prevOptions[menu_pk].map(option =>
            option.optionPk === editOption.optionPk
              ? response.data.resultData
              : option,
          ),
        }));
        setEditOption({ optionPk: null, optionName: "", optionPrice: "" });
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 옵션 삭제 함수
  const handleDeleteOption = async (optionPk, menu_pk) => {
    const accessToken = getCookie("accessToken");

    try {
      const response = await axios.delete(
        `/api/menu/option/owner/${optionPk}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.statusCode === 1) {
        setMenuOptions(prevOptions => ({
          ...prevOptions,
          [menu_pk]: prevOptions[menu_pk].filter(
            option => option.optionPk !== optionPk,
          ),
        }));
      } else {
        throw new Error(response.data.resultMsg || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="menu-management">
        <div className="menu-section">
          {categories.length === 0 ? (
            <p>먼저 카테고리를 추가해주세요.</p>
          ) : (
            categories
              .filter(category => category.menu_category !== null)
              .map((category, index) => (
                <div
                  className="toggle-category"
                  key={category.menu_category.menu_cat_pk}
                >
                  <h3 className="menu-category__title">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {category.menu_category.menu_cat_name}
                    </div>
                    <div className="menu-category__title-btn">
                      <button
                        className="btn"
                        onClick={() =>
                          handleReorderCategory(
                            category.menu_category.menu_cat_pk,
                            index > 0 ? index : 1,
                          )
                        }
                        disabled={index === 0}
                      >
                        ▲
                      </button>
                      <button
                        className="btn"
                        onClick={() =>
                          handleReorderCategory(
                            category.menu_category.menu_cat_pk,
                            index + 2 < categories.length
                              ? index + 2
                              : categories.length,
                          )
                        }
                        disabled={index === categories.length - 1}
                      >
                        ▼
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleOpenEditCategoryModal(category)}
                      >
                        수정
                      </button>
                      <button
                        className="btn--cancel"
                        onClick={() =>
                          handleDeleteCategory(
                            category.menu_category.menu_cat_pk,
                          )
                        }
                      >
                        삭제
                      </button>
                    </div>
                  </h3>

                  <div className="menu-list">
                    {category.menu.length === 0 ? (
                      <p
                        style={{
                          padding: "40px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        이 카테고리에 아직 메뉴가 없습니다.
                      </p>
                    ) : (
                      category.menu.map(menu => (
                        <div key={menu.menu_pk} className="menu-list-oneMenu">
                          <div className="menu-list-oneMenu-table">
                            <div className="picanddata">
                              <div className="menu-list-oneMenu-tablePic">
                                <img
                                  src={
                                    menu.menu_pic
                                      ? menu.menu_pic
                                      : "default_image_url"
                                  }
                                  alt={menu.menu_name}
                                />
                              </div>
                              <div className="menu-list-oneMenu-tableData">
                                <h3 className="menu-list-name">
                                  {menu.menu_name}
                                </h3>
                                <p className="menu-list-content">
                                  {menu.menu_content}
                                </p>
                                <p className="menu-list-price">
                                  {menu.menu_price}원
                                </p>
                              </div>
                            </div>

                            <div className="status-action">
                              <div className="menu-list-status">
                                {menu.menu_state === 1 ? (
                                  <button
                                    className="menu-list-select"
                                    onClick={() => handleStatusToggle(menu)}
                                  >
                                    판매중
                                  </button>
                                ) : (
                                  <button
                                    className="menu-list-select-soldOut"
                                    onClick={() => handleStatusToggle(menu)}
                                  >
                                    판매중지
                                  </button>
                                )}
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
                                  onClick={() =>
                                    handleOpenDeleteModal(menu.menu_pk)
                                  }
                                >
                                  삭제
                                </button>
                                <button
                                  className="btn"
                                  onClick={() =>
                                    handleOpenOptionModal(menu.menu_pk)
                                  }
                                >
                                  옵션 보기
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
        <div className="menu-settings">
          <div className="menu-upper">
            <div className="menu-add">
              <button className="btn" onClick={handleOpenModal}>
                메뉴 추가
              </button>
              <button className="btn" onClick={handleOpenCategoryModal}>
                카테고리 추가
              </button>
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
            <br />
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
                <label htmlFor="menu_cat_pk">카테고리</label>
                <select
                  id="menu_cat_pk"
                  name="menu_cat_pk"
                  value={newMenuItem.menu_cat_pk}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    카테고리를 선택하세요
                  </option>
                  {categories
                    .filter(category => category.menu_category !== null)
                    .map(category => (
                      <option
                        key={category.menu_category.menu_cat_pk}
                        value={category.menu_category.menu_cat_pk}
                      >
                        {category.menu_category.menu_cat_name}
                      </option>
                    ))}
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

      {isCategoryModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseCategoryModal}>
              &times;
            </span>
            <h2>{editCategoryItem ? "카테고리 수정" : "새 카테고리 추가"}</h2>
            <br />
            <form>
              <div className="form-group">
                <label htmlFor="menuCategoryName">카테고리 이름</label>
                <input
                  type="text"
                  id="menuCategoryName"
                  name="menuCategoryName"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
              </div>
              <button
                className="btn"
                type="button"
                onClick={
                  editCategoryItem ? handleEditCategory : handleAddCategory
                }
              >
                {editCategoryItem ? "수정" : "추가"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isOptionModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseOptionModal}>
              &times;
            </span>
            <h2>옵션 관리</h2>
            <ul>
              {selectedMenuOptions.map(option => (
                <li key={option.optionPk}>
                  {editOption.optionPk === option.optionPk ? (
                    <div>
                      <input
                        type="text"
                        value={editOption.optionName}
                        onChange={e =>
                          setEditOption(prev => ({
                            ...prev,
                            optionName: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="number"
                        value={editOption.optionPrice}
                        onChange={e =>
                          setEditOption(prev => ({
                            ...prev,
                            optionPrice: e.target.value,
                          }))
                        }
                      />
                      <button
                        onClick={() => handleUpdateOption(selectedMenuPk)}
                      >
                        저장
                      </button>
                      <button
                        onClick={() =>
                          setEditOption({
                            optionPk: null,
                            optionName: "",
                            optionPrice: "",
                          })
                        }
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div>
                      {option.optionName} - {option.optionPrice}원
                      <button onClick={() => handleEditOption(option)}>
                        수정
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteOption(option.optionPk, selectedMenuPk)
                        }
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                placeholder="옵션 이름"
                value={newOption.optionName}
                onChange={e =>
                  setNewOption(prev => ({
                    ...prev,
                    optionName: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                placeholder="옵션 가격"
                value={newOption.optionPrice}
                onChange={e =>
                  setNewOption(prev => ({
                    ...prev,
                    optionPrice: e.target.value,
                  }))
                }
              />
              <button onClick={() => handleAddOption(selectedMenuPk)}>
                옵션 추가
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuManagement;
