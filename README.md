<div style="width: 100%;">
  <img src="./README.svg" style="width: 100%;" alt="mdxRenderDoc">
</div>

<div align="center">

  <p>
    <strong>Renderizador de arquivos MDX</strong>
  </p>

  [![release](https://img.shields.io/github/package-json/v/duhnunes/mdxRenderDoc)](https://github.com/duhnunes/mdxRenderDoc/releases)
  ![license](https://img.shields.io/badge/license-MIT-green?style=flat)
</div>

## About
**mdxRenderDocs** é um projeto básico de estudo sobre criação de documentação com renderizador de arquivos `.mdx`

Esse projeto surgiu da curiosidade sobre como os sites conseguem renderizar um arquivo `.mdx`. A documentação é inspirada no **ui.shadcn**.

## Features
- Suporte a arquivos `.mdx` com componentes React
- Estilização com TailwindCSS
- Componentes acessíveis via shadcn/ui
- Sidebar automático com categorias organizadas
- Dark mode com `next-themes`

## Uso

Pra começar a usar o mdxRenderDocs:
```powershell
gh repo clone duhnunes/mdxRenderDocs
code mdxRenderDocs
pnpm install
pnpm run dev
```
### Detalhe de uso

Por um pequeno equivoco na criação do sistema de sidebar automático, é necessário manter as pastas dentro de `/content` com os mesmos nomes de `title` do arqivo `data/sidebar-links.ts`, sim, é `caseSensitive`.

---

## Componentes MDX personalizados de exemplo

BlockCode personalizado
![BlockExample](./.github/imgs/blockcode.png)

---

## License
Licensed under the [MIT](./LICENSE.md)
