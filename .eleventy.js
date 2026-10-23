const { precioUnidad, mesSalida, masBarata, precioCorto, utmLink, clickrefLink, sidLink, civitatisUrl, buscarFechasUrl, buscarAeropuertosUrl, buscarVuelosUrl, opcionesValidas, fechasTrivago, fechaCorta } = require('./filters.js');

const Image = require('@11ty/eleventy-img');

// Responsive WebP + JPEG fallback generated at build time from the original in /img.
// `src` is a site path like "/img/roma-hero.jpg"; new offers need no manual resizing.
async function generar(src, widths, formats) {
  return Image('.' + src, {
    widths,
    formats,
    outputDir: './_site/img/',
    urlPath: '/img/'
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo");
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addFilter("precioCorto", precioCorto);
  eleventyConfig.addFilter("masBarata", masBarata);
  eleventyConfig.addFilter("mesSalida", mesSalida);
  eleventyConfig.addFilter("precioUnidad", precioUnidad);
  eleventyConfig.addFilter("utmLink", utmLink);
  eleventyConfig.addFilter("clickrefLink", clickrefLink);
  eleventyConfig.addFilter("sidLink", sidLink);
  eleventyConfig.addFilter("civitatisUrl", civitatisUrl);
  eleventyConfig.addFilter("buscarFechasUrl", buscarFechasUrl);
  eleventyConfig.addFilter("buscarAeropuertosUrl", buscarAeropuertosUrl);
  eleventyConfig.addFilter("buscarVuelosUrl", buscarVuelosUrl);
  eleventyConfig.addFilter("opcionesValidas", opcionesValidas);
  eleventyConfig.addFilter("fechasTrivago", fechasTrivago);
  eleventyConfig.addFilter("fechaCorta", fechaCorta);
  eleventyConfig.addAsyncShortcode("imagen", async (src, alt, sizes, widths, prioritaria) => {
    const metadata = await generar(src, widths, ['webp', 'jpeg']);
    return Image.generateHTML(metadata, {
      alt: alt || '',
      sizes,
      loading: prioritaria ? 'eager' : 'lazy',
      decoding: 'async',
      ...(prioritaria ? { fetchpriority: 'high' } : {})
    });
  });
  // Absolute-URL-ready path of a 1200px JPEG, used for the Open Graph preview.
  eleventyConfig.addAsyncShortcode("imagenCompartir", async (src) => {
    const metadata = await generar(src, [1200], ['jpeg']);
    return metadata.jpeg[0].url;
  });
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
