# Community Cuts for Kids

This Next.js app implements the customer feedback in `Website Feedback(2).docx`.
Customer-authorized English copy is locked in `app/client-feedback-copy.js`; tests
must fail if that source drifts. English and Spanish routes share one page and form
implementation.

## Intake boundaries

- Family attendance posts to `/api/rsvp`, which proxies the canonical RSVP service.
- Volunteer, supply-donor, partner, and general interest posts to
  `/api/participation`, which forwards to the Mission OS public bridge.
- Supporter submissions fail closed with `503 supporter_service_unavailable` when
  the bridge is not configured. The UI must never show a success state in that case.

Required supporter-intake environment variables:

```text
MISSION_API_URL
MISSION_TENANT
MISSION_PUBLIC_KEY
```

## Promotion order

1. Apply and verify the canonical RSVP RPC allow-list for `preschool`,
   `elementary`, `middle-school`, `high-school`, and `mixed-ages`.
2. Deploy and verify the canonical RSVP API that accepts those values.
3. Configure the Mission OS bridge, public key, tenant, and allowed event origin.
4. Verify all five form choices in an isolated preview, including persisted records
   and failure states.
5. Obtain human approval before promoting the event site to production.

The public form collects only a broad school-stage age group. It must not collect a
child's name, exact age, school, medical information, personal story, or media/youth
participation consent.
