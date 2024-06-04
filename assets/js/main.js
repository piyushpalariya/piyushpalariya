/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

//form validation

function validateForm() {
  // Get references to the form elements
  const nameInput = document.querySelector('.contact__form input[type="text"]');
  const emailInput = document.querySelector(
    '.contact__form input[type="email"]'
  );
  const messageArea = document.querySelector(".contact__form textarea");

  clearErrorMessages();

  // Check if name is empty
  if (nameInput.value === "") {
    showError(nameInput, "Please enter your name.");
    return false;
  }

  // Check if email is empty or invalid format
  if (emailInput.value === "" || !validateEmail(emailInput.value)) {
    showError(emailInput, "Please enter a valid email address.");
    return false;
  }

  // Check if message is empty
  if (messageArea.value === "") {
    showError(messageArea, "Please enter your message.");
    return false;
  }

  // All validations passed, submit the form (assuming it has a submit button)
  // You might need to adjust this part depending on your form submission method
  // document.querySelector('.contact__form').submit();
  //alert("Form submitted successfully!"); // For demonstration purposes
  return true;
}

function showError(element, message) {
  // Add error class to the element
  element.classList.add("error");

  // Create a span element to display the error message
  const errorSpan = document.createElement("span");
  errorSpan.classList.add("error-message");
  errorSpan.textContent = message;

  // Insert the error message after the element
  element.parentNode.insertBefore(errorSpan, element.nextSibling);
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => element.remove());

  document
    .querySelectorAll(".error")
    .forEach((element) => element.classList.remove("error"));
}

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Attach the validation function to the form submission event (or button click)
const form = document.querySelector(".contact__form");
form.addEventListener("submit", validateForm);
