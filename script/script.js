function animateTitle() {
    const title = document.getElementById("hero-type");
    const text = "Bonjour !".split("");
    let i = 0;

    const getRandomInterval = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    function typeChar() {
        title.textContent += text[i];
        i++;
        if (i >= text.length) { // If we reach the end of the text, reset the index
            setTimeout(() => {
                title.textContent = "";
                i = 0;
                typeChar();
            }, 2000);
        }
        else {
            setTimeout(typeChar, getRandomInterval(100, 500));
        }
    }

    typeChar();
}
animateTitle();


// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" class="logo-img" alt="${item.alt}" data-cy="skills-img" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" alt="${item.alt}" data-cy="porfolio-img" style="width:100%">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-text">${item.text}</p>
                        <div class="text-center">
                            <a href="${item.link}" class="btn btn-success target="_blank" rel="noopener noreferrer">Lien</a>
                        </div>
                    </div>
                </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
//security contact formular
// Function to handle form submission and validation

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        // Get form values
        const name = sanitizeInput(document.getElementById("name").value);
        const email = sanitizeInput(document.getElementById("email").value);
        const message = sanitizeInput(document.getElementById("message").value);

        // Simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Remove previous error
        let errorDiv = document.getElementById("formError");
        if (errorDiv) errorDiv.remove();

        // Validation
        let errors = [];
        if (!name) errors.push("Le nom est requis.");
        if (!email || !emailRegex.test(email)) errors.push("Un email valide est requis.");
        if (!message) errors.push("Le message est requis.");

        if (errors.length > 0) {
            e.preventDefault();
            showError(errors.join("<br>"));
        }
    });

    function sanitizeInput(str) {
        // Basic sanitization to prevent HTML injection
        return str.replace(/[<>&"'`]/g, function (c) {
            return ({
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;',
                "'": '&#39;',
                '`': '&#96;'
            })[c];
        });
    }

    function showError(msg) {
        const div = document.createElement("div");
        div.id = "formError";
        div.className = "alert alert-danger mt-3";
        div.innerHTML = msg;
        form.parentNode.insertBefore(div, form);
    }
});
// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
