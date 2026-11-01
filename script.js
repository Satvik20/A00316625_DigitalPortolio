"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });
}

const projectGrid = document.querySelector("#project-grid");
const projectsToggle = document.querySelector(".projects-toggle");
const visibleProjectCount = 6;

if (projectGrid && projectsToggle) {
  const totalProjects = projectGrid.children.length;

  const setExpanded = (expanded) => {
    projectGrid.classList.toggle("is-collapsed", !expanded);
    projectsToggle.setAttribute("aria-expanded", String(expanded));
    projectsToggle.textContent = expanded ? "Show fewer projects" : `Show all ${totalProjects} projects`;
  };

  if (totalProjects > visibleProjectCount) {
    projectsToggle.hidden = false;
    setExpanded(false);

    projectsToggle.addEventListener("click", () => {
      const expanded = projectsToggle.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
      if (expanded) {
        document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

const videoPlayerContainer = document.querySelector("#video-player-container");

const pitchVideoUrl = "https://youtu.be/-Cjr-plCZPk";

if (videoPlayerContainer) {
  const youtubeMatch = pitchVideoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i);
  // YouTube refuses embeds without a referrer (error 153), which file:// pages never send.
  if (youtubeMatch && location.protocol === "file:") {
    const videoId = youtubeMatch[1];
    const link = document.createElement("a");
    link.className = "video-fallback";
    link.href = `https://www.youtube.com/watch?v=${videoId}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Watch the pitch video on YouTube (opens in a new tab)");
    const thumb = document.createElement("img");
    thumb.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    thumb.alt = "";
    const play = document.createElement("span");
    play.className = "video-fallback-play";
    play.textContent = "▶ Watch on YouTube";
    link.append(thumb, play);
    videoPlayerContainer.appendChild(link);
  } else if (youtubeMatch) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0`;
    iframe.title = "Pitch video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.aspectRatio = "16 / 9";
    iframe.style.border = "0";
    videoPlayerContainer.appendChild(iframe);
  }
}
