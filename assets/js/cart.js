/* =====================================================================
   AURELIA — cart.js
   Simple shopping cart: persists in localStorage, checkout via WhatsApp.
   Include this script on every page that should show the cart icon/badge.

   © 2026 efnan.dev — All rights reserved. Licensed per LICENSE.txt.
   ===================================================================== */
(function () {
  const KEY = 'oo_cart_v1';
  const WHATSAPP_PHONE = (window.SITE_CONFIG && window.SITE_CONFIG.whatsapp) || '900000000000'; // set in assets/js/site-config.js

  function getCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCart(cart) {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {}
    renderBadge();
  }
  function parsePrice(p) {
    return parseFloat(String(p).replace(/[^0-9.]/g, '')) || 0;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function t(key, fallback) {
    return (window.__aureliaT && window.__aureliaT(key)) || fallback;
  }

  function addItem(item) {
    const cart = getCart();
    const existing = cart.find(c => c.id === item.id);
    if (existing) existing.qty += 1;
    else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    saveCart(cart);
    renderCart();
    openCart();
  }
  function updateQty(id, delta) {
    const cart = getCart();
    const it = cart.find(c => c.id === id);
    if (!it) return;
    it.qty += delta;
    saveCart(it.qty <= 0 ? cart.filter(c => c.id !== id) : cart);
    renderCart();
  }
  function removeItem(id) {
    saveCart(getCart().filter(c => c.id !== id));
    renderCart();
  }
  function clearCart() {
    saveCart([]);
    renderCart();
  }
  function total() {
    return getCart().reduce((sum, c) => sum + parsePrice(c.price) * c.qty, 0);
  }
  function count() {
    return getCart().reduce((sum, c) => sum + c.qty, 0);
  }

  function renderBadge() {
    const n = count();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = n;
      b.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  function renderCart() {
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    if (!body) return;
    const cart = getCart();
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty"><i class="fas fa-bag-shopping"></i><p data-i18n="cart-empty">' + esc(t('cart-empty', 'Your cart is empty')) + '</p></div>';
      if (footer) footer.style.display = 'none';
      return;
    }
    body.innerHTML = cart.map(c => `
      <div class="cart-item">
        <div class="ci-info">
          <div class="ci-name">${esc(c.name)}</div>
          <div class="ci-price">${esc(c.price)}</div>
        </div>
        <div class="ci-qty">
          <button class="qty-btn" data-action="dec" data-id="${esc(c.id)}" aria-label="Decrease quantity">−</button>
          <span>${c.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${esc(c.id)}" aria-label="Increase quantity">+</button>
        </div>
        <button class="ci-remove" data-action="remove" data-id="${esc(c.id)}" aria-label="Remove item"><i class="fas fa-trash"></i></button>
      </div>`).join('');
    if (footer) {
      footer.style.display = 'block';
      const totalEl = footer.querySelector('.cart-total-value');
      if (totalEl) totalEl.textContent = '$' + total().toFixed(0);
    }
  }

  function openCart() {
    const drawer = document.getElementById('cartDrawer');
    if (!drawer) return;
    renderCart();
    const body = document.getElementById('cartBody');
    if (body) body.scrollTop = 0;
    // Force the browser to commit a layout/paint pass with the new content
    // BEFORE the drawer becomes visible, then flip visibility on the next
    // animation frame. This combination avoids a stale-paint glitch some
    // browsers show for position:fixed panels whose content changes right
    // as they're revealed.
    void drawer.offsetHeight;
    requestAnimationFrame(() => {
      drawer.classList.add('open');
    });
  }
  function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    if (!drawer) return;
    drawer.classList.remove('open');
  }

  function checkoutWhatsApp() {
    const cart = getCart();
    if (!cart.length) return;

    let msg = t('whatsapp-order-intro', "Hi, I'd like to place an order:") + '\n';
    cart.forEach(c => { msg += `${c.qty}x ${c.name} — ${c.price}\n`; });
    msg += `\n${t('whatsapp-order-total', 'Total:')} $${total().toFixed(0)}`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    clearCart();
    closeCart();
  }

  window.AureliaCart = { addItem, updateQty, removeItem, clearCart, openCart, closeCart, checkoutWhatsApp, count, total, getCart };

  document.addEventListener('DOMContentLoaded', () => {
    renderBadge();
    renderCart();
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
      drawer.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) { if (e.target === drawer) closeCart(); return; }
        const { action, id } = btn.dataset;
        if (action === 'inc') updateQty(id, 1);
        if (action === 'dec') updateQty(id, -1);
        if (action === 'remove') removeItem(id);
      });
    }
    document.querySelectorAll('[data-cart-open]').forEach(b => b.addEventListener('click', openCart));
    document.querySelectorAll('[data-cart-close]').forEach(b => b.addEventListener('click', closeCart));
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkoutWhatsApp);
    const clearBtn = document.getElementById('cartClearBtn');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
  });
})();
