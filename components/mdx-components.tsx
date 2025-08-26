import { BlockExample } from './ui/block-example'
import { Separator } from './ui/separator'

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  h1: (props) => <h1 className="text-4xl font-bold my-6" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold my-6" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold my-6" {...props} />,
  p: (props) => <p className="my-4" {...props} />,
  ul: (props) => <ul className="list-disc my-4 ml-6" {...props} />,
  li: (props) => <li className="my-2 before:mr-2" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="text-zinc-400 dark:text-zinc-600 border-l-2 dark:border-muted bg-muted/60 dark:bg-muted/20 pl-4 flex items-center max-h-[38px] my-2"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-zinc-900 text-zinc-100 rounded-md p-4 my-4 overflow-x-auto"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-zinc-200 text-zinc-800 rounded-xs px-1 py-0.5"
      {...props}
    />
  ),

  // Custom
  Separator: (props) => <Separator className="my-8" {...props} />,
  BlockExample: (props) => <BlockExample {...props} />,
}
