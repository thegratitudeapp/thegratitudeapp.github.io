(function () {
  var search = document.getElementById("affirmation-search");
  var filterToggle = document.getElementById("affirmation-filter-toggle");
  var filterList = document.getElementById("affirmation-filter-list");
  var filterButtons = Array.prototype.slice.call(filterList.querySelectorAll("[data-filter]"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".aff-section"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".aff-card"));
  var status = document.getElementById("results-status");
  var empty = document.getElementById("empty-state");
  var clear = document.getElementById("clear-search");
  var activeFilter = "all";

  function updateLibrary() {
    var query = search.value.trim().toLowerCase();
    var visibleCount = 0;
    sections.forEach(function (section) {
      var sectionMatch = activeFilter === "all" || section.dataset.section === activeFilter;
      var sectionCount = 0;
      section.querySelectorAll(".aff-card").forEach(function (card) {
        var searchable = (card.dataset.search || card.dataset.name || "").toLowerCase();
        var show = sectionMatch && (!query || searchable.indexOf(query) !== -1);
        card.hidden = !show;
        if (show) sectionCount += 1;
      });
      section.hidden = sectionCount === 0;
      visibleCount += sectionCount;
    });
    empty.hidden = visibleCount !== 0;
    status.textContent = visibleCount === cards.length && !query && activeFilter === "all"
      ? "Showing all " + cards.length + " collections"
      : "Showing " + visibleCount + (visibleCount === 1 ? " collection" : " collections");
  }

  filterToggle.addEventListener("click", function () {
    var expanded = filterToggle.getAttribute("aria-expanded") === "true";
    filterToggle.setAttribute("aria-expanded", String(!expanded));
    filterToggle.querySelector("span:last-child").textContent = expanded ? "＋" : "−";
    filterList.hidden = expanded;
  });
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      filterToggle.querySelector("span:first-child").textContent = activeFilter === "all" ? "Categories" : button.textContent;
      filterToggle.setAttribute("aria-expanded", "false");
      filterToggle.querySelector("span:last-child").textContent = "＋";
      filterList.hidden = true;
      updateLibrary();
    });
  });
  search.addEventListener("input", updateLibrary);
  clear.addEventListener("click", function () {
    search.value = "";
    activeFilter = "all";
    filterButtons.forEach(function (item) {
      var active = item.dataset.filter === "all";
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    filterToggle.querySelector("span:first-child").textContent = "Categories";
    filterToggle.setAttribute("aria-expanded", "false");
    filterToggle.querySelector("span:last-child").textContent = "＋";
    filterList.hidden = true;
    updateLibrary();
    search.focus();
  });
  cards.forEach(function (card) {
    card.querySelectorAll("img").forEach(function (image) {
      image.addEventListener("error", function () { image.style.display = "none"; });
    });
  });
})();
