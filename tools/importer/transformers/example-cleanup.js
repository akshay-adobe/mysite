/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: example.com site-wide cleanup.
 *
 * Source page (migration-work/cleaned.html) is the minimal IANA "Example Domain"
 * placeholder: a single <div> wrapping one <h1>, one <p>, and one <p><a>. There is
 * no header, footer, nav, sidebar, breadcrumb, search, cookie banner, or widget in
 * the captured DOM, so there is no site chrome to target with specific selectors.
 *
 * This cleanup removes standard non-authorable global chrome defensively (safe
 * no-ops on this page) and strips non-authorable leftover elements / tracking
 * attributes so the import contains only page-level authorable content. All
 * selectors are generic HTML landmarks / safe elements — no guessed class/ID names.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // No cookie banners, modals, or overlays present in captured DOM.
    // Remove script/style/tracking elements before block parsing (safe no-op here).
    WebImporter.DOMUtils.remove(element, ['script', 'style', 'noscript']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome (none present in this placeholder page, but
    // standard site-wide selectors are safe no-ops and keep this reusable).
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'nav',
      'aside',
      'iframe',
      'link',
    ]);

    // Strip common tracking attributes where present.
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-track');
    });
  }
}
