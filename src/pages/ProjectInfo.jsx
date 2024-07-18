/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

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
  top: 20px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  list-style: none;
  z-index: 1000;
`;

const NavLink = styled.a`
  margin: 5px 0;
  cursor: pointer;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
    color: #0056b3;
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

      <section id="project-hero" className="project-section">
        <h2>프로젝트 소개</h2>
        <p>
          <em>주문이요</em>는 다양한 연령층을 위한 사용자 친화적인 배달
          플랫폼입니다. <br />
          쉽고 빠른 주문 경험을 제공하며, 맛있는 음식과 생필품을 언제 어디서든
          편리하게 받아볼 수 있도록 도와줍니다.
        </p>
      </section>

      <section id="project-planning" className="project-section">
        <h2>기획 의도</h2>
        <ul>
          <li>
            <h3>고객 편의성 극대화</h3>
            <p>
              언제 어디서든 앱/웹을 통해 간편하게 음식, 생필품 등을 주문하고
              배달받을 수 있도록 합니다. 다양한 지역 음식점, 마트, 편의점 등의
              상품을 한 곳에서 비교하고 선택할 수 있습니다. 실시간 배달 추적
              기능을 통해 주문 접수부터 배달 완료까지 모든 과정을 확인할 수
              있으며, 다양한 결제 수단을 지원하여 편리한 결제를 돕습니다.
            </p>
          </li>
          <li>
            <h3>소상공인 및 지역 상권 활성화</h3>
            <p>
              오프라인 매장만 운영하던 소상공인에게 온라인 판매 채널을 제공하여
              매출 증대를 지원합니다. 플랫폼 내 광고, 할인 이벤트 등을 통해
              소상공인의 홍보 및 마케팅을 지원하며, 배달 대행 서비스를 제공하여
              운영 효율을 높입니다. 지역 특산물, 맛집 등 지역 기반 상품을
              발굴하고 판매하여 지역 경제 활성화에 기여합니다.
            </p>
          </li>
          <li>
            <h3>배달원 처우 개선 및 안전 강화</h3>
            <p>
              배달원에게 합리적인 수수료를 지급하고, 건당 수수료 외 추가 수입을
              얻을 수 있는 시스템을 마련합니다. 안전 운행 교육을 강화하고, 사고
              발생 시 보험 혜택을 제공하여 배달원의 안전을 보장합니다. 배달 중
              쉴 수 있는 휴식 공간을 마련하고, 피드백 시스템을 구축하여 문제
              발생 시 신속하게 해결합니다.
            </p>
          </li>
          <li>
            <h3>지속 가능한 성장</h3>
            <p>
              주문 데이터, 배달 데이터 등을 분석하여 고객 맞춤형 서비스를
              제공하고 운영 효율을 높입니다. 빅데이터, 인공지능 등 신기술을
              활용하여 새로운 서비스를 개발하고 플랫폼 경쟁력을 강화합니다.
              친환경 배달, 기부 프로그램 등 사회적 책임을 다하는 활동을 통해
              기업 이미지를 제고하고 지속 가능한 성장을 추구합니다.
            </p>
          </li>
        </ul>
      </section>

      <section id="project-core-features" className="project-section">
        <h2>핵심 기능</h2>
        <ul>
          <li>AI 기반 맞춤 추천</li>
          <li>실시간 채팅 상담</li>
          <li>다양한 할인 혜택</li>
          <li>사용자 로그인/회원가입</li>
          <li>음식점 및 메뉴 검색</li>
          <li>주문 및 결제</li>
          <li>실시간 배달 추적</li>
          <li>리뷰 및 평점</li>
        </ul>
      </section>

      <section id="project-tech-stack" className="project-section">
        <h2>기술 스택</h2>
        <h3>프론트엔드</h3>
        <p>React, TypeScript, React Router DOM, Axios</p>
        <h3>백엔드</h3>
        <p>Node.js, Express, MongoDB, PostgreSQL</p>
      </section>

      <section id="project-schedule" className="project-section">
        <h2>진행 일정</h2>
        <p>
          <strong>기획 및 설계:</strong> 2024.06 - 2024.06
          <br />
          <strong>프론트엔드 개발:</strong> 2024.06 - 2024.06
          <br />
          <strong>백엔드 개발:</strong> 2024.06 - 2024.07
          <br />
          <strong>통합 테스트:</strong> 2024.07
          <br />
          <strong>배포 및 런칭:</strong> 2024.07
        </p>
      </section>

      <section id="project-solving-process" className="project-section">
        <h2>문제 해결 과정</h2>
        <p>
          프로젝트 진행 중 발생한 여러 문제들을 해결하기 위해 다양한 접근 방식을
          시도하였습니다. 예를 들면, 성능 문제 해결을 위해 코드 스플리팅을
          적용하거나 데이터베이스 최적화를 진행하였습니다.
        </p>
      </section>

      <section id="project-roles" className="project-section">
        <h2>역할 분담</h2>
        <p>
          프론트엔드 팀: 곽도억, 김민기, 권민욱
          <br />
          백엔드 팀: 이민역, 공영빈, 김동현, 이하늘, 정형우
        </p>
      </section>

      <section id="project-metrics" className="project-section">
        <h2>성과 지표</h2>
        <p>
          <strong>일일 활성 사용자 수 (DAU):</strong> 00명 달성
          <br />
          <strong>주문 성공률:</strong> 100%
          <br />
          <strong>사용자 만족도:</strong> 4.8/5
        </p>
      </section>

      <section id="project-results" className="project-section">
        <h2>프로젝트 결과물</h2>
        <p>
          <em>주문이요</em> 앱은 현재 00명 이상의 활성 사용자를 보유하고 있으며,
          사용자들에게 빠르고 신뢰할 수 있는 배달 서비스를 제공하고 있습니다.
        </p>
      </section>

      <section id="project-future-improvements" className="project-section">
        <h2>향후 개선 방향</h2>
        <p>
          추가적인 기능 확장, 사용자 인터페이스 개선, 지속적인 성능 최적화를
          계획하고 있습니다.
        </p>
      </section>
    </div>
  );
};

export default ProjectPage;
