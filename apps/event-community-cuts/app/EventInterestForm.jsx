'use client';

import { useMemo, useState } from 'react';
import { MissionClient } from '@asc3nd/mission-sdk-js';
import styles from './event.module.css';

const apiBaseUrl = process.env.NEXT_PUBLIC_MISSION_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const tenant = process.env.NEXT_PUBLIC_MISSION_TENANT || 'asc3nd';
const publicKey = process.env.NEXT_PUBLIC_MISSION_PUBLIC_KEY || '';

const copy = {
  en: {
    interests: [['attend','I plan to attend with my family'],['updates','Send me event updates'],['volunteer','I want to volunteer'],['mentor','I want to learn about mentoring'],['supplies','I want to donate school supplies'],['sponsor','I want to sponsor or support the event'],['partner','I want to become a community partner']],
    name:'Your name', email:'Email', phone:'Phone', phonePlaceholder:'Optional if you provide email', interested:'I’m interested in', contactNote:'Provide at least one contact method: email or phone.', children:'Number of children attending', ages:'General age range', under6:'Under 6', mixed:'Mixed ages', arrival:'Expected arrival', unsure:'Not sure yet', info:'Send me information about', accessibility:'Accessibility and arrival information', spanish:'Spanish-language updates', volunteer:'Volunteer opportunities', supplies:'School-supply donation details', noticeTitle:'This is an interest form, not a reservation.', notice:'Haircuts, supplies, food, and giveaways are first come, first served and available while capacity and supplies last.', consent:'I agree that Asc3nd Collective may contact me about this event and the participation option I selected.', sendAttend:'Tell Asc3nd we plan to attend', sendInterest:'Tell Asc3nd I’m interested', sending:'Sending…', privacy:'Do not enter a child’s name, school, health information, story, or other sensitive personal information. Youth participation and media consent are handled separately.', contactError:'Please provide an email address or phone number so Asc3nd can contact you.', childrenError:'Please enter the number of children you expect to bring.', genericError:'We could not send your response. Please try again.', attendanceError:'We could not record your attendance interest. Please try again.', attendanceSuccess:'Thank you. Check your email or phone for the confirmation step. Your response now feeds the same event dashboard used by the Asc3nd workbook.', followupUnavailable:'This follow-up form is temporarily unavailable. Please check back shortly.', followupSuccess:'Thank you. Asc3nd received your response and will follow up using the contact information you provided.'
  },
  es: {
    interests: [['attend','Planeo asistir con mi familia'],['updates','Envíenme actualizaciones del evento'],['volunteer','Quiero ser voluntario/a'],['mentor','Quiero conocer oportunidades de mentoría'],['supplies','Quiero donar útiles escolares'],['sponsor','Quiero patrocinar o apoyar el evento'],['partner','Quiero ser socio comunitario']],
    name:'Tu nombre', email:'Correo electrónico', phone:'Teléfono', phonePlaceholder:'Opcional si proporcionas correo electrónico', interested:'Me interesa', contactNote:'Proporciona al menos un medio de contacto: correo electrónico o teléfono.', children:'Número de niños que asistirán', ages:'Rango general de edades', under6:'Menores de 6', mixed:'Edades mixtas', arrival:'Hora aproximada de llegada', unsure:'Aún no estoy seguro/a', info:'Envíenme información sobre', accessibility:'Accesibilidad e información de llegada', spanish:'Actualizaciones en español', volunteer:'Oportunidades de voluntariado', supplies:'Detalles para donar útiles escolares', noticeTitle:'Este es un formulario de interés, no una reservación.', notice:'Los cortes de cabello, útiles, comida y obsequios se entregan por orden de llegada y mientras haya capacidad y existencias.', consent:'Acepto que Asc3nd Collective me contacte sobre este evento y la opción de participación que seleccioné.', sendAttend:'Avisar a Asc3nd que planeamos asistir', sendInterest:'Decirle a Asc3nd que me interesa', sending:'Enviando…', privacy:'No ingreses el nombre, escuela, información médica, historia personal ni otros datos sensibles de un menor. El consentimiento para participación juvenil, fotos y video se maneja por separado.', contactError:'Proporciona un correo electrónico o teléfono para que Asc3nd pueda contactarte.', childrenError:'Indica cuántos niños esperas traer.', genericError:'No pudimos enviar tu respuesta. Inténtalo de nuevo.', attendanceError:'No pudimos registrar tu interés en asistir. Inténtalo de nuevo.', attendanceSuccess:'Gracias. Revisa tu correo electrónico o teléfono para el paso de confirmación. Tu respuesta alimenta el mismo panel del evento que usa el libro de trabajo de Asc3nd.', followupUnavailable:'Este formulario de seguimiento no está disponible temporalmente. Inténtalo nuevamente más tarde.', followupSuccess:'Gracias. Asc3nd recibió tu respuesta y dará seguimiento usando la información de contacto que proporcionaste.'
  }
};

