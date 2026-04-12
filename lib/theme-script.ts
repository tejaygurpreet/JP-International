/** Inline beforeInteractive script — must match `jp-parts-theme` in useThemeStore persist */
export const THEME_STORAGE_SCRIPT = `
(function () {
  try {
    var raw = localStorage.getItem("jp-parts-theme");
    var dark = true;
    if (raw) {
      var p = JSON.parse(raw);
      var t = p.state && p.state.theme;
      if (t === "light") dark = false;
      if (t === "dark") dark = true;
    }
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`.trim();
