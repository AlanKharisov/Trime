# Trime

A fast, responsive agency website built to present digital product, design, and engineering services clearly.

[Live website](https://trime.org)

## Overview

This repository contains the production website for Trime, a four-person digital agency. The site turns the agency's services, team, and contact paths into a focused marketing experience that is statically generated and deployed through GitHub Pages.

## Highlights

- Responsive marketing pages for services, work, team, and contact.
- Static generation for predictable performance and low hosting overhead.
- Reusable layout, section, UI, and animation components.
- Motion and count-up interactions built with Framer Motion.
- Client-side language switching.
- Custom 404 handling and trailing-slash routing for static hosting.
- Automated deployment to GitHub Pages from `main`.

## Technology

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form and Zod
- GitHub Actions and GitHub Pages

## Architecture

```text
frontend/
├── app/
│   ├── (marketing)/       # Page routes
│   ├── layout.tsx         # Global metadata and document shell
│   └── globals.css
├── components/
│   ├── animations/        # Reusable motion primitives
│   ├── layout/            # Navigation, footer, language controls
│   ├── sections/          # Marketing page sections
│   └── ui/
├── lib/                   # Constants, utilities, and image loading
└── public/                # Images and static assets
```

Next.js exports the application as static files. GitHub Actions uploads `frontend/out` and publishes it to the `github-pages` environment.

## Run locally

### Prerequisites

- Node.js 20
- npm

```bash
git clone https://github.com/AlanKharisov/Trime.git
cd Trime

npm ci --prefix frontend
npm run dev --prefix frontend
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build --prefix frontend
```

The static export is written to `frontend/out/`.

## Environment variables

The current site does not require a committed `.env` file. If future integrations need credentials, add an `.env.example` containing names and placeholders only, and store real values in GitHub Actions secrets or the deployment platform.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`:

1. install the locked frontend dependencies;
2. create the static Next.js export;
3. upload the Pages artifact;
4. deploy it to [trime.org](https://trime.org).

The live site returned HTTP 200 during the latest repository audit.

## Demo

- Production: [trime.org](https://trime.org)
- Recommended repository captures: desktop hero, services/work section, and mobile navigation.

Only real screenshots from the production site should be added to this README.

## Status

Live and actively maintained. The production build completes successfully. The current dependency audit reports high-severity advisories that should be handled in a separate, tested dependency-upgrade task.

## My contribution

I authored and maintain the implementation in this repository, including the Next.js structure, responsive sections, animation system, static-export configuration, and GitHub Pages delivery. Trime is presented as a team service; this section describes my engineering contribution to its website.

## License

Proprietary — © Trime Agency.
