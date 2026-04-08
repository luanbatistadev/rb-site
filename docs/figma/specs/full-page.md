# RB Site - Full Page Design Specs

Figma: sbKlpZj0YpTLBvtBlpk5wZ
Node: 1:16 (Desktop, 1440x5242)
Capturado: 2026-04-07

## Cores

| Token | Valor | Uso |
|-------|-------|-----|
| background/gray | #f7f7f7 | Fundo da pagina |
| background/white | white | Cards, tags |
| font/title-black | #121212 | Titulos escuros |
| font/subtitle-gray | #8e8e93 | Subtitulos, descricoes |
| font/title-white | white | Titulos sobre fundo escuro |
| font/subtitle-white | #eaeaea | Subtitulos sobre fundo escuro |
| dark bg | #0b0b0b | Header, CTA, Footer backgrounds |
| accent gradient from | #00b6aa | Botoes, valores de metricas |
| accent gradient to | #00a5e7 | Botoes, valores de metricas |
| project image bg | #f9fffc | Fundo container de imagem de projeto |
| border light | #ececec | Bordas de cards de projeto |
| border tag | #e7e7e7 | Bordas de tags |

## Tipografia

| Elemento | Font | Size | Weight | Leading | Tracking |
|----------|------|------|--------|---------|----------|
| Hero titulo | Switzer | 96px | Medium | 1.2 | -0.96px |
| Secao titulo | Switzer | 36px | Semibold | 1.4 | -0.36px |
| Secao subtitulo | Switzer | 18px | Regular | 1.2 | - |
| Card titulo | Switzer | 18px | Semibold | 1.2 | - |
| Card descricao | Switzer | 16px | Regular | 1.2 | 0.16px |
| Nav link ativo | Switzer | 14px | Semibold | 20px | 0.35px |
| Nav link | Switzer | 14px | Regular | 20px | 0.35px |
| CTA titulo | Switzer | 48px | Medium | 1.2 | -0.48px |
| Metrica valor | Switzer | 56px | Medium | 1.4 | - (gradient text) |
| Metrica titulo | Switzer | 20px | Medium | 1.4 | - |
| Metrica descricao | Switzer | 16px | Regular | 1.3 | 0.16px |
| Projeto titulo | Switzer | 32px | Semibold | 1.4 | -0.32px |
| Projeto descricao | Switzer | 20px | Regular | 1.3 | - |
| Tag | Switzer | 16px | Regular | 1.2 | - |
| Botao | Switzer | 18px | Semibold | 1.4 | - |
| Footer texto | Switzer | 16px | Regular/Light | 1.3 | 0.32px |
| Logo sub | DM Sans | 12.741px | Regular | 1.4 | - |
| Agendar Consulta (nav) | DM Sans | 18px | Semibold | 1.4 | - |

## Layout

| Propriedade | Valor |
|-------------|-------|
| Pagina largura | 1440px |
| Conteudo largura | 1200px |
| Secao padding | py: 60px, px: 6px |
| Header wrapper | p: 8px |
| NavBar | px: 16px, py: 12px, rounded: 50px, bg: rgba(2,2,2,0.2) |
| Hero | h: 800px, py: 80px |
| Hero content gap | 24px |
| Hero subtitulo largura | 684px |

## Secoes

### Header (node 1:17)
- Wrapper: p: 8px
- Background: imagem + gradient overlay (to-b, transparent -> rgba(0,0,0,0.8) at 87.17%)
- NavBar: sticky, w: 1200px, h: auto, rounded: 50px
- Logo: w: 188px, h: 44px
- Nav links gap: 16px
- Link ativo: bg rgba(0,0,0,0.1), px: 16px, py: 8px, rounded: 50px
- Link normal: px: 12px, py: 8px

### Hero (dentro do Header, node 1:35)
- h: 800px, py: 80px, flex-col center
- Conteudo: w: 1200px, gap: 24px, text-center
- Tag: 18px Regular #eaeaea
- Titulo: 96px Medium white, tracking -0.96px
- Subtitulo: 18px Regular #eaeaea, w: 684px
- Botao CTA: h: 48px, pl: 32px, pr: 4px, rounded: 50px
- Icone botao: 40x40px, gradient, rounded: 5000px
- Avatars: 50x50px, mr: -20px (sobreposicao)

### Tech Bar (node 1:54)
- Flex row, justify-between, w: 1200px
- Icons: h: 42px, larguras variadas (136-207px)
- 5 tecnologias: Swift, Flutter, Next.js, Kotlin, Node.js

### Services/Cards (node 1:69)
- Gap entre cards: 8px (horizontal)
- Gap entre rows: 8px (vertical)
- Card: bg white, p: 24px, rounded: 12px, flex-col, gap: 16px
- Card icons: 28x28px, bg white, rounded: 50px, shadow: 3px 1px 3.6px rgba(0,0,0,0.1)
- Card icons overlap: mr: -6px
- Imagem principal: h: 422px, rounded: 12px, w: full
- 3 cards em row: flex-1 cada

### Projects (node 1:112)
- Container: gap: 24px
- Tag: border 1px #e7e7e7, px: 18px, py: 6px, rounded: 50px
- Titulo gap: 12px (tag -> titulo), 4px (titulo -> subtitulo)
- Project card: bg white, w: 1200px, rounded: 16px, pl: 58px, pr: 24px, py: 24px, gap: 24px
- Project info: w: 448px, gap: 16px
- Project titulo: 32px Semibold, tracking -0.32px
- Project descricao: 20px Regular, leading 1.3
- Project image container: flex-1, h: 485px, rounded: 8px, border 1px #ececec, bg: #f9fffc
- Imagem com transform: scale-y-90, skew-x-26.05deg, shadow: -14px 13px 13.4px rgba(0,0,0,0.1)
- 3 project cards identicos
- Link "Ver todos": 18px Semibold, underline

### Metrics (node 1:193)
- Tag: "</> O que a RB Computing entrega"
- 3 cards em row, gap: 8px
- Card: bg white, p: 24px, rounded: 12px, flex-1
- Valor: 56px Medium, gradient text (from #00b6aa to #00a5e7)
- Gap entre valor e texto: 32px
- Titulo: 20px Medium, w: 329px
- Descricao: 16px Regular, w: 329px, tracking 0.16px

### CTA (node 1:220)
- Wrapper: pb: 80px, pt: 40px
- Container: w: 1200px, py: 60px, rounded: 12px
- Background: dark com overlay rgba(0,0,0,0.8)
- Logo: w: 160px, h: 44px
- Titulo: 48px Medium white, tracking -0.48px, w: 912px
- Subtitulo: 18px Light #eaeaea, w: 684px
- Gap entre elementos: 24px (logo -> text), 16px (titulo -> subtitulo)
- Botao: h: 48px, pl: 32px, pr: 4px, rounded: 50px

### Footer (node 1:234)
- Wrapper: p: 8px
- Container: py: 40px, rounded: 12px, bg escuro
- Conteudo: w: 1200px
- Logo footer: w: 266px, h: 73.15px
- 3 colunas de links: gap: 80px
- Titulo coluna: 16px Regular white
- Link coluna: 16px Regular #eaeaea
- Gap entre links: 8px
- Divider: linha horizontal 1px
- Gap: 40px entre secao superior e inferior
- Copyright: 16px Light white
