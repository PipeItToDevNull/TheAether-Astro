import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

/**
 * Generate sidebar items for the Wiki collection.
 * @param {string} [directory]
 * @returns {Promise<SidebarItem[]>}
 */
export async function generateWikiSidebarItems(directory = './src/data/aether/20 IT') {
    const files = await fs.readdir(directory, { withFileTypes: true });

    const mappedItems = await Promise.all(
        files.map(async (file) => {
            const filePath = path.join(directory, file.name);

            if (file.isDirectory()) {
                // Recursively process subdirectories
                const subItems = await generateWikiSidebarItems(filePath);

                // Only include the directory if it contains valid items
                if (subItems.length > 0) {
                    return {
                        label: file.name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()), // Directory name as label
                        items: subItems, // Nested items
                        collapsed: true, // Collapse this directory by default
                    };
                }
            } else if (file.isFile() && file.name.endsWith('.md')) {
                // Read the file content and parse frontmatter
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const { data } = matter(fileContent);

                // Only include files with [publish: true](http://_vscodecontentref_/3)
                if (data.publish === true) {
                    const id = path
                        .relative('./src/data/aether/20 IT', filePath)
                        .replace(/\.md$/, '') // Remove .md extension
                        .replace(/ /g, '-') // Replace spaces with hyphens
                        .toLowerCase(); // Convert to lowercase

                    return {
                        label: (id.split('/').pop() ?? '').replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()), // File name as label
                        link: `/wiki/${id}`, // Generate the normalized link for the sidebar
                    };
                }
            }
        })
    );

    // Filter out undefined values (e.g., unpublished files, non-MD files, or empty directories)
    return mappedItems.filter((item) => item !== undefined);
}