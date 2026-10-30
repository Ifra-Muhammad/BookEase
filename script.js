

// HTML elements ko select karna
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const serviceCards = document.querySelectorAll(".service-card");//all se sare cards seelect hunge
const noResults = document.getElementById("noResults");

// Search aur category ke mutabiq services dikhengi
function filterServices() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  let visibleServices = 0;

  serviceCards.forEach(function (card) {
    const serviceName = card.querySelector("h3").textContent.toLowerCase();
    const serviceDescription = card.querySelector("p").textContent.toLowerCase();
    const serviceCategory = card.getAttribute("data-category");

    const matchesSearch =
      serviceName.includes(searchText) ||
      serviceDescription.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      serviceCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.hidden = false;
      visibleServices++;
    } else {
      card.hidden = true;
    }
  });

  noResults.hidden = visibleServices !== 0;
}

// User ke search ya category change karne par filter chalana
searchInput.addEventListener("input", filterServices);
categoryFilter.addEventListener("change", filterServices);


const menuToggle = document.getElementById("menuToggle");
const mainNavbar = document.getElementById("mainNavbar");

// Menu open aur close karna
menuToggle.addEventListener("click", function () {
  const isOpen = mainNavbar.classList.toggle("menu-open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Navigation link par click hone ke baad menu close karna
mainNavbar.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNavbar.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});


// booking form ki validation

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const bookingMessage = document.getElementById("bookingMessage");
  const bookingDate = document.getElementById("bookingDate");

  // sirf aj ki ya agay ki dates select kersakte he past me nhi 
  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  bookingDate.min = getToday();

  // Form submit hone par validation chalaga
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // User ki entered information lena
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const service = document.getElementById("bookingService").value;
    const date = bookingDate.value;
    const time = document.getElementById("bookingTime").value;

    // Error messages clear karna k liye
    document.querySelectorAll(".error-message").forEach(function (error) {
      error.textContent = "";
    });

    // Purane accessibility error indicators clear karna
    bookingForm.querySelectorAll("input, select").forEach(function (field) {
      field.removeAttribute("aria-invalid");
    });

    bookingMessage.hidden = true;
    bookingMessage.classList.remove("booking-error");
    bookingMessage.replaceChildren();

    let hasError = false;
    let firstInvalidField = null;

    // Error show karne ke liye helper function
    function showError(fieldId, errorId, message) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);

      error.textContent = message;
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", errorId);

      hasError = true;

      if (firstInvalidField === null) {
        firstInvalidField = field;
      }
    }

    // Name check karna
    if (name.length < 2) {
      showError(
        "customerName",
        "nameError",
        "Please enter your full name."
      );
    }

    // Phone number check karna
    const phoneDigits = phone.replace(/\D/g, "");

    if (
      !/^[+\d\s().-]+$/.test(phone) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      showError(
        "customerPhone",
        "phoneError",
        "Please enter a valid phone number."
      );
    }

    // Email format check karna
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(
        "customerEmail",
        "emailError",
        "Please enter a valid email address."
      );
    }

    // Service selection check karna
    if (service === "") {
      showError(
        "bookingService",
        "serviceError",
        "Please select a service."
      );
    }

    // Date check karna
    if (date === "" || date < getToday()) {
      showError(
        "bookingDate",
        "dateError",
        "Please select today or a future date."
      );
    }

    // Time selection check karna
    if (time === "") {
      showError(
        "bookingTime",
        "timeError",
        "Please select a preferred time."
      );
    }

    // Agar koi error hai to usay announce karke pehli field par focus karna
    if (hasError) {
      bookingMessage.textContent =
        "Please correct the errors above and try again.";

      bookingMessage.classList.add("booking-error");
      bookingMessage.hidden = false;

      firstInvalidField.focus();
      return;
    }

   

    
    // textContent user ki input ko HTML ki tarah run nahi karta tectcontent mtlb text ki tarh treat huga innerhtml se html apply hugi or wo nhi kerni he 
     const heading = document.createElement("h3");
    heading.textContent = "Booking Confirmed!";

    const message = document.createElement("p");
    message.textContent =
      "Your service request has been received.Thank u!";

    const details = document.createElement("div");
    details.className = "booking-summary-details";

    const bookingDetails = [
      ["Customer", name],
      ["Phone", phone],
      ["Email", email],
      ["Service", service],
      ["Preferred Date", date],
      ["Preferred Time", time]
    ];

    bookingDetails.forEach(function (detail) {
      const row = document.createElement("p");
      const label = document.createElement("strong");

      label.textContent = detail[0] + ": ";
      row.appendChild(label);
      row.appendChild(document.createTextNode(detail[1]));

      details.appendChild(row);
    });

    // Purana message replace karke complete summary show huga
    bookingMessage.replaceChildren(heading, message, details);
    bookingMessage.classList.remove("booking-error");
    bookingMessage.hidden = false;

    
    bookingForm.reset();

    

   
    bookingDate.min = getToday();
  });
}


// Back to Top Button
const backToTop = document.getElementById("backToTop");

// jab scrool kerer tu tab show hu button
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// Scroll smoothly 
backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

