# GVMC Pothole Detection & Automated Citizen Reporting (SW11)

Principal Software Architect planning conversation — organized reference.

> This file collects the numbered prompt/reply sections verbatim, unchanged, 
> reformatted only with section headers so Claude Code can navigate them. 
> No wording has been added, removed, or edited.

## Contents

- Section 1 — Problem Statement Review & MVP Scope
- Section 2 — Functional Requirements Document (FRD)
- Section 3 — System Architecture
- Section 4 — Firestore Data Model
- Section 5 — Authentication & Authorization Design
- Section 6 — Citizen Interface Design
- Section 7 — Officer & Admin Dashboard Design
- Section 8 — Accelerometer Detection Design
- Section 9 — API Design
- Section 10 — Firestore Security Rules
- Section 11 — State Management Architecture
- Section 12 — Implementation Roadmap
- Section 13 — Testing Strategy

---

## Section 1 — Problem Statement Review & MVP Scope

As a Principal Software Architect, I have reviewed the problem
statement for SW11 - Pothole Detection and Automated Citizen Reporting.

To ensure we build a winning, production-ready pilot within the
hackathon constraints, we must ruthlessly prioritize. Below is the
architectural breakdown of the functional requirements, constraints,
stakeholders, assumptions, and the strict MVP scope.

1. Functional Requirements

Based on the user stories and official brief, the system requires two
primary interfaces powered by a unified backend:

A. Citizen Interface (Data Capture)

Automated Detection: Background/active monitoring using the smartphone's
accelerometer to detect sudden vertical shocks, paired with GPS to log
the exact coordinates of suspected potholes.

Manual Reporting: A crowdsourced reporting tool allowing citizens to
manually drop a pin, upload a photo, and report a pothole.

Status Tracking: Ability for citizens to track the resolution status of
their reported issues without visiting a physical office.

B. Officer/Admin Dashboard (Data Visualization & Action)

GIS Mapping: A real-time, map-based interface (using Leaflet.js)
displaying all detected and reported potholes.

Ward-Level Filtering: Live data filtering by ward/zone so field officers
can focus on their specific jurisdictions.

Global Overview: A macro-level dashboard for the Commissioner’s Office
to view total potholes, repair progress, and heatmaps across all wards
for budget and staff deployment.

Status Management: A workflow for field officers to update the status of
a pothole (e.g., Detected → Verified → Assigned → Repaired).

2. Constraints

Budget: ₹0. We must exclusively rely on generous free-tier services
(e.g., Firebase Spark Plan, OpenStreetMap, Vercel/Cloud Run for web
hosting).

Time (Hackathon Window): Must be built, instrumented, and demoable
end-to-end within an extremely tight timeframe (~30 hours).

Technology Dictates: The brief explicitly mentions an
accelerometer-capable app, Firestore (for real-time DB), Leaflet.js (for
GIS), and a thin client architecture.

Operational Readiness: The final deliverable cannot just be a "mock"
presentation. It must be packaged as a service that GVMC Roads &
Buildings can operate with a runbook, using real pilot data.

3. Stakeholders

Primary Operator: GVMC Roads and Buildings (Field officers acting on the
data).

Secondary: GVMC City Operations Center / Commissioner's Office (Analysts
deploying budget and staff).

End Beneficiaries: Residents of Visakhapatnam (Citizens experiencing the
road conditions).

4. Assumptions & Risks

Administrative Buy-in: Assumes GVMC will designate a pilot owner to sign
off on the pilot zone. Without this, the pilot has no real-world staging
ground.

Sensor Reliability (False Positives): Assumes a smartphone accelerometer
and GPS are accurate enough to distinguish a pothole from a speed bump
or phone drop. We must assume a high initial false-positive rate and
account for it via confidence scoring (e.g., multiple vehicles hitting
the same coordinate).

Adoption: Assumes citizens will be willing to run the application to
gather crowdsourced telemetry data.

5. MVP Scope (What we build vs. What we cut)

To win, we must avoid the "AI trap" of over-engineering complex machine
learning models. We will build a rule-based, highly reliable software
pipeline.

In Scope for the Hackathon Pilot:

Unified Web App / PWA: We will build a responsive React/Vite
application. For the citizen side, it will act as a Progressive Web App
(PWA) that requests accelerometer and GPS permissions via HTML5 APIs to
simulate the mobile detection, along with manual photo reporting.

Role-Based Firebase Auth: Simple Email/Password authentication routing
users to either the Citizen View or the Officer Dashboard.

Real-Time Firestore Database: Collections for users, potholes (with
Geopoints), and audit_logs.

Threshold-Based Detection: A simple mathematical algorithm checking if
Z-axis acceleration exceeds a specific threshold, triggering a GPS read
and Firestore write.

Leaflet.js Dashboard: A web-based map for officers to click markers,
view severity, and change status to "Repaired".

Out of Scope (Do NOT build):

Complex AI/ML image recognition or predictive models.

City-wide scale architecture (Kubernetes, Microservices, complex SQL
joins).

Deep integrations into legacy GVMC enterprise systems.

Native iOS/Android App Store deployment (A PWA is sufficient for a
hackathon demo and satisfies the requirement of running on a phone).

---

## Section 2 — Functional Requirements Document (FRD)

Here is the comprehensive Functional Requirements Document (FRD) for
the GVMC Pothole Detection and Automated Citizen Reporting project.

As a Principal Software Architect, I have tailored this document
specifically for a 30-hour hackathon execution window, strictly adhering
to the ₹0 budget constraint, and focusing on the core MVP that delivers
a pilotable, end-to-end observable system.

Functional Requirements Document (FRD)

1. User Roles

To maintain simplicity and secure data access, the system will utilize
Role-Based Access Control (RBAC) with three primary user types:

Citizen (End User): Residents of Visakhapatnam who commute. They act as
distributed sensors (via auto-detection) and manual reporters.

GVMC Field Officer (Primary Operator): Ground-level municipal workers
assigned to specific wards/zones responsible for verifying and repairing
potholes.

GVMC Admin / Commissioner's Analyst (Secondary Stakeholder): High-level
decision-makers requiring a macro-view of the city for budget
allocation, staff deployment, and accountability tracking.

2. User Permissions

Permissions are strictly segregated by role to ensure data integrity.

Citizens:

Can create an account and log in.

Can toggle automated background accelerometer tracking ON/OFF.

Can create manual pothole reports (submit photo, GPS, description).

Can view the status of their own submitted reports.

Cannot alter the status of any report or view admin analytics.

GVMC Field Officers:

Can view all reported potholes (automated and manual) filtered by their
assigned ward.

Can update the status of a pothole (Pending ➔ Assigned ➔ Repaired).

Can upload proof-of-repair photos.

GVMC Admins:

Can view city-wide aggregate data and all wards.

Can assign/re-assign Field Officers to specific wards.

Can access the overarching GIS heatmaps and budget analytics dashboard.

Can tune the system's accelerometer threshold values (to manage false
positives).

3. Features

Automated Pothole Detection: A rule-based, accelerometer-driven
background process that detects sudden vertical acceleration spikes
(Z-axis) while moving at vehicular speeds, cross-referencing with GPS
data to log coordinates.

Manual Crowdsourced Reporting: A mobile form allowing citizens to snap a
picture, automatically capture GPS coordinates, and submit a complaint.

Real-Time GIS Dashboard: A web-based Leaflet.js map plotting pothole
data in real-time, color-coded by severity, status, and verification
count.

Automated Clustering & Verification: A backend logic layer that groups
multiple automated GPS pings within a tight radius (e.g., 5-10 meters)
into a single "Verified Pothole" entity to eliminate false positives and
prevent database bloat.

Lifecycle Management: End-to-end status tracking of a pothole from
detection to repair, visible to both the reporting citizen and GVMC
staff.

4. Functional Requirements

FR-1 (Authentication): The system must authenticate all users via
Email/Password utilizing Firebase Authentication.

FR-2 (Sensor Polling): When auto-detect is enabled, the mobile
application must sample the device accelerometer at a minimum of 50Hz
and check against a predefined severity threshold.

FR-3 (Data Capture): Upon crossing the acceleration threshold, the
system must capture the exact latitude and longitude, timestamp, and
peak G-force, and transmit this payload to the database.

FR-4 (Manual Uploads): The manual reporting module must allow image
capture, compress the image client-side to save storage costs, upload it
to Firebase Storage, and link the URL to the Firestore document.

FR-5 (Real-Time Sync): The Web Dashboard must subscribe to Firestore
document changes and update map markers dynamically without requiring a
page refresh.

FR-6 (Status Transitions): The dashboard must allow authorized officers
to click a map marker and transition its state from Pending to Repaired.

5. Non-Functional Requirements

NFR-1 (Cost Limitation): The architecture must operate entirely within
the free tiers of Firebase (Spark Plan) and third-party APIs
(OpenStreetMap). Reads, writes, and storage must be optimized (e.g.,
batching accelerometer pings) to avoid exceeding quotas.

NFR-2 (Performance & Battery): The automated detection algorithm must be
lightweight. It should ideally pause polling if the GPS indicates the
user is stationary to preserve battery life.

NFR-3 (Resilience/Offline Capability): If a citizen hits a pothole in a
network dead-zone, the app must queue the event locally (e.g., using
AsyncStorage/SQLite or Firebase offline persistence) and sync when the
connection is restored.

NFR-4 (Usability): The citizen-facing UI must be usable with one hand
and require no more than 3 taps to submit a manual report.

6. Success Criteria

End-to-End Viability: A citizen can simulate hitting a pothole (shaking
the phone), and within 3 seconds, a marker appears on the GVMC GIS
dashboard.

Zero-Cost Infrastructure: The solution is built and hosted entirely on
free-tier infrastructure.

Pilot Readiness: The system is constrained and configured to run
successfully in one specific GVMC ward/zone immediately after the
hackathon.

False-Positive Mitigation: The system demonstrates a logical method
(clustering/minimum report counts) to differentiate between a real
pothole and a user simply dropping their phone.

7. MVP Features (Scope for 30-Hour Hackathon)

To ensure delivery, the MVP is ruthlessly scoped down to:

Firebase Authentication (Email/Password).

Mobile App (Citizen): Login, Auto-Detection Toggle, Manual Report Screen
with Camera, List of "My Reports".

Web Dashboard (Admin/Officer): Login, Leaflet GIS Map with live markers,
Ward Filtering, basic Data Table with Status Update capability.

Simple Rule-Based Detection: Basic Z-axis acceleration threshold logic
(no complex Machine Learning).

8. Future Features (Out of Scope for Pilot)

Machine Learning/AI Classification: Using AI to classify the pothole
depth based on suspension acoustic data or analyzing uploaded photos for
severity.

Legacy System Integration: Connecting to the existing GVMC ERP or legacy
grievance ticketing systems.

Advanced Routing: Generating optimized daily driving routes for pothole
repair trucks based on geographic density.

Gamification: Rewarding citizens with municipal tax rebates or badges
for accurate reporting.

9. User Stories

US-1: As a Citizen, I want to turn on "Auto-Detect" before I start
driving, so that the app logs potholes without requiring me to look at
my screen or use my hands.

US-2: As a Citizen, I want to take a photo of a massive crater on my
street and submit it to GVMC, so that it is prioritized for repair.

US-3: As a GVMC Field Officer, I want to see a map filtered specifically
to my assigned ward, so I know exactly where to send my repair crew
today.

US-4: As a GVMC Field Officer, I want to mark a pothole as "Repaired"
and upload a photo of the fresh asphalt, so I can prove the work was
completed.

US-5: As a Commissioner's Analyst, I want to see a heatmap of the entire
city, so I can identify deteriorating roads that require a full repaving
budget rather than patch repairs.

10. Acceptance Criteria

Acceptance Criteria for US-1 (Auto-Detect):

Given the user is logged in as a Citizen and has toggled Auto-Detect to
ON.

When the mobile device experiences a vertical Z-axis spike exceeding X
G-force (threshold).

Then the app captures the current GPS coordinates and writes a new
PotholeEvent to the database with type Automated.

Acceptance Criteria for US-2 (Manual Report):

