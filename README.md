# CIT Education

A 2023–2024 academic learning platform for courses, lectures, comments and blogs. Instructors can upload lecture videos and generate or edit subtitles. The interface was inspired by [F8](https://fullstack.edu.vn/).

This is a historical academic prototype. The 2026 maintenance pass updates configuration, access checks and repository hygiene. The application has not been validated end to end with its original runtime and external services.

## Architecture

- `client/`: React, TypeScript, Material UI and Tailwind CSS.
- `server/src/`: NestJS, TypeORM and PostgreSQL; accounts, courses, lessons, enrollments and blogs.
- `server/flask_server/`: Python media worker for speech recognition and subtitle rendering.

The browser calls NestJS; NestJS authorizes the user and sends validated jobs to the loopback Flask worker. A separate service token authenticates worker requests.

## Local configuration

Copy `server/.env.example` to `server/.env` and set a random `JWT_SECRET`, a different random `FLASK_SERVICE_TOKEN` (each at least 32 characters) and your database credentials. The worker reads that same local environment file. Copy `client/.env.example` to `client/.env` to configure the public API URL.

Dependencies are recorded in the existing manifests and lockfiles. For an intentionally empty local database only, set `DB_SYNCHRONIZE=true` to initialize the legacy TypeORM schema, then disable it. Schema synchronization is disabled by default.

Original development entry points:

```sh
# From server/ after configuring its dependencies and .env
npm run start:dev
# From the repository root, in a separate terminal
python3 server/flask_server/app.py
# From client/, in another terminal
npm start
```

The worker also needs FFmpeg and its historical Python requirements. `createsub.py` is now included as source; its legacy speech recognizer requires `GOOGLE_SPEECH_API_KEY`. External speech APIs and old audio dependencies have not been exercised during cleanup.

## Account and media behavior

Public registration supports student and instructor accounts; administrators must be provisioned separately. The user-list endpoint is restricted to administrators. Password hashes are excluded from normal reads and registration responses. Course and lesson mutations check ownership; subtitle edits resolve paths from the owned lesson rather than accepting client-selected files.

Uploads are limited and named by the server. New video uploads record their owner in private `server/storage/`; keep that directory when preserving a local instance. The historical demo still serves course media as static assets: use synthetic, non-sensitive material. Private paid-course delivery would require a separate authenticated media design.

## Screenshots

![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/1c6cf026-ff75-45cd-b805-3001e4238131)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/ef1ff1e8-1896-4593-a25c-22dfd525768b)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/71196de1-9963-49d7-89a2-27ba0b283266)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/897e9b15-58aa-49d3-bcc7-6a7a1d469a4f)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/c39a829f-860e-46e3-92b1-473f5111db4f)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/9bad6d94-9c1e-45b9-b385-fc3ec5937010)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/59ee0f21-7fe3-4fbe-963b-d10475df675f)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/420063b3-d91d-4ec1-9066-8a4d400c4125)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/7f374920-3fe2-4ab4-aae1-dbe7bc0e39f1)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/6f8e56d4-9f9e-4230-8958-863f2ce4622e)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/7669709b-d159-488e-a601-f872cc5b4688)
![image](https://github.com/toandokhanh/CIT-Education/assets/98395447/c9f746b9-ef7c-4e31-96fb-a70063c233ef)

## Project scope

This project demonstrates an academic full-stack workflow, not a deployed education service. No dependency installation, database migration, media processing or external API validation was performed in the maintenance pass. See [third-party notices](THIRD_PARTY_NOTICES.md).
