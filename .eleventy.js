const { utmLink, clickrefLink, sidLink, civitatisUrl, buscarFechasUrl, opcionesValidas } = require('./filters.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo");
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addFilter("utmLink", utmLink);
  eleventyConfig.addFilter("clickrefLink", clickrefLink);
  eleventyConfig.addFilter("sidLink", sidLink);
  eleventyConfig.addFilter("civitatisUrl", civitatisUrl);
  eleventyConfig.addFilter("buscarFechasUrl", buscarFechasUrl);
  eleventyConfig.addFilter("opcionesValidas", opcionesValidas);
  eleventyConfig.addShortcode("anioActual", () => new Date().getFullYear());

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
