# theweioflife

Next.js static export site for publishing content from `theweioflife1.wordpress.com` to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm test
npm run check:audit
npm run check:signatures
```

## Environment

Production builds require:

```bash
NEXT_PUBLIC_SITE_URL=https://theweioflife.github.io
```

For a GitHub Pages project site, also set:

```bash
NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY=repo-name
NEXT_PUBLIC_SITE_URL=https://username.github.io/repo-name/
```

The WordPress content source defaults to `theweioflife1.wordpress.com`. Override only when needed:

```bash
WORDPRESS_SITE=theweioflife1.wordpress.com
```

## Static Build

```bash
NEXT_PUBLIC_SITE_URL=https://theweioflife.github.io npm run build
npm run preview:static
```

The build writes static output to `out/`. Verify homepage, one post page, one category page, paginated post routes, `404.html`, `sitemap.xml`, and `robots.txt`.

## Content Flow

Content is edited in WordPress.com and read from the public WordPress REST API during build time. Updating WordPress content requires running the GitHub Actions workflow again so the static files are regenerated.

## GitHub Pages

Use GitHub Actions as the Pages source. Configure repository variables:

- `NEXT_PUBLIC_SITE_URL`: final public URL.
- `NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY`: repository name only for project-page deployments.

The workflow runs `npm ci`, audit checks, package signature checks, and `npm run build`, then deploys `out/`.

## Security Maintenance

- Keep `next` and `axios` pinned to reviewed stable versions.
- Re-run `npm view next version` and `npm view axios version` before dependency changes.
- Review Next.js and axios security advisories before upgrading.
- Do not use `npm audit fix --force` without reviewing the proposed major-version changes.
- WordPress HTML is sanitized before rendering.
