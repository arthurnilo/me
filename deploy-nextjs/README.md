# Arthur Nilo — Portfólio (Next.js)

Portfólio pessoal com tema claro, animações de scroll e conteúdo bilíngue (PT/EN).
Código pronto para deploy e fácil de manter.

## Rodando localmente

```bash
npm install
npm run dev
# abre http://localhost:3000
```

## Deploy na Vercel (recomendado)

1. Crie um repositório no GitHub e envie esta pasta.
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e importe o repositório.
3. A Vercel detecta Next.js automaticamente — só clicar em **Deploy**.

Qualquer outro host que suporte Next.js (Netlify, Railway, etc.) também funciona.

## Onde colocar as imagens

| Imagem | Caminho | Observação |
|---|---|---|
| Logo | `public/logo.png` | Aparece no círculo da tela de abertura. Enquanto não existir, mostra um placeholder. |
| Sua foto | `public/foto-arthur.jpg` | Já incluída. |
| Screenshots dos projetos | `public/projects/<slug>.png` | Um por projeto. Slugs: `proj-ai-ext`, `proj-phishing`, `proj-bela`, `proj-fin`, `proj-estoque`, `proj-brunno`. Placeholder elegante enquanto não existir. |

## Onde editar o conteúdo

Todo o texto (PT e EN), projetos, formação, certificações e links estão em **`lib/content.ts`** —
você não precisa mexer no layout para atualizar conteúdo.

⚠️ **Troque os links placeholder** em `LINKS` (final de `lib/content.ts`):
e-mail, GitHub e LinkedIn.

## Estrutura

```
app/
  layout.tsx    → fontes (Instrument Sans/Serif) e metadata
  globals.css   → variáveis de cor, classes utilitárias, keyframes
  page.tsx      → a página inteira (seções + lógica de animação de scroll)
lib/
  content.ts    → TODO o conteúdo editável (copy PT/EN, projetos, certs, links)
public/
  foto-arthur.jpg, logo.png, projects/*.png
```

## Como funcionam as animações

- **Intro**: seção de 220vh com conteúdo `sticky` — o nome desvanece/escala conforme o scroll.
- **"Filme"**: seção de 380vh com um cartão `sticky`; 3 quadros fazem crossfade conforme o progresso do scroll.
- **Reveals**: elementos com `data-reveal` entram com fade+translate via `IntersectionObserver`.
- Tudo respeita `prefers-reduced-motion`.
