export const PARTICIPATION_VALUES = Object.freeze([
  'attend',
  'volunteer',
  'supplies',
  'partner',
  'general',
]);

export const SUPPORTER_PARTICIPATION_VALUES = Object.freeze(
  PARTICIPATION_VALUES.filter((value) => value !== 'attend'),
);

export const AGE_GROUP_VALUES = Object.freeze([
  'preschool',
  'elementary',
  'middle-school',
  'high-school',
  'mixed-ages',
]);

export const ARRIVAL_WINDOW_VALUES = Object.freeze(['12-1', '1-2', '2-3', 'unsure']);

export const UPDATE_VALUES = Object.freeze(['accessibility', 'spanish', 'volunteer', 'supplies']);

export const SUPPORTER_KIND_BY_PARTICIPATION = Object.freeze({
  volunteer: 'volunteer',
  supplies: 'donation-intent',
  partner: 'donation-intent',
  general: 'contact',
});

export function normalizeParticipation(value) {
  return PARTICIPATION_VALUES.includes(value) ? value : 'attend';
}

function getString(data, key) {
  return String(data.get(key) || '').trim();
}

function getAllowedValues(data, key, allowed) {
  return data.getAll(key).map(String).filter((value) => allowed.includes(value));
}

export function buildAttendancePayload(data, locale = 'en') {
  const preferences = getAllowedValues(data, 'updates', UPDATE_VALUES);
  const ageGroup = getString(data, 'ageGroup');
  const arrivalWindow = getString(data, 'arrivalWindow');

  return {
    guardian_name: getString(data, 'name'),
    email: getString(data, 'email') || null,
    phone: getString(data, 'phone') || null,
    children_count: Number(data.get('childrenCount') || 0),
    age_range: AGE_GROUP_VALUES.includes(ageGroup) ? ageGroup : null,
    requested_service: 'haircut',
    arrival_window: ARRIVAL_WINDOW_VALUES.includes(arrivalWindow) ? arrivalWindow : null,
    preferred_language: locale === 'es' || preferences.includes('spanish') ? 'es' : 'en',
    accessibility_contact: preferences.includes('accessibility'),
    contact_privately: false,
    company_website: getString(data, 'companyWebsite'),
  };
}

export function buildSupporterPayload(data, locale = 'en', sourcePath = '/') {
  return {
    name: getString(data, 'name'),
    email: getString(data, 'email') || null,
    phone: getString(data, 'phone') || null,
    participation: normalizeParticipation(getString(data, 'participation')),
    updates: getAllowedValues(data, 'updates', UPDATE_VALUES),
    preferred_language: locale === 'es' ? 'es' : 'en',
    consent: data.get('consent') === 'on',
    company_website: getString(data, 'companyWebsite'),
    source_path: String(sourcePath || '/').slice(0, 500),
  };
}
