<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Deploy target

- The site is self-hosted on Vercel: `vite.config.ts` pins `nitro: { preset: "vercel" }` so self-deployed builds emit `.vercel/output`. Lovable's own build ignores that pin and still targets Cloudflare, so never remove it to "fix" a Lovable preview build.
