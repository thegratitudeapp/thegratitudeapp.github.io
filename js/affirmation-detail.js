window.addEventListener("load", function () {
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
