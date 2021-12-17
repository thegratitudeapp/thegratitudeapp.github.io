document.getElementById("download_now").addEventListener("click", gtag_report_conversion);
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-720171978/c1e_CIL6-YoDEMrns9cC',
      'event_callback': callback
  });
  return false;
}