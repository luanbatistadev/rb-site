# RB Site — Landing Page Design Spec

## Overview

Landing page institucional para a RB Computing Development. Site focado em apresentar serviços de desenvolvimento de software (mobile, web, UX) com visual premium e animações imersivas.

## Decisoes de Design

| Decisao | Escolha |
|---------|---------|
| Tipo de site | Principalmente estatico com formulario de contato |
| Dados de projetos | Arquivos JSON locais |
| Botao "Agendar Consulta" | Pagina interna `/contato` com formulario |
| Responsividade | Desktop + Tablet + Mobile desde o inicio |
| Idiomas | PT-BR + EN (next-intl) |
| Animacoes | Ricas — parallax, transitions, motion design (Framer Motion) |

## Stack

- **Next.js 16** (App Router, SSR/SSG)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** — styling
- **Framer Motion** — animacoes
- **next-intl** — i18n (PT-BR + EN)

## Estrutura de Diretorios

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── contato/
│   │       └── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── tech-bar.tsx
│   │   ├── services.tsx
│   │   ├── projects.tsx
│   │   ├── metrics.tsx
│   │   └── cta.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── tag.tsx
│       └── counter.tsx
├── data/
│   └── projects.json
├── lib/
│   └── animations.ts
└── messages/
    ├── pt-BR.json
    └── en.json
```

## Design Tokens

```
Cores:
- Background escuro: #0a0a0a
- Background claro: #ffffff
- Accent/CTA: verde (#22c55e range)
- Texto primario light: #171717
- Texto primario dark: #ededed
- Cards escuros: gradientes dark com borda sutil

Tipografia:
- Font principal: Geist Sans
- Font mono: Geist Mono
- Headings: bold, tracking-tight
- Body: regular, leading-relaxed
```

## Secoes da Landing Page

### 1. Header/Navigation
- Logo "RB Computing Development" a esquerda
- Nav: Inicio, Servicos, Projetos, Contato (scroll suave para ancoras)
- Botao "Agendar Consulta" a direita → `/contato`
- Fixo no topo com backdrop blur ao scroll
- Animacao: fade-in no load, blur aparece com scroll

### 2. Hero Section
- Fundo escuro com imagem 3D abstrata (azul/roxo iridescente)
- Tag: "RB Consulting Development"
- Heading: "DESENVOLVIMENTO, DESIGN & EXPERIENCIA"
- Subtexto descritivo
- CTA "INICIAR SEU PROJETO" + avatares
- Animacao: staggered reveal, parallax no background

### 3. Tech Bar
- Logos: Swift, Flutter, Next.js, Kotlin, Node.js
- Fundo branco, icones grayscale
- Animacao: marquee infinito horizontal

### 4. Secao Servicos ("Engenharia de ponta a ponta")
- Heading + subtexto centralizado
- 3 cards: Mobile Nativo, Web Performance, UX
- Cada card: icones + titulo + descricao
- Imagem showcase abaixo
- Animacao: fade-in + scale staggered, imagem parallax

### 5. Secao Projetos ("Do zero ao lancamento")
- Tag + heading centralizado
- Cards alternados (imagem esquerda/direita)
- Dados de projects.json
- Botao "Ver mais detalhes" (verde) por projeto
- Botao "Ver todos os projetos" ao final
- Animacao: slide-in alternado, parallax nas imagens

### 6. Metricas + CTA
- Tag + heading
- 3 cards: 6+ (experiencia), 100% (foco), Multi (plataformas)
- CTA: fundo escuro gradiente, "Software focado em Experiencia!", botao "Agendar consulta"
- Animacao: counter nos numeros, parallax no fundo CTA

### 7. Footer
- Logo RB a esquerda
- Colunas: Menu, Social (Instagram, LinkedIn), Contact (email, telefone)
- Copyright + links legais
- Animacao: fade-in ao scroll

## Pagina de Contato

- Header + Footer compartilhados
- Formulario: nome, email, telefone, mensagem
- Envio via API route ou servico externo
- Validacao client-side
- Feedback de sucesso/erro

## Estrategia de Animacao

| Elemento | Tipo |
|----------|------|
| Hero text | Staggered fade-in + slide-up |
| Tech logos | Marquee infinito |
| Service cards | Fade-in + scale ao scroll |
| Project cards | Slide-in alternado + parallax |
| Metricas | Counter animation + fade-in |
| CTA | Parallax background + fade-in |
| Page transitions | Fade + slide (AnimatePresence) |
| Hover states | Scale (1.02-1.05) + shadow |
