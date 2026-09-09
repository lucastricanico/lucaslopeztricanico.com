// liquidGL is the selected glass. ?glass=original skips it for the plain CSS baseline.
const glassMode = new URLSearchParams(location.search).get('glass') || 'webgl';
if (glassMode === 'webgl') {
  try {
    await document.fonts.ready;
    const { default: liquidGL } = await import('./vendor/liquid-gl/liquidGL.js');
    const nav = document.querySelector('.tab-bar');
    const originalStyle = nav.getAttribute('style');
    // Let the renderer track the navigation inside its already-sticky header.
    nav.style.position = 'sticky';
    nav.style.top = '0';
    // The snapshot excludes the navigation itself, preserving readable live text.
    nav.setAttribute('data-liquid-ignore', '');
    const instance = liquidGL({
      target: '.tab-bar',
      snapshot: 'body',
      resolution: 1.25,
      refraction: .012,
      bevelDepth: .065,
      bevelWidth: .22,
      aberration: .025,
      frost: .7,
      shadow: false,
      specular: !matchMedia('(prefers-reduced-motion: reduce)').matches,
      reveal: 'none',
      tilt: false,
      magnify: 1,
      on: { init() { document.documentElement.dataset.glass = 'webgl'; } }
    });
    // The library disables target hit-testing; retain our real navigation links.
    nav.style.pointerEvents = 'auto';
    if (!instance) {
      if (originalStyle === null) nav.removeAttribute('style');
      else nav.setAttribute('style', originalStyle);
    }
  } catch (error) {
    console.warn('WebGL comparison unavailable; keeping the original glass.', error);
  }
}
