(function () {
  var KEY = "flavoraTheme";

  function savedTheme() {
    try {
      return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function updateButton() {
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.textContent = currentTheme() === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
    updateButton();
  }

  document.documentElement.setAttribute("data-theme", savedTheme());
  window.toggleTheme = function () {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  };

  function init() {
    var btn = document.getElementById("themeToggle");

    // Only keep the button if it already exists in the HTML
    if (btn) {
        if (!btn.hasAttribute("onclick")) {
            btn.addEventListener("click", window.toggleTheme);
        }
        updateButton();
    }
}

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.addEventListener("storage", function (e) {
    if (e.key === KEY) {
      document.documentElement.setAttribute("data-theme", savedTheme());
      updateButton();
    }
  });
})();