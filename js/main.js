// ==============================
// 1. 기본 설정 / 상태
// ==============================
const GITHUB_USERNAME = "tjdxo";
const SCROLL_TOP_THRESHOLD = 300;
const HEADER_SCROLL_THRESHOLD = 60;
const OBSERVER_THRESHOLD = 0.2;

const state = {
  theme: localStorage.getItem("theme") || "light",
  projects: [],
  projectsStatus: "idle", // idle | loading | success | error | empty
  projectsErrorMessage: "",
  formErrors: {
    name: "",
    email: "",
    message: "",
  },
};

// ==============================
// 2. DOM 선택
// ==============================
const html = document.documentElement;
const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const scrollTopButton = document.querySelector("#scroll-top");

const projectsContainer = document.querySelector("#projects-container");

const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const formSuccess = document.querySelector("#form-success");

const revealElements = document.querySelectorAll(".reveal");

// ==============================
// 3. 유틸 함수
// ==============================
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const escapeHtml = (value) => {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
};

// ==============================
// 4. 테마 관련 함수
// ==============================
const applyTheme = (theme) => {
  state.theme = theme;
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환");
};

const toggleTheme = () => {
  const nextTheme = state.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
};

// ==============================
// 5. 모바일 메뉴 관련 함수
// ==============================
const toggleMobileMenu = () => {
  navMenu.classList.toggle("active");

  const isExpanded = navMenu.classList.contains("active");
  navToggle.setAttribute("aria-expanded", String(isExpanded));
  navToggle.setAttribute("aria-label", isExpanded ? "메뉴 닫기" : "메뉴 열기");
};

const closeMobileMenu = () => {
  navMenu.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "메뉴 열기");
};

