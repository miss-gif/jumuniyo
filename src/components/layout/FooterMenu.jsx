import React, { useEffect, useState } from "react";
import projectInfo from "../../json/user/footer.json";

const FooterMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // JSON 파일로부터 데이터 로드
    setMenuItems(projectInfo);
  }, []);

  return (
    <div className="footer__menu">
      <div className="inner">
        <ul className="footer__menu__list">
          {menuItems.map((item, index) => (
            <li key={index} className="footer__menu__item">
              <a href={item.path}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterMenu;