Given the user is on the "Report" screen.

When they capture a photo and click "Submit".

Then the photo is uploaded to Storage, and a record is created
containing the image URL, timestamp, and GPS coordinates with status
Pending.

Acceptance Criteria for US-3 & US-4 (Officer Workflow):

Given an Officer is logged into the Web Dashboard.

When they click a red "Pending" marker on the Leaflet map.

Then a modal opens displaying the pothole details (photo, time,
verification count).

When they change the status dropdown to "Repaired" and save.

Then the marker turns green on the map instantly, and the original
reporting citizen's app updates the status in their "My Reports" view.

---

## Section 3 — System Architecture

As a Principal Software Architect, I have designed this architecture
to meet the strict 30-hour hackathon constraints, zero-rupee budget, and
MVP pilot requirements for GVMC.

By leveraging a serverless architecture with Firebase, we eliminate the
need to write custom backend boilerplate, allowing you to focus entirely
on the core value propositions: accelerometer-based
detection and real-time GIS visualization.

Here is the complete software architecture for the Pothole Detection and
Automated Citizen Reporting system.

1. High-Level Architecture

The system follows a Serverless Client-Server model. It consists of
three primary nodes: the Citizen Mobile Application, the GVMC Officer
Web Dashboard, and the Firebase Backend Platform.

codeText

+-----------------------+ +-----------------------+
+-----------------------+

| Citizen Mobile App | | Firebase Backend | | GVMC Web Dashboard |

| (Expo React Native) | | (Cloud Native) | | (React.js) |

| | | | | |

| [ Sensor Engine ] |<--Auth--->| [ Firebase Auth ] |<--Auth--->| [
Analytics Engine] |

| [ GPS Tracker ] | | | | |

| [ Camera/Upload ] |<--Write-->| [ Cloud Firestore ] |<--Read--->| [
Leaflet GIS Map ] |

| [ Offline Queue ] | | | | [ Status Manager ] |

| |<--Media-->| [ Cloud Storage ] |<--Media-->| |

+-----------------------+ +-----------------------+
+-----------------------+

2. Low-Level Architecture

The low-level architecture focuses on the specific data flow of the two
most complex processes: Automated Detection and Real-time GIS Mapping.

Automated Accelerometer Detection Pipeline:

codeText

[Hardware Accelerometer]

│ (High Hz Polling)

▼

[Noise Filter (Low-Pass)]

│ (Removes normal road vibration)

▼

[Threshold Comparator] ---> (If Z-axis spike < Threshold) ---> [Discard]

│ (If Z-axis spike >= Threshold)

▼

[GPS Module] ---> Fetches current Lat/Lng

│

▼

[Local Data Aggregator] ---> Bundles (Spike Intensity, GPS, Timestamp)

│

▼

[Firestore SDK] ---> Transmits to Cloud (or Queues if offline)

Real-Time GIS Mapping Pipeline:

codeText

[Firestore Database]

│ (WebSocket / Real-time Listener)

▼

[React State Manager (Zustand/Context)]

│ (Filters out resolved/invalid reports)

▼

[GeoJSON Converter]

│ (Maps Firestore docs to Leaflet-compatible markers)

▼

[Leaflet.js Renderer] ---> Renders Heatmap & Color-coded Markers on UI

3. System Components

1.  Mobile Presentation Component: The Expo React Native UI handling
    user interactions.

2.  Telemetry Component: Background service managing accelerometer and
    GPS polling.

3.  Web Presentation Component: The React.js dashboard interface.

4.  GIS Mapping Component: Leaflet.js integration for rendering wards
    and markers.

5.  Authentication Component: Firebase Auth managing Citizen and Officer
    sessions.

6.  Real-Time Data Component: Firestore NoSQL database managing JSON
    documents.

7.  Blob Storage Component: Firebase Storage handling compressed image
    uploads.

4. Component Responsibilities

-   Mobile App (Citizen): Responsible for capturing manual reports,
    taking photos, silently monitoring accelerometer data, and
    maintaining an offline queue when the network drops.

-   Web Dashboard (Officer): Responsible for consuming real-time feeds,
    displaying geographical heatmaps, filtering data by ward, and
    allowing officers to update report statuses (e.g., Pending ->
    Repaired).

-   Firebase Auth: Responsible for issuing JWT tokens, handling
    login/registration, and managing roles (Admin vs. Citizen).

-   Firestore: Responsible for storing relational data (Users, Potholes,
    Wards) in a NoSQL format, enforcing security rules, and pushing live
    updates to subscribed clients.

-   Firebase Storage: Responsible for securely storing high-resolution
    images of potholes and generating public access URLs for the
    dashboard.

5. Component Communication

-   App ↔ Firebase (Data): Communication occurs over gRPC/WebSockets via
    the Firebase Client SDK. This ensures that when a pothole is
    reported, the dashboard receives the update in milliseconds without
    polling.

-   App ↔ Firebase (Media): Standard HTTPS POST requests are used to
    upload images to Firebase Storage.

-   App/Web ↔ Maps API: HTTPS GET requests to OpenStreetMap tile servers
    to load map visuals.

-   Internal Mobile: Event Emitters are used between the hardware sensor
    modules and the React Native UI threads to prevent UI blocking
    during high-frequency accelerometer polling.

6. Deployment Architecture

For a 30-hour hackathon with a ₹0 budget, deployment must be instant and
serverless.

codeText

[ Mobile App Deployment ]

