# Walkthrough: Paperclip Migration to dev

We have successfully migrated the Paperclip AI Orchestrator application and its database from `hostvps` to `dev` (GCP dev server).

## Changes Made

### 1. Database Migration
- Dumped the 90MB local database on `hostvps` (`paperclip-postgres` container) to `/tmp/paperclip_dump.sql`.
- Copied the SQL dump to the GCP dev server `dev` (`34.23.56.47`).
- Created the logical database `paperclip` inside the shared Postgres container on `dev` (`postgres-bypass-open-source-bandwidth-uorgkl`).
- Restored the dump. Verified that all 80 tables and 109 agent records were successfully imported.

### 2. Dokploy Application Configuration
- Registered `paperclip` in the local Dokploy Postgres database:
  - **`applicationId`**: `3j3MtpDv5ZaEXivfMQ5GP`
  - **`appName`**: `app-paperclip-server`
  - **`serverId`**: `dv4DxpGl5ht_NH9bGZhpD` (remote GCP dev VM)
  - **`buildType`**: `dockerfile` (using Dockerfile in root of repository)
- Configured environment variables mapping database, public URL, and secrets.
- Created volume mount mapping `/paperclip` inside the container to `paperclip-data` volume.
- Created domain configuration for `ppc.felani.am`.
- Deployed the application to the remote server.

### 3. Traefik Routing Configuration
- Stopped and disabled the local systemd service `paperclip.service` on `hostvps`.
- Removed the hostvps-side Traefik configuration file `/etc/dokploy/traefik/dynamic/paperclip-native.yml`.
- Wrote `/etc/dokploy/traefik/dynamic/app-paperclip-server.yml` on `dev` to define routing of `ppc.felani.am` (HTTPS entrypoint) to `app-paperclip-server:3100`.

---

## Validation & Verification

- Verified the remote Docker Swarm service is `Running` on `dev` with 1/1 replicas:
  ```bash
  docker service ps app-paperclip-server
  ```
- Checked service logs and verified that the Paperclip startup banner and initialization completed successfully:
  ```log
  Mode             external-postgres  |  static-ui
  Deploy           authenticated (private)
  Bind             lan (0.0.0.0)
  Auth             ready
  Server           3100
  API              http://localhost:3100/api
  Database         postgres://postgres:***@postgres-bypass-open-source-bandwidth-uorgkl:5432/paperclip
  Server listening on 0.0.0.0:3100
  ```
- Tested internal routing from the `dev` server host:
  ```bash
  curl -ik -H 'Host: ppc.felani.am' https://localhost/api/health
  ```
  **Response:**
  ```json
  HTTP/2 200
  content-type: application/json; charset=utf-8
  {"status":"ok","deploymentMode":"authenticated","bootstrapStatus":"ready","bootstrapInviteActive":false}
  ```

---

## Required Manual Action

> [!NOTE]
> **DNS A Record Update & Let's Encrypt Verification:**
> - The A record for `ppc.felani.am` has been successfully updated on **Porkbun** to point to the new dev IP **`34.23.56.47`**.
> - The Let's Encrypt HTTP challenge succeeded. The secure URL **`https://ppc.felani.am/api/health`** is now fully active, resolving over TLS with a valid certificate, and returns `HTTP/2 200`.
