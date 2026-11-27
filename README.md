# Lucas Henrique — Portfólio

Site pessoal de sites e vídeos de motion design. TanStack Start + Vite + Tailwind v4, com animações em `motion` e rolagem suave com Lenis. Textos em português e inglês.

## Rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento (porta 8080)
npm run build    # build de produção (gera .vercel/output)
```

## Deploy

O site roda na Vercel. O `vite.config.ts` fixa `nitro({ preset: "vercel" })`, então o build já sai no formato da Vercel.