// ==============================
// 6. 스크롤 UI 함수
// ==============================
const handleScrollUI = () => {
  const scrollY = window.scrollY;

  if (scrollY >= HEADER_SCROLL_THRESHOLD) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (scrollY >= SCROLL_TOP_THRESHOLD) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// ==============================
// 7. 부드러운 스크롤
// ==============================
const handleNavLinkClick = (event) => {
  event.preventDefault();

  const targetId = event.currentTarget.getAttribute("href");
  const targetSection = document.querySelector(targetId);

  if (!targetSection) return;

  targetSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  closeMobileMenu();
};

// ==============================
// 8. Projects 렌더링
// ==============================
const renderProjects = () => {
  projectsContainer.setAttribute("aria-busy", String(state.projectsStatus === "loading"));
  if (state.projectsStatus === "loading") {
    projectsContainer.innerHTML = `
      <div class="state-box">
        <p>로딩 중...</p>
      </div>
    `;
    return;
  }

  if (state.projectsStatus === "error") {
    projectsContainer.innerHTML = `
      <div class="state-box">
        <p>${escapeHtml(state.projectsErrorMessage || "프로젝트를 불러올 수 없습니다.")}</p>
        <button class="retry-button" id="retry-projects-button">다시 시도</button>
      </div>
    `;
    return;
  }

  if (state.projectsStatus === "empty") {
    projectsContainer.innerHTML = `
      <div class="state-box">
        <p>표시할 프로젝트가 없습니다.</p>
      </div>
    `;
    return;
  }

  if (state.projectsStatus === "success") {
    const cardsHtml = state.projects
      .map((project) => {
        const {
          name,
          description,
          stargazers_count,
          language,
          html_url,
          homepage,
        } = project;

        return `
          <article class="project-card">
            <h4>${escapeHtml(name)}</h4>
            <p>${escapeHtml(description || "설명이 없는 프로젝트입니다.")}</p>

            <div class="project-meta">
              <span>⭐ Stars: ${stargazers_count}</span>
              <span>💻 ${escapeHtml(language || "Unknown")}</span>
            </div>

            <div class="project-links">
              <a href="${html_url}" target="_blank" rel="noopener noreferrer">GitHub</a>
              ${
                homepage
                  ? `<a href="${homepage}" target="_blank" rel="noopener noreferrer">Demo</a>`
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");

    projectsContainer.innerHTML = `
      <div class="projects-grid">
        ${cardsHtml}
      </div>
    `;
  }
};

// ==============================
// 9. GitHub API 호출
// ==============================
const fetchProjects = async () => {
  state.projectsStatus = "loading";
  state.projectsErrorMessage = "";
  renderProjects();

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API 요청 제한에 걸렸습니다. 잠시 후 다시 시도해주세요.");
      }

      if (response.status === 404) {
        throw new Error("GitHub 사용자를 찾을 수 없습니다. 아이디를 확인해주세요.");
      }

      throw new Error("프로젝트를 불러올 수 없습니다.");
    }

    const data = await response.json();

    // fork 저장소 제외
    const filteredProjects = data.filter((repo) => !repo.fork);

    // 최근 업데이트 기준 정렬
    filteredProjects.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    state.projects = filteredProjects.slice(0, 6);

    if (state.projects.length === 0) {
      state.projectsStatus = "empty";
    } else {
      state.projectsStatus = "success";
    }

    renderProjects();
  } catch (error) {
    state.projectsStatus = "error";
    state.projectsErrorMessage =
      error.message || "프로젝트를 불러올 수 없습니다.";
    renderProjects();
  }
};

// ==============================
// 10. 폼 검증
// ==============================
const renderFormErrors = () => {
  nameError.textContent = state.formErrors.name;
  emailError.textContent = state.formErrors.email;
  messageError.textContent = state.formErrors.message;
  nameInput.setAttribute("aria-invalid", String(Boolean(state.formErrors.name)));
  emailInput.setAttribute("aria-invalid", String(Boolean(state.formErrors.email)));
  messageInput.setAttribute("aria-invalid", String(Boolean(state.formErrors.message)));
};

const validateName = () => {
  const value = nameInput.value.trim();

  if (!value) {
    state.formErrors.name = "이름을 입력해주세요.";
    return false;
  }

  state.formErrors.name = "";
  return true;
};

const validateEmail = () => {
  const value = emailInput.value.trim();

  if (!value) {
    state.formErrors.email = "이메일을 입력해주세요.";
    return false;
  }

  if (!isValidEmail(value)) {
    state.formErrors.email = "올바른 이메일 형식을 입력해주세요.";
    return false;
  }

  state.formErrors.email = "";
  return true;
};

const validateMessage = () => {
  const value = messageInput.value.trim();

  if (!value) {
    state.formErrors.message = "메시지를 입력해주세요.";
    return false;
  }

  if (value.length < 10) {
    state.formErrors.message = "메시지는 10자 이상 입력해주세요.";
    return false;
  }

  state.formErrors.message = "";
  return true;
};

const validateForm = () => {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  renderFormErrors();

  return isNameValid && isEmailValid && isMessageValid;
};

const clearFormMessages = () => {
  formSuccess.textContent = "";
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  clearFormMessages();

  const isFormValid = validateForm();

  if (!isFormValid) {
    contactForm.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  formSuccess.textContent = "입력값 검증이 완료되었습니다. 데모 폼이므로 메시지는 전송되지 않았습니다.";

  state.formErrors = {
    name: "",
    email: "",
    message: "",
  };

  renderFormErrors();
};

const handleNameInput = () => {
  validateName();
  renderFormErrors();
  clearFormMessages();
};

const handleEmailInput = () => {
  validateEmail();
  renderFormErrors();
  clearFormMessages();
};

const handleMessageInput = () => {
  validateMessage();
  renderFormErrors();
  clearFormMessages();
};

// ==============================
// 11. 스크롤 애니메이션
// ==============================
const setupRevealObserver = () => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: OBSERVER_THRESHOLD,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
};

// ==============================
// 12. 이벤트 연결
// ==============================
navToggle.addEventListener("click", toggleMobileMenu);
themeToggle.addEventListener("click", toggleTheme);
scrollTopButton.addEventListener("click", scrollToTop);

navLinks.forEach((link) => {
  link.addEventListener("click", handleNavLinkClick);
});

window.addEventListener("scroll", handleScrollUI);

contactForm.addEventListener("submit", handleFormSubmit);
nameInput.addEventListener("input", handleNameInput);
emailInput.addEventListener("input", handleEmailInput);
messageInput.addEventListener("input", handleMessageInput);

// Projects 영역의 재시도 버튼은 동적으로 생성되므로 이벤트 위임 사용
projectsContainer.addEventListener("click", (event) => {
  if (event.target.id === "retry-projects-button") {
    fetchProjects();
  }
});

// ==============================
// 13. 초기 실행
// ==============================
const init = () => {
  applyTheme(state.theme);
  handleScrollUI();
  setupRevealObserver();
  fetchProjects();
};

init();
