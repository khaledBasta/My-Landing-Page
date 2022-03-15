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

console.log(PageHeader);
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const createNewAnchors = () => {
  for (const section of sections) {
    const newListItem = document.createElement("li");
    const newAnchor = document.createElement("a");
    newAnchor.classList.add("menu__link");
    newListItem.appendChild(newAnchor);
    console.log(newListItem);
  }
};
createNewAnchors();
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

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
