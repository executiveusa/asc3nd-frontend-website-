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
        {
          title: "Grant Readiness For Small Washington Nonprofits",
          date: "2026-06-06",
          category: "Grant Readiness",
          excerpt: "Before applying for funding, small Washington nonprofits can tighten five things: mission language, program documentation, financial records, board governance, and outcome storytelling.",
          body: "Most declined grants are not lost on the idea — they are lost on readiness. Funders in the Pacific Northwest, from regional community foundations to corporate giving programs, look for the same fundamentals: a mission statement a stranger can repeat back, current program documentation, clean financials, an active board, and honest outcome language. Washington state also offers capacity builders — Washington Nonprofits, 501 Commons, and Wayfind among them — that help small organizations close these gaps before an ask. Treat grant readiness as a year-round practice, not a scramble before a deadline. The organizations that win repeat funding are the ones that can prove, in plain language, what changed because of the money. Build that evidence loop first; the applications get easier every cycle after.",
          status: "Grant-readiness guide",
          source: "Original editorial. Verify each funder's current cycle.",
        },
        {
          title: "Where Seattle Youth Programs Find Local Funding",
          date: "2026-06-09",
          category: "Funding",
          excerpt: "From The Seattle Foundation and United Way of King County to community funds and corporate giving, the region offers several real paths for youth-serving organizations.",
          body: "Seattle is one of the better-funded metro areas for youth work, but the money is scattered across channels. Community foundations such as The Seattle Foundation and giving programs like United Way of King County are long-standing anchors. Regional networks including Philanthropy Northwest and Washington Nonprofits help connect small organizations to funders they would not reach alone. On the corporate side, the region's technology presence translates into donated software, volunteer time, and matching gifts through programs run by Microsoft, Amazon, and others — much of it routed through eligibility hubs like TechSoup. Sponsorships from local businesses matter too, especially when a program can show neighborhood ties. The realistic path for a small nonprofit is to diversify: a community foundation grant, a corporate in-kind partnership, and a base of individual recurring donors, so no single funder can quietly walk away and break the program.",
          status: "Funding landscape note",
          source: "Original summary. Confirm each funder is currently accepting applications.",
        },
        {
          title: "Mentorship That Sticks Beyond The First Meeting",
          date: "2026-06-12",
          category: "Mentorship",
          excerpt: "Durable mentoring depends on consistency, clear boundaries, training, and a real matching process — not just good intentions.",
          body: "A mentor who shows up once is nice. A mentor who shows up for a year changes a young person's trajectory. The difference is almost never charisma; it is structure. Strong programs screen and train mentors, set clear expectations about time commitment and boundaries, and match youth with adults whose strengths fit their needs. They also build in a backup: a coordinator who notices when a match is fading before the young person does. Background checks, trauma-informed practice, and supervision are not optional paperwork — they are how a program earns the trust of families. The mentorship programs that survive in Washington over the long term treat the relationship as the product, and everything else — events, marketing, fundraising — as support for it.",
          status: "Editorial guide",
          source: "Original program-design guidance.",
        },
        {
          title: "AI Tools Nonprofits Actually Use Without Losing The Human Touch",
          date: "2026-06-16",
          category: "AI Operations",
          excerpt: "Nonprofit pricing from Microsoft, Google, and TechSoup makes tools like Copilot and Gemini accessible for intake, drafting, and reporting while keeping people in charge.",
          body: "AI is not a substitute for the people who do this work, but it is a real lever for small teams that are stretched thin. Donation-eligible programs — Microsoft's Tech for Social Impact, Google for Nonprofits, and the TechSoup catalog — put capable tools within reach at a fraction of retail cost. The honest use cases are the unglamorous ones: drafting grant narratives from notes, turning intake conversations into structured records, summarizing a board meeting, translating a flyer, or generating a first pass at a quarterly report. The rules that keep this safe are simple: never put a young person's private information into a public model, keep a human review step on anything public-facing, and disclose AI assistance in donor communications where it matters. Done well, automation buys back the staff hours that get redirected toward the youth themselves.",
          status: "AI operations guide",
          source: "Original summary. Confirm current eligibility and pricing.",
        },
        {
          title: "Volunteer Coordination That Keeps People Coming Back",
          date: "2026-06-20",
          category: "Volunteer",
          excerpt: "A strong volunteer path starts with one clear choice, a fast follow-up, defined roles, and a simple way to recognize effort.",
          body: "Most volunteer drop-off happens in the first two weeks, and the cause is almost always friction: too many steps to sign up, no follow-up after they do, or showing up to a shift with nothing meaningful to do. A good volunteer pipeline answers one question fast — what can I do this Saturday — and then assigns a real role with a real endpoint. It recognizes effort without ceremony: a thank-you text, a name on a wall, a reference letter for a job application. For youth-serving nonprofits in particular, the screening step is non-negotiable for anyone working with minors, and that requirement has to be visible up front, not sprung on people later. The programs with the strongest volunteer retention treat their volunteers the way they treat their donors: as relationships to invest in, not shifts to fill.",
          status: "Editorial guide",
          source: "Original workflow guidance.",
        },
        {
          title: "Telling Your Story Without Exploiting The People You Serve",
          date: "2026-06-24",
          category: "Donor Trust",
          excerpt: "Trustworthy nonprofit storytelling earns donor confidence through consent, specificity, and dignity — not crisis imagery or borrowed statistics.",
          body: "There is a version of nonprofit storytelling that raises money in the short term and quietly damages the people it claims to serve: borrowing a young person's hardest moment, using a stock image of a stranger, attaching a statistic that came from somewhere else. Trust breaks the moment a donor — or a family — notices. The alternative is slower and stronger: stories shared with written consent, specific enough to be verifiable, told with the dignity the subject would want. A youth program earns the right to tell a story; it does not own it. The same rule applies to numbers. A real, modest outcome — eight students finished the mentorship cohort, six stayed in school — is more persuasive to a serious funder than a round, unattributed percentage. Honest storytelling is not just ethical; it is the most durable fundraising strategy a small nonprofit has.",
          status: "Community framework",
          source: "Original ethics guidance.",
        },
        {
          title: "Pacific Northwest Sponsorships: Making The Local Business Case",
          date: "2026-06-28",
          category: "Sponsorship",
          excerpt: "Local sponsors back programs when they see community ties, clean assets, employee engagement, and a credible path from support to visible impact.",
          body: "A neighborhood business will sponsor a youth program when the case is concrete and local. Generic sponsorship decks fail because they ask a small business to act like a national brand. What actually lands is specificity: this event, these families, this neighborhood, this many young people, this kind of visibility in return. Washington sponsors — whether a regional bank, a local manufacturer, or an independent retailer — increasingly want employee engagement attached to the sponsorship, not just a logo. They want staff to be able to volunteer at the program they fund. That means a sponsorship package is really a partnership package: visibility plus a volunteer day plus a clear impact report at year end. Small nonprofits that frame it this way, and can deliver clean assets on deadline, win renewals that outlast any single grant cycle.",
          status: "Prospect strategy",
          source: "Original partnership guidance.",
        },
        {
          title: "Leadership Through Sport: Why Team Programs Build Future Leaders",
          date: "2026-07-02",
          category: "Leadership",
          excerpt: "Coaches, accountability, and healthy competition teach youth to set goals, recover from setbacks, and lead peers — skills that transfer far beyond the game.",
          body: "Sport is one of the oldest leadership laboratories there is, and for youth development work it remains one of the most effective. A team teaches things a classroom struggles to: how to commit to something when you are tired, how to take correction from an adult who is not your parent, how to lose without quitting, how to win without humiliating the other side. For communities in the Pacific Northwest, where access to fields, gear, and leagues is uneven, a sponsored community-sports program is not a luxury — it is an on-ramp to mentorship, physical health, and accountability at the same time. The programs that endure pair the sport with something else: a study table, a mentor check-in, a meal. The athletics draw them in. The structure keeps them. The leadership is what they carry out.",
          status: "Community framework",
          source: "Original program-design guidance.",
        },
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
        youth: "JÓVENES.",
        line2: "ELEVANDO",
        futures: "FUTUROS.",
        line3: "CREANDO",
        community: "COMUNIDAD.",
        lede: "Damos a la juventud las herramientas, oportunidades y apoyo que necesitan para crecer, liderar y crear el futuro que merecen.",
        donate: "Donar Hoy",
        volunteer: "Ser Voluntario",
      },
      mission: {
        kicker: "Quiénes Somos",
        titleA: "Creemos En El",
        titleB: "Potencial De Cada Joven.",
        body: "Asc3nd Collective es una organización de desarrollo juvenil dedicada a empoderar a jóvenes por medio de mentorías, educación, liderazgo y participación comunitaria. Caminamos junto a ellos mientras ascienden a su mayor potencial.",
        cta: "Conocer Más",
      },
      programs: {
        kicker: "Nuestros Programas",
        title: "Construyendo Mañanas Más Brillantes",
      },
      blog: {
        kicker: "Historias",
        title: "Notas De Liderazgo Juvenil",
        intro: "Guías editoriales sobre mentoría, preparación para fondos, operaciones con IA, confianza de donantes y liderazgo comunitario.",
      },
      store: {
        kicker: "Preview De Merch",
        title: "Concepto De Recaudación Con Productos",
        intro: "Las tarjetas de productos muestran un concepto de recaudación. Checkout, inventario y Printify no están activos en este preview.",
        engineTitle: "Motor de comercio planeado",
        engineBody: "Catálogo listo. Adaptador Printify planeado. Se requiere API del servidor. El checkout no está conectado en el preview. Las imágenes reales de productos vienen después.",
      },
      cta: {
        kicker: "Participa",
        title: "Sé Parte Del Movimiento.",
        body: "Ya sea que dones, apoyes, seas mentor o voluntario, tu ayuda impulsa a jóvenes y transforma comunidades.",
        donate: "Donar",
        volunteer: "Voluntario",
      },
      contact: {
        kicker: "Contacto Preview",
        title: "Inicia La Conversación.",
        body: "Este formulario valida localmente y crea un borrador de correo. Todavía no envía a un backend.",
        previewTitle: "Solo modo preview",
        previewBody: "Sin base de datos, sin envío falso y sin automatización oculta. El flujo real de email se conecta después de aprobación.",
        name: "Nombre",
        email: "Email",
        interest: "Tipo De Interés",
        message: "Mensaje",
        submit: "Crear Mensaje Preview",
        successTitle: "Modo preview: este mensaje todavía no se envió.",
        successBody: "El flujo real de email se conectará después de la aprobación.",
        errors: {
          name: "Escribe un nombre.",
          email: "Escribe un email válido.",
          interest: "Elige un tipo de interés.",
          message: "Escribe un mensaje.",
        },
      },
      footer: {
        description: "Una organización 501(c)(3) que empodera jóvenes, eleva futuros y construye comunidad.",
        quick: "Links Rápidos",
        connected: "Sigue Conectado",
        join: "Únete A La Comunidad",
        joinBody: "Suscríbete para recibir noticias, eventos y formas de participar.",
        subscribe: "Suscribir",
        llms: "Archivo legible para IA",
        copyright: "© 2026 Asc3nd Collective. Todos los derechos reservados.",
        privacy: "Política De Privacidad",
        terms: "Términos Y Condiciones",
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
        merchToast: "Interés de merch agregado al formulario.",
        subscribeSuccess: "Modo preview: la suscripción se conectará después de aprobación.",
      },
      interests: ["Voluntario", "Patrocinador", "Donar", "Merch", "Pregunta de programa", "Alianza", "Otro"],
      pillars: [
        { icon: "OO", title: "Enfoque Juvenil", text: "Construyendo confianza, liderazgo y habilidades de vida." },
        { icon: "^", title: "Futuro En Marcha", text: "Brindando educación, mentoría y oportunidades reales." },
        { icon: "<3", title: "Comunidad Primero", text: "Fortaleciendo familias y creando impacto duradero." },
        { icon: "/\\", title: "Juntos Ascendemos", text: "Uniendo a la comunidad para elevar cada generación." },
      ],
      programsList: [
        { icon: "B", title: "Apoyo Educativo", text: "Tutoría, tareas y recursos académicos para ayudar a jóvenes a avanzar." },
        { icon: "M", title: "Mentorías", text: "Acompañamiento uno a uno que construye confianza, carácter y liderazgo." },
        { icon: "*", title: "Desarrollo De Liderazgo", text: "Habilidades para liderar, inspirar y crear cambio positivo." },
        { icon: "H", title: "Participación Comunitaria", text: "Proyectos de servicio e iniciativas que crean impacto y unidad." },
        { icon: "S", title: "Vida Y Bienestar", text: "Talleres y recursos que apoyan salud mental, bienestar y resiliencia." },
      ],
      posts: [
        {
          title: "Preparación Para Obtener Fondos En Washington",
          date: "2026-06-06",
          category: "Preparación",
          excerpt: "Antes de solicitar fondos, una pequeña organización en Washington puede fortalecer cinco cosas: claridad de misión, documentación de programas, finanzas, gobernanza y narrativa de resultados.",
          body: "La mayoría de los fondos que se pierden no se pierden por la idea, sino por la preparación. Los financiadores del Pacífico Noroeste, desde fundaciones comunitarias hasta programas corporativos, buscan lo mismo: una misión que un extraño pueda repetir, documentación vigente de programas, finanzas limpias, una junta activa y un lenguaje honesto sobre resultados. Washington ofrece además fortalecedores de capacidad, como Washington Nonprofits, 501 Commons y Wayfind, que ayudan a cerrar estas brechas antes de pedir. La preparación debe verse como una práctica de todo el año, no como un apuro antes de una fecha límite. Las organizaciones que ganan fondos repetidos son las que pueden demostrar, en lenguaje claro, qué cambió gracias al dinero.",
          status: "Guía de preparación",
          source: "Editorial original. Verifica el ciclo actual de cada financiador.",
        },
        {
          title: "Dónde Encuentran Financiamiento Los Programas Juveniles De Seattle",
          date: "2026-06-09",
          category: "Financiamiento",
          excerpt: "De The Seattle Foundation y United Way of King County hasta fondos comunitarios y donaciones corporativas, la región ofrece varios caminos reales para organizaciones juveniles.",
          body: "Seattle es una de las áreas metropolitanas con mejor financiamiento para el trabajo con jóvenes, pero el dinero está repartido en muchos canales. Fundaciones comunitarias como The Seattle Foundation y programas como United Way of King County son pilares de larga data. Redes regionales como Philanthropy Northwest y Washington Nonprofits conectan a organizaciones pequeñas con financiadores a los que no llegarían solas. En el lado corporativo, la presencia tecnológica de la región se traduce en software donado, horas de voluntariado y donaciones equivalentes a través de programas de Microsoft, Amazon y otros, gran parte canalizada por elegibilidad como TechSoup. Los patrocinios de negocios locales también importan, sobre todo cuando el programa puede demostrar vínculo con el barrio. El camino realista es diversificar: una beca de fundación, una alianza corporativa en especie y una base de donantes recurrentes.",
          status: "Nota de panorama",
          source: "Resumen original. Confirma que cada financiador siga recibiendo solicitudes.",
        },
        {
          title: "Mentoría Que Permanece Más Allá Del Primer Encuentro",
          date: "2026-06-12",
          category: "Mentoría",
          excerpt: "La mentoría duradera depende de constancia, límites claros, capacitación y un proceso real de emparejamiento, no solo de buenas intenciones.",
          body: "Un mentor que llega una vez ayuda. Un mentor que llega durante un año cambia la trayectoria de un joven. La diferencia casi nunca es el carisma, es la estructura. Los programas fuertes evalúan y capacitan a los mentores, fijan expectativas claras sobre tiempo y límites, y emparejan a los jóvenes con adultos cuyas fortalezas se ajusten a sus necesidades. También construyen un respaldo: un coordinador que nota cuando un emparejamiento se está debilitando antes que el joven. Las verificaciones de antecedentes, la práctica informada sobre trauma y la supervisión no son trámites opcionales, son la forma en que un programa se gana la confianza de las familias.",
          status: "Guía editorial",
          source: "Guía original de diseño de programas.",
        },
        {
          title: "Herramientas De IA Que Las Nonprofits Usan Sin Perder El Toque Humano",
          date: "2026-06-16",
          category: "Operaciones IA",
          excerpt: "Los precios para nonprofits de Microsoft, Google y TechSoup ponen herramientas como Copilot y Gemini al alcance para intake, redacción y reportes, con las personas a cargo.",
          body: "La IA no reemplaza a las personas que hacen este trabajo, pero es una palanca real para equipos pequeños que están saturados. Los programas con elegibilidad de donación, como Tech for Social Impact de Microsoft, Google for Nonprofits y el catálogo de TechSoup, ponen herramientas capaces al alcance por una fracción del costo. Los usos honestos son los poco glamorosos: redactar narrativas de subvención a partir de notas, convertir conversaciones de intake en registros estructurados, resumir una reunión de junta, traducir un volante o generar un primer borrador de un informe trimestral. Las reglas para mantenerlo seguro son simples: nunca pongas información privada de un menor en un modelo público, mantén una revisión humana en todo lo que sea público y disclose la asistencia de IA donde corresponda.",
          status: "Guía de operaciones IA",
          source: "Resumen original. Confirma elegibilidad y precios actuales.",
        },
        {
          title: "Coordinación De Voluntarios Que Hace Que La Gente Regrese",
          date: "2026-06-20",
          category: "Voluntarios",
          excerpt: "Un buen camino voluntario empieza con una opción clara, un seguimiento rápido, roles definidos y una forma simple de reconocer el esfuerzo.",
          body: "La mayoría de la pérdida de voluntarios ocurre en las primeras dos semanas, y casi siempre por fricción: demasiados pasos para registrarse, ningún seguimiento después de hacerlo, o llegar a un turno sin nada significativo que hacer. Un buen flujo de voluntarios responde rápido a una pregunta, qué puedo hacer este sábado, y luego asigna un rol real con un final real. Reconoce el esfuerzo sin ceremonia: un mensaje de gracias, un nombre en un muro, una carta de referencia para una solicitud de empleo. Para organizaciones que sirven a jóvenes, el filtro de antecedentes es innegociable para cualquiera que trabaje con menores, y ese requisito debe verse desde el inicio, no sorprender a la gente después.",
          status: "Guía editorial",
          source: "Guía original de flujo de trabajo.",
        },
        {
          title: "Contar Tu Historia Sin Explotar A Las Personas Que Sirves",
          date: "2026-06-24",
          category: "Confianza",
          excerpt: "La narrativa confiable de una nonprofit genera confianza de donantes mediante consentimiento, especificidad y dignidad, no imágenes de crisis ni estadísticas prestadas.",
          body: "Existe una versión de la narrativa nonprofit que recauda dinero a corto plazo y daña silenciosamente a quienes dice servir: tomar el momento más difícil de un joven, usar una imagen de archivo de un desconocido, adjuntar una estadística que vino de otra parte. La confianza se rompe en el momento en que un donante, o una familia, lo nota. La alternativa es más lenta y más fuerte: historias compartidas con consentimiento por escrito, lo bastante específicas para verificarse, contadas con la dignidad que el sujeto querría. Un programa juvenil se gana el derecho a contar una historia, no la posee. La misma regla aplica a los números.",
          status: "Marco comunitario",
          source: "Guía original de ética.",
        },
        {
          title: "Patrocinios En El Pacífico Noroeste: El Caso De Negocio Local",
          date: "2026-06-28",
          category: "Patrocinio",
          excerpt: "Los patrocinadores locales apoyan programas cuando ven vínculo comunitario, activos limpios, participación de empleados y un camino creíble del apoyo al impacto visible.",
          body: "Un negocio del barrio patrocinará un programa juvenil cuando el caso sea concreto y local. Las presentaciones genéricas fallan porque le piden a un pequeño negocio que actúe como una marca nacional. Lo que funciona es la especificidad: este evento, estas familias, este barrio, esta cantidad de jóvenes, esta visibilidad a cambio. Los patrocinadores en Washington, ya sea un banco regional, un fabricante local o un minorista independiente, quieren cada vez más que la participación de los empleados venga adjunta al patrocinio. Quieren que su personal pueda voluntariar en el programa que financian. Eso significa que un paquete de patrocinio es realmente un paquete de alianza: visibilidad, más un día de voluntariado, más un informe claro de impacto al cierre de año.",
          status: "Estrategia prospectiva",
          source: "Guía original de alianzas.",
        },
        {
          title: "Liderazgo A Través Del Deporte: Por Qué Los Programas En Equipo Forman Líderes",
          date: "2026-07-02",
          category: "Liderazgo",
          excerpt: "Entrenadores, rendición de cuentas y competencia sana enseñan a los jóvenes a fijar metas, recuperarse de los reveses y liderar a sus pares, habilidades que van más allá del juego.",
          body: "El deporte es uno de los laboratorios de liderazgo más antiguos que existen y, para el trabajo de desarrollo juvenil, sigue siendo uno de los más efectivos. Un equipo enseña lo que un salón difícilmente logra: comprometerse con algo cuando se está cansado, aceptar corrección de un adulto que no es tu padre, perder sin abandonar, ganar sin humillar al otro lado. Para comunidades del Pacífico Noroeste, donde el acceso a canchas, equipo y ligas es desigual, un programa comunitario de deporte patrocinado no es un lujo, es una rampa de entrada hacia mentoría, salud física y rendición de cuentas al mismo tiempo. Los programas que duran acompañan el deporte con algo más: una mesa de estudio, una charla con un mentor, una comida.",
          status: "Marco comunitario",
          source: "Guía original de diseño de programas.",
        },
      ],
      products: [
        ["Playera Signature Asc3nd", "Playera negra/dorada para eventos, voluntarios y agradecimientos a donantes.", "Pedir info"],
        ["Gorra Crown Asc3nd", "Concepto de gorra con marca de corona para visibilidad comunitaria diaria.", "Avísame"],
        ["Hoodie Comunidad Asc3nd", "Concepto premium para mentores, líderes juveniles y eventos de invierno.", "Patrocinar lanzamiento"],
        ["Tote Asc3nd Diario", "Bolsa reutilizable para talleres, días de recursos y mesas comunitarias.", "Pedir info"],
        ["Sticker Pack Asc3nd", "Piezas pequeñas para laptops, cuadernos, botellas y kits de eventos.", "Avísame"],
        ["Print De Pared Asc3nd", "Póster motivacional con el mensaje Asc3nd y la identidad negro/dorado.", "Patrocinar lanzamiento"],
        ["Taza O Botella Asc3nd", "Artículo diario durable para voluntarios, mentores y días de programa.", "Avísame"],
      ],
      modals: {
        events: {
          kicker: "Eventos",
          title: "Eventos Muy Pronto",
          body: "<p>Asc3nd está preparando su calendario de eventos. En este preview, esto abre limpio en vez de mandar a una página rota o vacía.</p><p>Usa el formulario de contacto para información actual de voluntariado, patrocinio o programas.</p>",
          primary: "Contactar Asc3nd",
          href: "#contact",
        },
        volunteer: {
          kicker: "Participa",
          title: "Camino Voluntario Muy Pronto",
          body: "<p>El flujo de voluntariado está preparado como interacción preview. La versión final debe mandar el interés a un backend real o workflow de email.</p><ul><li>Interés de mentoría</li><li>Apoyo en eventos</li><li>Apoyo de programas</li><li>Conversación de patrocinio</li></ul>",
          primary: "Abrir Contacto",
          href: "#contact",
        },
        privacy: {
          kicker: "Legal Preview",
          title: "Política De Privacidad",
          body: "<p>Este preview no guarda ni almacena mensajes del formulario. Las entradas se validan localmente y solo pueden crear un borrador de email.</p><p>La producción final necesita revisión legal y de privacidad antes del lanzamiento.</p>",
          primary: "Leer Archivo IA",
          href: "./llms.txt",
        },
        terms: {
          kicker: "Legal Preview",
          title: "Términos Y Condiciones",
          body: "<p>Este preview estático es para revisión y aprobación. Merch, checkout, Printify, email y backend no están activos todavía.</p><p>Los términos finales deben revisarse antes del deploy de producción.</p>",
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
        .map((post) => `
          <article class="blog-card">
            <div class="blog-meta">${post.date} / ${post.category}</div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <span class="product-status">${post.status}</span>
            <span class="source-note">${post.source}</span>
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
