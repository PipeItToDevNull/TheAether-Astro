// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeCallouts from 'rehype-callouts';
import { generateWikiSidebarItems } from './src/utils/wikiSidebar.js';

// https://astro.build/config
export default defineConfig({
    site: 'https://docs.dev0.sh',
    integrations: [
        starlight({
            title: 'Dev0 Docs',
            logo: {
                src: './src/assets/dev0.png',
                replacesTitle: true,
            },
            customCss: [
                './src/styles/main.css',
                './src/styles/marks.css',
            ],
            social: [
                { 
                    icon: 'github', label: 'GitHub', 
                    href: 'https://github.com/PipeItToDevNull' 
                },
            ],
            sidebar: [
                { label: 'Homelab', link: '/homelab' },
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
    },
});
