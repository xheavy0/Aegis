# Aegis GRC Platform

Single-server deployment for a local VM or an on-prem web server.

## Current Work Mode

- Main UI entry point: `aegis.html`
- Login is connected to the backend API in `aegis.html` with `AUTH_BYPASS=false`
- VM deployment scripts live in `deploy/`
- AWS/EC2-specific deployment files have been removed

## VM Deployment

On a fresh Ubuntu/Debian VM, run:

```bash
sudo bash deploy/vm-setup.sh
```

For updates after the first setup:

```bash
bash deploy/deploy.sh
```

The app expects Docker Compose and serves the frontend through the configured web service.
