/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import "./ProjectPage.scss";

const links = {
  "project-hero": "프로젝트 소개",
  "project-planning": "기획 의도",
  "project-core-features": "핵심 기능",
  "project-tech-stack": "기술 스택",
  "project-schedule": "진행 일정",
  "project-solving-process": "문제 해결 과정",
  "project-roles": "역할 분담",
  "project-metrics": "성과 지표",
  "project-results": "프로젝트 결과물",
  "project-future-improvements": "향후 개선 방향",
};

const Nav = styled.ul`
  position: fixed;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  list-style: none;
  z-index: 10;
  border-radius: 4px;
`;

const NavLink = styled.a`
  margin: 5px 0;
  cursor: pointer;
  color: #00c4bd;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
    color: #00798d;
  }
`;

const ProjectPage = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSectionId = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 2) {
          currentSectionId = section.getAttribute("id");
        }
      });

      setActiveLink(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="project-page">
      <Nav>
        {Object.keys(links).map(id => (
          <li key={id}>
            <NavLink
              href={`#${id}`}
              className={activeLink === id ? "active" : ""}
            >
              {links[id]}
            </NavLink>
          </li>
        ))}
      </Nav>

      <div className="project-page-cover">
        <section
          id="project-hero"
          className="project-section project-section--hero"
        >
          <h2 className="project-section__title">프로젝트 소개</h2>
          <p className="project-section__description">
            <em className="project-section__highlight">주문이요</em>는 모든
            연령층이 쉽게 사용할 수 있는 편리한 음식 주문 플랫폼입니다.
            <br />
            쉽고 빠른 주문 경험을 제공하여 언제 어디서든 맛있는 음식을 간편하게
            주문할 수 있도록 돕습니다. <br /> 또한, 음식점 사장님을 위한 사업자
            서비스를 통해 매장 소개, 메뉴 등록, 주문 접수, 리뷰 관리 등 매장
            관리 기능을 제공하여 매출 증대를 지원합니다.
          </p>
        </section>

        <section
          id="project-planning"
          className="project-section project-section--planning"
        >
          <h2 className="project-section__title">기획 의도</h2>
          <ul className="project-section__list">
            <li className="project-section__item">
              <h3 className="project-section__subtitle">고객 편의성 극대화</h3>
              <p className="project-section__text">
                언제 어디서든 앱/웹을 통해 간편하게 음식을 주문하고 배달받을 수
                있도록 합니다. 다양한 지역 음식점의 메뉴를 한 곳에서 비교하고
                선택할 수 있습니다. 주문 접수부터 주문 완료까지 모든 과정을
                확인할 수 있으며, 다양한 결제 수단을 지원하여 편리한 결제를
                돕습니다.
              </p>
            </li>
            <li className="project-section__item">
              <h3 className="project-section__subtitle">
                소상공인 및 지역 상권 활성화
              </h3>
              <p className="project-section__text">
                오프라인 매장만 운영하던 소상공인에게 온라인 판매 채널을
                제공하여 매출 증대를 지원합니다. 소상공인의 홍보 및 마케팅을
                지원하여 운영 효율을 높입니다. 매출을 통해 지역 경제 활성화에
                기여합니다.
              </p>
            </li>
            <li className="project-section__item">
              <h3 className="project-section__subtitle">지속 가능한 성장</h3>
              <p className="project-section__text">
                주문 데이터, 배달 데이터 등을 분석하여 고객 맞춤형 서비스를
                제공하고 운영 효율을 높입니다. 빅데이터, 인공지능 등 신기술을
                활용하여 새로운 서비스를 개발하고 플랫폼 경쟁력을 강화합니다.
                기부 프로그램 등 사회적 책임을 다하는 활동을 통해 기업 이미지를
                제고하고 지속 가능한 성장을 추구합니다.
              </p>
            </li>
          </ul>
        </section>

        <section
          id="project-core-features"
          className="project-section project-section--core-features"
        >
          <h2 className="project-section__title">핵심 기능</h2>
          <ul className="project-section__list">
            <li className="project-section__item">
              회원가입: 간편한 회원가입 및 로그인
            </li>
            <li className="project-section__item">
              음식 주문: 다양한 메뉴 검색 및 주문
            </li>
            <li className="project-section__item">
              결제: 다양한 결제 수단 지원
            </li>
            <li className="project-section__item">
              리뷰: 솔직한 리뷰 작성 및 확인
            </li>
          </ul>
        </section>

        <section
          id="project-tech-stack"
          className="project-section project-section--tech-stack"
        >
          <h2 className="project-section__title">기술 스택</h2>
          <h3 className="project-section__subtitle">프론트엔드</h3>
          <p className="project-section__text">
            React, React Router DOM, Axios, reduxjs/toolkit, emotion, sass, @mui
          </p>
          <h3 className="project-section__subtitle">백엔드</h3>
          <p className="project-section__text">(상세 정보 추가)</p>
        </section>

        <section
          id="project-schedule"
          className="project-section project-section--schedule"
        >
          <h2 className="project-section__title">진행 일정</h2>
          <p className="project-section__text">
            <strong className="project-section__strong">기획 및 설계:</strong>
            2024.06 - 2024.06
            <br />
            <strong className="project-section__strong">
              프론트엔드 개발:
            </strong>
            2024.06 - 2024.06
            <br />
            <strong className="project-section__strong">백엔드 개발:</strong>
            2024.06 - 2024.07
            <br />
            <strong className="project-section__strong">통합 테스트:</strong>
            2024.07
            <br />
            <strong className="project-section__strong">배포 및 런칭:</strong>
            2024.07
          </p>
        </section>

        <section
          id="project-solving-process"
          className="project-section project-section--solving-process"
        >
          <h2 className="project-section__title">문제 해결 과정</h2>
          <p className="project-section__text">
            프로젝트 진행 중 발생한 여러 문제들을 해결하기 위해 다양한 접근
            방식을 시도하였습니다.
          </p>
        </section>

        <section
          id="project-roles"
          className="project-section project-section--roles"
        >
          <h2 className="project-section__title">역할 분담</h2>

          <details className="project-roles__details">
            <summary className="project-roles__summary">곽도억 (팀장)</summary>
            <ul className="project-roles__list">
              <li className="project-roles__item">프로젝트 총괄</li>
              <li className="project-roles__item">gitHub 관리</li>
              <li className="project-roles__item">Figma 작업</li>
              <li className="project-roles__item">Router 관리</li>
              <li className="project-roles__item">공용 컴포넌트 및 레이아웃</li>
              <li className="project-roles__item">로그아웃</li>
              <li className="project-roles__item">위치 기반 식당 검색</li>
              <li className="project-roles__item">카테고리 필터</li>
              <li className="project-roles__item">메뉴 주문/결제</li>
              <li className="project-roles__item">주문 확인</li>
            </ul>
          </details>

          <details className="project-roles__details">
            <summary className="project-roles__summary">김민기 (팀원)</summary>
            <ul className="project-roles__list">
              <li className="project-roles__item">로그인</li>
              <li className="project-roles__item">
                회원가입
                <ul className="project-roles__sub-list">
                  <li className="project-roles__sub-item">유저</li>
                  <li className="project-roles__sub-item">사업자</li>
                </ul>
              </li>
              <li className="project-roles__item">
                마이페이지
                <ul className="project-roles__sub-list">
                  <li className="project-roles__sub-item">유저 정보</li>
                  <li className="project-roles__sub-item">주소</li>
                  <li className="project-roles__sub-item">주문내역</li>
                  <li className="project-roles__sub-item">리뷰 관리</li>
                  <li className="project-roles__sub-item">회원 탈퇴</li>
                </ul>
              </li>
            </ul>
          </details>

          <details className="project-roles__details">
            <summary className="project-roles__summary">권민욱 (팀원)</summary>
            <ul className="project-roles__list">
              <li className="project-roles__item">식당 상세 페이지</li>
              <li className="project-roles__item">장바구니</li>
              <li className="project-roles__item">
                사업자 관리 페이지
                <ul className="project-roles__sub-list">
                  <li className="project-roles__sub-item">주문 관리</li>
                  <li className="project-roles__sub-item">주문 내역</li>
                  <li className="project-roles__sub-item">리뷰 관리</li>
                  <li className="project-roles__sub-item">매장 관리</li>
                  <li className="project-roles__sub-item">통계</li>
                </ul>
              </li>
            </ul>
          </details>

          <p className="project-roles__text">
            백엔드 팀: 이민역, 공영빈, 김동현, 이하늘, 정형우
          </p>
        </section>

        <section
          id="project-metrics"
          className="project-section project-section--metrics"
        >
          <h2 className="project-section__title">성과 지표 (추후 추가)</h2>
          <p className="project-section__text">
            <strong className="project-section__strong">
              일일 활성 사용자 수 (DAU):
            </strong>
            00명 달성
            <br />
            <strong className="project-section__strong">주문 성공률:</strong>
            100%
            <br />
            <strong className="project-section__strong">사용자 만족도:</strong>
            4.8/5
          </p>
        </section>

        <section
          id="project-results"
          className="project-section project-section--results"
        >
          <h2 className="project-section__title">프로젝트 결과물</h2>
          <p className="project-section__text">
            <em className="project-section__highlight">
              <a href="https://34.64.63.109/" className="project-section__link">
                주문이요
              </a>
            </em>
            앱은 현재 0명 이상의 활성 사용자를 보유하고 있으며, 사용자들에게
            빠르고 신뢰할 수 있는 주문 서비스를 제공하고 있습니다.
          </p>
        </section>

        <section
          id="project-future-improvements"
          className="project-section project-section--future-improvements"
        >
          <h2 className="project-section__title">향후 개선 방향</h2>
          <p className="project-section__text">
            <span className="project-section__improvement">
              - 추가 기능 확장 (예: 포인트 시스템, 추천 메뉴 기능)
            </span>
            <span className="project-section__improvement">
              - 사용자 인터페이스 개선
            </span>
            <span className="project-section__improvement">
              - 지속적인 성능 최적화 및 안정성 강화
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;
