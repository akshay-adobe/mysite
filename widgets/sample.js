/**
 * Sample widget.
 * Demonstrates the widget block loading external HTML/CSS/JS and decorating it.
 * @param {Element} widget The widget block element (already populated with sample.html)
 */
export default function decorate(widget) {
  const button = widget.querySelector('.sample-widget-button');
  const count = widget.querySelector('[data-count]');
  if (!button || !count) return;

  let clicks = 0;
  button.addEventListener('click', () => {
    clicks += 1;
    count.textContent = clicks;
  });
}
