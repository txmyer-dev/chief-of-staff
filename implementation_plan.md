# Move Dokploy Paperclip Container from hostvps to dev

Migrate the Paperclip AI Orchestrator application and its Postgres database from the local `hostvps` server (`76.13.98.215`) to the remote `gcp-dev` server (`34.23.56.47`). The application will be managed as a containerized Dokploy application running on `dev`, connecting to the shared Postgres instance, and replacing the current host-level systemd service setup.

## User Review Required

> [!IMPORTANT]
> **Downtime and DNS Propagation:** 
> - Moving the container involves stopping the systemd service on `hostvps` and updating the DNS A record for `ppc.felani.am` to point to `34.23.56.47`.
> - There will be a short period of downtime for the Paperclip API/UI during migration and DNS propagation.
> - We will migrate the database tables and data first so that no state or history is lost.

## Open Questions

None at this time. The architecture on the GCP dev server is fully understood and aligns with the existing split stack layout.

## Proposed Changes

We will perform this migration through database migration, Dokploy configuration injection, and service routing updates.

---

### Database Migration

#### [MODIFY] `paperclip-postgres` database
We will extract the database schema and data from the local `paperclip-postgres` container on `hostvps` and restore it as a logical database named `paperclip` on the shared PostgreSQL instance on `dev` (`postgres-bypass-open-source-bandwidth-uorgkl`).

1. Dump local database:
   ```bash
   docker exec paperclip-postgres pg_dump -U paperclip -d paperclip > /tmp/paperclip_dump.sql
   ```
2. Copy SQL dump to `dev` GCP VM:
   ```bash
   scp -i /root/.ssh/id_ed25519_dokploy_gcp /tmp/paperclip_dump.sql root@34.23.56.47:/tmp/paperclip_dump.sql
   ```
3. Create the database `paperclip` inside the shared Postgres container on `dev`:
   ```bash
   ssh -o StrictHostKeyChecking=no -i /root/.ssh/id_ed25519_dokploy_gcp root@34.23.56.47 "PGPASSWORD=OperationsSecure123Pass docker exec -i postgres-bypass-open-source-bandwidth-uorgkl.1.vgmqzb476lmi7furin499y648 psql -U postgres -d postgres -c 'CREATE DATABASE paperclip;'"
   ```
4. Restore SQL dump:
   ```bash
   ssh -o StrictHostKeyChecking=no -i /root/.ssh/id_ed25519_dokploy_gcp root@34.23.56.47 "PGPASSWORD=OperationsSecure123Pass docker exec -i postgres-bypass-open-source-bandwidth-uorgkl.1.vgmqzb476lmi7furin499y648 psql -U postgres -d paperclip < /tmp/paperclip_dump.sql"
   ```

---

### Dokploy Application Configuration

We will inject `paperclip` into the local Dokploy database (which manages the GCP dev server `serverId: dv4DxpGl5ht_NH9bGZhpD`) so it runs as a containerized Docker Swarm service on `dev`.

#### [NEW] `paperclip` Application Record
Inject the application record into the `application` table:
- **`applicationId`**: `3j3MtpDv5ZaEXivfMQ5GP`
- **`name`**: `paperclip`
- **`appName`**: `app-paperclip-server`
- **`serverId`**: `dv4DxpGl5ht_NH9bGZhpD` (remote gcp-dev VM)
- **`repository`**: `paperclip`
- **`owner`**: `paperclipai`
- **`branch`**: `master`
- **`buildType`**: `dockerfile`
- **`dockerfile`**: `Dockerfile`
- **`env`**:
  ```env
  DATABASE_URL=postgres://postgres:OperationsSecure123Pass@postgres-bypass-open-source-bandwidth-uorgkl:5432/paperclip
  PORT=3100
  SERVE_UI=true
  PAPERCLIP_PUBLIC_URL=https://ppc.felani.am
  PAPERCLIP_AGENT_JWT_SECRET=a909a984b7038ceb227e815943457d29873778738f9d25a6f198772153571ea9
  ```

#### [NEW] `mount` Configuration
Configure the persistent volume mount for `/paperclip` storage by inserting into the `mount` table:
- **`mountId`**: `paperclip-volume-mount`
- **`type`**: `volume`
- **`volumeName`**: `paperclip-data`
- **`serviceType`**: `application`
- **`mountPath`**: `/paperclip`
- **`applicationId`**: `3j3MtpDv5ZaEXivfMQ5GP`

#### [NEW] `domain` Configuration
Configure the domain routing inside Traefik by inserting into the `domain` table:
- **`domainId`**: `paperclip-domain-routing`
- **`host`**: `ppc.felani.am`
- **`https`**: `true`
- **`port`**: `3100`
- **`path`**: `/`
- **`applicationId`**: `3j3MtpDv5ZaEXivfMQ5GP`
- **`certificateType`**: `letsencrypt`
- **`domainType`**: `application`

---

### Service Termination & DNS Update

#### [MODIFY] `paperclip` service status
1. Stop and disable `paperclip.service` on `hostvps` to release port `3100`:
   ```bash
   systemctl stop paperclip.service
   systemctl disable paperclip.service
   ```
2. Remove `/etc/dokploy/traefik/dynamic/paperclip-native.yml` dynamic routing config from hostvps:
   ```bash
   rm /etc/dokploy/traefik/dynamic/paperclip-native.yml
   ```

#### [MODIFY] DNS Record (Hostinger)
Update DNS record `ppc.felani.am` to point to the GCP dev server IP `34.23.56.47` (instead of `76.13.98.215`).
This will be completed by invoking the Hostinger API.

---

## Verification Plan

### Manual Verification
- Deploy Paperclip using Dokploy:
  ```bash
  /root/.gemini/skills/server-management/scripts/trigger_deploy.sh 3j3MtpDv5ZaEXivfMQ5GP
  ```
- Check build logs on `hostvps` at `/etc/dokploy/logs/3j3MtpDv5ZaEXivfMQ5GP/`.
- Verify the container is running on `dev` using `docker ps`.
- Verify that `https://ppc.felani.am` resolves and handles healthchecks successfully once DNS propagates.
