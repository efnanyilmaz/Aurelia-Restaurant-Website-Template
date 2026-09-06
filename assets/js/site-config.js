/* =====================================================================
   AURELIA — site-config.js
   ---------------------------------------------------------------------
   This is the ONE file to edit when you set up your own restaurant.
   Every page reads its WhatsApp number from here — change it once,
   it updates everywhere (cart checkout, contact form, reservation
   form, and every floating WhatsApp button).

   Phone format: international, digits only, no "+", no spaces.
   Example: a US number +1 555 123 4567 becomes "15551234567"

   © 2026 efnan.dev — All rights reserved. Licensed per LICENSE.txt.
   ===================================================================== */
window.SITE_CONFIG = {
  whatsapp: "900000000000"
};

/* Populate every static WhatsApp link on the page (floating button, etc.)
   as soon as this script runs — no need to hunt through each page's HTML. */
document.addEventListener("DOMContentLoaded", function () {
  var phone = window.SITE_CONFIG.whatsapp;
  document.querySelectorAll('a[data-whatsapp-link]').forEach(function (a) {
    var text = a.getAttribute('data-whatsapp-text') || '';
    a.href = "https://wa.me/" + phone + (text ? ("?text=" + text) : "");
  });
});
