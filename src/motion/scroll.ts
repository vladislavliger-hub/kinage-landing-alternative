/**
 * Native scrolling helpers. The site uses the browser's own scrolling
 * everywhere (wheel, trackpad, keys, touch); in-page anchors glide with CSS
 * `scroll-behavior: smooth` (base.css, off under reduced motion).
 *
 * - `jumpTo`: an instant jump (page changes, Back / Forward, breakpoint
 *   restores), never animated, whatever `scroll-behavior` says.
 * - `markSiteScroll` / `isSiteScroll`: a scroll the site starts itself (an
 *   anchor link, a page change, Back / Forward) is marked until it has
 *   finished, so the nav stays visible during it instead of hiding as it does
 *   for the reader's own scrolling.
 * - `lockScroll`: the page scroll lock while a dialog is open.
 */

let locks = 0;

/** A scroll the site started is in progress. */
let siteScroll = false;
let idle = 0;
/** A glide can take a few frames to start; if the page has not moved by then, there was nothing to scroll. */
const SITE_SCROLL_START = 600;
/** Once moving, the scroll is over at `scrollend`, or after this long without a scroll event. */
const SITE_SCROLL_IDLE = 250;

const endSiteScroll = () => {
  siteScroll = false;
  window.clearTimeout(idle);
  window.removeEventListener('scroll', onSiteScroll);
  window.removeEventListener('scrollend', endSiteScroll);
};
const onSiteScroll = () => {
  window.clearTimeout(idle);
  idle = window.setTimeout(endSiteScroll, SITE_SCROLL_IDLE);
};

/** Marks the scroll that is about to start as the site's own, until it ends. */
export function markSiteScroll() {
  endSiteScroll();
  siteScroll = true;
  window.addEventListener('scroll', onSiteScroll, { passive: true });
  window.addEventListener('scrollend', endSiteScroll);
  idle = window.setTimeout(endSiteScroll, SITE_SCROLL_START);
}

export const isSiteScroll = () => siteScroll;

/** Jump (no animation) to a scroll position. */
export function jumpTo(y: number) {
  markSiteScroll();
  window.scrollTo({ top: y, behavior: 'instant' });
}

/**
 * Prevents page scrolling while a modal is open. The document keeps its
 * scroll offset (overflow is clipped on <html>, nothing is repositioned), so
 * closing returns to the exact spot and scroll-driven animations stay where
 * they were. `scrollbar-gutter: stable` (base.css) avoids a width jump.
 */
export function lockScroll(): () => void {
  locks += 1;
  if (locks === 1) document.documentElement.classList.add('is-scroll-locked');
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.documentElement.classList.remove('is-scroll-locked');
  };
}
