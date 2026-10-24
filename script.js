
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const progressLine = document.getElementById("progressLine");
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");

  // Reading progress indicator
  let scrollPending = false;

  function updateProgress() {
    const height =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage =
      height > 0 ? (window.scrollY / height) * 100 : 0;

    progressLine.style.width = `${Math.min(100, percentage)}%`;
    scrollPending = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollPending) {
      requestAnimationFrame(updateProgress);
      scrollPending = true;
    }
  }, { passive: true });

  updateProgress();

  // Responsive navigation
  function closeNavigation() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";

    if (open) {
      closeNavigation();
    } else {
      navigation.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close menu");
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  document.addEventListener("click", (event) => {
    if (
      navigation.classList.contains("open") &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeNavigation();
  });

  // Mission console: each selection changes the entire brief
  const missions = {
    robotics: {
      code: "MISSION / 001",
      category: "ENGINEERING / PHYSICAL SYSTEMS",
      title: "MAKE MACHINES<br>MOVE WITH PURPOSE.",
      description:
        "Explore robotics, mechanical design and engineering challenges that turn precise thinking into real-world performance.",
      url: "https://techfest.org/",
      artClass: "art-robot",
      index: "01"
    },
    code: {
      code: "MISSION / 002",
      category: "COMPUTATION / INTELLIGENT SYSTEMS",
      title: "GIVE YOUR<br>IDEAS A BRAIN.",
      description:
        "Dive into algorithms, programming, artificial intelligence and the logic that transforms information into action.",
      url: "https://techfest.org/competitions",
      artClass: "art-code",
      index: "02"
    },
    innovation: {
      code: "MISSION / 003",
      category: "RESEARCH / CREATIVE THINKING",
      title: "QUESTION WHAT<br>COMES NEXT.",
      description:
        "Challenge conventional thinking, investigate difficult problems and explore fresh approaches to real-world challenges.",
      url: "https://techfest.org/",
      artClass: "art-innovation",
      index: "03"
    },
    discovery: {
      code: "MISSION / 004",
      category: "LEARNING / HANDS-ON DISCOVERY",
      title: "LEARN BY<br>GETTING CLOSER.",
      description:
        "Explore workshops, demonstrations and technical experiences that help turn curiosity into practical understanding.",
      url: "https://techfest.org/workshops",
      artClass: "art-discovery",
      index: "04"
    }
  };

  const missionTabs = document.querySelectorAll(".mission-tab");
  const detail = document.getElementById("missionDetail");
  const detailArt = document.getElementById("detailArt");
  const missionCode = document.getElementById("missionCode");
  const missionCategory = document.getElementById("missionCategory");
  const missionTitle = document.getElementById("missionTitle");
  const missionDescription = document.getElementById("missionDescription");
  const missionLink = document.getElementById("missionLink");
  const detailIndex = document.getElementById("detailIndex");

  let currentMission = "robotics";

  function selectMission(key) {
    const mission = missions[key];

    if (!mission || key === currentMission) return;

    currentMission = key;

    missionTabs.forEach((tab) => {
      const selected = tab.dataset.mission === key;

      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });

    detail.classList.add("changing");

    window.setTimeout(() => {
      missionCode.textContent = mission.code;
      missionCategory.textContent = mission.category;
      missionTitle.innerHTML = mission.title;
      missionDescription.textContent = mission.description;
      missionLink.href = mission.url;
      detailIndex.innerHTML = `${mission.index} <span>/ 04</span>`;

      detailArt.className = `detail-art ${mission.artClass}`;

      detail.classList.remove("changing");
      detail.classList.add("changed");

      window.setTimeout(() => {
        detail.classList.remove("changed");
      }, 350);
    }, 140);
  }

  missionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      selectMission(tab.dataset.mission);
    });
  });

  // Make internal navigation smooth without interfering with external links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      const target = document.querySelector(selector);

      if (!target) return;

      event.preventDefault();
      closeNavigation();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      if (window.history.replaceState) {
        window.history.replaceState(null, "", selector);
      }
    });
  });
});
