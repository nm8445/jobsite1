// eleventy.config.js

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("../jobs");
    eleventyConfig.addPassthroughCopy("server");
    eleventyConfig.addPassthroughCopy("scripts");
    
    // Set nunjucks and Markdown as template formats
    eleventyConfig.setTemplateFormats(["md", "njk"]);
}
