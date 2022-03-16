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

// Define isVisible function to detect is it visible in the viewport
const isVisible = function () {
  for (const section of sections) {
    const elementBounding = section.getBoundingClientRect();
    console.log(
      elementBounding.top,
      elementBounding.bottom,
      window.innerHeight
    );

    if (elementBounding.top >= 0 && elementBounding.top <= 200) {
      return true;
    }
  }
};
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

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
document.addEventListener(
  "scroll",
  function () {
    for (const section of sections) {
      const elementBounding = section.getBoundingClientRect();
      console.log(`
    ${section}
      ${elementBounding.top},
      ${elementBounding.bottom},
      ${window.innerHeight}
      `);

      if (elementBounding.top >= 0 && elementBounding.top <= 200) {
        console.log("true");
        return true;
      }
    }
  },
  false
);
