# Portfolio admin CMS

The admin lives at `/admin`. Local development trusts requests on `localhost` and
`127.0.0.1`. Production requests must pass through Cloudflare Access and include
both Access identity headers.

## Content workflow

- **Save draft** writes editable JSON to D1 without changing the live site.
- **Preview drafts** opens `/work?preview=1`; it requires the same admin identity.
- **Publish** copies the current draft into the published snapshot.
- **Restore to draft** copies a revision into the editable draft. It never publishes
  automatically.
- Media files are stored in R2. D1 only stores their metadata and object keys.
- A resume PDF can be uploaded from **Site settings**. Its R2 URL becomes the
  draft `resumeUrl`; publishing Site settings updates the header download button.
- **Projects** is dynamic. Creating a project creates both its Selected Work card
  and `/projects/:slug` case-study content. Projects can be reordered, archived,
  published or permanently deleted from the admin.
- **Pages** manages standalone content such as About. Case-study content is edited
  directly inside its owning project.

## First Cloudflare setup

1. Create `quyenlm-port-content` in D1 and put its `database_id` into the
   `CONTENT_DB` entry in `wrangler.jsonc`.
2. Create the R2 bucket `quyenlm-port-media`.
3. Run `pnpm exec wrangler d1 migrations apply quyenlm-port-content --remote`.
4. In Cloudflare Zero Trust, create an Access self-hosted application protecting
   `/admin*` and `/api/admin*`. Allow only the intended administrator identity.
5. Ensure the production Worker cannot be reached through an unprotected alternate
   hostname. In particular, disable or protect its `workers.dev` route.

The public `/api/media` endpoint intentionally remains readable so published
images can load. Upload operations are only available through `/api/admin/media`.

## Local commands

```sh
pnpm exec wrangler d1 migrations apply quyenlm-port-content --local
pnpm dev
```

The local R2 and D1 state is maintained by Wrangler under `.wrangler/state`.
