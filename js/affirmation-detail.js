window.addEventListener("load", function () {
  document.querySelectorAll("[data-app-event]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (typeof window.gtag !== "function") return;

      window.gtag("event", link.dataset.appEvent, {
        platform: link.dataset.appPlatform,
        collection: link.dataset.collection,
        source: "affirmation_button",
        page_path: window.location.pathname,
        link_url: link.href,
        transport_type: "beacon",
      });
    });
  });

  if (typeof window.QRCode !== "function") return;

  document.querySelectorAll(".detail-download-qr__code").forEach(function (container) {
    if (container.dataset.rendered) return;

    new window.QRCode(container, {
      text: container.dataset.url || "https://gratefulness.me/app/",
      width: 64,
      height: 64,
      colorDark: "#14181a",
      colorLight: "#ffffff",
      correctLevel: window.QRCode.CorrectLevel.M,
    });

    container.dataset.rendered = "true";
    container.closest(".detail-download-qr").classList.add("is-ready");
  });
});
