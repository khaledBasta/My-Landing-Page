/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const numberOfSections = sections.length;
const PageHeader = document.querySelector(".page__header");
const nav = document.querySelector(".navbar__menu");
const navList = document.querySelector("#navbar__list");
const scrollTopButton = document.querySelector(".scroll-top");
// console.log(navList);
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Define generateAnchors function to generate anchors
const generateAnchors = () => {
  const fragment = document.createDocumentFragment();
  for (const section of sections) {
    const content = section.getAttribute("data-nav");
    const link = section.getAttribute("id");
    const newListItem = document.createElement("li");
    const newAnchor = document.createElement("a");
    newAnchor.classList.add("menu__link");
    newAnchor.setAttribute("href", `#${link}`);
    newAnchor.textContent = content;
    newListItem.appendChild(newAnchor);
    fragment.appendChild(newListItem);
  }
  return fragment;
};

// Define isVisible function to detect is a section visible in the viewport
const isVisible = function () {
  for (const section of sections) {
    const elementBounding = section.getBoundingClientRect();

    if (elementBounding.top >= -100 && elementBounding.top <= 800) {
      return section;
    }
  }
};

// Define getSelectedAnchor function to get the anchor that's related to a section
const getSelectedAnchor = (selectedSection) => {
  const sectionID = selectedSection.getAttribute("id");
  const selectedAnchor = document.querySelector(
    `.navbar__menu a[href*='${sectionID}']`
  );
  return selectedAnchor;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
  const newAnchors = generateAnchors();
  navList.appendChild(newAnchors);

  // by default if the scroll at the top of the page add class active to the first anchor
  if (window.scrollY === 0) {
    const firstAnchor = getSelectedAnchor(sections[0]);
    firstAnchor.classList.add("active");
  }
};

// Add class 'active' to section when near top of viewport
const addActive = (upComingActiveSection) => {
  const currentActiveSection = document.querySelector("section.active");
  if (currentActiveSection !== null) {
    currentActiveSection.classList.remove("active");
    const currentActiveAnchor = getSelectedAnchor(currentActiveSection);
    currentActiveAnchor.classList.remove("active");
  }
  if (upComingActiveSection !== undefined) {
    upComingActiveSection.classList.add("active");
    const upComingActiveAnchor = getSelectedAnchor(upComingActiveSection);
    upComingActiveAnchor.classList.add("active");
  }
};

// Scroll to anchor ID using scrollTO event
const scrolling = (topValue) => {
  window.scrollTo({
    top: topValue,
    behavior: "smooth",
  });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", buildNav);

// Scroll to section on link click
nav.addEventListener("click", function (evt) {
  // if the clicked element is an anchor
  if (evt.target.nodeName === "A") {
    evt.preventDefault();
    const id = evt.target.getAttribute("href");
    const highlightedSection = document.querySelector(`${id}`);

    // Get the number of pixels from the top of the closest relatively positioned parent element.
    const topValue = highlightedSection.offsetTop;

    // Scroll to that value
    scrolling(topValue);

    // Hide mobile menu when starting scroll
    nav.classList.remove("clicked");
  }
  // if the clicked element is the icon
  if (evt.target.nodeName === "I") {
    // Show and Hide mobile menu when clicking on burger icon
    nav.classList.toggle("clicked");
  }
});

// Set sections as active
document.addEventListener("scroll", function () {
  // Hide mobile menu when starting scroll
  nav.classList.remove("clicked");

  // get the viewed section in the viewport
  const visibleSection = isVisible();

  // Add class active to the viewed section
  addActive(visibleSection);

  // If we reach to the top of the page add class active to the first section and anchor
  if (window.scrollY === 0) {
    sections[0].classList.add("active");
    const firstAnchor = getSelectedAnchor(sections[0]);
    firstAnchor.classList.add("active");
  }

  // Show scrollTopButton when reaching this value at scrolling
  if (window.scrollY > window.innerHeight - 400) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }
});

// Scroll to top of the page on button click
scrollTopButton.addEventListener("click", function () {
  scrolling(0);
});
