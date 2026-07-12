# Cloudflare Solutions Engineer - Technical Assignment

##Architecture Overview

The goal of this project is to provide a highly secure environment without compromising on user experience.
1. **Security at the Edge:** Cloudflare Zero Trust (Access) acts as the identity-aware front door.
2. **Origin Protection:** The DigitalOcean origin server is connected via **Cloudflare Tunnel** (`cloudflared/connector`), operating on an outbound-only connection. Zero inbound ports are open, rendering the server invisible to public internet scanning.
3. **Edge Compute (Origin Offload):** Cloudflare Workers intercept traffic directly at the Edge. Instead of routing back to the origin, the Worker dynamically generates content and fetches assets, significantly reducing origin load and response latency.

##Deliverables
- **Authentication & Identity:** 
  The `/secure` route requires IdP authentication. The Worker extracts identity headers (`Cf-Access-Authenticated-User-Email` and `Cf-Ipcountry`) to personalize the HTML response.
- **Routing & R2 Storage:** 
  Clicking the country link dynamically routes the user to `/secure/[COUNTRY_CODE]`. The Worker securely fetches the flag image from an **R2 Bucket**.

## Repository Structure
How to Test
1.Navigate to the secure portal: https://tunnel.nespray14.org/secure

2.Authenticate using your authorized email (OTP).

3.Observe the dynamically generated HTML showing the user identity and timestamp.

4.Click the Country Code link to retrieve the flag directly from R2 Storage.

```text
/
├── README.md              # Project documentation
├── server.py              # Lightweight DigitalOcean origin server
└── secure-worker/         # Cloudflare Worker directory
    ├── wrangler.jsonc     # Worker configuration and R2 bindings
    └── src/
        └── index.js       # Main Worker logic




