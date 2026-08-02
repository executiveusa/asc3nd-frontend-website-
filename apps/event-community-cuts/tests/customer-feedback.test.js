import crypto from 'node:crypto';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LOCKED_CLIENT_COPY_EN } from '../app/client-feedback-copy.js';
import { EVENT_CONTENT } from '../app/event-content.js';
import {
  AGE_GROUP_VALUES,
  buildAttendancePayload,
  buildSupporterPayload,
} from '../app/event-form-contract.js';

const lockedCopyHash = '3e3d8715cb9d3564020ff320e6379be77a7b75df3a2d0942ec1d896c15d55317';

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]));
  }
  return typeof value;
}

describe('customer feedback fidelity', () => {
  it('preserves the established circular ASC3ND logo in the header and footer', () => {
    const logo = fs.readFileSync(
      new URL('../public/images/asc3nd-client-logo-transparent.png', import.meta.url),
    );
    expect(crypto.createHash('sha256').update(logo).digest('hex')).toBe(
      '65b9b79bae3c9bd9990cfd1de3c4b8257fe84b20fe9873b8c20e0074d35b2a0e',
    );
    const pageSource = fs.readFileSync(
      new URL('../app/CommunityCutsPage.jsx', import.meta.url),
      'utf8',
    );
    expect(pageSource.match(/\/images\/asc3nd-client-logo-transparent\.png/g)).toHaveLength(2);
    expect(pageSource).toContain('className={styles.footerLogo}');
    expect(pageSource).not.toContain('className={styles.brandMain}');
    expect(pageSource).not.toContain('/images/asc3nd-client-wordmark.png');
  });

  it('uses the approved artwork as the accessible English hero heading', () => {
    const artwork = fs.readFileSync(
      new URL('../public/images/community-cuts-for-kids.png', import.meta.url),
    );
    expect(crypto.createHash('sha256').update(artwork).digest('hex')).toBe(
      '63fe65f8bceb668e4d1a66ce67ba0a52a90cae4ccadc285d395f695c3e0a6e6b',
    );

    const pageSource = fs.readFileSync(
      new URL('../app/CommunityCutsPage.jsx', import.meta.url),
      'utf8',
    );
    expect(pageSource).toContain("'/images/community-cuts-for-kids.png'");
    expect(pageSource).toContain("'Community Cuts for Kids'");
    expect(pageSource).toContain('unoptimized');
    expect(pageSource.match(/<h1/g)).toHaveLength(1);
  });

  it('uses the approved Spanish artwork as the accessible Spanish hero heading', () => {
    const artwork = fs.readFileSync(
      new URL('../public/images/cortes-comunitarios-para-ninos.png', import.meta.url),
    );
    expect(crypto.createHash('sha256').update(artwork).digest('hex')).toBe(
      '5572b8f34afdb3340aeeed3b8fe3067a13b2dec95c6da18b5f26ea9777405bf9',
    );

    const pageSource = fs.readFileSync(
      new URL('../app/CommunityCutsPage.jsx', import.meta.url),
      'utf8',
    );
    expect(pageSource).toContain("'/images/cortes-comunitarios-para-ninos.png'");
    expect(pageSource).toContain("'Cortes Comunitarios para Niños'");
    expect(pageSource).toContain('unoptimized');
    expect(pageSource.match(/<h1/g)).toHaveLength(1);
  });

  it('locks the customer-authorized English copy against paraphrasing', () => {
    const actual = crypto
      .createHash('sha256')
      .update(JSON.stringify(LOCKED_CLIENT_COPY_EN))
      .digest('hex');

    expect(actual).toBe(lockedCopyHash);
  });

  it('uses the locked copy throughout the English page content', () => {
    const page = EVENT_CONTENT.en;
    expect(page.hero.description).toBe(LOCKED_CLIENT_COPY_EN.heroDescription);
    expect(page.hero.goodToKnow).toBe(LOCKED_CLIENT_COPY_EN.goodToKnow);
    expect(page.expect.eyebrow).toBe(LOCKED_CLIENT_COPY_EN.expectEyebrow);
    expect(page.expect.headline).toBe(LOCKED_CLIENT_COPY_EN.expectHeadline);
    expect(page.expect.body).toBe(LOCKED_CLIENT_COPY_EN.expectBody);
    expect(page.expect.items).toBe(LOCKED_CLIENT_COPY_EN.expectations);
    expect(page.before.body).toBe(LOCKED_CLIENT_COPY_EN.confirmedDetails);
    expect(page.before.facts[2].value).toBe(LOCKED_CLIENT_COPY_EN.availability);
    expect(page.before.facts[3].value).toBe(LOCKED_CLIENT_COPY_EN.beforeYouCome);
    expect(page.family.eyebrow).toBe(LOCKED_CLIENT_COPY_EN.familyEyebrow);
    expect(page.family.headline).toBe(LOCKED_CLIENT_COPY_EN.familyHeadline);
    expect(page.family.body).toBe(LOCKED_CLIENT_COPY_EN.familyBody);
    expect(page.family.action).toBe(LOCKED_CLIENT_COPY_EN.familyButton);
    expect(page.supplies.eyebrow).toBe(LOCKED_CLIENT_COPY_EN.supplyEyebrow);
    expect(page.supplies.headline).toBe(LOCKED_CLIENT_COPY_EN.supplyHeadline);
    expect(page.supplies.body).toBe(LOCKED_CLIENT_COPY_EN.supplyBody);
    expect(page.supplies.groups).toBe(LOCKED_CLIENT_COPY_EN.supplyGroups);
    expect(page.supplies.helpEyebrow).toBe(LOCKED_CLIENT_COPY_EN.helpEyebrow);
    expect(page.supplies.helpHeadline).toBe(LOCKED_CLIENT_COPY_EN.helpHeadline);
    expect(page.supplies.helpBody).toBe(LOCKED_CLIENT_COPY_EN.helpBody);
    expect(page.supplies.helpButton).toBe(LOCKED_CLIENT_COPY_EN.helpButton);
    expect(page.mission.eyebrow).toBe(LOCKED_CLIENT_COPY_EN.missionEyebrow);
    expect(page.mission.headline).toBe(LOCKED_CLIENT_COPY_EN.missionHeadline);
    expect(page.mission.items).toBe(LOCKED_CLIENT_COPY_EN.missionItems);
    expect(page.mission.tie).toBe(LOCKED_CLIENT_COPY_EN.missionTie);
    expect(page.mission.founderStory).toBe(LOCKED_CLIENT_COPY_EN.founderStory);
    expect(page.join.eyebrow).toBe(LOCKED_CLIENT_COPY_EN.joinEyebrow);
    expect(page.join.headline).toBe(LOCKED_CLIENT_COPY_EN.joinHeadline);
    expect(page.join.cards).toBe(LOCKED_CLIENT_COPY_EN.joinCards);
    expect(page.formIntro.headline).toBe(LOCKED_CLIENT_COPY_EN.formHeading);
    expect(page.formIntro.body).toBe(LOCKED_CLIENT_COPY_EN.formBody);
    expect(page.formIntro.privacyTitle).toBe(LOCKED_CLIENT_COPY_EN.privacyTitle);
    expect(page.form.participation).toBe(LOCKED_CLIENT_COPY_EN.participationLabel);
    expect(page.form.children).toBe(LOCKED_CLIENT_COPY_EN.childrenLabel);
    expect(page.form.ageGroup).toBe(LOCKED_CLIENT_COPY_EN.ageGroupLabel);
    expect(page.form.arrival).toBe(LOCKED_CLIENT_COPY_EN.arrivalLabel);
    expect(page.form.arrivalHelp).toBe(LOCKED_CLIENT_COPY_EN.arrivalHelp);
    expect(page.form.updates).toBe(LOCKED_CLIENT_COPY_EN.updatesLabel);
    expect(page.form.reservationTitle).toBe(LOCKED_CLIENT_COPY_EN.reservationTitle);
    expect(page.form.reservationBody).toBe(LOCKED_CLIENT_COPY_EN.reservationBody);
    expect(page.form.consent).toBe(LOCKED_CLIENT_COPY_EN.consent);
    expect(page.form.submitLabels).toBe(LOCKED_CLIENT_COPY_EN.submitLabels);
    expect(page.form.privacyFooter).toBe(LOCKED_CLIENT_COPY_EN.privacyFooter);
    expect(page.faq.eyebrow).toBe(LOCKED_CLIENT_COPY_EN.faqEyebrow);
    expect(page.faq.headline).toBe(LOCKED_CLIENT_COPY_EN.faqHeadline);
    expect(page.formIntro.privacyBody).toBe(LOCKED_CLIENT_COPY_EN.privacyBody);
    expect(page.faq.items.map((item) => item.question)).toEqual(
      LOCKED_CLIENT_COPY_EN.faqs.map((item) => item.question),
    );
    expect(page.faq.items[3].answer).toBe(LOCKED_CLIENT_COPY_EN.faqs[3].answer);
    expect(page.faq.items[3].emphasis).toBe('first-come, first-served basis');
    expect(EVENT_CONTENT.es.faq.items[3].emphasis).toBe('por orden de llegada');
    expect(page.faq.items[4].answer).toBe(LOCKED_CLIENT_COPY_EN.faqs[4].answer);
  });

  it('keeps English and Spanish content structurally identical', () => {
    expect(shape(EVENT_CONTENT.es)).toEqual(shape(EVENT_CONTENT.en));
  });

  it('preserves every customer-requested age-group option, including Mixed Ages', () => {
    expect(AGE_GROUP_VALUES).toEqual([
      'preschool',
      'elementary',
      'middle-school',
      'high-school',
      'mixed-ages',
    ]);
  });
});

