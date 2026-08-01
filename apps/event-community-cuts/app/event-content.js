import { LOCKED_CLIENT_COPY_EN as client } from './client-feedback-copy.js';

// The form collects only a broad school-stage group. Qualifying "age" as
// "exact age" keeps the client's privacy promise truthful without requesting
// any additional youth information.
const privacyBodyWithExactAge = client.privacyBody.replace(
  "a child's name, school",
  "a child's name, exact age, school",
);
const faqsWithExactAge = client.faqs.map((item) => {
  if (item.question === 'Does submitting this form reserve a haircut?') {
    return Object.freeze({ ...item, emphasis: 'first-come, first-served basis' });
  }

  if (item.question === 'Should I enter information about my child?') {
    return Object.freeze({ ...item, answer: item.answer.replace("a child's name, age", "a child's name, exact age") });
  }

  return item;
});

const english = {
  locale: 'en',
  languageHref: '/es',
  languageLabel: 'ES',
  nav: {
    aria: 'Event navigation',
    event: 'Event',
    before: 'Before you come',
    supplies: 'Supplies',
    attend: client.familyButton,
  },
  brandAria: 'Asc3nd Collective — return to event overview',
  hero: {
    eyebrow: 'Asc3nd Collective presents',
    titleCommunity: 'Community',
    titleCuts: 'Cuts',
    titleBottom: 'for Kids',
    campaignLine: 'Fresh Fade, Fresh Grade',
    description: client.heroDescription,
    features: [
      { icon: 'scissors', label: 'Free Haircuts for Kids' },
      { icon: 'backpack', label: 'School Supplies & Giveaways' },
      { icon: 'community', label: 'Food, Fun & Community' },
    ],
    facts: [
      { label: 'Date', value: 'Sunday, August 30, 2026' },
      { label: 'Time', value: '12:00 PM–3:00 PM' },
      { label: 'Location', value: 'Tangles & Locs', detail: '7425 Hardeson Rd, Everett, WA 98203' },
    ],
    primaryAction: client.familyButton,
    secondaryAction: client.helpButton,
    goodToKnowTitle: 'Good to Know:',
    goodToKnow: client.goodToKnow,
    venueAlt: 'Exterior of Tangles & Locs Salon and Spa, the Community Cuts for Kids event venue at 7425 Hardeson Road in Everett, Washington',
    navigate: 'Navigate Me There',
    googleMaps: 'Google Maps',
    appleMaps: 'Apple Maps',
    venueAddress: 'Tangles & Locs · 7425 Hardeson Rd, Everett, WA 98203',
  },
  expect: {
    eyebrow: client.expectEyebrow,
    headline: client.expectHeadline,
    body: client.expectBody,
    items: client.expectations,
  },
  before: {
    eyebrow: 'Before You Come',
    headline: 'Everything confirmed in one place.',
    body: client.confirmedDetails,
    facts: [
      { label: 'When', value: 'Sunday, August 30 · 12–3 PM' },
      { label: 'Where', value: 'Tangles & Locs · Everett', detail: '7425 Hardeson Rd, Everett, WA 98203' },
      { label: 'Availability', value: client.availability },
      { label: 'Before You Come', value: client.beforeYouCome },
    ],
    directionAction: 'Navigate Me There',
  },
  family: {
    eyebrow: client.familyEyebrow,
    headline: client.familyHeadline,
    body: client.familyBody,
    action: client.familyButton,
  },
  supplies: {
    eyebrow: client.supplyEyebrow,
    headline: client.supplyHeadline,
    body: client.supplyBody,
    supplyLink: 'View Everett School District supply lists',
    groups: client.supplyGroups,
    helpEyebrow: client.helpEyebrow,
    helpHeadline: client.helpHeadline,
    helpBody: client.helpBody,
    helpButton: client.helpButton,
  },
  mission: {
    eyebrow: client.missionEyebrow,
    headline: client.missionHeadline,
    items: client.missionItems,
    tie: client.missionTie,
    founderStory: client.founderStory,
  },
  join: {
    eyebrow: client.joinEyebrow,
    headline: client.joinHeadline,
    cards: client.joinCards,
  },
  formIntro: {
    eyebrow: 'Attendance and Support',
    headline: client.formHeading,
    body: client.formBody,
    privacyTitle: client.privacyTitle,
    privacyBody: privacyBodyWithExactAge,
  },
  form: {
    name: 'Your name',
    email: 'Email',
    phone: 'Phone',
    phonePlaceholder: 'Optional if you provide email',
    contactHelp: 'Provide at least one contact method: email or phone.',
    participation: client.participationLabel,
    participationOptions: [
      { value: 'attend', label: 'Families' },
      { value: 'volunteer', label: 'Volunteer' },
      { value: 'supplies', label: 'Donate Supplies' },
      { value: 'partner', label: 'Business' },
      { value: 'general', label: 'General' },
    ],
    familyGroupLegend: 'Family attendance details',
    children: client.childrenLabel,
    ageGroup: client.ageGroupLabel,
    ageGroupOptions: [
      { value: 'preschool', label: 'Preschool' },
      { value: 'elementary', label: 'Elementary' },
      { value: 'middle-school', label: 'Middle School' },
      { value: 'high-school', label: 'High School' },
      { value: 'mixed-ages', label: 'Mixed Ages' },
    ],
    arrival: client.arrivalLabel,
    arrivalHelp: client.arrivalHelp,
    arrivalOptions: [
      { value: '12-1', label: '12:00–1:00 PM' },
      { value: '1-2', label: '1:00–2:00 PM' },
      { value: '2-3', label: '2:00–3:00 PM' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
    updates: client.updatesLabel,
    updateOptions: [
      { value: 'accessibility', label: 'Accessibility and arrival information' },
      { value: 'spanish', label: 'Spanish-language updates' },
      { value: 'volunteer', label: 'Volunteer opportunities' },
      { value: 'supplies', label: 'School-supply donation details' },
    ],
    reservationTitle: client.reservationTitle,
    reservationBody: client.reservationBody,
    consent: client.consent,
    submitLabels: client.submitLabels,
    sending: 'Sending…',
    privacyFooter: client.privacyFooter,
    errors: {
      name: 'Please enter your name.',
      contact: 'Please provide an email address or phone number so The Asc3nd Collective can contact you.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      children: 'Please enter the number of children you expect to bring.',
      ageGroup: 'Please select the age group or groups attending.',
      consent: 'Please confirm that The Asc3nd Collective may contact you about your selected participation option.',
      review: 'Please review the highlighted fields.',
      generic: 'We could not send your response. Please try again.',
      unavailable: 'Supporter intake is not connected yet. Your information was not submitted. Please use the main Asc3nd contact page for now.',
    },
    success: {
      attendance: 'RSVP received. Your response helps The Asc3nd Collective prepare. It does not reserve a haircut, school supplies, food, or giveaways.',
      supporter: 'Thank you. The Asc3nd Collective received your response and will follow up using the contact information you provided.',
      confirmationCode: 'Save this confirmation code',
    },
  },
  faq: {
    eyebrow: client.faqEyebrow,
    headline: client.faqHeadline,
    items: faqsWithExactAge,
  },
  footer: {
    tagline: 'Empower youth. Elevate futures. Build community.',
    note: 'Community Cuts for Kids · Everett, Washington',
  },
  mobileAction: client.familyButton,
};

const spanish = {
  locale: 'es',
  languageHref: '/',
  languageLabel: 'EN',
  nav: {
    aria: 'Navegación del evento',
    event: 'Evento',
    before: 'Antes de venir',
    supplies: 'Útiles',
    attend: 'Confirma tu asistencia',
  },
  brandAria: 'Asc3nd Collective — volver al resumen del evento',
  hero: {
    eyebrow: 'Asc3nd Collective presenta',
    titleCommunity: 'Community',
    titleCuts: 'Cuts',
    titleBottom: 'for Kids',
    campaignLine: 'Fresh Fade, Fresh Grade',
    description:
      'Fresh Fade, Fresh Grade es un evento comunitario gratuito de regreso a clases diseñado para ayudar a los estudiantes a comenzar el año escolar con confianza. Con cortes de cabello gratuitos, útiles escolares y apoyo comunitario, reunimos a las familias para asegurar que cada estudiante se sienta preparado, empoderado y listo para alcanzar el éxito.',
    features: [
      { icon: 'scissors', label: 'Cortes de Cabello Gratis para Niños' },
      { icon: 'backpack', label: 'Útiles Escolares y Obsequios' },
      { icon: 'community', label: 'Comida, Diversión y Comunidad' },
    ],
    facts: [
      { label: 'Fecha', value: 'Domingo, 30 de agosto de 2026' },
      { label: 'Hora', value: '12:00 PM–3:00 PM' },
      { label: 'Lugar', value: 'Tangles & Locs', detail: '7425 Hardeson Rd, Everett, WA 98203' },
    ],
    primaryAction: 'Confirma tu asistencia',
    secondaryAction: 'Quiero ayudar',
    goodToKnowTitle: 'Información importante:',
    goodToKnow:
      'Tu confirmación ayuda a The Asc3nd Collective a prepararse para todas las personas que asistirán y a servir a tantas familias como sea posible. Ten en cuenta que los cortes de cabello gratuitos y los útiles escolares se entregarán por orden de llegada mientras duren las existencias y haya citas disponibles. ¡Te recomendamos llegar temprano para aprovechar al máximo el evento!',
    venueAlt: 'Exterior de Tangles & Locs Salon and Spa, sede de Community Cuts for Kids en 7425 Hardeson Road, Everett, Washington',
    navigate: 'Llévame Allí',
    googleMaps: 'Google Maps',
    appleMaps: 'Apple Maps',
    venueAddress: 'Tangles & Locs · 7425 Hardeson Rd, Everett, WA 98203',
  },
  expect: {
    eyebrow: 'Qué Esperar',
    headline: 'Un día práctico de apoyo, conexión y comunidad.',
    body:
      'Las familias pueden acceder a recursos gratuitos para el regreso a clases, recibir cortes de cabello y útiles escolares sin costo, y conectarse con personas comprometidas a ayudar a cada estudiante a comenzar el año escolar sintiéndose preparado, seguro y valorado.',
    items: [
      { title: 'Cortes de Cabello Gratis para Niños', body: '¡Comienza el año escolar con confianza! Se ofrecerán cortes de cabello gratuitos por orden de llegada mientras haya citas disponibles.' },
      { title: 'Útiles Escolares y Obsequios', body: 'Los estudiantes recibirán mochilas, útiles escolares y otros artículos esenciales mientras duren las donaciones.' },
      { title: 'Comida, Diversión y Comunidad', body: 'Disfruta de un día acogedor con comida, actividades para toda la familia y oportunidades para conectar con vecinos, voluntarios, mentores y The Asc3nd Collective.' },
      { title: 'Confirma para Ayudarnos a Prepararnos', body: 'Compartir tu asistencia ayuda a The Asc3nd Collective a planificar el evento y servir a tantas familias como sea posible. Una confirmación no reserva un corte de cabello, útiles escolares ni una hora específica de llegada. Los servicios y útiles se ofrecen por orden de llegada.' },
    ],
  },
  before: {
    eyebrow: 'Antes de Venir',
    headline: 'Toda la información confirmada en un solo lugar.',
    body: 'Nos comprometemos a compartir información precisa y actualizada. A continuación encontrarás los detalles confirmados con los que las familias pueden contar al planificar Fresh Fade, Fresh Grade.',
    facts: [
      { label: 'Cuándo', value: 'Domingo, 30 de agosto · 12–3 PM' },
      { label: 'Dónde', value: 'Tangles & Locs · Everett', detail: '7425 Hardeson Rd, Everett, WA 98203' },
      { label: 'Disponibilidad', value: 'Los cortes de cabello y los útiles escolares gratuitos están disponibles por orden de llegada mientras duren las existencias y haya citas disponibles.' },
      { label: 'Antes de Venir', value: '¡Avísanos que vienes! Tu confirmación nos ayuda a prepararnos, pero no reserva un corte de cabello, útiles escolares ni un lugar en la fila. Los servicios se ofrecen por orden de llegada.' },
    ],
    directionAction: 'Llévame Allí',
  },
  family: {
    eyebrow: '¿VIENES CON TU FAMILIA?',
    headline: 'Avísale a The Asc3nd Collective que planeas asistir.',
    body: 'Tu confirmación nos ayuda a prepararnos para el evento y servir a tantas familias como sea posible. Las confirmaciones no reservan cortes de cabello, útiles escolares ni una hora específica de llegada. Los servicios se ofrecen por orden de llegada.',
    action: 'Confirma tu Asistencia',
  },
  supplies: {
    eyebrow: 'COLECTA DE ÚTILES ESCOLARES',
    headline: 'Ayuda a un estudiante a comenzar el año escolar con confianza.',
    body: [
      'Cada mochila, cuaderno y lápiz puede marcar la diferencia. Del 15 de julio al 15 de agosto de 2026, The Asc3nd Collective recolectará útiles escolares nuevos para ayudar a estudiantes locales a comenzar el año escolar preparados, seguros y listos para aprender.',
      'Ya sea que dones un artículo o una mochila completa, tu generosidad apoya directamente a los niños y las familias de nuestra comunidad.',
    ],
    supplyLink: 'Ver las listas de útiles del Distrito Escolar de Everett',
    groups: [
      { title: 'Escuela Primaria', items: ['Crayones', 'Marcadores', 'Barras de Pegamento', 'Carpetas'] },
      { title: 'Secundaria y Preparatoria', items: ['Cuadernos', 'Bolígrafos', 'Resaltadores', 'Sacapuntas'] },
      { title: 'Todos los Estudiantes', items: ['Mochilas', 'Lápices', 'Lápices de Colores', 'Pañuelos Desechables'] },
    ],
    helpEyebrow: '¿QUIERES AYUDAR?',
    helpHeadline: 'Dona útiles, hazte voluntario, patrocina o colabora.',
    helpBody: 'Cada contribución ayuda a hacer posible Fresh Fade, Fresh Grade. Ya sea que dones útiles escolares, ofrezcas tu tiempo como voluntario, patrocines el evento o colabores con The Asc3nd Collective, tu apoyo ayuda a que los estudiantes locales comiencen el año escolar sintiéndose seguros, preparados y empoderados.',
    helpButton: 'Dile a Asc3nd Cómo Te Gustaría Ayudar',
  },
  mission: {
    eyebrow: 'NUESTRA MISIÓN CONTINÚA',
    headline: 'Asc3nd existe para equipar a los jóvenes con la confianza, el apoyo y las oportunidades que necesitan para seguir avanzando.',
    items: [
      { title: 'Mentoría', body: 'Mentores de confianza que animan, guían y ayudan a los jóvenes a descubrir su potencial.' },
      { title: 'Liderazgo', body: 'Programas que desarrollan confianza, carácter, responsabilidad y propósito mediante experiencias del mundo real.' },
      { title: 'Habilidades para la Vida y Atletismo', body: 'Experiencias prácticas que desarrollan habilidades para la vida, hábitos saludables, trabajo en equipo y resiliencia.' },
      { title: 'Conexión Comunitaria', body: 'Reunimos a familias, mentores, escuelas, empresas, iglesias y vecinos para crear una comunidad donde cada joven pueda prosperar.' },
    ],
    tie: 'Fresh Fade, Fresh Grade es una de las maneras en que apoyamos a nuestra comunidad, pero nuestra misión es invertir en los jóvenes todos los días del año.',
    founderStory: 'The Asc3nd Collective fue fundada por Otha y Elisha Minnifield a partir de una creencia sencilla: un mentor que se preocupa, una oportunidad significativa y una comunidad solidaria pueden cambiar el rumbo de la vida de una persona joven.',
  },
  join: {
    eyebrow: '¿QUIERES AYUDAR?',
    headline: 'Elige cómo te gustaría generar un impacto.',
    cards: [
      { title: 'Familias', actionTitle: 'Planea Asistir', body: 'Avísanos que planeas asistir para que podamos prepararnos para tantas familias como sea posible. Las confirmaciones nos ayudan a planificar, pero no reservan un corte de cabello, útiles escolares ni una hora específica de llegada.', button: 'Confirmar', intent: 'attend' },
      { title: 'Voluntarios y Mentores', actionTitle: 'Hazte Voluntario o Mentor', body: 'Ayuda a crear un día memorable para estudiantes y familias locales, y mantente conectado mediante los programas de mentoría, liderazgo y desarrollo juvenil de The Asc3nd Collective.', button: 'Ser Voluntario', intent: 'volunteer' },
      { title: 'Empresas y Socios Comunitarios', actionTitle: 'Colabora con Nosotros', body: 'Apoya a estudiantes locales mediante útiles escolares, patrocinios, equipos de voluntarios o alianzas a largo plazo que creen oportunidades duraderas para los jóvenes.', button: 'Ser Socio', intent: 'partner' },
    ],
  },
  formIntro: {
    eyebrow: 'Asistencia y Apoyo',
    headline: 'Ya sea que asistas, seas voluntario o colabores—nos encantará saber de ti.',
    body: 'Tu respuesta ayuda a The Asc3nd Collective a prepararse para las familias, los voluntarios y los socios comunitarios, para que podamos crear la mejor experiencia posible.',
    privacyTitle: 'La Privacidad de los Jóvenes Importa',
    privacyBody: 'La privacidad de tu familia es importante para nosotros. Este formulario público no solicita el nombre, la edad exacta, la escuela, información médica, historia personal ni otros datos sensibles de un menor. Los permisos para fotos, videos, testimonios o participación juvenil se gestionan mediante formularios de consentimiento separados.',
  },
  form: {
    name: 'Tu nombre',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    phonePlaceholder: 'Opcional si proporcionas correo electrónico',
    contactHelp: 'Proporciona al menos un medio de contacto: correo electrónico o teléfono.',
    participation: '¿Cómo te gustaría participar?',
    participationOptions: [
      { value: 'attend', label: 'Familias' },
      { value: 'volunteer', label: 'Voluntariado' },
      { value: 'supplies', label: 'Donar Útiles' },
      { value: 'partner', label: 'Empresa' },
      { value: 'general', label: 'General' },
    ],
    familyGroupLegend: 'Detalles de asistencia familiar',
    children: '¿Cuántos niños asistirán?',
    ageGroup: 'Grupo(s) de edad que asistirán',
    ageGroupOptions: [
      { value: 'preschool', label: 'Preescolar' },
      { value: 'elementary', label: 'Primaria' },
      { value: 'middle-school', label: 'Secundaria' },
      { value: 'high-school', label: 'Preparatoria' },
      { value: 'mixed-ages', label: 'Edades Mixtas' },
    ],
    arrival: 'Hora Prevista de Llegada',
    arrivalHelp: 'Esto nos ayuda a estimar el flujo de personas durante el evento.',
    arrivalOptions: [
      { value: '12-1', label: '12:00–1:00 PM' },
      { value: '1-2', label: '1:00–2:00 PM' },
      { value: '2-3', label: '2:00–3:00 PM' },
      { value: 'unsure', label: 'Aún no estoy seguro/a' },
    ],
    updates: 'Me gustaría recibir información sobre',
    updateOptions: [
      { value: 'accessibility', label: 'Accesibilidad e información de llegada' },
      { value: 'spanish', label: 'Actualizaciones en español' },
      { value: 'volunteer', label: 'Oportunidades de voluntariado' },
      { value: 'supplies', label: 'Detalles para donar útiles escolares' },
    ],
    reservationTitle: 'Información Importante',
    reservationBody: 'Enviar este formulario nos ayuda a prepararnos para el evento. No reserva un corte de cabello, útiles escolares, comida ni obsequios. Todos los servicios se ofrecen por orden de llegada mientras duren las existencias y haya capacidad en el evento.',
    consent: 'Acepto recibir información de The Asc3nd Collective sobre este evento y la opción de participación que seleccioné.',
    submitLabels: {
      attend: 'Enviar Mi Confirmación',
      volunteer: 'Ser Voluntario',
      supplies: 'Voy a Donar Útiles',
      partner: 'Colaborar con Nosotros',
      general: 'Enviar Mi Respuesta',
    },
    sending: 'Enviando…',
    privacyFooter: 'Para proteger tu privacidad, no incluyas el nombre, escuela, información médica, historia personal ni otros datos sensibles de un menor en este formulario. La participación juvenil y el consentimiento para medios se gestionan por separado.',
    errors: {
      name: 'Ingresa tu nombre.',
      contact: 'Proporciona un correo electrónico o teléfono para que The Asc3nd Collective pueda contactarte.',
      email: 'Ingresa un correo electrónico válido.',
      phone: 'Ingresa un número de teléfono válido.',
      children: 'Indica cuántos niños esperas traer.',
      ageGroup: 'Selecciona el grupo o los grupos de edad que asistirán.',
      consent: 'Confirma que The Asc3nd Collective puede contactarte sobre la opción de participación seleccionada.',
      review: 'Revisa los campos señalados.',
      generic: 'No pudimos enviar tu respuesta. Inténtalo de nuevo.',
      unavailable: 'La recepción de respuestas de colaboradores aún no está conectada. Tu información no fue enviada. Por ahora, usa la página principal de contacto de Asc3nd.',
    },
    success: {
      attendance: 'Confirmación recibida. Tu respuesta ayuda a The Asc3nd Collective a prepararse. No reserva un corte de cabello, útiles escolares, comida ni obsequios.',
      supporter: 'Gracias. The Asc3nd Collective recibió tu respuesta y dará seguimiento usando la información de contacto que proporcionaste.',
      confirmationCode: 'Guarda este código de confirmación',
    },
  },
  faq: {
    eyebrow: 'DETALLES DEL EVENTO',
    headline: 'Lo que las familias y quienes apoyan deben saber.',
    items: [
      { question: '¿Cuándo es el evento?', answer: 'Domingo, 30 de agosto de 2026 • 12:00 PM–3:00 PM' },
      { question: '¿Dónde es el evento?', answer: 'Tangles & Locs\n7425 Hardeson Rd., Everett, WA 98203\n\nUsa el botón “Llévame Allí” junto a la foto del lugar para obtener indicaciones paso a paso.' },
      { question: '¿Qué incluye?', answer: 'Cortes de cabello gratuitos para niños, útiles escolares, obsequios, comida, actividades para toda la familia y oportunidades para conectar con la comunidad.' },
      { question: '¿Enviar este formulario reserva un corte de cabello?', answer: 'No. El formulario ayuda a The Asc3nd Collective a estimar la asistencia y prepararse para el evento. Los cortes de cabello, útiles escolares, comida y obsequios están disponibles por orden de llegada mientras duren las existencias y haya capacidad en el evento.', emphasis: 'por orden de llegada' },
      { question: '¿Debo ingresar información sobre mi hijo/a?', answer: 'No. Para proteger la privacidad de tu familia, no incluyas el nombre, la edad exacta, la escuela, información médica, historia personal ni otros datos sensibles de un menor. La participación juvenil y el consentimiento para medios se gestionan por separado.' },
      { question: '¿Dónde puedo donar útiles escolares?', answer: 'Estamos finalizando los lugares públicos de entrega y las instrucciones para donar. Si deseas donar, envía el formulario de interés y te contactaremos en cuanto esos detalles estén disponibles.' },
      { question: '¿Quién puede asistir?', answer: 'El evento está abierto a estudiantes y familias locales que se preparan para el nuevo año escolar. ¡Todos son bienvenidos!' },
      { question: '¿Cuánto cuesta?', answer: 'Todo lo que se ofrece durante Fresh Fade, Fresh Grade es gratuito mientras duren las existencias y haya capacidad en el evento.' },
    ],
  },
  footer: {
    tagline: 'Empoderar a los jóvenes. Elevar futuros. Construir comunidad.',
    note: 'Community Cuts for Kids · Everett, Washington',
  },
  mobileAction: 'Confirma tu Asistencia',
};

export const EVENT_CONTENT = Object.freeze({
  en: english,
  es: spanish,
});

export function getEventContent(locale = 'en') {
  return EVENT_CONTENT[locale] || EVENT_CONTENT.en;
}
