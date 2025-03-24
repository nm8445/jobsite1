// eleventy.config.js
import { format } from "date-fns";

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("../jobs");
    eleventyConfig.addPassthroughCopy("server");
    eleventyConfig.addPassthroughCopy("scripts");

    // Custom filter for date formatting with validation
    eleventyConfig.addFilter("date", function(date, formatString) {
        if (date && !isNaN(Date.parse(date))) {
        return format(new Date(date), formatString);
        } else {
        return "Invalid date";  // Return a default value if the date is invalid
        }
    });
  
    // Set nunjucks and Markdown as template formats
    eleventyConfig.setTemplateFormats(["md", "njk"]);
}

