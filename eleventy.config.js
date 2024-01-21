const dayjs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

module.exports = function(eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
	});

	// Filters
	eleventyConfig.addFilter("formatDate", (dateObj, format) => {
        return dayjs(dateObj).format(format || 'dddd, Do MMMM, YYYY')
	});


}
