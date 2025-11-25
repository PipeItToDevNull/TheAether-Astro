// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeCallouts from 'rehype-callouts';
import mermaid from 'astro-mermaid';
import { generateWikiSidebarItems } from './src/utils/wikiSidebar.js';
import { rewriteWikiLinks } from './src/utils/rewriteWikiLinks.js';

// https://astro.build/config
export default defineConfig({
    site: 'https://docs.dev0.sh',
    integrations: [
        mermaid({
            theme: 'forest',
            autoTheme: true
        }),
        starlight({
            title: 'Dev0 Docs',
            logo: {
                src: './src/assets/dev0.png',
                replacesTitle: true,
            },
            components: {
                PageTitle: './src/components/customPageTitle.astro',
            }, 
            customCss: [
                './src/styles/main.css',
                './src/styles/marks.css',
            ],
            tableOfContents: {
                maxHeadingLevel: 6
            },
            social: [
                { 
                    icon: 'github', label: 'GitHub', 
                    href: 'https://github.com/PipeItToDevNull' 
                },
            ],
            sidebar: [
                { label: 'Homelab', link: '/homelab' },
                { label: 'Homelab Map', link: '/map' },
                { label: 'Blog', link: '/blog' },
                { label: 'Tags', link: '/tags' },
                {
                    label: 'Wiki',
                    collapsed: true,
                    // @ts-ignore
                    items: (await generateWikiSidebarItems()) || [],
                },
            ],
        }),
    ],
    markdown: {
        rehypePlugins: [rehypeCallouts],
        remarkPlugins: [rewriteWikiLinks],
    },
});
