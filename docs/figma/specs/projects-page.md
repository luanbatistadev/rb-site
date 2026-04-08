# Pagina de Projetos - Figma Specs

Figma: sbKlpZj0YpTLBvtBlpk5wZ
Node: 1:967 (Desktop, 1440x3417)
Capturado: 2026-04-07

## Estrutura

Header (hero escuro) -> Projects List -> CTA -> Footer

## Header/Hero

- Mesmo header das outras paginas (NavBar sobre fundo escuro)
- Link ativo: "Projetos" (bg-black/10 rounded-full)
- Hero menor: pb-180px pt-80px
- Tag: "</> RB Computing Development." (18px Regular #eaeaea)
- Titulo: 48px Semibold white, tracking -0.48px, uppercase, w: 960px
  - Texto: "Desenvolvemos a tecnologia que impulsiona o seu crescimento."
- Subtitulo: 18px Regular white, w: 628px
  - Texto: "Solucoes personalizadas em Swift, Kotlin e Flutter, criadas por especialistas para resolver desafios reais do mercado."

## Projects List

- Tag: "</> Projetos" (pill border)
- Sem titulo/subtitulo adicional (direto pros cards)
- Gap entre tag e cards: 32px
- Cards empilhados verticalmente (sem gap visible entre eles - colados)

### Project Card:
- bg white, p: 48px, rounded: 16px, w: 1200px
- Layout: flex row, gap: 24px
- Texto: flex-1, gap: 24px
  - Icons: 28px, overlap -6px, bg white, shadow (5 icons)
  - Titulo: 32px Semibold #121212, tracking -0.32px
  - Descricao: 20px Regular #8e8e93, leading 1.3
  - Botao: h: 48px, pl: 32px, pr: 4px, rounded: 50px, bg black
- Imagem: flex-1, h: 243px, rounded: 8px, bg #f9fffc, border 1px #ececec
  - Transform: scale-y-90, skew-x-26.05deg
  - Shadow: -14px 13px 13.4px rgba(0,0,0,0.1)

### 5 project cards (todos "dFora" no design - dados dinamicos)

## CTA + Footer
- Mesmo das outras paginas
