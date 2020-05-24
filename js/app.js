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

// Global Variables
const navbarSections = document.querySelectorAll('section')
const navbarList = document.getElementById('navbar__list')

// Function for building navigation bar
function buildNavbar() {
    for (let listItem of navbarSections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = listItem.id;
        section.innerText = listItem.dataset.nav;
        navbarList.appendChild(section);
    }
};

// Function for checking which section is currently active
function getActiveElement() {
    topSection = navbarSections[0];
    minVal = 1000000;
    for (listItem of navbarSections) {
        let rectangle = listItem.getBoundingClientRect();
        if (rectangle.top > -300 & rectangle.top < minVal) {
            minVal = rectangle.top;
            topSection = listItem;
        };
    };
    return topSection;
};

// Function for adding class 'active' to section when near top of viewport
function setActiveToSection () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveElement();
        section.classList.add('active-class');
        for (let listItem of navbarSections) {
            if (listItem.id != section.id & listItem.classList.contains('active-class')) {
                listItem.classList.remove('active-class');
            }
        }
        const activeElement = document.querySelector('li[data-nav="' + section.id + '"]');
        activeElement.classList.add('active__link');
        const headers = document.querySelectorAll('.menu__link');
        for (let item of headers) {
            if (item.dataset.nav != activeElement.dataset.nav & item.classList.contains('active__link')) {
                item.classList.remove('active__link');
            }
        };
    });
};

// Function to scroll to clicked section
function scrollToClickedSection() {
    navbarList.addEventListener('click', function (event) {
        const clickedSection = document.querySelector('#' + event.target.dataset.nav)
        clickedSection.scrollIntoView({block: 'start', behavior: 'smooth'});
    });
};

// Build menu
buildNavbar();

// Scroll to section on link
scrollToClickedSection();

// Set section as active
setActiveToSection();

