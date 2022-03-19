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
    // console.log(link);
  }
  return fragment;
};

// Define isVisible function to detect is a section visible in the viewport
const isVisible = function () {
  for (const section of sections) {
    const elementBounding = section.getBoundingClientRect();

    if (elementBounding.top >= -400 && elementBounding.top <= 400) {
      // console.log("true");
      return section;
    }
  }
};
// Define getSelectedAnchor function to get the anchor accodring to the section
const getSelectedAnchor = (selectedSection) => {
  const sectionID = selectedSection.getAttribute("id");
  const selectedAnchor = document.querySelector(
    `.navbar__menu a[href*='${sectionID}']`
  );
  return selectedAnchor;
};
// readTopValue(sections[0]);
console.log(sections[0].offsetTop);
// console.log(isVisible(sections));
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
  const newAnchors = generateAnchors();
  navList.appendChild(newAnchors);
};
buildNav();
// Add class 'active' to section when near top of viewport
const addActive = (upComingActiveSection) => {
  const currentActiveSection = document.querySelector("section.active");
  let sectionID = "";
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
  // console.log(currentActiveSection);
};
// addActive(sections[1]);
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

// Scroll to section on link click
navList.addEventListener("click", function (evt) {
  if (evt.target.nodeName === "A") {
    evt.preventDefault();
    const id = evt.target.getAttribute("href");
    const highlightedSection = document.querySelector(`${id}`);
    const topValue = highlightedSection.offsetTop;
    scrolling(topValue);
    console.log(id, highlightedSection, topValue);
  }
});

// Set sections as active
document.addEventListener("scroll", function () {
  const visibleSection = isVisible();
  if (visibleSection !== undefined) {
    const sectionID = visibleSection.getAttribute("id");
    const activeAnchor = document.querySelector(
      `.navbar__menu a[href*='${sectionID}']`
    );
    activeAnchor.classList.add("active");
    console.log(activeAnchor.outerHTML);
  }
  addActive(visibleSection);
  if (window.scrollY === 0) {
    sections[0].classList.add("active");
  }
});
