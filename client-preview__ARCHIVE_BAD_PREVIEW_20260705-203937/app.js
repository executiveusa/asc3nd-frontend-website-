(() => {
  const body = document.body;
  const header = document.getElementById("site-header");
  const scrollProgress = document.getElementById("scroll-progress");
  const toast = document.getElementById("toast");
  const modal = document.getElementById("modal");
  const modalSurface = modal.querySelector(".modal__surface");
  const modalKicker = document.getElementById("modal-kicker");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalPrimary = modal.querySelector("[data-modal-primary]");
  const modalCloseButtons = [...modal.querySelectorAll("[data-modal-close]")];
  const langToggle = document.getElementById("lang-toggle");
  const contactForm = document.getElementById("contact-form");
  const contactSummary = document.getElementById("contact-summary");
  const contactSuccess = document.getElementById("contact-success");
  const mailtoLink = document.getElementById("mailto-link");
  const copySummaryButton = document.getElementById("copy-summary");
  const resetContactButton = document.getElementById("reset-contact");
  const nav = document.querySelector(".site-nav");

  const interestOptions = [
    "Volunteer",
    "Sponsor",
    "Donate",
    "Merch",
    "Program question",
    "Partnership",
    "Other",
  ];

  const content = {
    en: {
      brandTag: "Static client preview",
      nav: {
        home: "Home",
        mission: "Mission",
        programs: "Programs",
        stories: "Stories",
        store: "Store",
        contact: "Contact",
        events: "Events",
        volunteer: "Volunteer",
        donate: "Donate",
      },
      heroKicker: "Client preview mode",
      heroChip: "Seattle youth leadership",
      heroTitleA: "A polished public preview for",
      heroTitleB: "built to sell the vision.",
      heroLede:
        "This standalone demo shows the Asc3nd story the way a donor, sponsor, or partner should experience it: clear hierarchy, premium motion, bilingual copy, trust-first navigation, and a merch path that feels ready for the next phase without pretending the backend is live.",
      heroDonate: "Donate now",
      heroVolunteer: "Volunteer",
      heroPrograms: "Explore programs",
      heroTrust1Label: "Why it works",
      heroTrust1Value: "Donor-first path",
      heroTrust1Text: "Donate stays visually primary while the rest of the page supports confidence and momentum.",
      heroTrust2Label: "What is shown",
      heroTrust2Value: "Bilingual preview",
      heroTrust2Text: "English and Mexican Spanish live in the same experience so the story stays cohesive.",
      heroTrust3Label: "What is not claimed",
      heroTrust3Value: "No fake backend",
      heroTrust3Text: "Forms, merch, and links are staged as preview interactions only.",
      heroPanelKicker: "Preview snapshot",
      heroPanelTitle: "What the client can grasp in 15 seconds",
      heroPanelText:
        "A civic, emotional, modern landing page with a serious tone, a strong donate path, a visible merch strategy, and a clear separation between preview polish and later production work.",
      heroPanelChip1Label: "Section flow",
      heroPanelChip1Value: "Hero -> Mission -> Programs -> Stories",
      heroPanelChip1Text: "Every section gives the eye a landing point and the next click is always obvious.",
      heroPanelChip2Label: "Trust cues",
      heroPanelChip2Value: "Modal discipline",
      heroPanelChip2Text: "Events, volunteer, privacy, and terms are handled with explicit open and close behavior.",
      heroPanelChip3Label: "Business path",
      heroPanelChip3Value: "Merch-ready",
      heroPanelChip3Text: "The store preview sells the future without promising checkout or inventory today.",
      pillar1Title: "Youth Focused",
      pillar1Text: "Building confidence, leadership, and life skills.",
      pillar2Title: "Future Driven",
      pillar2Text: "Providing education, mentorship, and real-world opportunities.",
      pillar3Title: "Community Built",
      pillar3Text: "Strengthening families and creating lasting impact.",
      pillar4Title: "Together We Asc3nd",
      pillar4Text: "Uniting our community to elevate every generation.",
      missionKicker: "Who we are",
      missionTitle: "WE BELIEVE IN THE POTENTIAL OF EVERY YOUTH.",
      missionLede:
        "Asc3nd Collective is a youth development nonprofit dedicated to empowering young people through mentorship, education, leadership development, and community engagement. We meet youth where they are and walk beside them as they ASC3ND to their highest potential.",
      missionCta: "Learn more about us →",
      programsKicker: "Our programs",
      programsTitle: "BUILDING BRIGHTER TOMORROWS",
      program1Title: "Education Support",
      program1Text: "Tutoring, homework help, and academic resources to help youth succeed.",
      program2Title: "Mentorship",
      program2Text: "One-on-one mentorship that builds confidence, character and leadership.",
      program3Title: "Leadership Development",
      program3Text: "Equipping youth with the skills to lead, inspire and create change.",
      program4Title: "Community Engagement",
      program4Text: "Service projects and community initiatives that create impact and build unity.",
      program5Title: "Life Skills & Wellness",
      program5Text: "Workshops and resources that support mental health, wellness and resilience.",
      storiesKicker: "Stories",
      storiesTitle: "Moments that make the mission feel real.",
      story1Title: "Youth find confidence through structure",
      story1Text: "The page points clearly toward programs and support so the mission reads as operational, not abstract.",
      story2Title: "The community sees a credible organization",
      story2Text: "Strong typography, direct calls to action, and grounded imagery keep the experience trustworthy and memorable.",
      story3Title: "The next phase has room to grow",
      story3Text: "The preview keeps the commerce and contact paths staged so the production work can land cleanly later.",
      storeKicker: "Store preview",
      storeTitle: "SAYING WHAT THE MERCH LINE COULD BECOME",
      storeLede:
        "The preview keeps the store visually present without pretending checkout, inventory, or fulfillment are live yet.",
      storeBullet1: "Catalog structure is mapped",
      storeBullet2: "Product image slots are staged",
      storeBullet3: "Merch launch copy is ready",
      storeBullet4: "Checkout is intentionally not live",
      storeBullet5: "Printify integration can come later",
      contactKicker: "Contact",
      contactTitle: "LET THE TEAM TEST THE FLOW",
      contactLede: "The form and summary are local preview tools so the team can test the interaction before anything goes live.",
      contactName: "Name",
      contactEmail: "Email",
      contactInterest: "Type of interest",
      contactMessage: "Message",
      contactSubmit: "Preview message",
      contactReset: "Reset",
      contactHint: "The fields validate locally. Nothing is sent from this demo.",
      contactNoteBadge: "Preview mode",
      contactNoteTitle: "Send the right signal without pretending delivery exists.",
      contactNoteText:
        "The real contact flow can connect after approval. For now, the form generates a clean summary, an email draft, and a copyable note so the team can evaluate the interaction without backend risk.",
      contactOpenEmail: "Open email draft",
      contactCopySummary: "Copy summary",
      footerCopy: "Client preview only. Production systems, legal review, and live commerce stay staged for the next phase.",
      footer: {
        events: "Events",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        llms: "AI-readable site file",
        donate: "Donate",
      },
      socials: {
        instagram: "Instagram",
        facebook: "Facebook",
        x: "X",
        tiktok: "TikTok",
        linkedin: "LinkedIn",
      },
      modalClose: "Close",
      modals: {
        events: {
          kicker: "Events preview",
          title: "Events stay staged until the next phase.",
          body:
            "<p>The preview keeps Events as an honest coming-soon conversation so the page feels active without inventing a live schedule.</p><p>Once production is approved, this area can expand into registrations, volunteer nights, and sponsor moments.</p><ul><li>No fake agenda</li><li>Real close behavior</li><li>Preview only</li></ul>",
          primary: "Donate now",
        },
        volunteer: {
          kicker: "Volunteer preview",
          title: "Volunteer interest is captured without pretending the system is live.",
          body:
            "<p>The preview opens a clear modal so supporters can express interest today while the real pipeline stays for a later phase.</p><p>That keeps the experience credible and avoids inventing a backend that has not been approved yet.</p><ul><li>No fake submission</li><li>Esc, overlay, and button close it</li><li>Future volunteer pipeline</li></ul>",
          primary: "Donate now",
        },
        privacy: {
          kicker: "Privacy preview",
          title: "Privacy policy summary for the demo.",
          body:
            "<p>This preview does not store submissions in a database, and it does not claim to be the final legal policy.</p><p>It shows the kind of trust language the live site will need once the full workflow is approved.</p><ul><li>Preview only</li><li>No backend storage</li><li>Final legal review later</li></ul>",
          primary: "Donate now",
        },
        terms: {
          kicker: "Terms preview",
          title: "Terms summary for the demo.",
          body:
            "<p>The goal here is clarity: the page is a sales preview, not the final production site.</p><p>Terms will be expanded once the legal, donation, and commerce details are ready.</p><ul><li>Static preview only</li><li>No checkout claims</li><li>Final terms later</li></ul>",
          primary: "Donate now",
        },
      },
    },
    es: {
      brandTag: "Vista previa estatica del cliente",
      nav: {
        home: "Inicio",
        mission: "Mision",
        programs: "Programas",
        stories: "Historias",
        store: "Tienda",
        contact: "Contacto",
        events: "Eventos",
        volunteer: "Voluntariado",
        donate: "Donar",
      },
      heroKicker: "Modo de vista previa",
      heroChip: "Liderazgo juvenil en Seattle",
      heroTitleA: "Una vista publica pulida para",
      heroTitleB: "pensada para vender la idea.",
      heroLede:
        "Esta demostracion independiente muestra la historia de Asc3nd como deberia verla un donante, patrocinador o aliado: jerarquia clara, movimiento premium, copia bilingue, navegacion que inspira confianza y una ruta de mercancia que se siente lista para la siguiente fase sin fingir que el backend ya esta activo.",
      heroDonate: "Donar ahora",
      heroVolunteer: "Voluntariado",
      heroPrograms: "Ver programas",
      heroTrust1Label: "Por que funciona",
      heroTrust1Value: "Ruta centrada en donantes",
      heroTrust1Text: "Donar se mantiene como la accion visual principal mientras el resto apoya confianza y ritmo.",
      heroTrust2Label: "Que se muestra",
      heroTrust2Value: "Vista bilingue",
      heroTrust2Text: "Ingles y espanol mexicano viven en la misma experiencia para que la historia se sienta cohesionada.",
      heroTrust3Label: "Que no se promete",
      heroTrust3Value: "Sin backend falso",
      heroTrust3Text: "Los formularios, la tienda y los enlaces solo simulan interaccion de vista previa.",
      heroPanelKicker: "Instantanea de vista previa",
      heroPanelTitle: "Lo que el cliente puede entender en 15 segundos",
      heroPanelText:
        "Una pagina civica, emocional y moderna con tono serio, ruta fuerte de donacion, estrategia clara de mercancia y una separacion honesta entre el pulido de la vista previa y el trabajo de produccion posterior.",
      heroPanelChip1Label: "Flujo de secciones",
      heroPanelChip1Value: "Heroe -> Mision -> Programas -> Historias",
      heroPanelChip1Text: "Cada seccion le da al ojo un punto de apoyo y el siguiente clic siempre es obvio.",
      heroPanelChip2Label: "Señales de confianza",
      heroPanelChip2Value: "Disciplina modal",
      heroPanelChip2Text: "Eventos, voluntariado, privacidad y terminos tienen apertura y cierre explicitos.",
      heroPanelChip3Label: "Ruta de negocio",
      heroPanelChip3Value: "Lista para mercancia",
      heroPanelChip3Text: "La tienda de prueba vende el futuro sin prometer checkout ni inventario hoy.",
      pillar1Title: "Centrado en la juventud",
      pillar1Text: "Construir confianza, liderazgo y habilidades para la vida.",
      pillar2Title: "Impulsado por el futuro",
      pillar2Text: "Ofrecer educacion, mentorias y oportunidades reales.",
      pillar3Title: "Construido en comunidad",
      pillar3Text: "Fortalecer familias y crear impacto duradero.",
      pillar4Title: "Juntos Asc3ndemos",
      pillar4Text: "Unir a la comunidad para elevar a cada generacion.",
      missionKicker: "Quienes somos",
      missionTitle: "CREEMOS EN EL POTENCIAL DE CADA JOVEN.",
      missionLede:
        "Asc3nd Collective es una organizacion sin fines de lucro dedicada al desarrollo juvenil. Acompañamos a los jovenes con mentorias, educacion, liderazgo y participacion comunitaria para que asciendan a su maximo potencial.",
      missionCta: "Conocenos mejor →",
      programsKicker: "Nuestros programas",
      programsTitle: "CONSTRUYENDO UN MAÑANA MAS BRILLANTE",
      program1Title: "Apoyo educativo",
      program1Text: "Tutoria, ayuda con tareas y recursos academicos para ayudar a los jovenes a avanzar.",
      program2Title: "Mentorias",
      program2Text: "Mentorias uno a uno que construyen confianza, caracter y liderazgo.",
      program3Title: "Desarrollo de liderazgo",
      program3Text: "Herramientas para liderar, inspirar y crear cambio.",
      program4Title: "Participacion comunitaria",
      program4Text: "Proyectos de servicio e iniciativas comunitarias que crean impacto y unidad.",
      program5Title: "Habilidades y bienestar",
      program5Text: "Talleres y recursos que apoyan salud mental, bienestar y resiliencia.",
      storiesKicker: "Historias",
      storiesTitle: "Momentos que hacen real la mision.",
      story1Title: "La estructura ayuda a crecer",
      story1Text: "La pagina apunta con claridad a programas y apoyo para que la mision se lea como operativa y no abstracta.",
      story2Title: "La comunidad ve una organizacion creible",
      story2Text: "La tipografia, las llamadas a la accion y las imagenes mantienen la experiencia confiable y memorable.",
      story3Title: "La siguiente fase sigue teniendo espacio",
      story3Text: "La vista previa mantiene comercio y contacto en modo de preparacion para que la produccion aterrice despues.",
      storeKicker: "Vista previa de tienda",
      storeTitle: "MOSTRANDO LO QUE LA LINEA DE MERCH PUEDE SER",
      storeLede:
        "La vista previa conserva la tienda como parte visual sin fingir que el checkout, el inventario o el envio ya estan activos.",
      storeBullet1: "La estructura del catalogo ya esta definida",
      storeBullet2: "Los espacios de imagen estan preparados",
      storeBullet3: "El texto de lanzamiento esta listo",
      storeBullet4: "El checkout no esta activo a proposito",
      storeBullet5: "La integracion con Printify puede venir despues",
      contactKicker: "Contacto",
      contactTitle: "DEJA QUE EL EQUIPO PRUEBE EL FLUJO",
      contactLede: "El formulario y el resumen son herramientas locales para probar la interaccion antes de publicarla.",
      contactName: "Nombre",
      contactEmail: "Correo",
      contactInterest: "Tipo de interes",
      contactMessage: "Mensaje",
      contactSubmit: "Previsualizar mensaje",
      contactReset: "Reiniciar",
      contactHint: "Los campos se validan localmente. Nada se envia desde esta demostracion.",
      contactNoteBadge: "Modo vista previa",
      contactNoteTitle: "Envía la señal correcta sin fingir que ya existe entrega.",
      contactNoteText:
        "El flujo real de contacto se conectara despues de la aprobacion. Por ahora, el formulario genera un resumen limpio, un borrador de correo y una nota copiable para que el equipo evalúe la interaccion sin riesgo de backend.",
      contactOpenEmail: "Abrir borrador de correo",
      contactCopySummary: "Copiar resumen",
      footerCopy: "Solo vista previa para el cliente. Los sistemas de produccion, la revision legal y el comercio real quedan para la siguiente fase.",
      footer: {
        events: "Eventos",
        privacy: "Aviso de privacidad",
        terms: "Terminos y condiciones",
        llms: "Archivo del sitio legible por IA",
        donate: "Donar",
      },
      socials: {
        instagram: "Instagram",
        facebook: "Facebook",
        x: "X",
        tiktok: "TikTok",
        linkedin: "LinkedIn",
      },
      modalClose: "Cerrar",
      modals: {
        events: {
          kicker: "Eventos proximamente",
          title: "Los eventos se preparan para la siguiente fase.",
          body:
            "<p>La vista previa publica mantiene Eventos como una conversacion elegante de proximamente para que la pagina siga siendo honesta sin dejar de sentirse activa.</p><p>Cuando el flujo de produccion sea aprobado, esta area puede crecer hacia registro de eventos, noches de voluntariado, exhibiciones juveniles y momentos para patrocinadores.</p><ul><li>Sin agenda falsa</li><li>Los metodos de cierre son reales</li><li>Vista previa, no registro en vivo</li></ul>",
          primary: "Donar ahora",
        },
        volunteer: {
          kicker: "Voluntariado proximamente",
          title: "El interes de voluntariado se captura sin fingir que el sistema ya esta activo.",
          body:
            "<p>La vista previa abre un modal claro para que los seguidores expresen interes hoy mientras el pipeline real de captacion queda para una fase posterior.</p><p>Eso mantiene la experiencia creible y evita inventar un backend que aun no ha sido aprobado.</p><ul><li>Sin envio falso</li><li>Cierre con Esc, overlay y boton</li><li>Ruta futura de voluntariado</li></ul>",
          primary: "Donar ahora",
        },
        privacy: {
          kicker: "Privacidad",
          title: "Resumen de aviso de privacidad para la demo.",
          body:
            "<p>Esta vista previa no guarda envios en una base de datos y no pretende ser la politica legal final.</p><p>Muestra el tipo de lenguaje de confianza que el sitio real necesitara cuando el flujo completo sea aprobado.</p><ul><li>Solo vista previa</li><li>Sin almacenamiento en backend</li><li>Revision legal final despues</li></ul>",
          primary: "Donar ahora",
        },
        terms: {
          kicker: "Terminos",
          title: "Resumen de terminos para la demo.",
          body:
            "<p>La meta aqui es claridad: la pagina es una vista previa de ventas, no el sitio final de produccion.</p><p>Los terminos se ampliaran cuando los detalles legales, de donacion y de comercio esten listos.</p><ul><li>Solo vista previa estatica</li><li>Sin promesas de checkout</li><li>Terminos finales despues</li></ul>",
          primary: "Donar ahora",
        },
      },
    },
  };

  const modalConfig = {
    events: "events",
    volunteer: "volunteer",
    privacy: "privacy",
    terms: "terms",
  };

  let currentLang = "en";

  function getValue(path) {
    return path.split(".").reduce((value, key) => value?.[key], content[currentLang]);
  }

  function applyText() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = getValue(node.dataset.i18n);
      if (value != null) node.textContent = value;
    });

    document.querySelectorAll("[data-nav]").forEach((node) => {
      node.textContent = content[currentLang].nav[node.dataset.nav];
    });
    document.querySelectorAll("[data-footer-nav]").forEach((node) => {
      node.textContent = content[currentLang].footer[node.dataset.footerNav];
    });
    document.querySelectorAll("[data-social]").forEach((node) => {
      node.textContent = content[currentLang].socials[node.dataset.social];
    });
    document.querySelectorAll("[data-modal-primary]").forEach((node) => {
      node.textContent = content[currentLang].modals.events.primary;
    });
    document.querySelectorAll("[data-modal-close]").forEach((node) => {
      if (node.dataset.i18n === "modalClose") node.textContent = content[currentLang].modalClose;
    });

    const brandTag = document.querySelector(".brand-mark__tag");
    if (brandTag) brandTag.textContent = content[currentLang].brandTag;

    const toggleEn = document.querySelector('[data-lang-chip="en"]');
    const toggleEs = document.querySelector('[data-lang-chip="es"]');
    toggleEn?.classList.toggle("is-active", currentLang === "en");
    toggleEs?.classList.toggle("is-active", currentLang === "es");

    const interest = document.getElementById("contact-interest");
    if (interest) {
      interest.innerHTML = interestOptions
        .map((option) => `<option value="${option}">${option}</option>`)
        .join("");
    }

    updateContactSummary();
  }

  function setLanguage(nextLang) {
    currentLang = nextLang;
    document.documentElement.lang = nextLang === "es" ? "es-MX" : "en";
    applyText();
    showToast(nextLang === "es" ? "Idioma cambiado a Español mexicano." : "Language switched to English.");
  }

  function updateContactSummary() {
    const name = document.getElementById("contact-name")?.value.trim() || "—";
    const email = document.getElementById("contact-email")?.value.trim() || "—";
    const interest = document.getElementById("contact-interest")?.value || "—";
    const message = document.getElementById("contact-message")?.value.trim() || "—";

    const summary = [
      `Language: ${currentLang.toUpperCase()}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${interest}`,
      `Message: ${message}`,
    ].join("\n");

    contactSummary.textContent = summary;
    mailtoLink.href = `mailto:hello@asc3ndcollective.org?subject=${encodeURIComponent(
      `${interest} - ${name}`
    )}&body=${encodeURIComponent(summary)}`;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function openModal(type) {
    const key = modalConfig[type];
    if (!key) return;
    const item = content[currentLang].modals[key];
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modalKicker.textContent = item.kicker;
    modalTitle.textContent = item.title;
    modalBody.innerHTML = item.body;
    modalPrimary.textContent = item.primary;
    modalSurface.focus();
    body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  }

  langToggle.addEventListener("click", () => {
    setLanguage(currentLang === "en" ? "es" : "en");
  });

  document.querySelectorAll("[data-modal-trigger]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modalTrigger));
  });

  modalCloseButtons.forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-modal-close]")) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const interest = document.getElementById("contact-interest");
    const message = document.getElementById("contact-message");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    if (!name.value.trim()) return showToast(currentLang === "es" ? "Agrega un nombre." : "Please add a name.");
    if (!emailOk) return showToast(currentLang === "es" ? "Escribe un correo valido." : "Please enter a valid email.");
    if (!interest.value) return showToast(currentLang === "es" ? "Elige un tipo de interes." : "Please choose an interest.");
    if (!message.value.trim()) return showToast(currentLang === "es" ? "Escribe un mensaje corto." : "Please add a short message.");

    updateContactSummary();
    contactSuccess.hidden = false;
    contactSuccess.textContent =
      currentLang === "es"
        ? "Modo vista previa: este mensaje aun no se envio."
        : "Preview mode: this message has not been sent.";
    showToast(
      currentLang === "es"
        ? "Resumen listo. Usa el borrador de correo o copia el texto."
        : "Summary ready. Use the email draft or copy the text."
    );
  });

  resetContactButton.addEventListener("click", () => {
    contactForm.reset();
    contactSuccess.hidden = true;
    updateContactSummary();
  });

  copySummaryButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(contactSummary.textContent);
      showToast(currentLang === "es" ? "Resumen copiado." : "Summary copied.");
    } catch {
      showToast(currentLang === "es" ? "No se pudo copiar." : "Could not copy.");
    }
  });

  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) showToast(currentLang === "es" ? "Navegacion en vista previa." : "Preview navigation.");
  });

  applyText();
  header.classList.toggle("is-scrolled", window.scrollY > 12);
  updateContactSummary();
})();
