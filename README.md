# Tracker Backend

This is the backend to Tracker, a project that is similar to Google Maps TImeline but is Open Source!

This repository provides an endpoint/API for devices to send telemetry to. Received telemetry is then saved to a PostgreSQL database which can then be accessed by a Grafana frontend.

## vs Backup Tracker Backend

[Backup Tracker Backend](https://github.com/balloon-4/backup-tracker-backend) is the old backend. The new one:
 - supports uploading multiple pieces of telemetry at once
 - has new and more data fields
 - includes Prisma which can be used for data migrations
 - has no vendor lock in (whereas the old one used Cloudflare Workers)
 - removes the janky database over the internet

## General Use

This project is not ready for general usage. The current implementation has no auth of any kind, relying on middleware from a third party. The schema is immature. There should probably be error monitoring via Sentry or something similar.

## Development

### Prerequisites

- Node.js LTS version
- NPM

### Running

Install dependencies with:

```sh
npm i
```
To start the development server, run:

```sh
npm run start
```
Run unit tests with:

```sh
npm run test:unit
```
See other scripts in the package.json.

### Other Information

This repo has an [OpenAPI file](https://github.com/balloon-4/tracker-backend/blob/30d7227e010d1ac466f2ba4a36997cd336d2af23/api/openapi.json). The repository layout is taken from [ALEASAT](https://www.aleasat.space/).
