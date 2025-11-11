import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mermaid';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import { createGenerator } from 'fumadocs-typescript';
import * as FilesComponents from "@/components/files";
import * as StepsComponents from "@/components/steps";
import * as TabsComponents from "@/components/tabs";
import * as AccordionComponents from "@/components/accordion";
import * as BannerComponents from "@/components/banner";
import * as CodeBlockComponents from "@/components/codeblock";

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Mermaid: Mermaid,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ...TabsComponents,
    ...AccordionComponents,
    ...BannerComponents,
    ...CodeBlockComponents,
    ...FilesComponents,
    ...StepsComponents,
  };
}