describe('event intake payloads', () => {
  it('maps family attendance to the canonical RSVP contract', () => {
    const data = new FormData();
    data.set('name', 'Jordan Parent');
    data.set('email', 'jordan@example.org');
    data.set('childrenCount', '3');
    data.set('ageGroup', 'mixed-ages');
    data.set('arrivalWindow', '1-2');
    data.append('updates', 'accessibility');
    data.set('companyWebsite', '');

    expect(buildAttendancePayload(data, 'en')).toEqual({
      guardian_name: 'Jordan Parent',
      email: 'jordan@example.org',
      phone: null,
      children_count: 3,
      age_range: 'mixed-ages',
      requested_service: 'haircut',
      arrival_window: '1-2',
      preferred_language: 'en',
      accessibility_contact: true,
      contact_privately: false,
      company_website: '',
    });
  });

  it('maps supporter interest without inventing a successful destination', () => {
    const data = new FormData();
    data.set('name', 'Morgan Volunteer');
    data.set('phone', '425-555-0123');
    data.set('participation', 'volunteer');
    data.append('updates', 'volunteer');
    data.set('consent', 'on');
    data.set('companyWebsite', '');

    expect(buildSupporterPayload(data, 'es', '/es?intent=volunteer')).toEqual({
      name: 'Morgan Volunteer',
      email: null,
      phone: '425-555-0123',
      participation: 'volunteer',
      updates: ['volunteer'],
      preferred_language: 'es',
      consent: true,
      company_website: '',
      source_path: '/es?intent=volunteer',
    });
  });
});