Developer PC ---> Expo Application Services (EAS) ---> Expo Go App (On
Judges' Phones)

---> Sideloaded APK (For field testing)

[ Web Dashboard Deployment ]

GitHub Repo ---> CI/CD Pipeline ---> Firebase Hosting / Vercel (Free
Tier)

│

▼

Accessed via Web Browser

[ Backend Deployment ]

Managed completely by Google Cloud (Firebase) - No infrastructure setup
required.

7. Technology Stack

-   Frontend (Mobile): Expo, React Native, NativeWind (Tailwind for
    mobile).

-   Frontend (Web): React.js, Vite, Tailwind CSS, Leaflet.js (for maps),
    React-Leaflet.

-   Backend & Database: Firebase Firestore (NoSQL database).

-   Authentication: Firebase Authentication (Email/Password).

-   File Storage: Firebase Cloud Storage (Images).

-   State Management: Zustand or React Context API (lightweight,
    zero-boilerplate).

-   Version Control & Hosting: GitHub, Firebase Hosting.

8. Design Patterns

1.  Observer Pattern (Pub/Sub): Used extensively via
    Firestore's onSnapshot listeners. The dashboard observes the
    database, and the UI reacts automatically to changes without manual
    refreshes.

2.  Singleton Pattern: The Firebase App instance and Authentication
    service are instantiated once and shared across the application to
    prevent memory leaks and redundant connections.

3.  Strategy Pattern: Used in the detection algorithm. We can easily
    swap out the "Simple Threshold Strategy" for a "Rolling Average
    Strategy" without altering the core telemetry component.

4.  Container/Presenter Pattern: In React, logical components (fetching
    data) are separated from presentation components (rendering buttons
    and maps) to keep the codebase clean and maintainable.

9. Folder Structure

A monorepo structure keeps everything in one place for rapid hackathon
iteration.

codeText

/gvmc-pothole-platform

│

├── /mobile-app # Expo React Native App

│ ├── /assets # Icons, splash screens

│ ├── /src

│ │ ├── /components # Reusable UI (Buttons, Cards)

│ │ ├── /screens # Login, Home, Report, Settings

│ │ ├── /services # Accelerometer, GPS, Firebase logic

│ │ ├── /utils # Threshold algorithms, helpers

│ │ └── App.tsx # Mobile Entry Point

│ └── app.json # Expo config

│

├── /web-dashboard # React.js Web App

│ ├── /public # Static assets

│ ├── /src

│ │ ├── /components # MapBox, Charts, Stat Cards

│ │ ├── /pages # Login, AdminPanel, MapView

│ │ ├── /services # Firebase queries

│ │ └── App.tsx # Web Entry Point

│ └── vite.config.ts # Build config

│

└── /firebase # Backend configuration

├── firestore.rules # Database security rules

└── firebase.json # Deployment config

10. Project Structure

The project is logically divided into three autonomous workspaces:

1.  Mobile Workspace: Strictly handles data ingestion (sensors, cameras,
    citizen inputs).

2.  Web Workspace: Strictly handles data visualization and state
    mutation (officer approvals, map rendering).

3.  Shared Configuration: Firebase project settings, security rules, and
    environment variables shared between the two frontends.

11. Layered Architecture

Both the mobile and web applications follow a strict 3-tier layered
architecture internally:

1.  Presentation Layer (UI): React components. Deals only with
    displaying data and capturing user clicks.

2.  Business Logic Layer: Validates reports, calculates sensor
    thresholds, formats timestamps, and filters map data by ward.

3.  Data Access Layer (DAL): The only layer that interacts with
    Firebase. If we ever swap Firebase for a custom Node.js/PostgreSQL
    backend in the future, only this layer needs to change.

12. Advantages

-   Extreme Speed to Market: Firebase eliminates backend development
    time. You can build the entire system in 30 hours.

-   Offline Resilience: Firestore SDK automatically caches writes when
    the mobile app loses internet and syncs them once
    reconnected—critical for field officers in bad network zones.

-   Real-Time by Default: No need to write WebSocket servers or polling
    logic; the dashboard updates instantly as potholes are detected.

-   Cost-Effective: Operates entirely within the free tier, achieving
    the ₹0 budget requirement.

-   Cross-Platform: Expo allows the app to be compiled for both Android
    and iOS from a single codebase.

13. Limitations

-   Hardware Variations: Accelerometer sensitivity varies wildly between
    phone models (e.g., a budget Android vs. a flagship iPhone). A
    static threshold might cause false positives on one and false
    negatives on another.

-   Battery Consumption: Continuous background polling of the
    accelerometer and GPS will drain the citizen's battery quickly.
    (Future fix: Geofencing or trip-based activation).

-   Contextual Blindness: An accelerometer spike cannot differentiate
    between a pothole, a speed breaker, or the user dropping their
    phone. (Mitigated by crowdsourced verification logic).

-   Vendor Lock-in: Deep reliance on Firebase makes it difficult to
    migrate to on-premise GVMC government servers without rewriting the
    Data Access Layer.

---

## Section 4 — Firestore Data Model

As a Principal Software Architect, I have designed the Firestore
database schema specifically optimized for the 30-hour hackathon MVP.

In a NoSQL database like Firestore, we must design the schema based on
the queries the application needs to run (e.g., filtering by ward,
mapping by location, sorting by status). For this pilot, the structure
is flat, denormalized where necessary for performance, and strictly
relies on root-level collections to simplify security rules and API
integration.

Here is the complete Firestore Database Design.

1. Collections, Documents, Fields, and Data Types

Collection: users

Purpose: Stores identity, role, and profile information for all system
users (Citizens, Officers, Admins).

Document ID: Firebase Authentication UID (String)

Fields:

uid (String): Unique identifier matching the Auth ID.

name (String): Full name of the user.

email (String): Email address used for login.

role (String): Enum-like string (citizen, officer, admin).

ward (String | Null): The assigned ward number (only applicable for
officer role; null for citizens).

createdAt (Timestamp): When the account was registered.

lastActive (Timestamp): Timestamp of the user's last interaction.

Collection: potholes

Purpose: The core entity representing a reported or auto-detected
pothole.

Document ID: Auto-generated Firestore ID (String)

Fields:

id (String): The document ID stored within the document for easy
reference on the client.

source (String): Enum-like string (manual_report, auto_detect).

reporterId (String): Reference to the users document ID who submitted or
whose phone detected the pothole.

location (GeoPoint): Exact latitude and longitude.

geohash (String): A geohash string calculated from the coordinates
(critical for bounding-box/radius map queries).

ward (String): The ward number where the pothole is located (used for
dashboard filtering).

status (String): Enum-like string (pending, assigned, repaired,
rejected).

severity (String): Enum-like string (low, medium, high). Auto-detections
might default to medium unless calculated otherwise.

photoUrl (String | Null): URL to the Firebase Storage image (null for
auto-detected potholes without photos).

description (String | Null): Optional context provided by the citizen.

assignedOfficerId (String | Null): Reference to the users document ID of
the officer fixing it.

createdAt (Timestamp): When the report was initially created.

updatedAt (Timestamp): When the status or details were last changed.

repairedAt (Timestamp | Null): When the status was changed to repaired.

Collection: audit_logs

Purpose: Provides the "accountability tracking" required by the GVMC
success metrics. Tracks every status change for auditing.

Document ID: Auto-generated Firestore ID (String)

Fields:

potholeId (String): Reference to the potholes document ID.

changedById (String): Reference to the users document ID who made the
change.

previousStatus (String): The status before the change.

newStatus (String): The new applied status.

timestamp (Timestamp): When the change occurred.

notes (String | Null): Optional remarks by the officer (e.g., "Filled
with cold mix").

5. Relationships

Firestore is a NoSQL document database, so there are no hard foreign key
constraints. We handle relationships using Document References (Soft
Links):

Pothole to User (Reporter): The potholes.reporterId points to users.uid.

Pothole to User (Officer): The potholes.assignedOfficerId points to
users.uid.

Audit Log to Pothole: The audit_logs.potholeId points to potholes.id.

Denormalization Strategy:

For a 30-hour MVP, we avoid complex joins. When displaying a pothole on
the dashboard, if the officer's name is needed, the client will fetch
the pothole and do a secondary fetch for the user document. If
performance becomes an issue later, we would denormalize by storing
reporterName directly in the potholes document.

6. Indexes

Firestore automatically creates single-field indexes. However, to power
the Dashboard and Citizen App, we require Composite Indexes. You will
need to define these in the Firebase Console:

Dashboard Filtering: Querying potholes by Ward and Status, sorted by
Date.

Fields: ward (Ascending) + status (Ascending) + createdAt (Descending)

Officer View: Querying potholes assigned to a specific officer, sorted
by Date.

Fields: assignedOfficerId (Ascending) + status (Ascending) + createdAt
(Descending)

Citizen View: Querying potholes reported by a specific citizen.

Fields: reporterId (Ascending) + createdAt (Descending)

Map View (Geospatial): Querying potholes within a map boundary.

Fields: geohash (Ascending) + status (Ascending)

7. Query Patterns

These are the exact data access patterns the frontend apps will execute:

Live Map Feed: "Fetch all potholes where status is NOT 'repaired' AND
geohash is within the current Leaflet map viewport bounds."

Citizen History: "Fetch all potholes where reporterId equals the current
user's Auth UID, ordered by createdAt descending."

Ward Officer Dashboard: "Fetch all potholes where ward equals 'Ward 14'
AND status is 'pending', ordered by createdAt descending."

Commissioner Analytics: "Count all potholes grouped by ward and status."
(For the MVP, this is done by fetching the raw documents for the pilot
ward and aggregating client-side. For full scale, a Cloud Function would
maintain counter documents).

Audit Trail: "Fetch all audit logs where potholeId equals X, ordered by
timestamp ascending."

8. Security Rules (Conceptual)

Security rules are evaluated on the server to prevent unauthorized
access. The logic will be structured as follows:

Authentication Requirement: No unauthenticated access is allowed
anywhere in the database.

users Collection:

Read: Users can read their own profile. Officers/Admins can read all
profiles.

Write: Users can only create/update their own profile. Only Admins can
change a user's role.

potholes Collection:

Read: All authenticated users (Citizens, Officers, Admins) can read all
potholes (needed for the public map).

Create: Any authenticated Citizen can create a pothole. The reporterId
MUST match their own UID.

Update:

Citizens can only update potholes they created AND only if the status is
still "pending".

Officers can update any pothole (specifically changing status,
assignedOfficerId, and repairedAt).

Delete: Nobody can delete a pothole (Admins can only soft-delete by
changing status to rejected).

audit_logs Collection:

Read: Officers and Admins can read.

Create: System/Officers can create when a status changes.

Update/Delete: Denied for everyone (logs are immutable).

9. Naming Conventions

To ensure consistency across the React backend and Expo React Native
frontend:

Collections: Plural, all lowercase, snake_case (e.g., users, potholes,
audit_logs).

Document IDs: Rely on Firebase's default 20-character auto-generated
alphanumeric IDs.

Fields: camelCase (e.g., reporterId, createdAt).

Timestamps: Always append At to denote a time-based field (e.g.,
createdAt, updatedAt, repairedAt).

Enums/Statuses: lowercase strings (e.g., pending, repaired). Do not use
numbers for statuses; strings are infinitely easier to debug in the
Firebase console.

10. Best Practices (Optimized for the Hackathon)

Client-Side Geohashing: Do not rely on a backend to calculate geohashes.
When the accelerometer or GPS triggers a report, the Expo app should
calculate the geohash string and write it directly to the payload before
sending it to Firestore.

Fat Payloads (No Server Logic): Write the full payload (location, user
ID, status, timestamps) directly from the client to Firestore. This
eliminates the need to build and deploy an intermediate Express/Node.js
REST API layer, saving crucial hours.

Timestamp via Server: Always use Firebase's FieldValue.serverTimestamp()
when creating or updating records. Never trust the time on the citizen's
mobile device, as it will break your chronological sorting.

Avoid Arrays for Statuses: Do not keep a history of statuses in an array
inside the potholes document. Arrays in Firestore are hard to query and
update concurrently. Always use the separate audit_logs collection.

11. Scalability Considerations (Post-Pilot)

While this design perfectly serves the 30-hour pilot in a single ward,
here is how the architecture scales when GVMC rolls it out city-wide:

Data Aggregation Limits: Currently, counting total potholes for a
dashboard requires reading every document. For a city-wide rollout, we
would implement Distributed Counters via Firebase Cloud Functions. A
function would listen for new potholes and increment a total_pending
field in a dedicated ward_stats collection to save database read costs.

Write Throttling (Hotspots): Firestore limits document writes to 1 per
second. This is fine for the MVP. However, if a massive pothole on a
major highway triggers 500 accelerometer events per minute from passing
cars, it would create a write bottleneck. Post-hackathon, we would
implement geospatial deduplication on the client or edge layer before
writing to Firestore.

Data Archiving: Potholes that have been repaired for over 90 days would
be exported to Google BigQuery for long-term urban planning analytics,
and deleted from the active Firestore database to keep map queries
lightning fast.

---

## Section 5 — Authentication & Authorization Design

As a Principal Software Architect, I have designed the Authentication
and Authorization system for the GVMC Pothole Detection pilot. Given the
30-hour hackathon constraint and the ₹0 budget requirement, we will
leverage Firebase Authentication combined with Firestore-based Role
Management. This approach provides enterprise-grade security without the
overhead of building a custom backend or managing complex JWT signing
infrastructure.

Here is the comprehensive design for the Authentication System.

1. Firebase Authentication

For the MVP, we will use Email & Password Authentication as the sole
provider.

Why: It requires zero external API configurations (unlike Google/Apple
sign-in), costs ₹0, and is the fastest to implement across both React
Native (mobile) and React (web).

Mechanism: Firebase Auth will handle user credential verification,
password hashing, and token generation (short-lived Access Tokens and
long-lived Refresh Tokens).

State Persistence: Firebase SDK will automatically manage session
persistence across app restarts and browser refreshes.

2. Role Management

The system requires Role-Based Access Control (RBAC) to differentiate
between what a citizen, a field officer, and an admin can do.

Roles Defined:

citizen: Can report potholes and view their own reports.

officer: Can view assigned ward potholes, update repair status, and
close tickets.

admin: Can view city-wide data, manage officers, and analyze metrics.

Implementation Strategy: We will use a Firestore Role Mapping pattern.
While Firebase Custom Claims are ideal for production, they require
Cloud Functions to set up. To keep the hackathon MVP simple and
serverless, the user's role will be stored securely in a Firestore users
collection.

3. Citizen Login & Registration

Platform: Mobile App (Expo React Native)

Flow: Citizens can self-register using the "Sign Up" screen.

Process:

User enters Email, Password, and Name.

Firebase Auth creates the user.

The client immediately writes a document to the Firestore users/{uid}
collection with the role explicitly set to citizen. (Firestore Security
Rules will enforce that self-registered users can only set their role to
citizen).

4. Officer Login

Platform: Mobile App (Expo) & Web Dashboard (React.js)

Flow: Officers cannot self-register as officers. They must be
provisioned.

Process:

Admin creates an account for the Officer from the Admin Dashboard,
setting the role to officer and assigning a ward_id.

The Officer receives their credentials (or a password reset link).

Officer logs in. The system reads their Firestore user document,
identifies the officer role, and routes them to the Officer
Dashboard/App View.

5. Admin Login

Platform: Web Dashboard (React.js)

Flow: Pre-provisioned system accounts.

Process: Admin accounts are manually created directly in the Firebase
Console (Auth + Firestore document) before deployment. Admins log into
the web portal, the system reads the admin role, and unlocks full
city-wide GIS and analytic views.

6. Session Management

Token Lifecycle: Firebase automatically issues a JWT upon login, valid
for 1 hour, and silently refreshes it using a secure refresh token.

Persistence:

Mobile (Expo): Configured to use AsyncStorage for persistence.

Web (React): Configured to use indexedDB or localStorage (Firebase
default).

Context: A global Authentication Context (e.g., React Context API or
Zustand) will listen to Firebase's onAuthStateChanged observer. When the
auth state changes, it will fetch the user's role from Firestore and
update the global state.

7. Authorization (Access Control)

Authorization occurs at two layers to ensure absolute security:

Client-Side (UI Level): The React/React Native router checks the user's
role in the global state. If a citizen tries to access an /officer/map
route, the router redirects them to the Home screen.

Server-Side (Firestore Rules Level): Even if a user bypasses the UI,
Firestore Security Rules will reject any read/write requests that do not
match their authorized role. (e.g., allow update: if
get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role
== 'officer';)

8. Firestore Role Mapping

When a user logs in, the Auth Token only provides the uid. To get the
role, a secondary lookup is performed.

Collection: /users/{uid}

Document Structure:

uid (String) - Matches Firebase Auth UID

email (String)

name (String)

role (String) - "citizen", "officer", or "admin"

assigned_ward (String, Optional) - For officers only

Lookup Flow:

Login -> onAuthStateChanged fires -> fetch document from /users/{uid} ->
merge Auth data with Role data -> set Application State.

9. Protected Routes

The application navigation must be strictly guarded.

Mobile App Routing:

AuthStack (Login, Register, Forgot Password) - Accessible only if
unauthenticated.

CitizenStack (Home, Report, My Reports) - Accessible only if role ==
'citizen'.

OfficerStack (Live Map, Pothole Details, Update Status) - Accessible
only if role == 'officer'.

Web Dashboard Routing:

/login - Public

/dashboard/* - Protected, requires role == 'admin' or role == 'officer'.

/dashboard/manage-users - Strictly protected, requires role == 'admin'.

10. Logout Flow

User clicks "Logout".

Application calls Firebase Auth signOut().

The onAuthStateChanged listener detects the null user.

Global state is cleared (removing cached role and user data).

The routing layer automatically redirects the user to the Login screen.

11. Password Reset

Implementation: Utilize Firebase's built-in sendPasswordResetEmail
method.

Flow: User clicks "Forgot Password", enters their email, and Firebase
sends a secure, time-limited link to reset their password. This requires
zero backend logic and provides a polished user experience out of the
box.

12. Validation Rules

To ensure data integrity and prevent errors before hitting the Firebase
API:

Email: Standard regex validation (^[^\s@]+@[^\s@]+\.[^\s@]+$). Must not
be empty.

Password: Minimum 8 characters. For the MVP, we can skip complex
alphanumeric requirements to reduce friction, but length is mandatory.

Name (Registration): Minimum 2 characters, maximum 50 characters. No
special symbols (except hyphens/apostrophes).

13. Security Best Practices

No Client-Side Trust: Never trust the client application. All
authorization must be backed by Firestore Security Rules. If a citizen
modifies the mobile app code to show the Officer screen, Firestore will
still deny the data requests.

Role Escalation Protection: Firestore rules must explicitly forbid a
user from updating their own role field in the /users/{uid} document.

Secure API Keys: Firebase config keys are inherently public (they
identify the project, not the admin). We rely on Security Rules, not
hidden keys, to protect the data.

Rate Limiting: Firebase Authentication automatically handles rate
limiting for login attempts to prevent brute-force attacks.

This architecture provides a secure, role-based environment that
perfectly balances the stringent requirements of a government system
with the high-speed constraints of a 30-hour hackathon.

---

## Section 6 — Citizen Interface Design

As a Principal Software Architect, here is the comprehensive design
for the Citizen Mobile Application. This design focuses on a clean,
accessible user experience while handling the complexity of background
sensor processing and GIS data collection.

This document outlines the UI/UX architecture, state management, and
data flow for the Expo React Native application, adhering strictly to
the MVP constraints.

1. Screen Flow & Navigation Architecture

The application uses a hybrid navigation approach: a Root Stack
Navigator for authentication and modals, and a Bottom Tab Navigator for
core features.

code

Text

[Root Stack]

├── Splash Screen (Auth & Permission Check)

├── Auth Stack

│ ├── Login

│ └── Register

└── Main App (Bottom Tabs)

├── Home Tab (Map & Auto-detect)

│ └── Report Pothole (Modal/Push)

├── My Reports Tab

│ └── Report Details (Push)

└── Profile Tab

2. Screen Breakdown & UI Elements

2.1. Splash Screen

Purpose: Initialize the app, check Firebase Auth session, and verify
hardware permissions (Location, Accelerometer).

UI Elements: App Logo, animated loading spinner.

Routing Logic: If authenticated -> Home Tab. If unauthenticated -> Auth
Stack.

2.2. Login & Register Screens

Purpose: Authenticate the citizen securely.

UI Elements:

Email Input Field (Keyboard type: email-address).

Password Input Field (Secure text entry).

Primary Button: "Sign In" / "Create Account".

Text Link: "Forgot Password?" / "Don't have an account?".

Interactions: Disables buttons during submission, dismisses keyboard on
tap outside.

2.3. Home Dashboard (Main Screen)

Purpose: The operational hub. Shows nearby potholes and controls the
automated detection engine.

UI Elements:

GIS Map View (Leaflet/React Native Maps): Takes up the top 60% of the
screen. Shows user's current location (blue dot) and nearby reported
potholes (red/yellow/green markers based on status).

Auto-Detect Toggle Card: A prominent card at the bottom. Contains a
master switch to turn "Drive Mode" (Accelerometer detection) ON or OFF.

Floating Action Button (FAB): A large, highly visible "+" button
anchored to the bottom right for manual reporting.

Interactions: Toggling the switch requests background location
permissions and starts the accelerometer listener.

2.4. Report Pothole (Manual Entry Modal)

Purpose: Allow citizens to manually log a pothole they encountered.

UI Elements:

Camera/Gallery Widget: Large placeholder to tap and open the device
camera.

Location Preview: A mini static map showing the grabbed GPS coordinates.

Severity Selector: Three chips/radio buttons: [Low] [Medium] [High].

Description Area: Optional text input for landmarks or details.

Primary Button: "Submit Report".

Interactions: Auto-fetches GPS coordinates on mount.

2.5. My Reports

Purpose: A historical list of everything the citizen has reported.

UI Elements:

FlatList / ScrollView: Vertical list of ReportCard components.

ReportCard: Shows a thumbnail of the photo, date, relative location
(e.g., "Near MVP Colony"), and a Status Badge (Pending, Assigned,
Repaired).

Filter Chips: [All] [Pending] [Repaired].

Interactions: Tapping a card navigates to Report Details.

2.6. Report Details

Purpose: Deep dive into a specific report's lifecycle.

UI Elements:

Full-width hero image of the pothole.

Status Timeline (Vertical stepper):

Reported (Date/Time)

Validated by GVMC

Assigned to Contractor

Repaired (With resolution photo).

Map snippet showing exact location.

2.7. Profile / Settings

Purpose: User management and app preferences.

UI Elements: User Info (Name, Email), "Enable Push Notifications"
toggle, "Sign Out" button.

3. Forms & Validation Rules

Form state and validation should be managed gracefully (e.g., using
React Hook Form + Yup/Zod for schema validation).

Login/Register Form:

Email: Must match standard regex (e.g., user@domain.com).

Password: Minimum 6 characters (Firebase default requirement).

Manual Report Form:

Photo: Required. The submit button remains disabled until an image is
captured or selected.

Location (GPS): Required. If GPS fails, prompt the user to enable
location services. Cannot submit with (0,0).

Severity: Default to [Medium].

Description: Optional, max 200 characters.

4. Application States

To ensure a professional UX, the app must never leave the user guessing
what the system is doing.

4.1. Loading States

Initial Load: App-wide splash screen.

Data Fetching (My Reports/Map): Shimmer/Skeleton screens mimicking the
shape of the data cards while Firestore queries execute.

Submissions (Forms): Primary button changes to a spinner, and the text
changes to "Submitting...". The rest of the form is disabled to prevent
duplicate submissions.

4.2. Empty States

My Reports: If no reports exist, show a friendly illustration (e.g., a
clean road) with text: "You haven't reported any potholes yet. Help keep
Visakhapatnam safe!" and a "Report Now" button.

Map: If no potholes are nearby, show a subtle toast: "No potholes
reported in this ward."

4.3. Error States

Form Errors: Inline red text below the specific input field.

Network/Submission Errors: A non-intrusive Toast or Snackbar at the
bottom of the screen (e.g., "Failed to submit report. Please try
again.").

Permission Denied: If the user denies GPS/Camera, show a full-screen
fallback with a button to "Open Device Settings."

5. Offline Behaviour (Critical for Mobile)

Since road conditions often correlate with poor network areas:

Local Caching: Firestore's offline persistence must be enabled. My
Reports will load instantly from the local cache while fetching updates
in the background.

Queueing Submissions: If a user submits a manual report or the
accelerometer triggers a report while offline, the payload (and photo)
is written to the local Firestore queue.

Background Sync: Once the device regains connectivity, the Firebase SDK
automatically pushes the queued reports to the cloud. The UI should
reflect this with a "Syncing..." indicator.

6. Notifications & Feedback

In-App Alerts: Toast notifications for immediate actions (e.g., "Pothole
Logged Successfully").

Automated Detection Feedback: When the accelerometer detects a severe
bump, trigger a local push notification: "We detected a severe bump. Was
it a pothole?". Tapping it opens a quick-confirm screen. This acts as a
human-in-the-loop filter to prevent false positives from speed breakers.

Lifecycle Push Notifications: (Optional for MVP, via FCM): "Your
reported pothole in Zone 2 has been marked as Repaired!"

7. State Management Architecture

Given the 30-hour constraint, state management must be lean. Avoid heavy
boilerplate like Redux.

Local UI State (React useState / useReducer):

Form inputs, toggle switch states, modal visibility.

Global App State (React Context API / Zustand):

User Session (UID, Role, Name).

Hardware Permissions state (GPS granted, Camera granted).

Auto-detect engine status (Is running in background?).

Server State (Firebase SDK / React Query):

Real-time pothole markers for the map.

User's report history.

Caching, pagination, and offline synchronization are handled natively by
the Firestore SDK.

8. Data & Interaction Flow

Flow A: Automated Pothole Detection (The "Drive Mode")

User opens App -> Navigates to Home.

User toggles "Auto-Detect" -> ON.

App requests Foreground Service & High Accuracy Location permissions.

Accelerometer listener mounts (sampling at 50Hz).

User puts phone in mount/pocket and drives.

Sensor detects Z-axis spike > threshold (e.g., > 2.5G).

App reads current GPS coordinate.

App creates an unverified pothole document in Firestore cache.

Local notification fires: "Confirm pothole?" (Optional validation step).

Background sync pushes to Cloud.

Flow B: Manual Citizen Report

User taps FAB (+).

App requests Camera permissions.

User snaps photo of pothole.

App compresses image locally to save bandwidth.

User selects "High" severity and taps Submit.

UI shows loading spinner.

App uploads Image to Firebase Storage -> gets downloadURL.

App writes document to potholes collection with downloadURL and GPS
coords.

UI transitions to Success Screen -> Navigates back to Home.

Map instantly updates with a new marker (thanks to Firestore real-time
listeners).

---

## Section 7 — Officer & Admin Dashboard Design

Here is the comprehensive architectural design for the Officer & Admin
Dashboard.

As a Principal Software Architect, I have designed this web-based
dashboard (React.js) to be the central command center for the GVMC Roads
and Buildings department and the Commissioner's Office. It is optimized
for the 30-hour hackathon constraint, focusing on operational
efficiency, spatial awareness, and workflow management.

1. Dashboard Layout & Navigation

The dashboard uses a classic, responsive App Shell architecture
(Sidebar + Top Bar + Main Content Area) to ensure familiar UX for
government officials.

Sidebar (Primary Navigation)

Overview: High-level statistics and recent alerts.

Live GIS Map: Full-screen spatial view of all potholes.

Reports List: Tabular data view of all submissions.

Analytics (MVP+): Performance metrics and charts.

Settings/Profile: User management and threshold configurations.

Implementation Note: On mobile/tablet, this collapses into a hamburger
menu to maximize screen real estate for maps and tables.

Top Navigation (Context & Actions)

Global Search Bar: Quick search by Report ID or Street Name.

Ward Selector: A global filter dropdown to switch context between
different wards (crucial for Commissioner view; locked for Ward
Officers).

Notification Bell: Alerts for new high-severity reports or escalated
issues.

User Profile Menu: Displays current user name, role (Officer vs. Admin),
and logout button.

2. Dashboard Home (Overview)

This is the landing page. It answers the question: "What is the current
state of my ward today?"

Statistics Cards (KPIs)

Total Active Potholes: Count of status reported + assigned.

Repaired This Week: Count of status repaired in the last 7 days.

Critical Alerts: Count of High severity potholes awaiting action.

False Positives: Count of reports marked as rejected.

Charts (Visual Summaries)

Trend Chart (Bar/Line): "Reports vs. Repairs over the last 7 days."
Visualizes if the department is keeping up with the influx of new
potholes (especially during monsoon).

Severity Breakdown (Pie/Donut): Distribution of Low, Medium, and High
severity potholes.

Recent Activity Feed

A simplified list showing the 5 most recent reports with their location,
timestamp, and a quick-action button to view details.

3. GIS Map (The Core Spatial View)

Built using Leaflet.js and OpenStreetMap (to keep costs at ₹0). This is
the most critical tool for field officers to plan their repair routes.

Live Pothole Markers:

Red Marker: High severity / Unassigned.

Yellow Marker: Medium severity / Assigned.

Green Marker: Repaired.

Clustering: If multiple potholes are reported in a 50-meter radius, they
cluster into a single bubble with a number (prevents map clutter).

Interactive Popups: Clicking a marker opens a tooltip showing the
thumbnail photo, severity, date reported, and a "View Full Details"
link.

Map Filters (Overlay): Floating UI controls on the map to toggle markers
by Status (Hide Repaired) or Severity (Show only High).

4. Reports Table (Data Management)

A robust data grid for officers who need to process reports in bulk.

Table Columns

Report ID (Shortened)

Date Reported

Location/Coordinates (with a quick-copy icon)

Severity (Color-coded badges: Low, Medium, High)

Source (Auto-detected vs. Citizen Manual)

Assigned Officer

Status (Dropdown directly in the row for rapid updates)

Table Features

Filters: Dropdowns to filter by Status, Severity, and Source.

Search: Text input to filter the current view by location or ID.

Sorting: Clickable column headers (e.g., sort by Date to see oldest
unresolved reports, or by Severity to prioritize).

Pagination: Standard next/previous controls using Firestore cursor
pagination (startAfter) to ensure the dashboard doesn't crash if there
are 10,000+ reports.

5. Pothole Details & Repair Workflow

When an officer clicks a specific report from the map or table, they
enter this detailed view. It serves as the single source of truth for a
pothole's lifecycle.

Component: Evidence Panel

Displays the photo uploaded by the citizen (if manual) or the
accelerometer confidence graph (if auto-detected).

Mini-map showing the exact pinpoint location.

Report metadata (Citizen ID/Anonymous, Timestamp, GPS accuracy).

Component: Workflow & Status Manager

This component handles the core business logic of the app.

Status Pipeline Dropdown: Reported -> Assigned -> In Progress ->
Repaired -> Rejected (False Positive).

Status Update Logic: When status changes to Repaired, it automatically
prompts the officer to upload a "Proof of Repair" photo.

Component: Officer Assignment

A dropdown populated with users who have the officer role.

Assigning an officer updates the assignedTo field in Firestore, which
instantly triggers a UI update on that specific officer's mobile app.

Component: Audit Log (Timeline)

A vertical timeline showing the history of the report (e.g., "Reported
by Citizen A at 10:00 AM", "Assigned to Officer B at 11:30 AM", "Marked
Repaired at 4:00 PM"). Essential for GVMC accountability tracking.

6. Analytics (Commissioner's View - MVP+)

If time permits in the 30-hour window, this module provides cross-ward
visibility.

Average Resolution Time: Calculates the time delta between createdAt and
resolvedAt.

Ward Leaderboard: Table ranking wards by the highest repair rate.

Export to CSV: A simple button that downloads the current tabular view
into a CSV file for offline Excel reporting (highly requested in
government projects).

7. Responsive Design Strategy

Since field officers might use this dashboard on tablets while in GVMC
vehicles, responsiveness is mandatory.

Desktop (>1024px): Full expanded sidebar, wide data tables, side-by-side
Layout for Pothole Details (Evidence on left, Workflow on right).

Tablet (768px - 1024px): Collapsed sidebar (icons only), GIS map takes
priority, tables horizontally scrollable.

Mobile (<768px): Hamburger menu. Tables convert into stacked "Cards"
(instead of rows/columns, each report is a block of text). The GIS map
defaults to 50vh (half screen).

8. Architectural Summary & Component Responsibilities

DashboardLayout (Wrapper): Manages the state of the Sidebar
(open/closed) and Top Nav. Handles authentication redirects if a session
expires.

AuthContext (State): Wraps the entire dashboard. Reads the JWT token,
verifies the user's role (admin or officer), and blocks access to
unauthorized routes.

MapWidget (Component): Encapsulates Leaflet.js. Responsible for
subscribing to the Firestore potholes collection (filtered by
ward/status) and rendering markers efficiently.

DataGrid (Component): A reusable table component that accepts columns,
data, and pagination props.

StatusUpdater (Component): A modular widget used in both the Table and
Details view. Responsible for writing status changes back to Firestore
and handling loading/error states during the write operation.

---

## Section 8 — Accelerometer Detection Design

As a Principal Software Architect, I have designed the Accelerometer
Detection System for the GVMC Pothole Detection MVP. For a 30-hour
hackathon, we must avoid complex Machine Learning (ML) models that
require training data. Instead, we will use a Deterministic Rule-Based
Heuristic Engine. This approach is computationally cheap, highly
predictable, and perfectly suited for an Expo React Native environment.

Here is the complete architectural design for the edge-based detection
system.

1. Sensor Reading & Sampling Rate

Concept:

The smartphone contains a tri-axial accelerometer measuring forces in 3D
space (X, Y, Z axes). Because the phone might be mounted on a dashboard,
thrown in a cupholder, or held by a passenger, we cannot rely on a
single axis.

The Algorithm (Gravity-Compensated Magnitude):

To make the detection orientation-independent, we calculate the
continuous Magnitude Vector of all three axes and subtract Earth's
gravity (1g ≈ 9.81 m/s²).

Formula: Magnitude = √ (X² + Y² + Z²) - Gravity

If the phone is perfectly still, the Resulting Magnitude is roughly 0.

Sampling Rate:

Target: 50 Hz (1 reading every 20 milliseconds).

Why: A vehicle traveling at 40 km/h covers about 11 meters per second. A
pothole impact lasts less than 100 milliseconds. If we sample at 10 Hz
(every 100ms), we might completely miss the spike. 50 Hz is the sweet
spot between capturing the impact and preserving battery life.

2. Threshold Detection

Concept:

We need to identify when the Magnitude Vector spikes abnormally compared
to the baseline vibration of the moving vehicle.

The Algorithm (Dynamic Rolling Baseline):

Instead of a hardcoded threshold (which fails on dirt roads vs. paved
highways), we use a sliding window average.

Maintain a Window: Keep an array of the last 100 readings (2 seconds of
data).

Calculate Baseline: Continuously calculate the average vibration (noise
floor).

Trigger Condition: If the current Magnitude exceeds the Baseline by a
specific multiplier (e.g., Baseline + 2.5g), register an "Impact Event."

3. Noise Filtering & False Positive Removal

Concept:

A phone drop, a speed bump, a sharp turn, or stopping abruptly can all
trigger high G-forces. We must filter these out to protect GVMC's
database from garbage data.

Algorithm 1: Speed Gating (The "Walking" Filter)

If the GPS speed is < 10 km/h, ignore all accelerometer spikes. The user
is likely walking, stuck in traffic, or moving the phone by hand.

If the GPS speed is > 100 km/h, dampen the sensitivity. (Potholes at
this speed look different, and we want to avoid flagging highway
expansion joints).

Algorithm 2: Waveform Signature Analysis (Bump vs. Pothole)

Speed Bump Signature: The vehicle goes up first (Positive Z-axis spike)
then down.

Pothole Signature: The tire drops in first (Negative Z-axis
spike/Weightlessness), followed by a massive violent spike (Positive) as
the tire slams into the lip of the hole.

Implementation: Once a threshold is crossed, we analyze the 100ms window
before the spike. If there was a momentary drop in G-force just before
the spike, it is definitively a pothole.

4. GPS Integration

Concept:

React Native GPS polling at 50 Hz will destroy the battery and overheat
the phone. We need exact coordinates without polling GPS constantly.

The Algorithm (Asynchronous Tagging):

Run the GPS location listener at a low frequency (1 Hz or 1 update per
second).

Store the last known GPS coordinate and current speed in a lightweight
state variable.

When the Accelerometer Engine detects a pothole, it instantly grabs the
last known GPS coordinate.

Extrapolation (Optional for MVP): We can calculate the exact impact
point by taking the last GPS coordinate, looking at the vehicle's speed
and heading, and adding the time difference (e.g., if the last GPS ping
was 500ms ago, and we are going 10 m/s north, we add 5 meters north to
the coordinate).

5. Duplicate Detection

Concept:

If a bus with 10 passengers drives over a pothole, we do not want 10 new
pothole markers on the GIS dashboard.

The Algorithm (Spatio-Temporal Radius Hashing):

Client-Side: When an impact is detected, the app checks a local cache of
recently reported coordinates. If an impact occurred within a 15-meter
radius in the last 10 minutes, suppress the upload.

Server-Side (Firestore): When the payload hits the backend, run a
Geohash query. If a pothole already exists within a 15-meter radius, DO
NOT create a new document. Instead, increment the existing document's
verificationCount field.

6. Severity Detection

Concept:

GVMC needs to know which potholes to fix first. We categorize them based
on the violence of the impact.

The Algorithm (Amplitude Banding):

We measure the Peak G-Force of the impact event.

Low Severity: 1.5g to 2.5g (Minor surface degradation, rough patches).

Medium Severity: 2.5g to 4.0g (Standard pothole, uncomfortable impact).

High Severity: > 4.0g (Deep crater, potential for vehicle damage,
requires immediate GVMC attention).

7. Confidence Score (0 - 100%)

Concept:

Because this is an automated system, we assign a confidence score to
help the Officer Dashboard filter out anomalies.

The Algorithm (Weighted Matrix):

Start at 0%, add points based on heuristics:

Impact Clarity (+40%): Did the waveform perfectly match the
"drop-then-spike" signature?

Speed Validity (+30%): Was the vehicle traveling at an ideal detection
speed (e.g., 20 - 60 km/h)?

Community Validation (+30%): Has this exact coordinate been tagged by
another user previously? (This is calculated on the backend and pushed
down).

Rule: Any report with < 50% confidence is hidden from the public map but
kept in the Admin audit logs.

8. Firestore Upload & Network Flow

Concept:

Streaming live sensor data to the cloud is an anti-pattern. It costs
money and drains batteries.

The Flow (Edge Computing):

All math and algorithms happen on the device (Edge computing).

When a pothole is validated by the local engine, we construct a tiny
JSON payload (Location, Severity, Timestamp, Device ID).

If offline (no 4G/5G), the payload is saved to AsyncStorage/SQLite.

If online, the app batch-pushes the JSON to the potholes Firestore
collection. Data footprint is less than 1KB per pothole.

9. Notification Trigger

Concept:

Feedback loop for the citizen. If they hit a pothole, they should know
the app caught it, but we shouldn't spam them.

The Flow (Throttled Alerts):

When a high-confidence pothole is uploaded, trigger a local push
notification (using Expo Notifications, no internet required).

Message: "Pothole detected and reported to GVMC! Thanks for keeping
Vizag safe."

Throttle: Implement a cooldown timer. Maximum 1 notification per 10
minutes to prevent driver distraction on very bad roads.

10. Background Monitoring & Battery Optimization

Concept:

For the app to be useful, it must work when the phone is in the user's
pocket with the screen off. iOS and Android aggressively kill background
apps to save battery.

The Algorithm (Lifecycle & Wake-Locks):

Expo Background Tasks: Register a background task using
expo-task-manager and expo-location.

Geofence Wakeup: Use the OS-level significant location change API. The
app stays asleep (consuming ~0% battery) until the user moves more than
100 meters.

Speed-Gated Sensor Activation:

If GPS speed goes > 15 km/h: Turn ON the 50 Hz accelerometer stream.

If GPS speed stays < 5 km/h for 3 minutes: Turn OFF the accelerometer
stream to save battery.

Batching: Do not establish a network connection for every single
pothole. Buffer reports and send them in batches of 5, or when the user
connects to Wi-Fi.

This rule-based architecture ensures the system is highly performant,
requires zero ML model training, works completely offline, and can be
easily implemented and demonstrated within the 30-hour hackathon window.

---

## Section 9 — API Design

Here is the complete API Design document for the GVMC Pothole
Detection System.

As a Senior Solution Architect, I must clarify an important
architectural nuance for this hackathon: Because we are using a Firebase
Serverless Architecture (BaaS), we do not have a traditional
Node.js/Express REST API sitting between the client and the database.

Instead, the client SDKs interact directly with Firestore and Firebase
Authentication. However, for a robust system design, we document these
direct interactions as Logical APIs. This ensures that the data
contracts, validation, security, and flows are strictly defined, acting
as a blueprint for the Firestore Security Rules and frontend data
services.

1. Global API Standards (Logical)

Authentication:

All logical endpoints require a Firebase ID Token passed implicitly by
the Firebase Client SDK.

Standard HTTP Status Codes (Mapped to Firebase Error Codes):

200 / 201: Success / Document Created

400: Bad Request (Validation failed in frontend or Firestore Rules)

401: Unauthorized (No valid Firebase Auth session)

403: Forbidden (Insufficient role permissions in Firestore Rules)

404: Not Found (Document does not exist)

500: Internal Server Error (Firebase service disruption)

2. Authentication APIs (Logical)

Even though Firebase Auth handles these entirely, we define the logical
flow to ensure the application state is managed correctly.

2.1. Register Citizen User

Endpoint: Logical: auth.createUserWithEmailAndPassword()

Purpose: Creates a new citizen account and provisions their Firestore
user profile.

Method: POST

Authentication: None (Public)

Input: email (string), password (string), name (string)

Output: uid, email, role: "citizen"

Validation: Valid email format, strong password (min 6 chars), name
cannot be empty.

Errors: auth/email-already-in-use, auth/weak-password.

Security: Firebase Auth handles secure credential storage.

Request Flow: App sends credentials to Firebase Auth -> Firebase Auth
creates UID.

Response Flow: Firebase Auth returns UID -> App triggers POST /users to
create Firestore profile -> App updates local auth state.

2.2. Login User

Endpoint: Logical: auth.signInWithEmailAndPassword()

Purpose: Authenticates a user (Citizen, Officer, Admin) and retrieves
their session and role.

Method: POST

Authentication: None (Public)

Input: email (string), password (string)

Output: Firebase ID Token, uid

Errors: auth/user-not-found, auth/wrong-password.

Request Flow: App sends credentials to Firebase Auth -> Auth validates.

Response Flow: Auth returns Token -> App fetches users/{uid} from
Firestore to determine role -> App routes to Citizen Home or Officer
Dashboard based on role.

3. Pothole Management APIs

These are the core business transactions, executed directly against
Firestore collections using the frontend SDK.

3.1. Submit Manual Pothole Report

Endpoint: Logical: POST /potholes (firestore.collection('potholes').add)

Purpose: Allows a citizen to manually report a pothole with GPS and an
optional photo.

Method: POST

Authentication: Required (Any valid user)

Input:

location: GeoPoint (latitude, longitude)

wardId: string

imageUrl: string (URL from Firebase Storage)

description: string (optional)

detectionType: "MANUAL"

Output: id (Document ID), status: "PENDING", createdAt (Timestamp)

Validation: location must be valid coordinates within Visakhapatnam
boundaries. wardId must exist.

Errors: 403 Forbidden (If user tries to spoof detectionType to AUTO or
spoof another user's UID).

Security: Firestore Rules enforce that reportedBy matches the
authenticated user's UID.

Request Flow: App gets GPS -> App uploads image to Storage (if any) ->
App builds pothole payload -> App writes to Firestore potholes
collection.

Response Flow: Firestore validates via Security Rules -> Document
created -> Local state updated -> Citizen sees success screen.

3.2. Submit Auto-Detected Pothole

Endpoint: Logical: POST /potholes (firestore.collection('potholes').add)

Purpose: The background accelerometer service automatically logs a
detected pothole.

Method: POST

Authentication: Required (Citizen role)

Input:

location: GeoPoint

wardId: string

confidenceScore: number (0-100)

severity: string ("LOW", "MEDIUM", "HIGH")

detectionType: "AUTO"

Output: id, status: "PENDING"

Validation: confidenceScore must be >= configured threshold (e.g., 75).

Security: Firestore Rules enforce that only citizen roles can create
this, and status must strictly equal PENDING upon creation.

Request Flow: Background task detects shock -> Filters noise ->
Calculates confidence -> Appends GPS -> Writes to Firestore.

Response Flow: Firestore rules validate -> Document created silently in
background.

3.3. Get Potholes (Filtered List)

Endpoint: Logical: GET /potholes
(firestore.collection('potholes').where(...))

Purpose: Retrieves a list of potholes for the GIS Map and Dashboard
tables.

Method: GET

Authentication: Required (Officer or Admin role for full city view;
Citizen for nearby/personal view).

Input (Query Parameters):

status: array (e.g., ["PENDING", "ASSIGNED"])

wardId: string (optional)

severity: string (optional)

limit: number

Output: Array of Pothole objects.

Validation: Cannot request more than 500 documents per batch
(performance constraint).

Errors: 403 Forbidden (If a Citizen tries to query the entire city's
database without filters).

Security: Firestore Rules allow Officers to read all wards, but restrict
Citizens to reading only status == 'PENDING' near them, or their own
historical reports.

Request Flow: Dashboard sets filter state -> App constructs Firestore
query -> Executes query.

Response Flow: Firestore returns documents -> App populates Leaflet Map
and Data Table.

3.4. Update Pothole Status

Endpoint: Logical: PATCH /potholes/{id}
(firestore.doc('potholes/{id}').update)

Purpose: Officer updates the status of a pothole (e.g., marking it
REPAIRED).

Method: PATCH

Authentication: Required (Officer or Admin role ONLY).

Input:

status: "ASSIGNED", "REPAIRED", or "REJECTED"

repairNotes: string (optional)

Output: Success acknowledgment.

Validation: Status must be a valid enum string.

Errors: 403 Forbidden (Citizen attempting to update status), 404 Not
Found (Pothole ID doesn't exist).

Security: Firestore Security Rules explicitly check
get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role
in ['officer', 'admin'].

Request Flow: Officer clicks "Mark Repaired" -> App opens modal -> App
writes update payload to Firestore.

Response Flow: Rule validates role -> Document updated -> Real-time
listener automatically updates the Dashboard UI.

3.5. Confirm Existing Pothole (Crowdsourcing)

Endpoint: Logical: POST /potholes/{id}/confirmations
(firestore.doc('potholes/{id}').update)

Purpose: When a citizen's app auto-detects a pothole near an existing
reported pothole, it increments a counter instead of creating a
duplicate.

Method: PATCH

Authentication: Required (Citizen)

Input: increment(1) to confirmationCount.

Output: Success acknowledgment.

Validation: Citizen cannot confirm the same pothole twice within 24
hours (tracked locally).

Request Flow: App checks for nearby existing potholes -> If match found
within 10 meters -> Sends atomic increment update to existing document.

Response Flow: Firestore atomically increments the count -> Updates
timestamp.

4. Storage APIs (Media)

4.1. Upload Pothole Image

Endpoint: Logical: POST /storage/potholes/{fileName}
(firebase.storage().ref().put)

Purpose: Upload a photo taken by a citizen during a manual report.

Method: POST

Authentication: Required (Any valid user).

Input: Blob/File (JPEG, PNG).

Output: downloadURL (string).

Validation: File size must be < 5MB. Content-Type must be image/jpeg or
image/png.

Security: Storage Security Rules limit uploads to authenticated users
and enforce the 5MB size limit to prevent abuse.

Request Flow: App compresses image -> Uploads to Firebase Storage ->
Storage generates URL.

Response Flow: App receives downloadURL -> App attaches this URL to the
POST /potholes payload.

5. Dashboard Analytics APIs

Because Firestore NoSQL is not optimized for complex GROUP BY or COUNT
aggregation queries out of the box, we use logical aggregation.

5.1. Get Dashboard Summary Statistics

Endpoint: Logical: GET /analytics/summary
(firestore.doc('stats/global').get)

Purpose: To instantly load the top-level stats (Total, Pending,
Repaired) without downloading 4,000+ documents.

Method: GET

Authentication: Required (Officer/Admin)

Input: None

Output: totalPotholes, pendingRepairs, repairedThisMonth.

Implementation Note: Instead of querying all potholes, the system
maintains a counter document. When a pothole is created or updated, a
Firebase Cloud Function (or atomic client-side transaction)
increments/decrements these summary fields.

Request Flow: Dashboard mounts -> Fetches stats/global document.

Response Flow: Firestore returns pre-calculated totals instantly -> UI
populates KPI cards.

6. Error Handling Strategy

Because we are using client SDKs, errors manifest as SDK exceptions
rather than HTTP network responses.

Network Errors (unavailable): Handled gracefully. Firebase SDK
automatically queues writes and retries when the mobile device regains
connectivity. The UI shows an "Offline: Syncing later" badge.

Permission Errors (permission-denied): Triggers an immediate silent
logout if the user's role was revoked, or shows a toast error "You do
not have permission to perform this action" if an officer attempts an
admin action.

Validation Errors (invalid-argument): Caught before the API call using
local frontend validation (e.g., Yup/Zod schemas), ensuring bad data
never costs a network request.

---

## Section 10 — Firestore Security Rules

As a Principal Software Architect, designing Firestore Security Rules
is critical because, in our serverless architecture, Firestore is
directly exposed to the client applications (Expo React Native and React
Dashboard). The Security Rules act as our primary backend authorization
and validation layer.

Since you requested no code, I will explain the complete logical
architecture, conditions, and validation requirements for the Firestore
Security Rules in plain English.

1. Authorization Strategy & Role Management

Before defining the rules for specific collections, we must establish
how the system determines who is making the request.

Authentication Check: Every single write operation (and most read
operations) requires the user to be signed in. We verify that a valid
Authentication UID exists on the incoming request.

Role-Based Access Control (RBAC): We store user roles (citizen, officer,
admin) in the users collection.

Logical Helper Functions: In our rules architecture, we conceptually
define helper checks that perform the following:

Is Owner: Checks if the UID of the user making the request matches the
reporter_id or uid field on the document.

Is Officer: Looks up the user's document in the users collection and
verifies the role field equals officer.

Is Admin: Looks up the user's document in the users collection and
verifies the role field equals admin.

2. Collection-Level Security Rules

A. users Collection

This collection stores profile data and role assignments.

Citizen Rules:

Read: A citizen can only read their own user document. They cannot list
or view other users.

Create: A citizen can create their own document upon registration.

Update: A citizen can only update specific fields (like name or phone).
They are strictly prohibited from updating the role field.

Officer Rules:

Read: An officer can read their own profile, and they can read basic
citizen profiles (to see who reported a pothole).

Update: They can update their own profile data, but cannot change their
own role.

Admin Rules:

Read / Write / Delete: Admins have full access to read, create, modify,
or delete any user document. This is how admins promote a citizen to an
officer.

B. potholes Collection

This is the core collection storing the consolidated pothole data.

Citizen Rules:

Read: Citizens can read all potholes (so they can see them on the map
and check if one is already reported).

Create: Citizens can create a new pothole record if they are the first
to report it.

Update: Citizens can append a "confirmation" (e.g., adding their UID to
a confirmed_by array) to an existing pothole. They cannot change the
status, assignees, or delete the pothole.

Officer Rules:

Read: Officers can read all potholes.

Update: Officers can update the status (e.g., moving it from pending to
assigned to repaired), update the assigned_to field, and add
repair_notes. They cannot modify the original GPS coordinates.

Admin Rules:

Read / Write / Delete: Admins have full access to manage all aspects of
the pothole records, including soft or hard deletions of false
positives.

C. reports Collection

This collection stores individual raw accelerometer data and manual
reports (which eventually roll up into the potholes collection).

Citizen Rules:

Read: Citizens can only read reports where their UID matches the
reporter_id (so they can view their "My Reports" screen).

Create: Citizens can create new reports.

Update / Delete: Citizens cannot update or delete reports once submitted
(maintains audit trail integrity).

Officer & Admin Rules:

Read: Can read all reports to analyze data and determine severity.

Create / Update / Delete: Officers can only update the
verification_status of a report. Admins have full access.

D. wards Collection

Stores geographic boundaries and metadata for city wards.

Citizen & Officer Rules:

Read: Allowed to read all ward data to render map filters.

Write: Strictly denied.

Admin Rules:

Read / Write / Delete: Admins can manage ward data.

3. Data Validation Rules

Security rules are not just for access control; they enforce schema
integrity. Whenever a document is created or updated, the rules must
enforce the following checks:

Mandatory Fields: Ensure that fields like latitude, longitude,
timestamp, and reporter_id exist on every new pothole or report.

Data Type Validation:

latitude must be a floating-point number between -90 and 90.

longitude must be a floating-point number between -180 and 180.

confidence_score must be a number between 0 and 100.

timestamp must exactly match the server's request time (prevents clients
from spoofing historical data).

Allowed Values (Enums):

status must only ever be one of: pending, assigned, repaired, rejected.

severity must only ever be one of: low, medium, high.

Immutable Fields:

Once a pothole is created, fields like created_at, reporter_id, and
original_coordinates cannot be changed by anyone (except Admins).

Payload Size Limitation: Prevent users from submitting massive arrays of
data (e.g., capping the sensor_data array to a maximum of 100 data
points to prevent database bloat).

4. Storage Security Rules (Firebase Storage)

For the photos uploaded via manual reporting, we must secure Firebase
Storage.

Upload (Write) Rules:

Only authenticated users can upload files.

The file path must be structured as potholes/{userId}/{fileName} to
ensure users can only write to their own designated folder.

Content Validation: The uploaded file must have an image content type
(e.g., image/jpeg or image/png).

Size Limit: The file size must be strictly less than 5 Megabytes to
prevent storage abuse and control costs.

Download (Read) Rules:

Any authenticated user (Citizen, Officer, Admin) can read the images to
render them on the GIS map and dashboard.

5. Rate Limiting (Anti-Spam Strategy)

Native Firestore rules do not have a built-in "requests per minute"
counter, but we can implement logical rate limiting using timestamp
validation to prevent spam (e.g., a user holding down a button or a
script flooding the database).

Timestamp Enforcement: When a citizen submits a new report, we enforce
that the created_at field matches the server timestamp.

Time-Window Throttling (Conceptual): To prevent a single user from
spamming 100 reports a minute, the application layer should enforce a
cooldown. However, from a strict security rule perspective, we can
enforce that a user can only write to a specific document ID that
includes a truncated timestamp (e.g., down to the minute). If they try
to write twice in the same minute, it overwrites the same document
rather than creating a new one.

Note for MVP: For a 30-hour hackathon, complex rate-limiting in Rules is
often overkill. We rely on the Authentication requirement (which traces
abuse to a specific email/phone) and client-side debouncing. If an
attack occurs, Admins can instantly disable the offending UID.

6. Best Practices Implemented

Deny by Default: The absolute first rule evaluated is a global block.
Unless a specific collection explicitly grants read or write access, the
request is denied.

Principle of Least Privilege: Citizens can only read their own profile
and reports. Officers can only update the specific status fields of a
pothole, not the geographical data.

No Unbounded Queries: To protect read quotas, rules ensure that users
cannot download the entire database. Queries must be filtered (e.g., an
officer querying where("ward", "==", "Ward 4")).

Role Caching Limitations: Because we check the users collection to
verify an Officer or Admin role, this incurs an extra database read. For
the MVP, this is perfectly acceptable and highly secure. (In a massive
enterprise system, we would migrate this to Firebase Custom Auth Claims
to save database reads, but reading the document is the safest, most
transparent approach for a rapid pilot).

---

## Section 11 — State Management Architecture

Here is the comprehensive State Management Architecture for the
Pothole Detection MVP.

As a Principal Architect, my philosophy for a 30-hour hackathon is to
strictly separate Server State from Client State and lean heavily on the
built-in capabilities of our chosen tools (Firebase and React Query)
rather than reinventing the wheel with complex Redux stores.

1. State Classification: Where Every State Belongs

To prevent "state soup," we must categorize state into three distinct
buckets. Knowing where data belongs is the key to a scalable, bug-free
application.

A. Server State (The Source of Truth)

What it is: Data that lives on the server and is mirrored on the client.
It is asynchronous, subject to network latency, and can be modified by
other users.

Examples: Pothole reports, user profiles, ward statistics, repair
statuses.

Where it belongs: Managed by React Query (for one-time fetches) and
Firestore real-time listeners (for live data), backed by the Firestore
local cache.

B. Global Client State (App-Wide Context)

What it is: Synchronous data that dictates the overall behavior or
identity of the application across multiple screens, but does not
persist to the database.

Examples: Authenticated User Session (UID, Role), Theme (Light/Dark
mode), Accelerometer Background Tracking Status (Active/Inactive).

Where it belongs: React Context (for Auth) and a lightweight state
manager like Zustand (for tracking status and UI themes).

C. Local Client State (Component Level)

What it is: Ephemeral data isolated to a single screen or component. If
the user navigates away and back, it is acceptable (or desired) for this
data to reset.

Examples: Form inputs (description text, selected photo), modal
open/close states, active dashboard filters (e.g., currently selected
ward), map zoom level and bounding box.

Where it belongs: React's built-in useState and useReducer.

2. Global State Management

Global state will be kept as thin as possible.

Auth State (React Context): A single AuthProvider sits at the root of
both the Mobile App and the Dashboard. It listens to
Firebase.auth().onAuthStateChanged. It provides the user object and
their role (fetched from the Firestore users collection) to the rest of
the app.

Hardware State (Zustand - Mobile Only): We need to know if the
Accelerometer is currently actively monitoring, as this affects the UI
across multiple screens (Home screen status, notification bar). Zustand
provides a simple, hook-based store without the boilerplate of Redux.

3. Local State Management

Local state handles immediate user interactions.

Forms (React Hook Form): For the manual reporting screen and the officer
login. It handles local validation state, dirty fields, and submission
loading states without causing unnecessary re-renders.

UI Toggles (useState): Used for opening the "Assign Officer" modal,
toggling sidebars, or expanding pothole details.

Map Viewport (useState): Stores the current lat, lng, and zoom of the
Leaflet map on the dashboard, allowing the app to fetch only the
potholes within the visible bounding box.

4. Server State & React Query

While Firestore provides a robust SDK, React Query will be utilized to
wrap our Firestore calls.

Why React Query? Firestore's SDK is great for data fetching, but it
lacks built-in UI state variables like isLoading, isFetching, isError,
and background refetching logic.

Implementation:

We wrap getDocs() (Firestore one-time reads) inside useQuery.

We wrap addDoc() and updateDoc() inside useMutation.

Use Cases: Fetching historical data, fetching aggregated analytics for
the charts, and querying paginated lists of repaired potholes where
real-time updates are unnecessary and would waste database reads.

5. Realtime Updates

Not all data needs React Query. For features that require instant
synchronization, we bypass React Query and use Firestore's native
realtime streams.

The Dashboard GIS Map: When a citizen hits a pothole, the officer needs
to see the red marker pop up on the map instantly. We use onSnapshot()
tied to a useEffect to maintain an active WebSocket connection to the
potholes collection (filtered by status == 'pending').

Synchronization: As documents are added, modified, or removed from the
Firestore collection, the onSnapshot callback fires, updating a local
React state array that drives the map markers.

6. Caching Strategy

We will utilize a two-tiered caching strategy to minimize Firestore
reads (saving money) and maximize performance.

Tier 1: Firestore Offline Persistence (Disk Cache): Enabled on both
mobile and web. Firestore keeps a local SQLite (mobile) or IndexedDB
(web) copy of recently accessed data.

Tier 2: React Query Cache (Memory Cache): When a user navigates from
"Dashboard" to "Analytics" and back, React Query serves the data from
RAM instantly while silently validating it in the background
(Stale-While-Revalidate pattern).

7. Offline Support (Crucial for MVP)

Potholes often exist in areas with poor cellular reception. The citizen
app must function seamlessly offline.

Firestore Queuing: Because we enabled Firestore Offline Persistence, if
a citizen manually reports a pothole or the accelerometer detects one
while offline, the app simply writes it to the local Firestore cache.

Automatic Synchronization: The UI reacts as if the report succeeded.
Once the device regains internet access, Firestore's background sync
engine automatically pushes the queued mutations to the cloud.

Media Handling: Photos taken offline are saved to the local device file
system URI. We store this URI in local state. A background task (or an
app-resume listener) checks for pending uploads, pushes the image to
Firebase Storage, gets the download URL, and then updates the Firestore
document.

8. Optimistic Updates

Optimistic updates make the app feel blazingly fast by predicting a
successful server response.

Dashboard Workflow: When an officer clicks "Mark Repaired" on a pothole,
they should not have to wait for a network spinner.

Execution:

Using React Query's onMutate callback, we instantly modify the local
cache to change the pothole's status to 'repaired' and remove it from
the 'pending' map layer.

The UI updates in 10 milliseconds.

The mutation is sent to Firestore in the background.

If the request succeeds, we do nothing (the UI is already correct).

Native Firestore Optimism: For real-time listeners (onSnapshot),
Firestore automatically triggers local events with hasPendingWrites:
true before the server responds, providing optimistic UI out-of-the-box.

9. Error Recovery

A robust system must handle failures gracefully, especially in a
distributed mobile environment.

Mutation Rollbacks: If an optimistic update fails (e.g., the officer
loses connection and the Firebase security rules reject the request),
React Query's onError callback fires. We automatically roll back the
local cache to its previous state and show a Toast notification ("Failed
to update status. Please try again.").

Query Retries: If a network request drops during a fetch, React Query is
configured to automatically retry 3 times with exponential backoff
before throwing an error to the UI.

Error Boundaries: We wrap major components (Map View, Analytics View,
Report Form) in React Error Boundaries. If a state corruption causes a
crash, the Error Boundary catches it and displays a localized fallback
UI (e.g., "Could not load map data") rather than white-screening the
entire application.

Dead-Letter Sync: For the accelerometer, if a batch upload completely
fails after multiple retries, it is flagged in local storage as a
"failed_sync". The app will attempt to re-upload these orphaned records
on the next app launch.

---

## Section 12 — Implementation Roadmap

Here is the Complete Implementation Roadmap designed specifically for
a 30-hour hackathon timeline, ensuring the MVP is prioritized and
delivered successfully.

Executive Summary

This roadmap is optimized for a single developer working alongside a
non-technical team within a strict 30-hour hackathon window. It
prioritizes the core value proposition (accelerometer detection,
crowdsourced reporting, and GIS visualization) while deferring
"nice-to-have" features (advanced analytics, complex routing) to
post-hackathon phases.

The strategy follows a Data Flow Implementation Order: Infrastructure →
Data Ingestion (Mobile App) → Data Processing (Detection Logic) → Data
Visualization (Dashboard) → Refinement.

Phase 1: Project Setup & Core Infrastructure (Hours 1 - 3)

Goal: Establish the foundation, environments, and basic routing.

Priority: Critical MVP

Dependencies: None

Module 1.1: Firebase Initialization (1 hour)

Create Firebase Project.

Enable Authentication (Email/Password), Firestore, and Storage.

Register Web (Dashboard) and Mobile (Expo) apps.

Module 1.2: Repository & Boilerplate (1 hour)

Initialize Expo (React Native) project with NativeWind (Tailwind).

Initialize React Web (Vite) project with Tailwind CSS.

Setup folder structures and install core dependencies (React Navigation,
React Router, Firebase SDK).

Module 1.3: Navigation & Routing (1 hour)

Set up basic screen routing in the Mobile App (Splash, Login, Home,
Report).

Set up basic routing in the Web Dashboard (Login, Map View, List View).

Potential Blockers: Environment configuration issues, package version
conflicts.

Phase 2: Authentication & Database Schema (Hours 3 - 6)

Goal: Secure the app and establish the data layer.

Priority: Critical MVP

Dependencies: Phase 1

Module 2.1: Authentication Flow (1.5 hours)

Build Login/Signup UI for Mobile (Citizen).

Build Login UI for Web (Officer/Admin).

Implement Firebase Auth context and session persistence.

Module 2.2: Firestore Schema & Role Management (0.5 hours)

Create users collection.

Implement logic to fetch user roles upon login and direct them to the
appropriate dashboard/screens.

Module 2.3: Security Rules (1 hour)

Write and deploy basic Firestore security rules (Citizens can read/write
own reports; Officers can read all, update status).

Potential Blockers: Logic errors in role-based routing; overly
restrictive security rules blocking early testing.

Phase 3: Citizen Mobile App - Data Ingestion (Hours 6 - 12)

Goal: Allow citizens to manually report potholes with location and
images.

Priority: Critical MVP

Dependencies: Phase 2 (Auth/Firestore)

Module 3.1: GPS & Camera Integration (2 hours)

Request location permissions and capture current coordinates.

Integrate Expo Camera/ImagePicker for taking photos of potholes.

Module 3.2: Manual Reporting Form (2 hours)

Build the report submission form (Location, Photo, Optional
Description).

Implement image upload to Firebase Storage and retrieve the download
URL.

Module 3.3: Firestore Integration (1 hour)

Save the complete report document (Coordinates, Image URL, Timestamp,
Reporter ID, Status: pending) to the potholes collection.

Module 3.4: Citizen Home Screen (1 hour)

Display a simple feed or map of the user's previously submitted reports.

Potential Blockers: Handling device permissions (Location/Camera) across
iOS/Android; Image upload latency on poor connections.

Phase 4: Accelerometer Detection Engine (Hours 12 - 17)

Goal: Implement the automated pothole detection algorithm on the mobile
device.

Priority: Critical MVP (The core innovation for the judges)

Dependencies: Phase 3.1 (GPS)

Module 4.1: Sensor Reading & Background Logic (2 hours)

Integrate Expo Sensors (Accelerometer).

Set up a toggle on the Home Screen to start/stop the "Drive Mode"
(detection listener).

Module 4.2: Threshold Algorithm (2 hours)

Implement the Z-axis spike detection logic (e.g., detecting
acceleration > 2.5G).

Implement a 2-3 second cooldown to prevent capturing the same pothole
multiple times instantly.

Module 4.3: Auto-Report Generation (1 hour)

When a spike is detected, instantly grab the current GPS coordinates.

Format as an auto-detected report (Confidence: Low/Medium, Type: Auto)
and push to Firestore silently.

Potential Blockers: Tuning the threshold (too sensitive = false
positives; too low = missed potholes); Background execution limits on
mobile OS.

Phase 5: Officer Web Dashboard (Hours 17 - 24)

Goal: Visualize the data and enable government workflows.

Priority: Critical MVP

Dependencies: Phase 3 & 4 (Needs data in Firestore to visualize)

Module 5.1: Layout & State Setup (1 hour)

Build the persistent Sidebar and Topbar.

Set up React Query to fetch data from the potholes collection in
real-time.

Module 5.2: GIS Leaflet Map (3 hours)

Integrate React-Leaflet.

Plot markers on the map based on the coordinates from Firestore.

Color-code markers (Red = Pending, Yellow = Assigned, Green = Repaired).

Module 5.3: Data Table & Filtering (2 hours)

Build the list view of all reports.

Add basic filters (Status, Date, Ward/Zone if easily derivable).

Module 5.4: Workflow & Status Updates (1 hour)

Build the Pothole Details modal (shows image, coordinates, reporter
type).

Add buttons to update the status in Firestore (e.g., Mark as "Assigned"
or "Repaired").

Potential Blockers: Leaflet map rendering issues; React Query caching
conflicts with real-time Firestore listeners.

Phase 6: Integration, Testing & Refinement (Hours 24 - 28)

Goal: Ensure the system works end-to-end and fix glaring bugs.

Priority: High (Crucial for a smooth demo)

Dependencies: All previous phases

Module 6.1: End-to-End Walkthrough (1.5 hours)

Create a test citizen account and a test officer account.

Submit a manual report on the phone → Verify it appears on the web map
instantly.

Trigger an accelerometer spike (shake phone) → Verify it plots on the
web map.

Update status on web → Verify citizen app reflects the change.

Module 6.2: Algorithm Tuning (1 hour)

Take the mobile app in a car/bike (if possible) or simulate real
movement to adjust the accelerometer thresholds to a realistic level.

Module 6.3: UI/UX Polish (1.5 hours)

Add loading spinners.

Implement empty states (e.g., "No potholes reported yet").

Ensure error toasts are visible if network fails.

Potential Blockers: UI inconsistencies; edge cases crashing the app
(e.g., denying location permissions).

Phase 7: Deployment & Presentation Prep (Hours 28 - 30)

Goal: Host the app and prepare the pitch.

Priority: Critical

Dependencies: Phase 6

Module 7.1: Web Deployment (1 hour)

Build the Vite web dashboard (npm run build).

Deploy to Firebase Hosting or Vercel.

Module 7.2: Mobile App Packaging (0.5 hours)

Use Expo Go for the live demo (fastest, no app store compilation
needed).

Ensure the team has Expo Go installed on their phones to show the
judges.

Module 7.3: Demo Script Rehearsal (0.5 hours)

Run through the exact sequence that will be shown to the judges (Login →
Drive Mode → Shake Phone → Web Map updates → Mark Repaired).

Implementation Strategy & Priority Matrix

Feature Type Priority Implementation Strategy

Auth Infrastructure P0 (Must Have) Use Email/Password. Hardcode admin
roles in Firestore directly to save time.

Manual Report Mobile App P0 (Must Have) Keep form simple. Location must
auto-fill.

Auto Detection Mobile App P0 (Must Have) Use basic magnitude calculation
sqrt(x^2 + y^2 + z^2). Tune threshold manually.

GIS Map Web Dashboard P0 (Must Have) Use Leaflet. Don't build custom map
tiles, use standard OSM tiles.

Status Workflow Web Dashboard P0 (Must Have) Simple dropdown to change
status.

Duplicate Detection Cloud / Logic P1 (Should Have) Implement a simple
radius check (e.g., 50 meters) on the client side before submission.

Ward Filtering Web Dashboard P1 (Should Have) If reverse-geocoding takes
too much time, filter by simple bounding boxes or drop it.

Analytics Charts Web Dashboard P2 (Nice to Have) Only build if ahead of
schedule. Use simple aggregations (Total, Repaired).

Push Notifications System P3 (Out of Scope) Skip for MVP. Too complex to
configure APNs/FCM keys within 30 hours. Rely on real-time UI updates.

Risk Mitigation for the 30-Hour Window

The AI Trap: Do not spend 5 hours trying to train an ML model for
detection. Stick to the deterministic accelerometer threshold logic.

The "Pretty" Trap: Use component libraries (NativeWind, shadcn/ui)
heavily. Do not spend time writing custom CSS animations.

The Deployment Trap: Do not attempt to build standalone .apk or .ipa
files during the hackathon. They take too long and frequently fail. Rely
entirely on Expo Go for the mobile demonstration.

---

## Section 13 — Testing Strategy

Here is the comprehensive Testing Strategy for the GVMC Pothole
Detection and Automated Citizen Reporting MVP.

As a Principal Software Architect, my approach for a 30-hour hackathon
focuses heavily on Risk Mitigation, Real-World Physical Testing, and
Demo Reliability. We will employ a lean testing strategy that guarantees
the core "Happy Path" works flawlessly while handling the most common
edge cases.

1. Unit Testing (Targeted & Lean)

In a time-constrained MVP, we do not aim for 100% test coverage.
Instead, we unit test only the complex, pure-logic functions where
manual testing is too slow or error-prone.

Accelerometer Algorithm: Test the threshold logic, noise filtering
(e.g., ignoring continuous vibration), and peak detection. Feed the
function mock arrays of accelerometer data (X, Y, Z axes) representing a
smooth road, a speed bump, and a pothole, and assert the correct
classification.

Confidence Scoring: Test the mathematical function that combines GPS
accuracy, vibration intensity, and duplicate detection to generate a
confidence score (0-100%).

Data Parsing: Ensure timestamp formatting and coordinate rounding
functions work flawlessly to prevent GIS plotting errors.

2. Integration Testing

Integration testing ensures that our independent modules (Mobile App,
Dashboard, Firebase) communicate correctly.

Auth Flow Integration: Verify that a successfully authenticated user
receives the correct Firestore custom claims (Citizen vs. Officer) and
is routed to the appropriate screens.

Database Writes (Mobile -> Firestore): Verify that when the mobile app
triggers a report, a document is successfully created in the potholes
collection with the correct schema and timestamp.

Database Reads (Firestore -> Dashboard): Verify that the React dashboard
successfully subscribes to Firestore snapshots and updates the UI state
in real-time without requiring a page refresh.

Rule Validation: Test Firestore Security Rules using the Firebase
Emulator to ensure a Citizen cannot delete a report and an Officer
cannot modify Admin settings.

3. Manual Testing (The Core Hackathon Strategy)

Since this project relies on physical hardware (accelerometer, GPS) and
real-world conditions, manual testing is our primary validation tool.

Physical Drive Testing: A team member must physically ride a two-wheeler
or drive a car over known rough patches and smooth roads with the app
running in the foreground and background to tune the detection
thresholds.

UI/UX Walkthrough: Click through every button, form, and map marker on
both the mobile app and web dashboard to ensure no dead taps or
unhandled screen transitions.

Cross-Device Testing: Test the Expo app on at least one Android device
and one iOS device (if available) to ensure sensor APIs behave
consistently across operating systems.

4. User Acceptance Testing (UAT) / Pilot Phase

UAT validates that the system actually solves GVMC's problem in a way
they can operate.

Simulated GVMC Workflow: One team member acts as the "Citizen" reporting
potholes (automated and manual). Another acts as the "GVMC Roads &
Buildings Officer" monitoring the dashboard.

Acceptance Criteria:

Citizen can successfully log a pothole without typing.

Officer sees the pothole appear on the GIS map in under 3 seconds.

Officer changes status to "Assigned", and the Citizen's app reflects
this change immediately.

Ward-Level Constraint: Limit UAT to a single defined pilot ward (as per
the problem statement) to prove geographic filtering works.

5. Performance Testing

Battery & CPU Monitoring: Continuous accelerometer and GPS reading is
resource-intensive. We must monitor the mobile device's battery drain
and device temperature during a 30-minute drive test to ensure the app
doesn't crash from memory leaks or thermal throttling.

Map Rendering: The Leaflet GIS map must smoothly render up to 500
simultaneous markers in the pilot ward. We will inject 500 dummy pothole
records into Firestore to verify the browser does not freeze when
rendering or clustering the markers.

Firestore Quota Monitoring: Ensure our real-time listeners are attached
efficiently (e.g., using limit() and bounding box queries) so we do not
exceed the Firebase free tier read quotas during the pilot.

6. Edge Cases

We must intentionally test boundary conditions that could corrupt our
data or crash the system:

The "Dropped Phone" Scenario: A phone dropped on the floor creates a
massive acceleration spike. The algorithm must correlate the spike with
GPS speed (if speed is 0 km/h, it is not a pothole).

The "Speed Bump" Scenario: Speed bumps create a different wave pattern
(up then down) compared to potholes (down then up/jarring impact). We
must test over speed bumps to ensure they are filtered out as false
positives.

Duplicate Reporting: Two citizens on a bus go over the same pothole. The
system must recognize that two reports within 5 meters and 5 seconds of
each other are the same pothole, merging them and increasing the
confidence score rather than creating two map markers.

7. Failure Scenarios (Resilience)

How does the system behave when things go wrong?

Loss of Cellular Network: If a pothole is detected in a dead zone, the
app must cache the payload in local storage and push it to Firestore
automatically once internet connectivity is restored.

GPS Denied/Unavailable: If the user revokes location permissions, the
background accelerometer service must gracefully pause and prompt the
user via local notification, rather than crashing in a continuous loop.

Background Task Killed: Mobile OSs aggressively kill background tasks to
save battery. We must test if the Expo background task can automatically
restart or if it requires the user to occasionally open the app.

8. Bug Tracking (Hackathon Lean Approach)

In a 30-hour window, Jira is too heavy. We will use a simple Kanban
board (GitHub Projects or Trello).

Triage System:

P0 (Blocker): App crashes, authentication fails, real-time sync broken.
(Drop everything and fix).

P1 (High): False positives in detection, map markers not clickable. (Fix
before demo).

P2 (Low): Minor UI alignment issues, missing loading spinners. (Defer
until core is stable).

Rule: No new features are started until all P0 and P1 bugs are cleared.

9. Demo Checklist (The "Pitch-Ready" Protocol)

Live demos with hardware sensors and GPS fail often indoors. This
checklist ensures a flawless presentation to the judges.

Pre-Demo Environment Clear: Purge all messy test data from Firestore.
Seed the database with 3-5 realistic, high-quality historical pothole
records in the pilot ward.

The "Shake Test": Ensure we have a specifically tuned "Demo Mode" toggle
in the app that lowers the accelerometer threshold, allowing us to
physically shake the phone in front of the judges to simulate a pothole
and instantly show it on the dashboard.

The Backup Video: Record a high-quality 2-minute video of the actual
physical drive test showing the phone in a car mount detecting a
pothole, split-screened with the dashboard updating in real-time. If the
venue has bad WiFi or GPS signal, we play the video instead of risking a
live hardware failure.

Tab Setup: Have the Citizen App (mirrored to a screen), the Officer
Dashboard, and the Firebase Console open in three separate, pre-loaded
tabs.

Roleplay Script: Prepare a tight 3-minute script where Team Member A is
the Citizen (mobile) and Team Member B is the GVMC Officer (dashboard),
demonstrating the exact User Stories requested in the brief.

---
