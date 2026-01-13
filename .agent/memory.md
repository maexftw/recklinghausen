# Global Learning: Wrangler Deployment

## Problem: API Token & Authentication
Initial attempts to deploy via Wrangler often fail when relying on `wrangler login` or direct passing of `CLOUDFLARE_API_TOKEN` in restricted or complex environments. This can lead to authentication loops or "could not determine executable" errors.

## Solution: Direct Project Deployment
The most reliable way to deploy a static project to Cloudflare Pages in this environment is:

```powershell
npx wrangler pages deploy . --project-name=rlc-1952
```

### Why this works:
1. **Context Awareness**: `npx` ensures the latest version of Wrangler is used without a global install.
2. **Project Specification**: Explicitly providing `--project-name` avoids interactive prompts that can hang the agent.
3. **Session Reuse**: Wrangler manages local sessions in the `.wrangler` directory, which is more robust than re-authenticating with every command.

## Strategic Advice (Barkley/Huberman Style)
- ** Barkley Principle**: Minimize "friction points" in the workflow. Relying on complex token handshakes in a restricted environment increases the cognitive load and potential for failure.
- **Huberman Insight**: Automating the deployment path reduces the "dopamine cost" of repetitive debugging, allowing focus on high-value creative and technical work.
