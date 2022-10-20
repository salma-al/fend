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
const navbarUl = document.querySelector('#navbar__list');
const sectionId = document.querySelector('#section1');
const sectionTitles = sectionId.dataset.nav;
// const sections = document.querySelectorAll('[data-nav]');
const activeClass = document.querySelector('.your-active-class');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (let i = 1; i <= sections.length; i++) {
  const newLi = document.createElement('Li');
  newLi.innerHTML = `<a href="#section${i}" class="menu__link">section ${[
    i,
  ]}</a>`; // added the anchor tag to the list and linked each tag with its section
  navbarUl.appendChild(newLi); // append anchors to the navbar
}

// Add class 'active' to section when near top of viewport
// Set sections as active

// Create intersection observer
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('your-active-class');
    } else {
      entry.target.classList.remove('your-active-class');
    }
  });
};

// set options for the observer
const options = {
  root: null,
  threshold: 0.5,
};

// creating the intersection observer, and passing it the callback function and options object
const observer = new IntersectionObserver(callback, options);

// target the observer
sections.forEach((section) => {
  observer.observe(section);
});

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click