export function EventInterestForm({ locale = 'en' }) {
  const t = copy[locale] || copy.en;
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [interest, setInterest] = useState('attend');
  const client = useMemo(() => publicKey ? new MissionClient({ apiBaseUrl, tenant, publicKey }) : null, []);

  async function submitAttendance(data, form) {
    const preferences = data.getAll('preferences');
    const response = await fetch('/api/rsvp', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({ guardian_name:data.get('name'), email:String(data.get('email')||'').trim()||null, phone:String(data.get('phone')||'').trim()||null, children_count:Number(data.get('childrenCount')||0), age_range:data.get('ageRange')||null, requested_service:'haircut', arrival_window:data.get('arrivalWindow')||null, preferred_language:locale === 'es' ? 'es' : (preferences.includes('spanish') ? 'es' : 'en'), accessibility_contact:preferences.includes('accessibility'), contact_privately:false, company_website:data.get('companyWebsite') }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) throw new Error(result.message || result.error || t.attendanceError);
    form.reset(); setInterest('attend'); setStatus({type:'success',message:result.message || t.attendanceSuccess});
  }

  async function submitCommunityInterest(data, form) {
    const email=String(data.get('email')||'').trim(); const phone=String(data.get('phone')||'').trim(); const preferences=data.getAll('preferences');
    if (!client) throw new Error(t.followupUnavailable);
    const result=await client.event.rsvp({name:data.get('name'),email:email||null,phone:phone||null,consent:data.get('consent')==='on',companyWebsite:data.get('companyWebsite'),message:[`Community Cuts for Kids interest: ${interest}`,preferences.length?`Requested information: ${preferences.join(', ')}`:''].filter(Boolean).join('\n'),metadata:{eventSlug:'community-cuts-for-kids-2026',interest,preferences,preferredLanguage:locale,registrationType:'community-follow-up'},sourcePage:typeof window!=='undefined'?window.location.href:'/'});
    form.reset(); setInterest('attend'); setStatus({type:'success',message:result?.receipt?.message || t.followupSuccess});
  }

  async function onSubmit(event) {
    event.preventDefault(); const form=event.currentTarget; const data=new FormData(form); const email=String(data.get('email')||'').trim(); const phone=String(data.get('phone')||'').trim();
    if (!email && !phone) return setStatus({type:'error',message:t.contactError});
    if (interest==='attend' && Number(data.get('childrenCount')||0)<1) return setStatus({type:'error',message:t.childrenError});
    setStatus({type:'loading',message:t.sending});
    try { if (interest==='attend') await submitAttendance(data,form); else await submitCommunityInterest(data,form); }
    catch(error){ setStatus({type:'error',message:error?.message || t.genericError}); }
  }

  return <form className={styles.form} onSubmit={onSubmit}>
    <input className={styles.honeypot} type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" aria-hidden="true" />
    <div className={styles.fieldGrid}><label>{t.name}<input name="name" required autoComplete="name" /></label><label>{t.email}<input name="email" type="email" autoComplete="email" aria-describedby="contact-method-note" /></label></div>
    <div className={styles.fieldGrid}><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" placeholder={t.phonePlaceholder} aria-describedby="contact-method-note" /></label><label>{t.interested}<select name="interest" value={interest} onChange={(e)=>setInterest(e.target.value)} required>{t.interests.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>
    <p className={styles.formNote} id="contact-method-note">{t.contactNote}</p>
    {interest==='attend' ? <div className={styles.fieldGrid}><label>{t.children}<input name="childrenCount" type="number" inputMode="numeric" min="1" max="10" required /></label><label>{t.ages}<select name="ageRange" defaultValue="mixed"><option value="under-6">{t.under6}</option><option value="6-9">6–9</option><option value="10-13">10–13</option><option value="14-plus">14+</option><option value="mixed">{t.mixed}</option></select></label><label>{t.arrival}<select name="arrivalWindow" defaultValue="12-1"><option value="12-1">12:00–1:00 PM</option><option value="1-2">1:00–2:00 PM</option><option value="2-3">2:00–3:00 PM</option><option value="unsure">{t.unsure}</option></select></label></div> : null}
    <fieldset style={{border:0,padding:0,margin:0}}><legend style={{fontSize:'1rem',fontWeight:800,marginBottom:'10px'}}>{t.info}</legend><div style={{display:'grid',gap:'10px'}}><label className={styles.consent}><input name="preferences" type="checkbox" value="accessibility"/><span>{t.accessibility}</span></label><label className={styles.consent}><input name="preferences" type="checkbox" value="spanish"/><span>{t.spanish}</span></label><label className={styles.consent}><input name="preferences" type="checkbox" value="volunteer"/><span>{t.volunteer}</span></label><label className={styles.consent}><input name="preferences" type="checkbox" value="supplies"/><span>{t.supplies}</span></label></div></fieldset>
    <div style={{borderLeft:'3px solid #f5a617',padding:'14px 16px',background:'#fff8e9',color:'#3b3328',lineHeight:1.55}}><strong>{t.noticeTitle}</strong><div>{t.notice}</div></div>
    <label className={styles.consent}><input name="consent" type="checkbox" required/><span>{t.consent}</span></label>
    <button className={styles.primaryButton} type="submit" disabled={status.type==='loading'}>{status.type==='loading'?t.sending:interest==='attend'?t.sendAttend:t.sendInterest}</button>
    <p className={styles.formNote}>{t.privacy}</p>{status.message?<p className={`${styles.status} ${styles[status.type]||''}`} role="status" aria-live="polite">{status.message}</p>:null}
  </form>;
}