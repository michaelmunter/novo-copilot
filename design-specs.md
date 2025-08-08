# Design Specifications

## Project Overview
-   **Comment**: This is the MVP version with focus on UI first - backend later.
-   **Project Name**: Novo CoPilot
-   **Purpose**: Provide CRM connected AI-assistance when contacting healthcare providers (doctors, hospitals, and clinics in the Northern US)
-   **Target Users**: In-the-field sales agents
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

### Browser Support
-   Browsers typically installed on corporate phones and laptops.

## Notes for AI Assistant
-   **Preferred Approach**: laptop first, simple components, Tailwind v4, break large components down
-   **Avoid**: Complex animations, heavy frameworks, custom CSS

