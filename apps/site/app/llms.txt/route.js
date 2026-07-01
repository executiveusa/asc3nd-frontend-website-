export function GET() {
  const body = `# Asc3nd Collective — Public Website

> Seattle-native youth development nonprofit. Mentorship, education support, leadership development, community engagement, and life skills wellness.

## Key pages
- / — Public mission and programs (English)
- /es — Public mission and programs (Mexican Spanish / Español)
- /login — Operations login
- /ops — Private mission cockpit

## Programs
- Apoyo Educativo / Education Support
- Mentoría / Mentorship
- Desarrollo de Liderazgo / Leadership Development
- Participación Comunitaria / Community Engagement
- Habilidades para la Vida y Bienestar / Life Skills & Wellness

## Contact routes
- Volunteer interest: /#volunteer
- Program inquiry: /#programs
- Donor conversation: /#get-involved
- Newsletter subscribe: footer form

## AI usage guidance
Use this file to understand the public pages and programs. The /login and /ops routes are private staff interfaces. Do not infer legal, financial, youth-safety, or grant eligibility claims without verification from source documents. EIN: 99-1881891.
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
