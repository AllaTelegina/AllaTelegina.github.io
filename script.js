const siteRoot = new URL(".", document.currentScript.src);

class MyHeader extends HTMLElement {
  connectedCallback() {
    const home = document.getElementById("home") ? "" : new URL("index.html", siteRoot).href;
    this.innerHTML = `
      <header class="header">
        <a href="${home}#home" class="logo">
          <img class="png" src="${new URL("images/AllaT.png", siteRoot).href}" alt="Logo Alla Telegina" width="60">
        </a>
        <nav class="navbar" id="site-navigation" aria-label="Main navigation">
          <a href="${home}#home" >Home</a>
          <a href="${home}#about">About</a>
          <a href="${home}#services">Services</a>
          <a href="${home}#portfolio">Portfolio</a>
          <a href="${home}#brief">Brief</a>
          <a href="${home}#contact">Contact</a>
        </nav>
        <div class="bx bx-moon" id="darkMode-icon"></div>
        <button type="button" id="menu-icon" aria-label="Toggle navigation" aria-expanded="false" aria-controls="site-navigation"></button>
      </header>
    `;
  }
}

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-text">
          <p>Copyright &copy; 2025 by Alla Telegina | All Rights Reserved.</p>
        </div>
        <div class="footer-iconTop">
          <a href="#" class="scroll-to-top"><i class='bx bx-up-arrow-alt'></i></a>
        </div>
      </footer>
    `;
  }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');
  const darkModeIcon = document.querySelector('#darkMode-icon');

  function setMenuOpen(open) {
    navbar.classList.toggle('active', open);
    menuIcon.setAttribute('aria-expanded', String(open));
  }

  menuIcon?.addEventListener('click', () => {
    setMenuOpen(menuIcon.getAttribute('aria-expanded') !== 'true');
  });

  navbar?.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuIcon?.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuIcon.focus();
    }
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('sticky', window.scrollY > 50);
    updateActiveNavLink();
  });

  // Темный режим
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeIcon?.classList.add('bx-sun');
  }

  darkModeIcon?.addEventListener('click', () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Swiper
  if (typeof Swiper === "function" && document.querySelector(".mySwiper")) new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // ScrollReveal
  if (typeof ScrollReveal === "function") {
    ScrollReveal({
      distance: '80px',
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
    ScrollReveal().reveal('.skills-container, .skill-box', { origin: 'bottom' });
  }

  
  window.addEventListener('DOMContentLoaded', () => {
  const projectId = window.location.hash.slice(1);
  const project = document.getElementById(projectId);

  if (!project || !project.classList.contains('project-item')) return;

  project.classList.add('active');

  project.querySelector('.project-toggle')
    .setAttribute('aria-expanded', 'true');

  setTimeout(() => {
    project.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);
});

  // Калькулятор
// =====================================================
// PRICE CALCULATOR
// =====================================================
const servicesData = {

  // ===================================================
  // WEB DESIGN
  // ===================================================
  web: {
    name: "Web Design",
    items: {
      landing: {
        name: "Landing Page Design",
        type: "website",
        mainPage: {
          essential: 120,
          standard: 220,
          premium: 350
        },
        additionalPage: {
          essential: 60,
          standard: 110,
          premium: 180
        }
      },
      business: {

        name: "Business / Personal Website Design",
        type: "website",
        mainPage: {
          essential: 220,
          standard: 400,
          premium: 650
        },
        additionalPage: {
          essential: 80,
          standard: 140,
          premium: 220
        }
      },
      multipage: {
        name: "Multipage Website Design",
        type: "website",
        mainPage: {
          essential: 300,
          standard: 550,
          premium: 900
        },
        additionalPage: {
          essential: 80,
          standard: 140,
          premium: 220
        }
      },

      ecommerce: {
        name: "E-commerce Website Design",
        type: "website",
        mainPage: {
          essential: 450,
          standard: 750,
          premium: 1200
        },
        additionalPage: {
          essential: 120,
          standard: 200,
          premium: 300
        }
      }
    }
  },

  // ===================================================
  // FRONTEND DEVELOPMENT
  // ===================================================
  frontend: {
    name: "Frontend Development",
    items: {
      landing_dev: {
        name: "Landing Page Frontend",
        type: "website",
        mainPage: {
          essential: 150,
          standard: 280,
          premium: 450
        },

        additionalPage: {
          essential: 75,
          standard: 140,
          premium: 220
        }
      },

      business_dev: {
        name: "Business Website Frontend",
        type: "website",
        mainPage: {
          essential: 250,
          standard: 450,
          premium: 750
        },

        additionalPage: {
          essential: 90,
          standard: 160,
          premium: 250
        }
      },

      multipage_dev: {
        name: "Multipage Website Frontend",
        type: "website",
        mainPage: {
          essential: 350,
          standard: 650,
          premium: 1050
        },

        additionalPage: {
          essential: 100,
          standard: 180,
          premium: 280
        }
      }
    }
  },


  // ===================================================
  // GRAPHIC DESIGN
  // ===================================================
  graphic: {
    name: "Graphic Design",
    items: {
      logo: {
        name: "Logo Design",
        type: "quantity",
        unit: "logo",
        prices: {
          essential: 50,
          standard: 90,
          premium: 150
        },
        maxQuantity: 1
      },

      banner: {
        name: "Banner / Advertising Graphic",
        type: "quantity",
        unit: "design",
        prices: {
          essential: 25,
          standard: 45,
          premium: 75
        }
      },


      presentation: {
        name: "Presentation Design",
        type: "quantity",
        unit: "slide",
        prices: {
          essential: 10,
          standard: 18,
          premium: 30
        }
      },

      social: {
        name: "Social Media Graphic",
        type: "quantity",
        unit: "design",
        prices: {
          essential: 20,
          standard: 35,
          premium: 55
        }
      }
    }
  }
};


// =====================================================
// ADDITIONAL COSTS
// =====================================================
const additionalCosts = {


  // ---------------------------------------------------
  // Frontend added to Web Design
  // ---------------------------------------------------
  frontend: {
    essential: 0.65,
    standard: 0.65,
    premium: 0.65
  },


  // ---------------------------------------------------
  // Backend / additional functionality
  // ---------------------------------------------------
  backend: {
    form: 40,
    booking: 100,
    auth: 180,
    payment: 180,
    admin: 200,
    api: 100,
    custom: 250
  },

  // ---------------------------------------------------
  // Banner adaptation
  // ---------------------------------------------------
  banner: {
    digital: 0,
    print: 15,
    both: 25
  }
};

// =====================================================
// DOM ELEMENTS
// =====================================================
const categorySelect =
  document.getElementById("category");
const serviceSelect =
  document.getElementById("service");
const complexitySelect =
  document.getElementById("complexity");
const complexityHint =
  document.getElementById("complexityHint");
const mainPageOption =
  document.getElementById("mainPageOption");
const mainPageQuantity =
  document.getElementById("mainPageQuantity");
const additionalPagesOption =
  document.getElementById(
    "additionalPagesOption"
  );
const additionalPages =
  document.getElementById(
    "additionalPages"
  );
const quantityOption =
  document.getElementById(
    "quantityOption"
  );
const quantityInput =
  document.getElementById(
    "quantity"
  );
const frontendOption =
  document.getElementById(
    "frontendOption"
  );
const frontendSelect =
  document.getElementById(
    "frontend"
  );
const bannerTypeOption =
  document.getElementById(
    "bannerTypeOption"
  );
const bannerTypeSelect =
  document.getElementById(
    "bannerType"
  );
const backendOption =
  document.getElementById(
    "backendOption"
  );
const backendCheckboxes =
  document.querySelectorAll(
    'input[name="backend"]'
  );


// =====================================================
// PACKAGE DESCRIPTIONS
// =====================================================
const complexityDescriptions = {
  essential:
    "Clean and simple solution — essential design, basic structure and minimal effects.",
  standard:
    "Professional solution — polished UI, responsive design, components and moderate interaction.",
  premium:
    "Advanced solution — custom UI, complex interactions, animations and deeper UX work."
};


// =====================================================
// UPDATE PACKAGE DESCRIPTION
// =====================================================
function updateComplexityHint() {
  if (
    !complexityHint ||
    !complexitySelect
  ) {
    return;
  }

  complexityHint.textContent =
    complexityDescriptions[
      complexitySelect.value
    ] || "";
}

updateComplexityHint();
complexitySelect?.addEventListener(
  "change",
  updateComplexityHint
);

// =====================================================
// CATEGORY CHANGE
// =====================================================
categorySelect?.addEventListener(
  "change",
  function () {
    const category =
      categorySelect.value;

    serviceSelect.innerHTML = "";

    serviceSelect.disabled = true;

    hideAdditionalOptions();
    if (
      !category ||
      !servicesData[category]
    ) {
      serviceSelect.innerHTML =
        `<option value="">
          Select category first
        </option>`;
      return;
    }

    serviceSelect.disabled = false;
    serviceSelect.innerHTML =
      `<option value="">
        Select service
      </option>`;
    Object.entries(
      servicesData[
        category
      ].items
    ).forEach(
      ([key, item]) => {
        const option =
          document.createElement(
            "option"
          );
        option.value = key;
        option.textContent =
          item.name;
        serviceSelect.appendChild(
          option
        );
      }
    );
  }
);


// =====================================================
// SERVICE CHANGE
// =====================================================
serviceSelect?.addEventListener(
  "change",
  function () {
    const category =
      categorySelect.value;
    const serviceKey =
      serviceSelect.value;
    hideAdditionalOptions();
    if (
      !category ||
      !serviceKey
    ) {
      return;
    }
    const service =
      servicesData[
        category
      ].items[
        serviceKey
      ];

    // ================================================
    // WEBSITE
    // ================================================
    if (
      service.type === "website"
    ) {
      mainPageOption.style.display =
        "block";

      /*
        Landing Page does not need
        additional pages.
      */
      if (
        serviceKey !== "landing" &&
        serviceKey !== "landing_dev"
      ) {
        additionalPagesOption.style.display =
          "block";
      }
    }

    // ================================================
    // GRAPHIC DESIGN
    // ================================================
    if (
      service.type === "quantity"
    ) {
      quantityOption.style.display =
        "block";
      if (
        service.maxQuantity
      ) {
        quantityInput.max =
          service.maxQuantity;
      } else {
        quantityInput.removeAttribute(
          "max"
        );
      }
    }

    // ================================================
    // WEB DESIGN → FRONTEND
    // ================================================
    if (
      category === "web"
    ) {
      frontendOption.style.display =
        "block";
    }

    // ================================================
    // BACKEND
    // ================================================
    if (
      category === "web" ||
      category === "frontend"
    ) {
      backendOption.style.display =
        "block";
    }

    // ================================================
    // BANNER
    // ================================================
    if (
      category === "graphic" &&
      serviceKey === "banner"
    ) {
      bannerTypeOption.style.display =
        "block";
    }
  }
);

// =====================================================
// HIDE ADDITIONAL OPTIONS
// =====================================================
function hideAdditionalOptions() {
  if (mainPageOption) {
    mainPageOption.style.display =
      "none";
  }

  if (additionalPagesOption) {
    additionalPagesOption.style.display =
      "none";
  }

  if (quantityOption) {
    quantityOption.style.display =
      "none";
  }

  if (frontendOption) {
    frontendOption.style.display =
      "none";
  }
  if (bannerTypeOption) {
    bannerTypeOption.style.display =
      "none";
  }
  if (backendOption) {
    backendOption.style.display =
      "none";
  }

  // Reset values
  if (mainPageQuantity) {
    mainPageQuantity.value = 1;
  }

  if (additionalPages) {
    additionalPages.value = 0;
  }

  if (quantityInput) {
    quantityInput.value = 1;
    quantityInput.removeAttribute(
      "max"
    );
  }

  if (frontendSelect) {
    frontendSelect.value =
      "none";
  }
  if (bannerTypeSelect) {
    bannerTypeSelect.value =
      "digital";
  }
  backendCheckboxes.forEach(
    checkbox => {
      checkbox.checked =
        false;
    }
  );
}

// =====================================================
// CALCULATE PRICE
// =====================================================
window.calculatePrice =
function () {
  const category =
    categorySelect?.value;
  const serviceKey =
    serviceSelect?.value;
  const complexity =
    complexitySelect?.value;

  // ---------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------
  if (
    !category ||
    !serviceKey
  ) {
    alert(
      "Please select a category and service."
    );
    return;
  }

  const service =
    servicesData[
      category
    ]?.items[
      serviceKey
    ];


  if (!service) {

    alert(
      "Please select a valid service."
    );

    return;

  }


  // ===================================================
  // BASE PRICE
  // ===================================================

  let total = 0;


  let mainPageCost = 0;

  let additionalPagesCost = 0;

  let graphicCost = 0;

  let frontendCost = 0;

  let backendCost = 0;

  let bannerCost = 0;


  // ===================================================
  // WEBSITE PRICE
  // ===================================================

  if (
    service.type === "website"
  ) {


    // -----------------------------------------------
    // MAIN PAGE
    // -----------------------------------------------

    const mainPrice =
      service.mainPage[
        complexity
      ];


    mainPageCost =
      mainPrice;


    total +=
      mainPageCost;


    // -----------------------------------------------
    // ADDITIONAL PAGES
    // -----------------------------------------------

    let extraPages = 0;


    if (
      serviceKey !== "landing" &&
      serviceKey !== "landing_dev"
    ) {

      extraPages =
        Math.max(
          0,
          parseInt(
            additionalPages.value,
            10
          ) || 0
        );

    }


    const additionalPagePrice =
      service.additionalPage[
        complexity
      ];


    additionalPagesCost =
      extraPages *
      additionalPagePrice;


    total +=
      additionalPagesCost;

  }


  // ===================================================
  // GRAPHIC DESIGN
  // ===================================================

  if (
    service.type === "quantity"
  ) {


    let quantity =
      parseInt(
        quantityInput.value,
        10
      ) || 1;


    if (
      service.maxQuantity
    ) {

      quantity =
        Math.min(
          quantity,
          service.maxQuantity
        );

    }


    graphicCost =
      service.prices[
        complexity
      ] *
      quantity;


    total +=
      graphicCost;

  }


  // ===================================================
  // FRONTEND WITH WEB DESIGN
  // ===================================================

  if (
    category === "web" &&
    frontendSelect &&
    frontendSelect.value ===
      "included"
  ) {


    /*
      Frontend is calculated from
      the complete design price.

      Example:

      Design = €550

      Frontend = €550 × 65%
    */


    const designTotal =
      mainPageCost +
      additionalPagesCost;


    frontendCost =
      designTotal *
      additionalCosts
        .frontend[
          complexity
        ];


    total +=
      frontendCost;

  }


  // ===================================================
  // BACKEND
  // ===================================================

  const selectedBackend = [];


  backendCheckboxes.forEach(
    checkbox => {

      if (
        checkbox.checked
      ) {

        selectedBackend.push(
          checkbox.value
        );


        backendCost +=
          additionalCosts
            .backend[
              checkbox.value
            ] || 0;

      }

    }
  );


  total +=
    backendCost;


  // ===================================================
  // BANNER
  // ===================================================

  if (
    category === "graphic" &&
    serviceKey === "banner"
  ) {
    const bannerType =
      bannerTypeSelect.value;
    bannerCost =
      additionalCosts
        .banner[
          bannerType
        ] || 0;
    total +=
      bannerCost;
  }


  // ===================================================
  // PRICE RANGE
  // ===================================================

  /*
    We show an approximate range.

    10% lower
    15% higher

    Final price is confirmed
    after reviewing the brief.
  */

  const minPrice =
    Math.round(
      total * 0.90
    );
  const maxPrice =
    Math.round(
      total * 1.15
    );

  // ===================================================
  // PACKAGE NAME
  // ===================================================
  const packageNames = {
    essential:
      "Essential",
    standard:
      "Standard",
    premium:
      "Premium"
  };

  // ===================================================
  // FRONTEND TEXT
  // ===================================================
  let frontendText = "";
  if (
    frontendCost > 0
  ) {
    frontendText = `
      <div>
        <strong>
          Frontend:
        </strong>
        Included
      </div>
    `;
  }

  // ===================================================
  // BACKEND TEXT
  // ===================================================
  let backendText = "";
  if (
    selectedBackend.length > 0
  ) {
    const backendLabels = {
      form:
        "Contact / Inquiry Form",
      booking:
        "Booking / Reservation",
      auth:
        "User Accounts / Login",
      payment:
        "Online Payment",
      admin:
        "Admin Panel / CMS",
      api:
        "API Integration",
      custom:
        "Custom Backend Functionality"
    };

    const backendList =
      selectedBackend
        .map(
          key =>
            backendLabels[
              key
            ]
        )
        .join(", ");
    backendText = `
      <div>
        <strong>
          Additional functionality:
        </strong>
        ${backendList}
      </div>
    `;
  }

  // ===================================================
  // BANNER TEXT
  // ===================================================

  let bannerText = "";
  if (
    category === "graphic" &&
    serviceKey === "banner"
  ) {
    const bannerLabels = {
      digital:
        "Digital",
      print:
        "Print",
      both:
        "Digital + Print"
    };
    bannerText = `
      <div>
        <strong>
          Banner type:
        </strong>
        ${bannerLabels[
          bannerTypeSelect.value
        ]}
      </div>
    `;
  }

  // ===================================================
  // PAGE TEXT
  // ===================================================
  let pageText = "";
  if (
    service.type === "website"
  ) {
    const extraPages =
      serviceKey === "landing" ||
      serviceKey === "landing_dev"
        ? 0
        : Math.max(
            0,
            parseInt(
              additionalPages.value,
              10
            ) || 0
          );

    pageText = `
      <div>
        <strong>
          Main page:
        </strong>
        €${mainPageCost}
      </div>
      ${
        extraPages > 0
          ? `
            <div>
              <strong>
                Additional pages:
              </strong>
              ${extraPages}
              × €${
                service.additionalPage[
                  complexity
                ]
              }
              = €${additionalPagesCost}
            </div>
          `
          : ""
      }
    `;
  }

  // ===================================================
  // GRAPHIC TEXT
  // ===================================================

  let graphicText = "";
  if (
    service.type === "quantity"
  ) {
    const graphicQuantity =
      parseInt(
        quantityInput.value,
        10
      ) || 1;
    graphicText = `
      <div>
        <strong>
          Quantity:
        </strong>
        ${graphicQuantity}
      </div>
    `;
  }

  // ===================================================
  // MODAL
  // ===================================================
  const modalContent =
    document.getElementById(
      "modalContent"
    );
  modalContent.innerHTML = `
    <div>
      <strong>
        Category:
      </strong>
      ${servicesData[
        category
      ].name}
    </div>
    <div>
      <strong>
        Service:
      </strong>
      ${service.name}
    </div>
    <div>
      <strong>
        Package:
      </strong>
      ${packageNames[
        complexity
      ]}
    </div>
    ${pageText}
    ${graphicText}
    ${frontendText}
    ${backendText}
    ${bannerText}
    <div
      class="price-estimate"
      style="
        margin-top: 1.5rem;
        font-size: 2.2rem;
        font-weight: 700;
      "
    >
      <strong>
        Estimated Price:
      </strong>
      €${minPrice} – €${maxPrice}
    </div>
    <p class="complexity-hint">
      This is an approximate estimate.
      The final price will be confirmed
      after reviewing the project requirements.
    </p>
  `;

  // ===================================================
  // OPEN MODAL
  // ===================================================
  const briefLink = document.getElementById("estimateBriefLink");
  const estimate = `${service.name} · ${packageNames[complexity]} · €${minPrice} – €${maxPrice}`;
  briefLink.href = `brief.html?${new URLSearchParams({ estimate })}`;

  const modal =
    document.getElementById(
      "calcModal"
    );
  modal.classList.remove(
    "hidden"
  );
  modal.classList.add(
    "show"
  );
};

// =====================================================
// CLOSE MODAL
// =====================================================
window.closeModal =
function () {
  const modal =
    document.getElementById(
      "calcModal"
    );
  if (!modal) {
    return;
  }
  modal.classList.remove(
    "show"
  );
  modal.classList.add(
    "hidden"
  );
};


// =====================================================
// ESC → CLOSE MODAL
// =====================================================
document.addEventListener(
  "keydown",
  function (event) {
    if (
      event.key === "Escape"
    ) {
      closeModal();
    }
  }
);

// =====================================================
// PREVENT ENTER SUBMIT
// =====================================================

document
  .getElementById("calc-form")
  ?.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key === "Enter"
      ) {
        event.preventDefault();
      }
    }
  );

  const briefForm = document.getElementById("briefForm");
  if (briefForm) {
    const estimate = new URLSearchParams(window.location.search).get("estimate")?.slice(0, 300);
    if (estimate) {
      document.getElementById("calculatorSummaryContent").textContent = estimate;
      document.getElementById("calculatorSummary").style.display = "block";
    }

    const status = document.getElementById("confirmation");
    const submitButton = briefForm.querySelector('button[type="submit"]');
    briefForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(briefForm);
      const message = [...data]
        .filter(([name, value]) => name !== "access_key" && value.trim())
        .map(([name, value]) => `${name.replace(/\[\]$/, "").replaceAll("_", " ")}: ${value}`);
      if (estimate) message.unshift(`Preliminary estimate: ${estimate}`);

      submitButton.disabled = true;
      status.textContent = "Sending your brief…";
      try {
        const response = await fetch(briefForm.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new URLSearchParams({
            access_key: data.get("access_key"),
            subject: "New portfolio project brief",
            message: message.join("\n"),
          }),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error("Brief submission failed");
        briefForm.reset();
        status.textContent = "Thank you! Your project brief has been sent.";
      } catch {
        status.textContent = "Your brief could not be sent. Please try again or use the contact form on the home page.";
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  // CONTACT FORM + POPUP
  const contactForm = document.querySelector('#contact form');
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("closePopup");

  if (contactForm && popup && closePopupBtn) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const data = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: data
      });

      if (response.ok) {
        popup.classList.remove("hidden");
        form.reset();
      }
    });

    closePopupBtn.addEventListener("click", function () {
      popup.classList.add("hidden");
    });
  }
});

window.addEventListener('DOMContentLoaded', updateActiveNavLink);

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');
  const scrollY = window.pageYOffset;

  if (!document.getElementById('home')) return;

  let currentSectionId = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 1) {
    currentSectionId = 'contact';
  }

  navLinks.forEach(link => {
    const active = link.hash === `#${currentSectionId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

const projectItems = document.querySelectorAll('.project-item');

function closeAllProjects() {
  projectItems.forEach(item => {
    item.classList.remove('active');
    item.querySelector('.project-toggle').setAttribute('aria-expanded', 'false');
  });
}

projectItems.forEach(item => {
  const button = item.querySelector('.project-toggle');

  button.addEventListener('click', event => {
    event.stopPropagation();

    const isOpen = item.classList.contains('active');
    closeAllProjects();

    if (!isOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.project-item')) {
    closeAllProjects();
  }
});





if (document.querySelector('.projects-page .project-item')) {
  document.addEventListener('DOMContentLoaded', () => {
    const project = document.getElementById(window.location.hash.slice(1));
    if (!project?.matches('.projects-page .project-item')) return;
    closeAllProjects();
    project.classList.add('active');
    project.querySelector('.project-toggle').setAttribute('aria-expanded', 'true');
  });
}
