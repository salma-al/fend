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
const sections = document.querySelectorAll('section');
const topBtn = document.querySelector('.top-btn');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Scroll back to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
for (let i = 1; i <= sections.length; i++) {
  const newLi = document.createElement('Li');
  newLi.innerHTML = `<a class="menu__link" href="#section${i}">section ${[
    i,
  ]}</a>`; // added the anchor tag to the list and linked each tag with its section

  navbarUl.appendChild(newLi); // append anchors to the navbar
}

// Scroll to section on link click
// Scroll to anchor ID using scrollIntoView event
const anchors = document.querySelectorAll('header nav a');

console.log(anchors);
anchors.forEach(function (a) {
  a.addEventListener('click', function (event) {
    event.preventDefault();
    const att = event.target.getAttribute('href');
    const linkSection = document.querySelector(att);
    console.log(event);
    linkSection.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo(0, linkSection.offsetTop);
  });
});

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

/**
 * End Main Functions
 * Begin Events
 *
 */
