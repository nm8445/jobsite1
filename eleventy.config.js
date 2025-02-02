module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("../jobs");
     // Set Handlebars and Markdown as template formats
     eleventyConfig.setTemplateFormats(["md", "njk"]);
  };