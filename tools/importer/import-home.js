/* eslint-disable */
/* global WebImporter */

// TRANSFORMER IMPORTS - all transformers found in tools/importer/transformers/
import cleanupTransformer from './transformers/example-cleanup.js';

// TRANSFORMER REGISTRY - Array of transformer functions
const transformers = [
  cleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
// The "home" template is the minimal IANA "Example Domain" placeholder page:
// entirely default content (one heading, one paragraph, one link), no blocks.
const PAGE_TEMPLATE = {
  name: 'home',
  description: 'Home page - minimal placeholder page consisting entirely of default content (heading, paragraph, link).',
  urls: [
    'https://www.example.com/',
  ],
  blocks: [],
  sections: [],
};

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - The hook name ('beforeTransform' or 'afterTransform')
 * @param {Element} element - The DOM element to transform (typically document.body or main)
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

// EXPORT DEFAULT CONFIGURATION
export default {
  /**
   * Main transformation function (Helix Importer 'one input / multiple outputs').
   */
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. No blocks on this template - page is entirely default content, nothing to parse.

    // 3. Execute afterTransform transformers (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 4. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 5. Generate sanitized path. Map the root/homepage URL to `/index`:
    //    the root pathname is `/`, which becomes '' after stripping the trailing
    //    slash - an empty path crashes the bundled importer's path polyfill.
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: [],
      },
    }];
  },
};
