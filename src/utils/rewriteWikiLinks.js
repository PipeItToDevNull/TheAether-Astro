// This file will rewrite links pointing to the wiki "20 IT" to /wiki".
// This file only runs during npm run build not npm run dev

import { visit } from 'unist-util-visit';

export function rewriteWikiLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (typeof node.url === 'string' && node.url.includes('/20%20IT/')) {
        const originalUrl = node.url;
        let newUrl = node.url.replace(/^(.*)?20%20IT\//, '/wiki/');
        newUrl = newUrl.replace(/\.md$/, '');
        newUrl = decodeURIComponent(newUrl);
        newUrl = newUrl
          .split('/')
          .map(s => s ? s.trim().toLowerCase().replace(/\s+/g, '-') : '')
          .join('/');
        console.log(`Rewriting link: ${originalUrl} -> ${newUrl}`);
        node.url = newUrl;
      }
    });
  };
}