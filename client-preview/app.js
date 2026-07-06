(() => {
  const donateUrl = "https://www.givelively.org/";
  const socialUrls = {
    instagram: "https://www.instagram.com/accounts/emailsignup/",
    facebook: "https://www.facebook.com/reg/",
    x: "https://x.com/i/flow/signup",
    tiktok: "https://www.tiktok.com/signup",
    linkedin: "https://www.linkedin.com/signup",
  };

  const content = {
    en: {
      nav: {
        home: "Home",
        about: "About Us",
        mission: "Our Mission",
        programs: "Programs",
        getInvolved: "Get Involved",
        events: "Events",
        stories: "Stories",
        store: "Store",
        contact: "Contact",
        donate: "Donate",
      },
      hero: {
        line1: "EMPOWERING",
        youth: "YOUTH.",
        line2: "ELEVATING",
        futures: "FUTURES.",
        line3: "BUILDING",
        community: "COMMUNITY.",
        lede: "We equip youth with the tools, opportunities, and support they need to rise, lead, and create the future they deserve.",
        donate: "Donate Today",
        volunteer: "Volunteer With Us",
      },
      mission: {
        kicker: "Who We Are",
        titleA: "We Believe In The",
        titleB: "Potential Of Every Youth.",
        body: "Asc3nd Collective is a youth development nonprofit dedicated to empowering young people through mentorship, education, leadership development, and community engagement. We meet youth where they are and walk beside them as they ASC3ND to their highest potential.",
        cta: "Learn More About Us",
      },
      programs: {
        kicker: "Our Programs",
        title: "Building Brighter Tomorrows",
      },
      blog: {
        kicker: "Stories",
        title: "Youth Leadership Notes",
        intro: "Editorial previews for mentorship, grant readiness, AI operations, donor trust, and community leadership.",
      },
      store: {
        kicker: "Merch Preview",
        title: "Community Gear Fundraising Concept",
        intro: "Product cards are visible as a fundraising concept only. Checkout, inventory, and Printify are not live in this preview.",
        engineTitle: "Commerce engine planned",
        engineBody: "Product catalog ready. Printify adapter planned. Server-side API required. Checkout is not connected in preview. Product mockup images come next.",
      },
      cta: {
        kicker: "Get Involved",
        title: "Be Part Of The Movement.",
        body: "Whether you volunteer, donate, mentor or partner with us, your support helps us empower youth and transform communities.",
        donate: "Donate",
        volunteer: "Volunteer",
      },
      contact: {
        kicker: "Contact Preview",
        title: "Start The Conversation.",
        body: "This form validates locally and creates an email draft. It does not send to a backend yet.",
        previewTitle: "Preview mode only",
        previewBody: "No database, no fake submission, and no hidden automation. Live email workflow connects after approval.",
        name: "Name",
        email: "Email",
        interest: "Interest Type",
        message: "Message",
        submit: "Create Preview Message",
        successTitle: "Preview mode: this message was not sent yet.",
        successBody: "The live email workflow will be connected after approval.",
        errors: {
          name: "Please enter a name.",
          email: "Please enter a valid email.",
          interest: "Please choose an interest type.",
          message: "Please enter a message.",
        },
      },
      footer: {
        description: "A 501(c)(3) nonprofit organization empowering youth, elevating futures, and building community.",
        quick: "Quick Links",
        connected: "Stay Connected",
        join: "Join Our Community",
        joinBody: "Subscribe to our newsletter for updates, events and ways to get involved.",
        subscribe: "Subscribe",
        llms: "AI-readable site file",
        copyright: "© 2026 Asc3nd Collective. All Rights Reserved.",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
      },
      labels: {
        pricePending: "Price pending",
        comingSoon: "Coming soon",
        readStatus: "Status",
        sourceNote: "Source note",
        mailto: "Open Email Draft",
        copy: "Copy Summary",
        reset: "Reset",
        copied: "Summary copied.",
        merchToast: "Merch interest added to the contact form.",
        subscribeSuccess: "Preview mode: newsletter capture will be connected after approval.",
      },
      interests: ["Volunteer", "Sponsor", "Donate", "Merch", "Program question", "Partnership", "Other"],
      pillars: [
        { icon: "OO", title: "Youth Focused", text: "Building confidence, leadership and life skills." },
        { icon: "^", title: "Future Driven", text: "Providing education, mentorship and real-world opportunities." },
        { icon: "<3", title: "Community Built", text: "Strengthening families and creating lasting impact." },
        { icon: "/\\", title: "Together We Asc3nd", text: "Uniting our community to elevate every generation." },
      ],
      programsList: [
        { icon: "B", title: "Education Support", text: "Tutoring, homework help, and academic resources to help youth succeed." },
        { icon: "M", title: "Mentorship", text: "One-on-one mentorship that builds confidence, character and leadership." },
        { icon: "*", title: "Leadership Development", text: "Equipping youth with the skills to lead, inspire and create change." },
        { icon: "H", title: "Community Engagement", text: "Service projects and community initiatives that create impact and build unity." },
        { icon: "S", title: "Life Skills & Wellness", text: "Workshops and resources that support mental health, wellness and resilience." },
      ],
      posts: [
        ["Youth Mentorship In Seattle", "2026-06-07", "Mentorship", "How consistent adult support helps young people build confidence, direction, and durable leadership habits.", "Editorial guide", "Preview editorial plan only."],
        ["Grant Readiness For Small Nonprofits", "2026-06-10", "Funding", "A practical checklist for trust signals, program clarity, documentation, and outcome storytelling.", "Grant-readiness note", "No fake grant deadlines."],
        ["AI Tools For Nonprofit Operations", "2026-06-14", "AI Operations", "Where automation can help with intake, follow-up, reporting, and team coordination without replacing human care.", "AI operations guide", "Conceptual workflow note."],
        ["Donor Trust And Public Storytelling", "2026-06-18", "Donor Trust", "Why clear mission language, visible programs, and honest preview labels matter before a fundraising push.", "Community update framework", "No fake statistics."],
        ["Volunteer Coordination That Feels Human", "2026-06-22", "Volunteer", "A better volunteer path starts with simple choices, clear response expectations, and low-friction follow-up.", "Editorial guide", "Preview workflow only."],
        ["Community Sports And Leadership", "2026-06-25", "Leadership", "Sports and team activities can become entry points for accountability, mentoring, and confidence building.", "Community update framework", "No fake partnerships."],
        ["Pacific Northwest Sponsorship Partnerships", "2026-06-29", "Sponsorship", "Local sponsors need a clear story, clean assets, and a credible path from support to visible community impact.", "Grant-readiness note", "Prospect strategy only."],
        ["Building A Nonprofit Content Engine", "2026-07-03", "Content", "A repeatable blog and social workflow can keep the mission visible without overwhelming a small team.", "AI operations guide", "Original preview copy."],
      ],
      products: [
        ["Asc3nd Signature T-shirt", "A clean black/gold launch tee for events, volunteers, and donor thank-yous.", "Request merch info"],
        ["Asc3nd Crown Hat", "A simple crown-mark cap concept for everyday community visibility.", "Notify me"],
        ["Asc3nd Community Hoodie", "A premium hoodie concept for mentors, youth leaders, and winter events.", "Sponsor merch launch"],
        ["Asc3nd Everyday Tote", "A reusable tote concept for workshops, resource days, and outreach tables.", "Request merch info"],
        ["Asc3nd Sticker Pack", "Small-format brand pieces for laptops, notebooks, bottles, and event kits.", "Notify me"],
        ["Asc3nd Wall Print", "A motivational poster concept using the Asc3nd message and black/gold identity.", "Sponsor merch launch"],
        ["Asc3nd Camp Mug or Water Bottle", "A durable everyday item concept for volunteers, mentors, and program days.", "Notify me"],
      ],
      modals: {
        events: {
          kicker: "Events",
          title: "Events Coming Soon",
          body: "<p>Asc3nd is preparing its event calendar. For the preview, this opens cleanly instead of sending visitors to a broken or empty events page.</p><p>Use the contact form if you want current volunteer, sponsor, or program information.</p>",
          primary: "Contact Asc3nd",
          href: "#contact",
        },
        volunteer: {
          kicker: "Get Involved",
          title: "Volunteer Path Coming Soon",
          body: "<p>The volunteer flow is staged as a preview interaction. The production version should route interest into a real backend or email workflow.</p><ul><li>Mentorship interest</li><li>Event support</li><li>Program support</li><li>Sponsor conversation</li></ul>",
          primary: "Open Contact Form",
          href: "#contact",
        },
        privacy: {
          kicker: "Legal Preview",
          title: "Privacy Policy",
          body: "<p>This preview does not collect or store form submissions. Contact entries are validated locally and can generate an email draft only.</p><p>Final production should receive a full legal/privacy review before launch.</p>",
          primary: "Read AI File",
          href: "./llms.txt",
        },
        terms: {
          kicker: "Legal Preview",
          title: "Terms & Conditions",
          body: "<p>This static preview is for review and approval. Merchandise, checkout, Printify, email delivery, and backend workflows are intentionally not live yet.</p><p>Final terms should be reviewed before production deployment.</p>",
          primary: "Contact Asc3nd",
          href: "#contact",
        },
      },
    },
    es: {
      nav: {
        home: "Inicio",
        about: "Sobre Nosotros",
        mission: "Nuestra Mision",
        programs: "Programas",
        getInvolved: "Participa",
        events: "Eventos",
        stories: "Historias",
        store: "Tienda",
        contact: "Contacto",
        donate: "Donar",
      },
      hero: {
        line1: "IMPULSANDO",
        youth: "JOVENES.",
        line2: "ELEVANDO",
        futures: "FUTUROS.",
        line3: "CREANDO",
        community: "COMUNIDAD.",
        lede: "Damos a la juventud las herramientas, oportunidades y apoyo que necesitan para crecer, liderar y crear el futuro que merecen.",
        donate: "Donar Hoy",
        volunteer: "Ser Voluntario",
      },
      mission: {
        kicker: "Quienes Somos",
        titleA: "Creemos En El",
        titleB: "Potencial De Cada Joven.",
        body: "Asc3nd Collective es una organizacion de desarrollo juvenil dedicada a empoderar a jovenes por medio de mentorias, educacion, liderazgo y participacion comunitaria. Caminamos junto a ellos mientras ascienden a su mayor potencial.",
        cta: "Conocer Mas",
      },
      programs: {
        kicker: "Nuestros Programas",
        title: "Construyendo Mananas Mas Brillantes",
      },
      blog: {
        kicker: "Historias",
        title: "Notas De Liderazgo Juvenil",
        intro: "Previews editoriales sobre mentorias, preparacion para fondos, operaciones con IA, confianza de donantes y liderazgo comunitario.",
      },
      store: {
        kicker: "Preview De Merch",
        title: "Concepto De Recaudacion Con Productos",
        intro: "Las tarjetas de productos muestran un concepto de recaudacion. Checkout, inventario y Printify no estan activos en este preview.",
        engineTitle: "Motor de comercio planeado",
        engineBody: "Catalogo listo. Adaptador Printify planeado. Se requiere API del servidor. El checkout no esta conectado en el preview. Las imagenes reales de productos vienen despues.",
      },
      cta: {
        kicker: "Participa",
        title: "Se Parte Del Movimiento.",
        body: "Ya sea que dones, apoyes, seas mentor o voluntario, tu ayuda impulsa a jovenes y transforma comunidades.",
        donate: "Donar",
        volunteer: "Voluntario",
      },
      contact: {
        kicker: "Contacto Preview",
        title: "Inicia La Conversacion.",
        body: "Este formulario valida localmente y crea un borrador de correo. Todavia no envia a un backend.",
        previewTitle: "Solo modo preview",
        previewBody: "Sin base de datos, sin envio falso y sin automatizacion oculta. El flujo real de email se conecta despues de aprobacion.",
        name: "Nombre",
        email: "Email",
        interest: "Tipo De Interes",
        message: "Mensaje",
        submit: "Crear Mensaje Preview",
        successTitle: "Modo preview: este mensaje todavia no se envio.",
        successBody: "El flujo real de email se conectara despues de la aprobacion.",
        errors: {
          name: "Escribe un nombre.",
          email: "Escribe un email valido.",
          interest: "Elige un tipo de interes.",
          message: "Escribe un mensaje.",
        },
      },
      footer: {
        description: "Una organizacion 501(c)(3) que empodera jovenes, eleva futuros y construye comunidad.",
        quick: "Links Rapidos",
        connected: "Sigue Conectado",
        join: "Unete A La Comunidad",
        joinBody: "Suscribete para recibir noticias, eventos y formas de participar.",
        subscribe: "Suscribir",
        llms: "Archivo legible para IA",
        copyright: "© 2026 Asc3nd Collective. Todos los derechos reservados.",
        privacy: "Politica De Privacidad",
        terms: "Terminos Y Condiciones",
      },
      labels: {
        pricePending: "Precio pendiente",
        comingSoon: "Muy pronto",
        readStatus: "Estado",
        sourceNote: "Nota de fuente",
        mailto: "Abrir Borrador",
        copy: "Copiar Resumen",
        reset: "Reiniciar",
        copied: "Resumen copiado.",
        merchToast: "Interes de merch agregado al formulario.",
        subscribeSuccess: "Modo preview: la suscripcion se conectara despues de aprobacion.",
      },
      interests: ["Voluntario", "Patrocinador", "Donar", "Merch", "Pregunta de programa", "Alianza", "Otro"],
      pillars: [
        { icon: "OO", title: "Enfoque Juvenil", text: "Construyendo confianza, liderazgo y habilidades de vida." },
        { icon: "^", title: "Futuro En Marcha", text: "Brindando educacion, mentoria y oportunidades reales." },
        { icon: "<3", title: "Comunidad Primero", text: "Fortaleciendo familias y creando impacto duradero." },
        { icon: "/\\", title: "Juntos Ascendemos", text: "Uniendo a la comunidad para elevar cada generacion." },
      ],
      programsList: [
        { icon: "B", title: "Apoyo Educativo", text: "Tutoria, tareas y recursos academicos para ayudar a jovenes a avanzar." },
        { icon: "M", title: "Mentorias", text: "Acompanamiento uno a uno que construye confianza, caracter y liderazgo." },
        { icon: "*", title: "Desarrollo De Liderazgo", text: "Habilidades para liderar, inspirar y crear cambio positivo." },
        { icon: "H", title: "Participacion Comunitaria", text: "Proyectos de servicio e iniciativas que crean impacto y unidad." },
        { icon: "S", title: "Vida Y Bienestar", text: "Talleres y recursos que apoyan salud mental, bienestar y resiliencia." },
      ],
      posts: [
        ["Mentoria Juvenil En Seattle", "2026-06-07", "Mentoria", "Como el apoyo constante de adultos ayuda a jovenes a construir confianza, direccion y liderazgo.", "Guia editorial", "Plan editorial preview."],
        ["Preparacion Para Fondos", "2026-06-10", "Fondos", "Una lista practica para senales de confianza, claridad de programas, documentacion y resultados.", "Nota de preparacion", "Sin fechas falsas de fondos."],
        ["Herramientas De IA Para Nonprofits", "2026-06-14", "Operaciones IA", "Donde la automatizacion puede apoyar intake, seguimiento, reportes y coordinacion de equipo.", "Guia de operaciones IA", "Nota conceptual."],
        ["Confianza Donante Y Narrativa Publica", "2026-06-18", "Confianza", "Por que la mision clara, programas visibles y etiquetas honestas importan antes de recaudar.", "Marco comunitario", "Sin estadisticas falsas."],
        ["Coordinacion De Voluntarios Humana", "2026-06-22", "Voluntarios", "Un mejor camino voluntario empieza con opciones claras y seguimiento facil.", "Guia editorial", "Solo workflow preview."],
        ["Deporte Comunitario Y Liderazgo", "2026-06-25", "Liderazgo", "El deporte y las actividades de equipo pueden abrir caminos para responsabilidad, mentoria y confianza.", "Marco comunitario", "Sin alianzas falsas."],
        ["Patrocinios Del Pacific Northwest", "2026-06-29", "Patrocinio", "Patrocinadores locales necesitan una historia clara, activos limpios y un camino creible hacia impacto.", "Nota de preparacion", "Estrategia prospectiva."],
        ["Crear Un Motor De Contenido Nonprofit", "2026-07-03", "Contenido", "Un flujo repetible de blog y redes mantiene visible la mision sin saturar a un equipo pequeno.", "Guia de operaciones IA", "Copy original preview."],
      ],
      products: [
        ["Playera Signature Asc3nd", "Playera negra/dorada para eventos, voluntarios y agradecimientos a donantes.", "Pedir info"],
        ["Gorra Crown Asc3nd", "Concepto de gorra con marca de corona para visibilidad comunitaria diaria.", "Avisame"],
        ["Hoodie Comunidad Asc3nd", "Concepto premium para mentores, lideres juveniles y eventos de invierno.", "Patrocinar lanzamiento"],
        ["Tote Asc3nd Diario", "Bolsa reusable para talleres, dias de recursos y mesas comunitarias.", "Pedir info"],
        ["Sticker Pack Asc3nd", "Piezas pequenas para laptops, cuadernos, botellas y kits de eventos.", "Avisame"],
        ["Print De Pared Asc3nd", "Poster motivacional con el mensaje Asc3nd y la identidad negro/dorado.", "Patrocinar lanzamiento"],
        ["Taza O Botella Asc3nd", "Articulo diario durable para voluntarios, mentores y dias de programa.", "Avisame"],
      ],
      modals: {
        events: {
          kicker: "Eventos",
          title: "Eventos Muy Pronto",
          body: "<p>Asc3nd esta preparando su calendario de eventos. En este preview, esto abre limpio en vez de mandar a una pagina rota o vacia.</p><p>Usa el formulario de contacto para informacion actual de voluntariado, patrocinio o programas.</p>",
          primary: "Contactar Asc3nd",
          href: "#contact",
        },
        volunteer: {
          kicker: "Participa",
          title: "Camino Voluntario Muy Pronto",
          body: "<p>El flujo de voluntariado esta preparado como interaccion preview. La version final debe mandar el interes a un backend real o workflow de email.</p><ul><li>Interes de mentoria</li><li>Apoyo en eventos</li><li>Apoyo de programas</li><li>Conversacion de patrocinio</li></ul>",
          primary: "Abrir Contacto",
          href: "#contact",
        },
        privacy: {
          kicker: "Legal Preview",
          title: "Politica De Privacidad",
          body: "<p>Este preview no guarda ni almacena mensajes del formulario. Las entradas se validan localmente y solo pueden crear un borrador de email.</p><p>La produccion final necesita revision legal y de privacidad antes del lanzamiento.</p>",
          primary: "Leer Archivo IA",
          href: "./llms.txt",
        },
        terms: {
          kicker: "Legal Preview",
          title: "Terminos Y Condiciones",
          body: "<p>Este preview estatico es para revision y aprobacion. Merch, checkout, Printify, email y backend no estan activos todavia.</p><p>Los terminos finales deben revisarse antes del deploy de produccion.</p>",
          primary: "Contactar Asc3nd",
          href: "#contact",
        },
      },
    },
  };

  let currentLang = "en";
  let lastFocused = null;

  const body = document.body;
  const header = document.getElementById("site-header");
  const progress = document.getElementById("scroll-progress");
  const modal = document.getElementById("modal");
  const modalKicker = document.getElementById("modal-kicker");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalPrimary = document.getElementById("modal-primary");
  const langToggle = document.getElementById("lang-toggle");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");
  const contactSummary = document.getElementById("contact-summary");
  const mailtoLink = document.getElementById("mailto-link");
  const copySummary = document.getElementById("copy-summary");
  const resetContact = document.getElementById("reset-contact");
  const subscribeForm = document.getElementById("subscribe-form");
  const subscribeNote = document.getElementById("subscribe-note");
  const toast = document.getElementById("toast");

  const get = (path) => path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), content[currentLang]);

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  };

  const setText = () => {
    document.documentElement.lang = currentLang === "es" ? "es-MX" : "en";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = get(node.dataset.i18n);
      if (typeof value === "string") node.textContent = value;
    });
    document.querySelectorAll("[data-lang-chip]").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.langChip === currentLang);
    });
    if (mailtoLink) mailtoLink.textContent = content[currentLang].labels.mailto;
    if (copySummary) copySummary.textContent = content[currentLang].labels.copy;
    if (resetContact) resetContact.textContent = content[currentLang].labels.reset;
    renderDynamicSections();
    renderInterestOptions();
  };

  const renderDynamicSections = () => {
    const c = content[currentLang];

    const pillarsGrid = document.getElementById("pillars-grid");
    if (pillarsGrid) {
      pillarsGrid.innerHTML = c.pillars
        .map((item) => `
          <article class="hp-pillar">
            <div class="hp-pillar-icon" aria-hidden="true">${item.icon}</div>
            <div>
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </div>
          </article>
        `)
        .join("");
    }

    const programGrid = document.getElementById("program-grid");
    if (programGrid) {
      programGrid.innerHTML = c.programsList
        .map((item, index) => `
          <article class="hp-program-card">
            <div class="hp-program-img" style="background-position-y:${24 + index * 8}%">
              <div class="hp-program-icon-wrap"><span class="hp-program-icon" aria-hidden="true">${item.icon}</span></div>
            </div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `)
        .join("");
    }

    const blogGrid = document.getElementById("blog-grid");
    if (blogGrid) {
      blogGrid.innerHTML = c.posts
        .map(([title, date, category, excerpt, status, source]) => `
          <article class="blog-card">
            <div class="blog-meta">${date} / ${category}</div>
            <h3>${title}</h3>
            <p>${excerpt}</p>
            <span class="product-status">${status}</span>
            <span class="source-note">${source}</span>
          </article>
        `)
        .join("");
    }

    const storeGrid = document.getElementById("store-grid");
    if (storeGrid) {
      storeGrid.innerHTML = c.products
        .map(([name, description, action], index) => `
          <article class="store-card">
            <div class="product-image" style="background-position:${50 + (index % 3) * 8}% ${48 + (index % 2) * 8}%"></div>
            <div class="product-body">
              <span class="product-status">${c.labels.comingSoon}</span>
              <h3>${name}</h3>
              <p>${description}</p>
              <div class="product-price">${c.labels.pricePending}</div>
              <button class="product-action" type="button" data-merch-interest="${name}">${action}</button>
            </div>
          </article>
        `)
        .join("");
    }
  };

  const renderInterestOptions = () => {
    const select = document.getElementById("contact-interest");
    if (!select) return;
    const current = select.value;
    const placeholder = currentLang === "es" ? "Elige una opcion" : "Choose an option";
    select.innerHTML = [`<option value="">${placeholder}</option>`]
      .concat(content[currentLang].interests.map((label) => `<option value="${label}">${label}</option>`))
      .join("");
    if (current) select.value = current;
  };

  const updateScrollState = () => {
    const top = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle("is-scrolled", top > 8);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${Math.min(100, (top / max) * 100)}%` : "0%";
    }
  };

  const closeMobileMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.hidden = true;
    mobileToggle.setAttribute("aria-expanded", "false");
  };

  const openModal = (name, trigger) => {
    const data = content[currentLang].modals[name];
    if (!data || !modal) return;
    lastFocused = trigger || document.activeElement;
    modalKicker.textContent = data.kicker;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    modalPrimary.textContent = data.primary;
    modalPrimary.href = data.href;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    body.classList.add("modal-open");
    closeMobileMenu();
    modal.querySelector("[data-modal-close]")?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    body.classList.remove("modal-open");
    window.setTimeout(() => {
      modal.hidden = true;
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }, 180);
  };

  const setFieldError = (name, message = "") => {
    const target = document.querySelector(`[data-error-for="${name}"]`);
    if (target) target.textContent = message;
  };

  const emailOk = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateContact = () => {
    const c = content[currentLang].contact;
    const values = {
      name: document.getElementById("contact-name").value.trim(),
      email: document.getElementById("contact-email").value.trim(),
      interest: document.getElementById("contact-interest").value.trim(),
      message: document.getElementById("contact-message").value.trim(),
    };
    let ok = true;
    setFieldError("name");
    setFieldError("email");
    setFieldError("interest");
    setFieldError("message");

    if (!values.name) {
      setFieldError("name", c.errors.name);
      ok = false;
    }
    if (!values.email || !emailOk(values.email)) {
      setFieldError("email", c.errors.email);
      ok = false;
    }
    if (!values.interest) {
      setFieldError("interest", c.errors.interest);
      ok = false;
    }
    if (!values.message) {
      setFieldError("message", c.errors.message);
      ok = false;
    }
    return { ok, values };
  };

  const buildSummary = (values) => {
    const labels = currentLang === "es"
      ? ["Nombre", "Email", "Interes", "Mensaje", "Estado"]
      : ["Name", "Email", "Interest", "Message", "Status"];
    const status = currentLang === "es"
      ? "Preview mode only. Not sent yet."
      : "Preview mode only. Not sent yet.";
    return [
      `${labels[0]}: ${values.name}`,
      `${labels[1]}: ${values.email}`,
      `${labels[2]}: ${values.interest}`,
      `${labels[3]}: ${values.message}`,
      `${labels[4]}: ${status}`,
    ].join("\n");
  };

  const focusContactForMerch = (productName) => {
    const interest = document.getElementById("contact-interest");
    const message = document.getElementById("contact-message");
    const merchLabel = content[currentLang].interests[3];
    if (interest) interest.value = merchLabel;
    if (message && !message.value.trim()) {
      message.value = currentLang === "es"
        ? `Quiero informacion sobre merch: ${productName}.`
        : `I want merch information about: ${productName}.`;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(content[currentLang].labels.merchToast);
  };

  document.addEventListener("click", (event) => {
    const modalTrigger = event.target.closest("[data-modal-trigger]");
    if (modalTrigger) {
      event.preventDefault();
      openModal(modalTrigger.dataset.modalTrigger, modalTrigger);
      return;
    }

    if (event.target.closest("[data-modal-close]")) {
      event.preventDefault();
      closeModal();
      return;
    }

    const merch = event.target.closest("[data-merch-interest]");
    if (merch) {
      event.preventDefault();
      focusContactForMerch(merch.dataset.merchInterest);
      return;
    }

    const anchor = event.target.closest('a[href^="#"]');
    if (anchor) closeMobileMenu();
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeMobileMenu();
    }
  });

  langToggle?.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    setText();
  });

  mobileToggle?.addEventListener("click", () => {
    const next = mobileMenu.hidden;
    mobileMenu.hidden = !next;
    mobileToggle.setAttribute("aria-expanded", String(next));
  });

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = validateContact();
    if (!result.ok) return;
    const summary = buildSummary(result.values);
    contactSummary.textContent = summary;
    const subject = encodeURIComponent(`Asc3nd Contact Preview - ${result.values.interest}`);
    const bodyText = encodeURIComponent(summary);
    mailtoLink.href = `mailto:?subject=${subject}&body=${bodyText}`;
    contactSuccess.hidden = false;
    contactSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  contactForm?.addEventListener("input", (event) => {
    const field = event.target.name;
    if (field) setFieldError(field);
  });

  copySummary?.addEventListener("click", async () => {
    const text = contactSummary.textContent.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    showToast(content[currentLang].labels.copied);
  });

  resetContact?.addEventListener("click", () => {
    contactForm.reset();
    contactSuccess.hidden = true;
    renderInterestOptions();
    ["name", "email", "interest", "message"].forEach((field) => setFieldError(field));
  });

  subscribeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    subscribeNote.textContent = content[currentLang].labels.subscribeSuccess;
  });

  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
  } else {
    document.querySelectorAll(".reveal").forEach((section) => section.classList.add("is-visible"));
  }

  Object.values(socialUrls).forEach((url) => {
    if (!url.startsWith("https://")) console.warn("Unexpected social URL", url);
  });
  if (donateUrl !== "https://www.givelively.org/") console.warn("Donate URL changed", donateUrl);

  setText();
  updateScrollState();
})();
