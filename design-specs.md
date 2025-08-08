# Design Specifications

## Project Overview
-   **Comment**: This is the MVP version with focus on UI first - backend later.
-   **Project Name**: Novo CoPilot
-   **App Purpose**: Provide CRM connected AI-assistance when contacting healthcare providers (doctors, hospitals, and clinics in the Northern US)
-   **Target Users**: In-the-field sales agents
-   **Team**: One iOS developer with the client contact & one with react experience
-   **Team Mission**: To pitch this app to Novo, which according to the client has shown interest in order to boost their sales. Later, the app can be adapted to other clients.
-   **Key Features**: HCP Intelligence Briefing - optimized for quick reading and information absorption

## Technical Stack
-   **Frontend**: react.js using vite
-   **Backend**: TBD
-   **Database**: Vector-DB version of enterprise CRM DB
-   **Deployment**: Azure by default (hosting, DB, storage etc)
-   **Key Libraries/Frameworks**: react.js using vite, tailwind, TBD

## Design System
-   SPA (exceptions possible if needed)
-   Darkmode & Lightmode
-   Mobile & laptop view (note: laptop takes priority as iOS app cover mobile too)
-   Simple, clean UI - no unnecessary complexity
-   Colors & Typography defined App.tsx

### Screens
1. HCP search
2. Intelligence briefing
   - **Profile**: Name, address, specialty, size, patient volume, facilities, services, doctor's education, certifications, and years of experience.
   - **Sales Data**: Date of sale, products sold, quantity, revenue, sales representative, customer notes, discounts, payment method, and delivery date.


### Key Interactions
- Login (we piggy-back on Veeva CRM auth)
- Search HCP to get briefing
- Session persistence
- Keep stored briefing to persist of connection breaks broken connection
- Export/Share briefing

## Development Guidelines
- Avoid unnecessary complexity (no edge processing or overkill libraries unless great reasons)
- Quick access
- Briefing stored locally and available offline
- Completely intuitive - no training required

## Security Considerations
- **Authorization is server-enforced**: All data requested by the client must be filtered on the server using the user’s Veeva CRM permissions (never trust client parameters).
- **Shareable URLs**: Use intent-aware but non-sensitive URLs. Prefer opaque identifiers over raw PII.
  - HCP: `/?i=hcp&id=<hcpId>` (server resolves to entity; viewer’s access re-checked)
  - Commands: `/?i=read_briefing`
  - For complex/AI queries: `/?s=<shareId>` where `shareId` maps to a stored query/view with ACL checks on retrieval.
- **No sensitive data in URLs**: Avoid placing names, emails, or freeform text in query strings (URLs may be logged and leak via referrers).
- **PII logging**: Do not log full request bodies or PII. Mask/redact in server logs.
- **Caching**: Mark sensitive responses `Cache-Control: no-store`. Avoid CDN caching of personalized data.
- **Rate limiting & anomaly detection**: Per-user rate/concurrency limits and monitoring to detect scraping. A determined user can scrape what they’re allowed to see; controls should throttle and alert.
- **Tokens**: Use httpOnly, Secure, SameSite cookies. Do not put tokens in URLs.

## Offline Availability
- **Goal**: Last viewed briefing should be available offline to support field reps with intermittent connectivity.
- **Risk**: Local storage can retain sensitive content on the device.
  - Mitigation: Store only the minimum necessary (e.g., last 1–3 briefings), encrypt at rest when feasible, and respect enterprise device policies (MDM/OS-level disk encryption, screen lock).
  - Use in-memory state for transient data; avoid long-term `localStorage` for large datasets.
  - Provide a user/IT control to clear cached briefings.
- **Decision**: Keep limited offline access. Benefits (field reliability) outweigh risks if above mitigations are in place and server-side authZ is enforced on every sync.

### Browser Support
-   Browsers typically installed on corporate phones and laptops.

## Notes for AI Assistant
-   **Preferred Approach**: laptop first, simple components, Tailwind v4, break large components down
-   **Avoid**: Complex animations, heavy frameworks, custom CSS

