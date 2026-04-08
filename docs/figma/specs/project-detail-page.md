# Pagina de Projeto Individual - Figma Specs

Figma: sbKlpZj0YpTLBvtBlpk5wZ
Node: 1:888 (Desktop, 1440x2345)
Capturado: 2026-04-07

## Estrutura

NavBar (clara) -> Project Info -> Imagens -> CTA -> Footer

## NavBar (DIFERENTE - versao clara)

- bg: rgba(255,255,255,0.2) (transparente claro, nao escuro)
- Texto: #121212 (escuro, nao branco)
- Link ativo: "Projetos" (bg rgba(255,255,255,0.1) rounded-full)
- CTA "Agendar Consulta": bg rgba(255,255,255,0.1) rounded-full
- Logo: texto #121212
- Sticky top-0, w: 1200px

## Project Info Section

- Container: pt: 16px, pb: 60px, px: 6px, gap: 80px entre nav e content
- Content: w: 1200px, gap: 40px
- Header text: w: 984px, gap: 16px, centralizado
  - Tag: "</> {NOME DO PROJETO}" (pill border)
  - Titulo: 48px Semibold #121212, tracking -0.48px, uppercase, text-center
  - Subtitulo: 18px Regular #8e8e93, text-center, w: 628px

## Imagens

### Imagem principal:
- w: full (1200px), h: 489px, rounded: 8px, bg: white

### Tech Bar:
- Flex row, justify-between, w: 1200px
- Icons: h: 42px (Swift, Flutter, Next.js, Kotlin, Node.js)
- Gap entre imagem principal e tech bar: 40px

### Imagens secundarias:
- 2 imagens lado a lado
- Flex row, gap: 24px
- Cada: flex-1, h: 489px, rounded: 8px, bg: white
- Gap entre tech bar e imagens: 40px

## CTA + Footer
- Mesmo das outras paginas
