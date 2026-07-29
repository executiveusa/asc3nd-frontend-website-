# Forms Audit

| Form | Labels Present? | Consent Language? | API Connection | Issues Found |
|---|---|---|---|---|
| Newsletter | Yes (placeholder/aria) | No | No | Uses `e.preventDefault()` without actual submission. Needs connecting to Mailchimp/ConvertKit. |
| Public Forms (`Asc3ndPublicForms`) | Yes | Varies | SDK | Ensure placeholder warnings show when Mission SDK API keys are missing. |
