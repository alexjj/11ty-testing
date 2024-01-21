const Image = require("@11ty/eleventy-img");

const dayjs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

module.exports = function(eleventyConfig) {
	// Copy the contents of the `assets` folder to the output folder
	// For example, `./assets/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./assets/": "/",
	});

	// Filters
	eleventyConfig.addFilter("formatDate", (dateObj, format) => {
        return dayjs(dateObj).format(format || 'dddd, Do MMMM, YYYY')
	});

	// image plugin
	eleventyConfig.addShortcode("image", async function(src, alt, sizes) {
		let metadata = await Image(src, {
			widths: [300, 570, 880, 1200],
			formats: ["avif", "webp", "jpeg"]
		});

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});
}
