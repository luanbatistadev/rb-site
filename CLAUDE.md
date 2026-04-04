@AGENTS.md

# Code Style - Next.js Web

## Princípios

### KISS (Keep It Simple, Stupid)
- Código simples e direto
- Evitar abstrações desnecessárias
- Preferir soluções óbvias

### DRY (Don't Repeat Yourself)
- Extrair código repetido para funções/componentes reutilizáveis
- Usar constantes para valores repetidos

### YAGNI (You Aren't Gonna Need It)
- Não implementar funcionalidades "para o futuro"
- Implementar apenas o necessário agora

## React/Next.js/TypeScript

### Componentes
- Um componente por arquivo
- Componentes reutilizáveis em `components/ui/`
- Seções da página em `components/sections/`
- Layout (header, footer) em `components/layout/`
- Componentes complexos ou reutilizáveis devem ser extraídos para seus próprios arquivos
- `"use client"` apenas quando necessário (hooks, interatividade)

### State Management
- `useState` para estado simples local
- `useRef` para referências DOM e valores mutáveis
- Props drilling para 1-2 níveis, Context para estado compartilhado mais profundo
- Preferir Server Components sempre que possível

### Separação de Responsabilidades
- Pages são apenas composição de componentes — não colocar lógica complexa
- Lógica de negócio em hooks customizados ou `lib/`
- Dados estáticos em `data/`

### Nomenclatura
- Componentes: PascalCase (`Button.tsx`, `HeroSection.tsx`)
- Funções/variáveis: camelCase
- Constantes: camelCase
- Arquivos de componentes: kebab-case (`custom-cursor.tsx`)
- Types/Interfaces: PascalCase

### Imports
- Usar path alias `@/` para imports do `src/`
- Ordenar: react, next, packages externos, internos

### Estrutura de Arquivos
```
src/
├── app/[locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── dictionaries/
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
├── lib/
└── proxy.ts
```

## Boas Práticas

### Geral
- **SEM comentários** - código deve ser autoexplicativo
- Nomes descritivos para variáveis, métodos e classes
- Sem emojis em código ou logs
- Funções curtas e focadas
- Early return para reduzir aninhamento

### Next.js 16
- `params` é sempre Promise — usar `await params`
- `proxy.ts` no lugar de `middleware.ts`
- `preload` no lugar de `priority` no componente Image
- Turbopack é padrão — config top-level

### Styling
- Tailwind CSS v4 com utility classes
- Design tokens via CSS custom properties em `globals.css`
- Usar classes do Tailwind, evitar inline styles (exceto gradientes complexos)
- Respeitar o design system existente

### Localização
- **NUNCA** usar textos hardcoded na UI
- Todos os textos visíveis ao usuário devem estar nos dicionários (`dictionaries/`)
- Adicionar strings em todos os idiomas: pt-BR, en

### Assets
- Imagens em `public/images/`
- SVGs como componentes ou via `<img>` / `<Image>`

## Testes
- Build deve passar sem erros antes de qualquer commit
- Verificar visualmente com Playwright quando possível

## Workflow
- Após cada feature executar `code-simplifier`
- Verificar localização de textos
