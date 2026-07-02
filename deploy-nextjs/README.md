# Arthur Nilo — Portfólio (Next.js)

Portfólio pessoal com tema claro, animações de scroll e conteúdo bilíngue (PT/EN).

## Como funcionam as animações

- **Intro**: seção de 220vh com conteúdo `sticky` — o nome desvanece/escala conforme o scroll.
- **"Filme"**: seção de 380vh com um cartão `sticky`; 3 quadros fazem crossfade conforme o progresso do scroll.
- **Reveals**: elementos com `data-reveal` entram com fade+translate via `IntersectionObserver`.
- Tudo respeita `prefers-reduced-motion`.
