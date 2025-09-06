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

[mdxRenderDocs](https://mdxrenderdocs.vercel.app/)

## About

**mdxRenderDocs** é um pequeno sistema direto para criação de documentação com arquivos `.mdx`. Focado na simplicidade e na entrega de conteúdo, ele transforma a estrutura de pastas e arquivos em uma experiência organizada e navegável - sem distrações.

O projeto nasceu como uma solução interna para documentar um outro projeto paralelo, mas evoluiu para algo maior: uma ferramenta que automatiza a renderização e roteamento de arquivos `.mdx` com React, oferecendo uma estrutura flexível e escalável para documentações técnicas.

###### Inspirado em documentações como **tailwindcss** e **shadcn/ui**

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
- Versionamento de documentação com estrutura isolada por release

## Estrutura de pastas
> São 2 pastas principais para o funcionamento da documentação

- `(canary)` - Pasta dedicada a versão em desenvolvimento da sua documentação
- `(versioned)` - Pasta dedicada para o versionamento da sua documentação

### **(canary)**  
A estrutura das rotas do canary é baseada na organização de pastas e arquivos dentro de `app/docs/(canary)`:

#### Categoria

- Cada pasta vira uma categoria na sua sidebar e deve conter um arquivo `.mdx` dentro.
- Cada pasta conta com um arquivo exclusivo `_category.json`, que serve como metadata dela

```json
{
  "title": "Introdução",    // Nomeia a categoria
  "sidebar_position": 1     // Posição na sidebar
}
```

#### Link

- Um arquivo `.mdx` dentro da categoria (pasta) vira um link na sua sidebar.
- Cada arquivo conta com um `frontmatter`, que serve como metadata dele

```md
---
title: Introdução         // Nomeia o link na sua sidebar
description: Descrição    // Escreve uma descrição utilizada no componente <header> da página
link_position: 1          // Posição na categoria
---
```

## Como usar

Clone o repositório e rode localmente:

```powershell
gh repo clone duhnunes/mdxRenderDocs
code mdxRenderDocs
pnpm install
pnpm run dev
```

---

## License

Licensed under the [MIT](./LICENSE.md)
