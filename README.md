<div style="width: 100%;">
  <img src="./README.svg" style="width: 100%;" alt="mdxRenderDoc">
</div>

<div align="center">

  <p>
    <strong>Renderizador de arquivos MDX</strong>
  </p>

  ![license](https://img.shields.io/badge/license-MIT-green?style=flat)
</div>

## Demo

[mdxRenderDocs](https://mdxrenderdocs.vercel.app/intro)

## About
**mdxRenderDocs** é um sistema leve e direto para criação de documentação técnica com arquivos `.mdx`. Focado na simplicidade e na entrega de conteúdo, ele transforma a estrutura de pastas e arquivos em uma experiência organizada e navegável - sem distrações.

O projeto nasceu como uma solução interna para documentar um outro projeto paralelo, mas evoluiu para algo maior: uma ferramenta que automatiza a renderização e roteamento de arquivos `.mdx` com React, oferecendo uma estrutura flexível e escalável para documentações técnicas.

A mágica acontece dentro da pasta `app/docs/`:
- Cada pasta representa uma categoria
- Cada arquivo `.mdx` vira uma página
- A sidebar é gerada automaticamente com ordenação e metadados definidos via frontmatter
- A ordem e o título das categorias podem ser personalizados com um arquivo `_category.json`
Com isso, basta escrever os arquivos e deixar que o sistema cuide do resto - entregando uma documentação funcional, elegante e fácil de manter.

## Features
- Suporte a arquivos `.mdx` com componentes React
- Estilização com TailwindCSS
- Componentes acessíveis via shadcn/ui
- Sidebar automática com categorias organizadas
- Dark mode com `next-themes`
- Ordenação de links e categorias via frontmatter e `_category.json`

## Como usar

Clone o repositório e rode localmente:

```powershell
gh repo clone duhnunes/mdxRenderDocs
code mdxRenderDocs
pnpm install
pnpm run dev
```

### Criação de rotas

A estrutura de rotas é baseada na organização de arquivos dentro da pasta `app/docs`:

- **Uma pasta** = uma categoria
- **Um arquivo `.mdx`** = uma rota/página

Cada arquivo `.mdx` deve conter um frontmatter no topo:

```md
---
title: Titulo no sidebar
description: Descrição da página que aparece no componente antes do conteúdo do arquivo
link_position: 1 (número do posicionamento)
---
```

Para personalizar uma categoria, adicione um arquivo `_category.json` dentro da pasta:
```json
{
  "title": "Nome da Categoria",
  "sidebar_position": 2
}
```
Com isso, você controla a ordem das categorias na sidebar e seus títulos de exibição.

---

## License
Licensed under the [MIT](./LICENSE.md)
