/* =====================================================================
   AURELIA — app.js
   Shared interactivity across all pages

   © 2026 efnan.dev — All rights reserved.
   Licensed per LICENSE.txt. Do not resell, sublicense, or redistribute
   this source as a standalone template/theme.
   ===================================================================== */
(function(){
  "use strict";

  /* ------------------------- LOADER -------------------------------- */
  const loader = document.querySelector('.loader');
  if(loader){
    window.addEventListener('load',()=>{
      setTimeout(()=>{
        loader.classList.add('done');
        document.documentElement.classList.add('page-ready');
      },650);
    });
    // fail-safe
    setTimeout(()=>{
      loader.classList.add('done');
      document.documentElement.classList.add('page-ready');
    },3200);
  } else {
    document.documentElement.classList.add('page-ready');
  }

  /* --------------------- HEADER ON SCROLL -------------------------- */
  const header = document.querySelector('.site-header');
  const onScroll = ()=>{
    if(header) header.classList.toggle('scrolled',window.scrollY>40);
    const st = document.querySelector('.scroll-top');
    if(st) st.classList.toggle('show',window.scrollY>600);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  /* ---------------------- MOBILE MENU ------------------------------ */
  const burger = document.querySelector('.burger');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  if(burger){
    burger.addEventListener('click',()=>document.body.classList.toggle('menu-open'));
    if(mobileNavClose){
      mobileNavClose.addEventListener('click',()=>document.body.classList.remove('menu-open'));
    }
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-nav-links a').forEach(a=>{
      const href = a.getAttribute('href');
      if(href === here || (here === '' && href === 'index.html')) a.classList.add('active');
      a.addEventListener('click',()=>document.body.classList.remove('menu-open'));
    });
    document.querySelectorAll('.mobile-nav a:not(.mobile-nav-links a)').forEach(a=>{
      a.addEventListener('click',()=>document.body.classList.remove('menu-open'));
    });
  }

  /* ------------------- AMBIENT MOTION (hero + buttons) --------------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if(!reduceMotion && finePointer){
    // Magnetic pull on primary buttons — a light nudge toward the cursor
    document.querySelectorAll('.btn-primary').forEach((btn)=>{
      btn.addEventListener('mousemove',(e)=>{
        const r = btn.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - .5;
        const my = (e.clientY - r.top) / r.height - .5;
        btn.style.translate = `${(mx*10).toFixed(1)}px ${(my*8).toFixed(1)}px`;
      });
      btn.addEventListener('mouseleave',()=>{ btn.style.translate = ''; });
    });
  }

  /* --------------------- LANGUAGE (TR default, EN available) -------- */

  const I18N = {
    en:{
      'nav-home':'Home',
      'nav-about':'About',
      'nav-menu':'Menu',
      'nav-gallery':'Gallery',
      'nav-contact':'Contact',
      'nav-reserve':'Reserve a Table',
      'nav-reserve-short':'Reserve',
      'footer-privacy':'Privacy Policy',
      'consent-text':'I have read and accept the <a href="privacy-policy.html" target="_blank">Privacy Notice</a> regarding the processing of my personal data.',
      'kvkk-kicker':'Legal',
      'kvkk-title-1':'Your Data,',
      'kvkk-title-2':'Your Rights',
      'kvkk-subtitle':'How we collect, use, and protect your personal information.',
      'kvkk-h1':'1. Who We Are',
      'kvkk-s1-p1':'This Privacy Policy explains how <strong>Aurelia</strong> ("we", "us", or "our") collects, uses, and protects the personal data you share with us through our website (<strong>www.yourdomain.com</strong>) or when you contact our restaurant.',
      'kvkk-s1-p2':'<strong>Restaurant address:</strong> 123 Example Street, Your City<br><strong>Phone:</strong> <a href="tel:+900000000000">0000 000 00 00</a><br><strong>E-mail:</strong> <a href="mailto:you@example.com">you@example.com</a>',
      'kvkk-h2':'2. Personal Data Processed',
      'kvkk-s2-p1':'If you fill out the contact form or place an order through our website, the following personal data of yours is processed:',
      'kvkk-s2-list':'<li><strong>Identity data:</strong> first and last name</li><li><strong>Contact data:</strong> e-mail address, phone number (if provided)</li><li><strong>Order data:</strong> items ordered and order timestamp</li><li><strong>Other:</strong> the content of the message you send us</li>',
      'kvkk-h3':'3. How We Use Your Data',
      'kvkk-s3-p1':'Your personal data is processed solely for the purposes of responding to your requests and messages, managing customer relations, processing orders and reservation requests, and maintaining communication with you. Your data is not used for any purpose other than those specified.',
      'kvkk-h4':'4. Legal Basis',
      'kvkk-s4-p1':'We process your personal data based on the consent you give when submitting our contact form or placing an order, and where necessary to fulfill a request you\'ve made or pursue legitimate business interests in a way that does not override your rights.',
      'kvkk-h5':'5. How We Share Your Data',
      'kvkk-s5-p1':'Our website does not transmit or store the information you enter in the contact or reservation forms itself. When you submit a form, your browser opens a pre-filled WhatsApp message for you to review and send; from that point on, the message is handled directly by WhatsApp (operated by Meta) as a conversation between you and our business, under WhatsApp\'s own privacy terms.',
      'kvkk-h6':'6. How Long We Keep Your Data',
      'kvkk-s6-p1':'Your personal data is retained for as long as required by the purpose of processing, subject to the statutory limitation periods set out in applicable legislation. It is deleted, destroyed, or anonymized within a reasonable period after your request has been resolved.',
      'kvkk-h7':'7. Your Rights',
      'kvkk-s7-p1':'Depending on where you live, applicable data protection laws (such as the GDPR, CCPA, or other local regulations) may give you the following rights:',
      'kvkk-s7-list':'<li>Learn whether your personal data is being processed,</li><li>Request access to the data we hold about you,</li><li>Learn the purpose of processing and whether it is used accordingly,</li><li>Know which third parties your data has been shared with,</li><li>Request correction of inaccurate or incomplete data,</li><li>Request deletion of your data, subject to applicable legal requirements,</li><li>Object to automated decision-making that affects you,</li><li>Withdraw consent at any time where processing is based on consent.</li>',
      'kvkk-h8':'8. How to Exercise Your Rights',
      'kvkk-s8-p1':'To exercise the rights listed above, you may submit your request by e-mail to <a href="mailto:you@example.com">you@example.com</a> or in writing to our restaurant address. Your request will be concluded free of charge as soon as possible, and no later than 30 days, depending on its nature.',
      'kvkk-h9':'9. Cookies',
      'kvkk-s9-p1':'Our website uses browser storage for technical purposes such as remembering the contents of your cart (<code>localStorage</code>). This information is kept on your device and does not serve any purpose of tracking your identity. Our website does not use advertising or third-party tracking cookies.',
      'notice-text':'We use your browser\'s local storage to remember your cart — no tracking cookies, nothing sent to third parties. See our <a href="privacy-policy.html">Privacy Policy</a> for details.',
      'notice-ok':'Got it',
      'kvkk-h10':'10. General Information',
      'kvkk-s10-p1':'As Aurelia, we respect the privacy of all guests who visit our website and contact us. Accordingly:',
      'kvkk-s10-list':'<li>Your personal data is processed only for explicitly stated purposes and to the extent necessary,</li><li>Your data is protected with reasonable technical and administrative measures,</li><li>Your data is not shared with third parties for marketing purposes without your consent,</li><li>This policy may be updated in line with changes in legislation or our business processes; the current version is always published on this page.</li>',
      'kvkk-h11':'11. Contact',
      'kvkk-s11-p1':'For questions about our privacy policy or the processing of your personal data, you can reach us through our <a href="contact.html">contact page</a> or directly at <a href="mailto:you@example.com">you@example.com</a>.',
      'hero-title-1':'Modern Plates,',
      'hero-title-2':'Timeless Flavor',
      'hero-kicker':'Your City · Italian Restaurant & Bar',
      'hero-desc':'Refined ingredients, a masterful Italian kitchen, and an unforgettable dining experience in a striking atmosphere.',
      'hero-btn1':'View Menu',
      'hero-btn2':'Who We Are',
      'about-kicker':'Our Story',
      'about-title-1':'It Started With a Table,',
      'about-title-2':'and Reached Today\'s Grandeur',
      'about-title-3':'',
      'about-text-1':'We believe a flawless dinner is not simply served, but experienced.',
      'about-text-2':'An elegant atmosphere, refined details, and a space designed with care.',
      'about-btn':'Discover Our Story',
      'stat-drinks':'Dishes on the Menu',
      'stat-beans':'Signature Dishes',
      'stat-open':'Open Every Day',
      'why-kicker':'Why Aurelia',
      'why-title-1':'It\'s all in the',
      'why-title-2':'little things',
      'why-text':'We put the same care into every step, from the market to the plate in front of you.',
      'card-title-1':'Seasonal, Refined Ingredients',
      'card-text-1':'We shape our menu by working with trusted growers and suppliers, built around the best the season offers.',
      'card-title-2':'Dishes Bearing the Chef\'s Signature',
      'card-text-2':'Every dish is carefully prepared to order in our open kitchen by our experienced chefs.',
      'card-title-3':'A Striking Atmosphere',
      'card-text-3':'An elegant decor and impeccable service come together for an unforgettable experience.',
      'featured-kicker':'Featured',
      'featured-title-1':'Our Signature',
      'featured-title-2':'flavors',
      'featured-text':'Alongside our classic menu, discover a few signature dishes found only at Aurelia. Visit our menu page for the full selection.',
      'featured-btn':'Full Menu',
      'testi-kicker':'Our Guests',
      'close-kicker':'Reserve',
      'close-title-1':'Reserve Your',
      'close-title-2':'Table',
      'close-text':'Our tables fill up quickly, especially on weekends. Book online and we\'ll confirm shortly.',
      'close-btn':'Reserve a Table',
      'home-contact-kicker':'Get In Touch',
      'home-contact-title-1':'Find Us,',
      'home-contact-title-2':'Visit Us',
      'home-contact-btn':'Contact Us',
      'gallery-kicker':'Gallery',
      'gallery-title-1':'Snapshots',
      'gallery-title-2':'From the Venue',
      'gallery-cta':'Explore Full Gallery',
      'gallery-page-desc':'The elegance of our space, our kitchen, and a selection of striking details.',
      'gallery-filter-all':'All',
      'gallery-filter-mekan':'Venue',
      'gallery-filter-kahve':'Food',
      'gallery-filter-atmosfer':'Atmosphere',
      'foot-tag':'Where elegance meets flavor.',
      'foot-explore':'Explore',
      'foot-hours':'Opening Hours',
      'foot-contact':'Contact',
      'foot-everyday':'Every day',
      'search-ph':'Search dishes, drinks…',
      'footer-address':'123 Example Street, Your City',
      'footer-rights':'All rights reserved.',
      'footer-slogan':'Exceptional flavors, crafted with care',
      'story-title-1':'Elegant,',
      'story-title-2':'Striking',
      'story-text':'An exceptional dining experience built on perfection and elegance.',
      'origin-kicker':'Our Ingredients',
      'origin-title-1':'Sourced with',
      'origin-title-2':' Intention',
      'origin-subtitle':'Each ingredient chosen for where it comes from, not just what it costs.',
      'origin-eth-name':'Coastal Waters',
      'origin-eth-region':'Wild-Caught',
      'origin-eth-desc':'Sea bass and calamari, sourced fresh through trusted local suppliers.',
      'origin-col-name':'Highland Farms',
      'origin-col-region':'Grass-Fed',
      'origin-col-desc':'Pasture-raised beef and veal, aged in-house for depth of flavor.',
      'origin-gua-name':'Select Growers',
      'origin-gua-region':'Heirloom',
      'origin-gua-desc':'Tomatoes and mushrooms, picked and selected at their peak each week.',
      'origin-ken-name':'Artisan Dairies',
      'origin-ken-region':'Aged',
      'origin-ken-desc':'Burrata, aged parmesan and blue cheese from small-batch producers.',
      'beans-kicker':'Our Kitchen',
      'beans-title-1':'Precision,',
      'beans-title-2':'Paired With Elegance',
      'beans-text-1':'Every ingredient earns its place on the plate.',
      'beans-text-2':'Every technique serves the ingredient.',
      'beans-text-3':'The details you don\'t notice are the ones we notice most.',
      'menu-kicker':'The Menu',
      'menu-title-1':'Seasonal,',
      'menu-title-2':'Refined',
      'menu-text':'Classic Italian dishes, reimagined with elegance.',
      'filter-all':'All',
      'chip-antipasti':'Antipasti',
      'chip-secondi':'Secondi',
      'chip-insalate':'Insalate',
      'chip-vini':'Vini & Cocktail',
      'chip-pasta':'Pizza & Pasta',
      'chip-contorni':'Contorni',
      'chip-caffe':'Caffè & Tè',
      'chip-dolci':'Dolci',
      'no-results':'No dishes matched your search.',
      'menu-note':'Vegetarian options marked V · Prices include tax',
      'contact-kicker':'Contact',
      'contact-title-1':'We\'re Here',
      'contact-title-2':'For Your Questions',
      'contact-text':'Reach out for reservations, inquiries, or anything else.',
      'info-kicker':'Contact Information',
      'address-title':'Address',
      'phone-title':'Phone',
      'mail-title':'E-mail',
      'social-title':'Social',
      'form-kicker':'Contact Form',
      'form-title-1':'Send Us a',
      'form-title-2':'Message',
      'label-name':'Name',
      'label-phone':'Phone',
      'label-email':'E-mail',
      'label-message':'Your Message',
      'ph-name':'Your Full Name',
      'ph-phone':'0000 000 00 00',
      'ph-email':'example@mail.com',
      'ph-message':'How can we help you?',
      'send-btn':'Send',

      'res-kicker':'Reservations',
      'res-title-1':'Reserve',
      'res-title-2':'Your Table',
      'res-desc':'Choose a date and how many you\'ll be — we\'ll confirm shortly.',
      'res-info-kicker':'Good to Know',
      'res-info-title-1':'Before You',
      'res-info-title-2':'Book',
      'res-info-text':'Tables are held for 15 minutes past the reserved time. We\'ll confirm your request by phone or e-mail within a few hours.',
      'res-fact-hold-lbl':'Hold Time',
      'res-fact-hold-val':'15 Minutes',
      'res-fact-guests-lbl':'Guests',
      'res-fact-guests-val':'Up to 10 Online',
      'res-fact-hours-lbl':'Hours',
      'res-fact-larger-lbl':'Larger Groups',
      'res-form-kicker':'Reservation Form',
      'res-form-title-1':'Request Your',
      'res-form-title-2':'Table',
      'res-label-date':'Date',
      'res-label-time':'Time',
      'res-label-guests':'Guests',
      'res-guest-1':'1 guest',
      'res-guest-2':'2 guests',
      'res-guest-3':'3 guests',
      'res-guest-4':'4 guests',
      'res-guest-5':'5 guests',
      'res-guest-6':'6 guests',
      'res-guest-7':'7 guests',
      'res-guest-8':'8 guests',
      'res-guest-9':'9 guests',
      'res-guest-10':'10 guests',
      'res-label-notes':'Special Requests',
      'res-notes-optional':'(optional)',
      'res-ph-notes':'Celebrations, seating preference…',
      'res-submit-btn':'Request Reservation',
      'res-submit-sending':'Sending…',
      'res-toast-name':'Please enter your name.',
      'res-toast-phone':'Please enter a phone number.',
      'res-toast-email':'Please enter a valid e-mail address.',
      'res-toast-date':'Please choose a date.',
      'res-toast-time':'Please choose a time.',
      'res-toast-consent':'Please accept the Privacy Notice to continue.',
      'res-toast-success':'✓ Opening WhatsApp with your reservation details — just hit send there!',
      'res-toast-error':'An error occurred while sending. Please try again.',

      'announce-text':'Tonight: Live Jazz from 8 PM — walk-ins welcome.',
      'tonight-badge':'Open Now',
      'tonight-title':'Tonight',
      'tonight-live-name':'Live Jazz',
      'tonight-live-sub':'Main Dining Room · 8 PM',
      'tonight-live-desc':'A rotating lineup of local trios keeps the room warm past dinner.',
      'tonight-kitchen-name':'Kitchen',
      'tonight-kitchen-sub':'Until 11:00 PM',
      'tonight-kitchen-desc':'Last orders taken thirty minutes before close, plated to order.',
      'tonight-bar-name':'The Bar',
      'tonight-bar-sub':'Until Midnight',
      'tonight-bar-desc':'Cocktails and a short list of late-night bites, poured slow.',
      'tag-vegetarian':'Vegetarian',
      'tag-classic':'Classic',
      'tag-signature':'Signature',
      'tag-slow-baked':'Slow-Baked',
      'finale-rating-text':'4.9 · 500+ Google Reviews',
      'foot-nav-faq':'FAQ',
      'cart-title':'Your Order',
      'cart-empty':'Your cart is empty',
      'cart-total-label':'Total',
      'cart-checkout-btn':'Order via WhatsApp',
      'cart-clear-btn':'Clear cart',
      'whatsapp-order-intro':'Hi, I\'d like to place an order:',
      'whatsapp-order-total':'Total:',
      'faq-kicker':'FAQ',
      'faq-title-1':'Good to',
      'faq-title-2':'Know',
      'faq-intro':'Answers to what our guests ask most. Can\'t find yours? Message us on WhatsApp.',
      'faq-q1':'Do you take reservations for large groups?',
      'faq-a1':'Yes — for parties of up to 10, use our <a href="reservation.html">online reservation form</a>. For larger groups, please call us directly at <a href="tel:+900000000000">0000 000 00 00</a> so we can arrange the right table and timing.',
      'faq-q2':'Is there parking available?',
      'faq-a2':'Street parking is available nearby, and there\'s a public parking garage within a short walking distance. Valet service is available on weekend evenings.',
      'faq-q3':'Can you accommodate dietary restrictions or allergies?',
      'faq-a3':'Absolutely. Please note any allergies or dietary needs when you make your reservation, or let your server know when you arrive — our kitchen is happy to adapt most dishes.',
      'faq-q4':'Is there a dress code?',
      'faq-a4':'We recommend smart casual attire. There\'s no strict dress code, but we ask guests to avoid beachwear or athletic wear in the evening.',
      'faq-q5':'Can I modify or cancel my reservation?',
      'faq-a5':'Yes — just message us on WhatsApp or call with your name and reservation time, and we\'ll update it for you. We appreciate a few hours\' notice when possible.',
      'faq-q6':'Do you have vegetarian or vegan options?',
      'faq-a6':'Yes, several dishes on our <a href="menu.html">menu</a> are vegetarian, and we\'re glad to prepare vegan alternatives on request — just let your server know.',
      'faq-q7':'Do you host private events or offer catering?',
      'faq-a7':'Yes — from intimate dinners to full restaurant buyouts. Message us on WhatsApp to start planning.',
      'faq-q8':'What are your opening hours?',
      'faq-a8':'We\'re open every day from 8 PM to midnight.',
      'faq-still-kicker':'Still Have a Question?',
      'faq-ask-btn':'Ask on WhatsApp',
      '404-kicker':'404 Error',
      '404-title-1':'Page',
      '404-title-2':'Not Found',
      '404-text':'The page you\'re looking for doesn\'t exist, may have moved, or the link might be mistyped. Let\'s get you back on track.',
      '404-btn-home':'Back to Home',
    },
    tr:{
      'nav-home':'Ana Sayfa',
      'nav-about':'Hakkımızda',
      'nav-menu':'Menü',
      'nav-gallery':'Galeri',
      'nav-contact':'İletişim',
      'nav-reserve':'Rezervasyon',
      'nav-reserve-short':'Rezervasyon',
      'footer-privacy':'Gizlilik Politikası',
      'consent-text':'Kişisel verilerimin işlenmesine ilişkin <a href="privacy-policy.html" target="_blank">Gizlilik Politikası\'nı</a> okudum ve kabul ediyorum.',
      'kvkk-kicker':'Yasal Bilgilendirme',
      'kvkk-title-1':'Verileriniz,',
      'kvkk-title-2':'Haklarınız',
      'kvkk-subtitle':'Kişisel verilerinizin toplanması, kullanılması ve korunmasına ilişkin bilgilendirme.',
      'kvkk-h1':'1. Kimiz',
      'kvkk-s1-p1':'Bu Gizlilik Politikası, <strong>Aurelia</strong>\'nın ("biz", "bize" veya "bizim") web sitemiz (<strong>www.yourdomain.com</strong>) üzerinden bizimle paylaştığınız veya restoranımızla iletişime geçtiğinizde elde ettiğimiz kişisel verilerinizi nasıl topladığını, kullandığını ve koruduğunu açıklar.',
      'kvkk-s1-p2':'<strong>Restoran adresi:</strong> 123 Example Street, Your City<br><strong>Telefon:</strong> <a href="tel:+900000000000">0000 000 00 00</a><br><strong>E-posta:</strong> <a href="mailto:you@example.com">you@example.com</a>',
      'kvkk-h2':'2. İşlenen Kişisel Veriler',
      'kvkk-s2-p1':'Web sitemiz üzerinden iletişim formunu doldurduğunuzda veya sipariş verdiğinizde, aşağıdaki kişisel verileriniz işlenir:',
      'kvkk-s2-list':'<li><strong>Kimlik verisi:</strong> ad ve soyad</li><li><strong>İletişim verisi:</strong> e-posta adresi, telefon numarası (belirtilmişse)</li><li><strong>Sipariş verisi:</strong> sipariş edilen ürünler ve sipariş zamanı</li><li><strong>Diğer:</strong> bize gönderdiğiniz mesajın içeriği</li>',
      'kvkk-h3':'3. Verilerinizi Nasıl Kullanıyoruz',
      'kvkk-s3-p1':'Kişisel verileriniz yalnızca taleplerinize ve mesajlarınıza yanıt vermek, müşteri ilişkilerini yönetmek, sipariş ve rezervasyon taleplerini işlemek ve sizinle iletişimi sürdürmek amacıyla işlenir. Verileriniz belirtilen amaçlar dışında hiçbir şekilde kullanılmaz.',
      'kvkk-h4':'4. Hukuki Dayanak',
      'kvkk-s4-p1':'Kişisel verilerinizi, iletişim formumuzu gönderirken veya sipariş verirken verdiğiniz onaya dayanarak; gerektiğinde talebinizi yerine getirmek veya haklarınızı zedelemeyecek şekilde meşru iş çıkarlarını sürdürmek amacıyla işliyoruz.',
      'kvkk-h5':'5. Verilerinizi Nasıl Paylaşıyoruz',
      'kvkk-s5-p1':'Web sitemiz, iletişim veya rezervasyon formlarına girdiğiniz bilgileri kendisi iletmez veya saklamaz. Bir formu gönderdiğinizde, tarayıcınız incelemeniz ve göndermeniz için önceden doldurulmuş bir WhatsApp mesajı açar; bu noktadan itibaren mesaj, WhatsApp\'ın (Meta tarafından işletilen) kendi gizlilik koşulları altında, sizinle işletmemiz arasındaki bir görüşme olarak doğrudan WhatsApp tarafından yönetilir.',
      'kvkk-h6':'6. Verilerinizi Ne Kadar Süre Saklıyoruz',
      'kvkk-s6-p1':'Kişisel verileriniz, yürürlükteki mevzuatta belirtilen yasal zamanaşımı süreleri saklı kalmak kaydıyla, işleme amacının gerektirdiği süre boyunca saklanır. Talebiniz sonuçlandıktan sonra makul bir süre içinde silinir, yok edilir veya anonim hale getirilir.',
      'kvkk-h7':'7. Haklarınız',
      'kvkk-s7-p1':'Yaşadığınız yere bağlı olarak, yürürlükteki veri koruma yasaları (GDPR, CCPA veya diğer yerel düzenlemeler gibi) size aşağıdaki hakları tanıyabilir:',
      'kvkk-s7-list':'<li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li><li>Sizinle ilgili tuttuğumuz verilere erişim talep etme,</li><li>İşleme amacını ve buna uygun kullanılıp kullanılmadığını öğrenme,</li><li>Verilerinizin hangi üçüncü taraflarla paylaşıldığını bilme,</li><li>Yanlış veya eksik verilerin düzeltilmesini talep etme,</li><li>Yürürlükteki yasal gereklilikler saklı kalmak kaydıyla verilerinizin silinmesini talep etme,</li><li>Sizi etkileyen otomatik karar alma süreçlerine itiraz etme,</li><li>İşleme onaya dayandığında onayınızı istediğiniz zaman geri çekme.</li>',
      'kvkk-h8':'8. Haklarınızı Nasıl Kullanabilirsiniz',
      'kvkk-s8-p1':'Yukarıda sıralanan hakları kullanmak için talebinizi <a href="mailto:you@example.com">you@example.com</a> adresine e-posta yoluyla veya yazılı olarak restoran adresimize iletebilirsiniz. Talebiniz, niteliğine bağlı olarak en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.',
      'kvkk-h9':'9. Çerezler',
      'kvkk-s9-p1':'Web sitemiz, sepetinizin içeriğini hatırlamak gibi teknik amaçlarla tarayıcı depolamasını (<code>localStorage</code>) kullanır. Bu bilgi cihazınızda tutulur ve kimliğinizi takip etmek gibi bir amaca hizmet etmez. Web sitemiz reklam veya üçüncü taraf takip çerezleri kullanmaz.',
      'notice-text':'Sepetinizi hatırlamak için yalnızca tarayıcınızın yerel depolamasını kullanıyoruz; takip çerezi yok, üçüncü taraflara hiçbir bilgi gönderilmez. Ayrıntılar için <a href="privacy-policy.html">Gizlilik Politikası</a> sayfamıza göz atın.',
      'notice-ok':'Anladım',
      'kvkk-h10':'10. Genel Bilgilendirme',
      'kvkk-s10-p1':'Aurelia olarak, web sitemizi ziyaret eden ve bizimle iletişime geçen tüm misafirlerimizin gizliliğine saygı duyuyoruz. Buna göre:',
      'kvkk-s10-list':'<li>Kişisel verileriniz yalnızca açıkça belirtilen amaçlar için ve gerektiği ölçüde işlenir,</li><li>Verileriniz makul teknik ve idari önlemlerle korunur,</li><li>Verileriniz onayınız olmadan pazarlama amacıyla üçüncü taraflarla paylaşılmaz,</li><li>Bu politika, mevzuat veya iş süreçlerimizdeki değişikliklere paralel olarak güncellenebilir; güncel sürüm her zaman bu sayfada yayınlanır.</li>',
      'kvkk-h11':'11. İletişim',
      'kvkk-s11-p1':'Gizlilik politikamız veya kişisel verilerinizin işlenmesi hakkında sorularınız için <a href="contact.html">iletişim sayfamızdan</a> veya doğrudan <a href="mailto:you@example.com">you@example.com</a> adresinden bize ulaşabilirsiniz.',
      'hero-title-1':'Modern Sunumlar,',
      'hero-title-2':'Zamansız Lezzet',
      'hero-kicker':'Şehriniz · İtalyan Restoranı & Bar',
      'hero-desc':'Seçkin malzemeler, usta bir İtalyan mutfağı ekibi ve göz alıcı bir atmosferde eşsiz bir akşam yemeği deneyimi.',
      'hero-btn1':'Menüyü İncele',
      'hero-btn2':'Hakkımızda',
      'about-kicker':'Hikayemiz',
      'about-title-1':'Tek Bir Masayla Başladı,',
      'about-title-2':'Bugünkü İhtişamına Ulaştı',
      'about-title-3':'',
      'about-text-1':'Kusursuz bir akşam yemeğinin yalnızca sunulmadığına, deneyimlendiğine inanıyoruz.',
      'about-text-2':'Zarif bir atmosfer, seçkin detaylar ve özenle tasarlanmış bir mekan.',
      'about-btn':'Hikayemizi Keşfedin',
      'stat-drinks':'Menüdeki Yemek Sayısı',
      'stat-beans':'İmza Lezzetler',
      'stat-open':'Her Gün Açık',
      'why-kicker':'Neden Aurelia',
      'why-title-1':'Fark,',
      'why-title-2':'her detayda gizli',
      'why-text':'Seçkin malzemelerden zarif sunuma, her aşamada aynı özeni gösteriyoruz.',
      'card-title-1':'Mevsimlik ve Seçkin Malzemeler',
      'card-text-1':'Menümüzü güvenilir üretici ve tedarikçilerle çalışarak, mevsimin en iyi ürünlerine göre şekillendiriyoruz.',
      'card-title-2':'Şefin İmzasını Taşıyan Sunumlar',
      'card-text-2':'Her tabak, açık mutfağımızda deneyimli şeflerimiz tarafından özenle hazırlanır.',
      'card-title-3':'Göz Alıcı Bir Atmosfer',
      'card-text-3':'Zarif bir dekor ve kusursuz bir servis anlayışıyla unutulmaz bir deneyim sunuyoruz.',
      'featured-kicker':'Öne Çıkanlar',
      'featured-title-1':'Seçkin',
      'featured-title-2':'lezzetlerimiz',
      'featured-text':'Klasik menümüzün yanı sıra, yalnızca Aurelia\'ya özgü birkaç imza tabağımızı da keşfedin. Tüm seçenekler için menü sayfamızı inceleyebilirsiniz.',
      'featured-btn':'Tüm Menü',
      'testi-kicker':'Misafir Yorumları',
      'close-kicker':'Rezervasyon',
      'close-title-1':'Masanızı',
      'close-title-2':'Ayırtın',
      'close-text':'Özellikle hafta sonları masalarımız hızla dolmaktadır. Online rezervasyon oluşturabilir, kısa süre içinde onay alabilirsiniz.',
      'close-btn':'Rezervasyon',
      'home-contact-kicker':'İletişim',
      'home-contact-title-1':'Bize Ulaşın,',
      'home-contact-title-2':'Bizi Ziyaret Edin',
      'home-contact-btn':'İletişime Geçin',
      'gallery-kicker':'Galeri',
      'gallery-title-1':'Mekandan',
      'gallery-title-2':'Kareler',
      'gallery-cta':'Galeriyi İnceleyin',
      'gallery-page-desc':'Mekanımızın zarafeti, mutfağımız ve göz alıcı detaylardan bir seçki.',
      'gallery-filter-all':'Tümü',
      'gallery-filter-mekan':'Mekan',
      'gallery-filter-kahve':'Yemek',
      'gallery-filter-atmosfer':'Atmosfer',
      'foot-tag':'Zarafetin ve lezzetin buluştuğu adres.',
      'foot-explore':'Keşfet',
      'foot-hours':'Çalışma Saatleri',
      'foot-contact':'İletişim',
      'foot-everyday':'Her gün',
      'search-ph':'Yemek veya içecek arayın',
      'footer-address':'123 Example Street, Your City',
      'footer-rights':'Tüm hakları saklıdır.',
      'footer-slogan':'Özenle hazırlanan eşsiz lezzetler',
      'story-title-1':'Zarif,',
      'story-title-2':'Etkileyici',
      'story-text':'Kusursuzluk ve zarafet üzerine kurulu, seçkin bir restoran deneyimi.',
      'origin-kicker':'Malzemelerimiz',
      'origin-title-1':'Kaynağına',
      'origin-title-2':' Önem Veriyoruz',
      'origin-subtitle':'Her malzemeyi yalnızca maliyetine göre değil, kaynağına göre de özenle seçiyoruz.',
      'origin-eth-name':'Kıyı Sularından',
      'origin-eth-region':'Doğal Avlanmış',
      'origin-eth-desc':'Levrek ve kalamar; güvenilir yerel tedarikçilerden taze olarak temin edilir.',
      'origin-col-name':'Yayla Çiftliklerinden',
      'origin-col-region':'Otla Beslenmiş',
      'origin-col-desc':'Otlakta yetiştirilen dana ve dana pirzola, lezzet derinliği için kendi tesisimizde olgunlaştırılır.',
      'origin-gua-name':'Seçkin Üreticilerden',
      'origin-gua-region':'Yerli Tür',
      'origin-gua-desc':'Domates ve mantar, her hafta en olgun döneminde özenle seçilir.',
      'origin-ken-name':'Butik Mandıralardan',
      'origin-ken-region':'Olgunlaştırılmış',
      'origin-ken-desc':'Küçük ölçekli üreticilerden temin edilen burrata, olgun parmesan ve mavi peynir.',
      'beans-kicker':'Mutfağımız',
      'beans-title-1':'Sadelik,',
      'beans-title-2':'Zarafetle Bir Arada',
      'beans-text-1':'Her malzeme tabaktaki yerini hak eder.',
      'beans-text-2':'Her teknik, malzemeye hizmet eder.',
      'beans-text-3':'Fark edilmeyen detaylar, bizim için en önemli olanlardır.',
      'menu-kicker':'Menü',
      'menu-title-1':'Mevsimlik ve',
      'menu-title-2':'Rafine',
      'menu-text':'Zarafetle yeniden yorumlanmış klasik İtalyan lezzetleri.',
      'filter-all':'Tümü',
      'chip-antipasti':'Başlangıçlar',
      'chip-secondi':'Ana Yemekler',
      'chip-insalate':'Salatalar',
      'chip-vini':'Şarap & Kokteyl',
      'chip-pasta':'Pizza & Makarna',
      'chip-contorni':'Garnitürler',
      'chip-caffe':'Kahve & Çay',
      'chip-dolci':'Tatlılar',
      'no-results':'Aramanızla eşleşen bir sonuç bulunamadı.',
      'menu-note':'Vejetaryen seçenekler V ile belirtilmiştir · Fiyatlara vergi dahildir.',
      'contact-kicker':'İletişim',
      'contact-title-1':'Sorularınız',
      'contact-title-2':'İçin Buradayız',
      'contact-text':'Rezervasyon, bilgi talebi veya başka bir konu için bize ulaşabilirsiniz.',
      'info-kicker':'İletişim Bilgileri',
      'address-title':'Adres',
      'phone-title':'Telefon',
      'mail-title':'E-posta',
      'social-title':'Sosyal Medya',
      'form-kicker':'İletişim Formu',
      'form-title-1':'Bize',
      'form-title-2':'Yazın',
      'label-name':'Ad Soyad',
      'label-phone':'Telefon',
      'label-email':'E-posta',
      'label-message':'Mesajınız',
      'ph-name':'Ad Soyad',
      'ph-phone':'0000 000 00 00',
      'ph-email':'ornek@mail.com',
      'ph-message':'Mesajınızı yazın',
      'send-btn':'Gönder',

      'res-kicker':'Rezervasyon',
      'res-title-1':'Masanızı',
      'res-title-2':'Ayırtın',
      'res-desc':'Tarih ve kişi sayısını seçin, kısa süre içinde onaylayalım.',
      'res-info-kicker':'Bilmeniz Gerekenler',
      'res-info-title-1':'Rezervasyon',
      'res-info-title-2':'Öncesi',
      'res-info-text':'Masalar, rezervasyon saatinden 15 dakika sonrasına kadar tutulur. Talebinizi birkaç saat içinde telefon veya e-posta yoluyla onaylarız.',
      'res-fact-hold-lbl':'Tutma Süresi',
      'res-fact-hold-val':'15 Dakika',
      'res-fact-guests-lbl':'Kişi Sayısı',
      'res-fact-guests-val':'Online 10 Kişiye Kadar',
      'res-fact-hours-lbl':'Çalışma Saatleri',
      'res-fact-larger-lbl':'Kalabalık Gruplar',
      'res-form-kicker':'Rezervasyon Formu',
      'res-form-title-1':'Masanızı',
      'res-form-title-2':'Talep Edin',
      'res-label-date':'Tarih',
      'res-label-time':'Saat',
      'res-label-guests':'Kişi Sayısı',
      'res-guest-1':'1 kişi',
      'res-guest-2':'2 kişi',
      'res-guest-3':'3 kişi',
      'res-guest-4':'4 kişi',
      'res-guest-5':'5 kişi',
      'res-guest-6':'6 kişi',
      'res-guest-7':'7 kişi',
      'res-guest-8':'8 kişi',
      'res-guest-9':'9 kişi',
      'res-guest-10':'10 kişi',
      'res-label-notes':'Özel İstekler',
      'res-notes-optional':'(isteğe bağlı)',
      'res-ph-notes':'Kutlamalar, oturma tercihi…',
      'res-submit-btn':'Rezervasyon Talep Et',
      'res-submit-sending':'Gönderiliyor…',
      'res-toast-name':'Lütfen adınızı girin.',
      'res-toast-phone':'Lütfen bir telefon numarası girin.',
      'res-toast-email':'Lütfen geçerli bir e-posta adresi girin.',
      'res-toast-date':'Lütfen bir tarih seçin.',
      'res-toast-time':'Lütfen bir saat seçin.',
      'res-toast-consent':'Devam etmek için lütfen Gizlilik Politikası\'nı kabul edin.',
      'res-toast-success':'✓ WhatsApp, rezervasyon detaylarınızla açılıyor — göndermeniz yeterli!',
      'res-toast-error':'Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.',

      'announce-text':'Bu akşam saat 20:00\'den itibaren canlı caz — rezervasyonsuz misafirler de ağırlanır.',
      'tonight-badge':'Şu An Açık',
      'tonight-title':'Bu Akşam',
      'tonight-live-name':'Canlı Caz',
      'tonight-live-sub':'Ana Salon · 20:00',
      'tonight-live-desc':'Değişen yerel müzik gruplarımız, akşam boyunca mekana canlı bir hava katıyor.',
      'tonight-kitchen-name':'Mutfak',
      'tonight-kitchen-sub':'23:00\'e kadar',
      'tonight-kitchen-desc':'Son siparişler kapanıştan otuz dakika önce alınır, siparişe özel hazırlanır.',
      'tonight-bar-name':'Bar',
      'tonight-bar-sub':'Gece yarısına kadar',
      'tonight-bar-desc':'Kokteyller ve gece geç saatlere özel, seçili birkaç lezzet.',
      'tag-vegetarian':'Vejetaryen',
      'tag-classic':'Klasik',
      'tag-signature':'İmza Lezzet',
      'tag-slow-baked':'Fırında Pişmiş',
      'finale-rating-text':'4,9 · 500+ Google Değerlendirmesi',
      'foot-nav-faq':'S.S.S.',
      'cart-title':'Siparişiniz',
      'cart-empty':'Sepetiniz boş',
      'cart-total-label':'Toplam',
      'cart-checkout-btn':'WhatsApp ile Sipariş Verin',
      'cart-clear-btn':'Sepeti Temizle',
      'whatsapp-order-intro':'Merhaba, bir sipariş vermek istiyorum:',
      'whatsapp-order-total':'Toplam:',
      'faq-kicker':'S.S.S.',
      'faq-title-1':'Bilmeniz Gereken',
      'faq-title-2':'Detaylar',
      'faq-intro':'Misafirlerimizin en sık sorduğu sorulara yanıtlar. Aradığınız yanıtı bulamadıysanız, bize WhatsApp üzerinden ulaşabilirsiniz.',
      'faq-q1':'Kalabalık gruplar için rezervasyon alıyor musunuz?',
      'faq-a1':'Evet — 10 kişiye kadar olan gruplar için <a href="reservation.html">online rezervasyon formumuzu</a> kullanabilirsiniz. Daha kalabalık gruplar için lütfen bizi doğrudan <a href="tel:+900000000000">0000 000 00 00</a> numarasından arayın; size en uygun masa ve saati birlikte planlayalım.',
      'faq-q2':'Otopark imkanı var mı?',
      'faq-a2':'Yakın çevrede cadde üzeri park imkanı bulunmaktadır; ayrıca kısa yürüme mesafesinde bir umumi otopark mevcuttur. Hafta sonu akşamları vale hizmeti sunulmaktadır.',
      'faq-q3':'Alerji veya özel beslenme ihtiyaçlarına uygun seçenekler sunuyor musunuz?',
      'faq-a3':'Elbette. Rezervasyon sırasında alerjilerinizi veya beslenme ihtiyaçlarınızı belirtebilir, ya da masanıza geldiğinizde personelimize iletebilirsiniz — mutfağımız çoğu tabağı isteğinize göre uyarlamaktan memnuniyet duyar.',
      'faq-q4':'Kıyafet kuralı var mı?',
      'faq-a4':'Şık-günlük bir kıyafet öneriyoruz. Kesin bir kıyafet kuralı olmamakla birlikte, akşam saatlerinde plaj kıyafeti veya spor kıyafeti tercih edilmemesini rica ediyoruz.',
      'faq-q5':'Rezervasyonumu değiştirebilir veya iptal edebilir miyim?',
      'faq-a5':'Evet — bize WhatsApp üzerinden yazmanız veya adınız ve rezervasyon saatinizle birlikte aramanız yeterli, sizin için güncelleriz. Mümkünse birkaç saat önceden haber vermenizi rica ederiz.',
      'faq-q6':'Vejetaryen veya vegan seçenekleriniz var mı?',
      'faq-a6':'Evet, <a href="menu.html">menümüzde</a> çeşitli vejetaryen tabaklar bulunmaktadır; talep üzerine vegan alternatifler de hazırlamaktan memnuniyet duyarız — personelimize iletmeniz yeterli.',
      'faq-q7':'Özel etkinlik veya catering hizmeti sunuyor musunuz?',
      'faq-a7':'Evet — samimi akşam yemeklerinden mekanın tamamının kiralanmasına kadar çeşitli seçenekler sunuyoruz. Planlamaya başlamak için bize WhatsApp üzerinden ulaşabilirsiniz.',
      'faq-q8':'Çalışma saatleriniz nedir?',
      'faq-a8':'Her gün akşam 20:00 ile gece yarısı arasında hizmet vermekteyiz.',
      'faq-still-kicker':'Başka Bir Sorunuz mu Var?',
      'faq-ask-btn':'WhatsApp\'tan Sorun',
      '404-kicker':'404 Hata',
      '404-title-1':'Sayfa',
      '404-title-2':'Bulunamadı',
      '404-text':'Aradığınız sayfa mevcut değil, taşınmış olabilir ya da bağlantı hatalı yazılmış olabilir. Sizi doğru yere yönlendirelim.',
      '404-btn-home':'Ana Sayfaya Dön',
    }
  };

  function getLang(){
    try { return localStorage.getItem('aurelia-lang') || 'tr'; } catch(e){ return 'tr'; }
  }

  function syncLangSwitchUI(lang){
    document.querySelectorAll('.lang-switch button').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  function applyLang(lang){
    const dict = I18N[lang] || I18N.tr;
    const fallback = I18N.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      const v = dict[k] != null ? dict[k] : fallback[k];
      if(v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const k = el.getAttribute('data-i18n-ph');
      const v = dict[k] != null ? dict[k] : fallback[k];
      if(v != null) el.setAttribute('placeholder', v);
    });
    syncLangSwitchUI(lang);
  }

  function setLang(lang){
    try { localStorage.setItem('aurelia-lang', lang); } catch(e){}
    applyLang(lang);
    document.dispatchEvent(new CustomEvent('aurelia:langchange', { detail:{ lang } }));
  }
  window.__aureliaSetLang = setLang;
  window.__aureliaGetLang = getLang;
  window.__aureliaT = function(key){
    const dict = I18N[getLang()] || I18N.tr;
    return dict[key] != null ? dict[key] : I18N.en[key];
  };

  document.querySelectorAll('.lang-switch button').forEach(function(btn){
    btn.addEventListener('click', function(){ setLang(btn.getAttribute('data-lang')); });
  });

  applyLang(getLang());


  /* ----------------------- SCROLL REVEAL --------------------------- */
  const revs = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revs.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}
      });
    },{threshold:.14,rootMargin:'0px 0px -60px 0px'});
    revs.forEach(r=>io.observe(r));
  }else{
    revs.forEach(r=>r.classList.add('in'));
  }

  /* ------------------- STORY PROGRESS (About page) ------------------ */
  const storyArc = document.querySelector('.story-arc');
  if(storyArc && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    let ticking = false;
    const updateStoryProgress = () => {
      const r = storyArc.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh * .5;
      const scrolled = (vh * .5) - r.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      storyArc.style.setProperty('--p', p.toFixed(3));
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if(!ticking){ requestAnimationFrame(updateStoryProgress); ticking = true; }
    }, {passive:true});
    updateStoryProgress();
  }

  /* ------------------------- COUNTERS ------------------------------ */
  const counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window && counters.length){
    const cio = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(!en.isIntersecting) return;
        const el = en.target, target = parseFloat(el.dataset.count),
              suffix = el.dataset.suffix||'', dur = 1400, t0 = performance.now();
        const tick = (t)=>{
          const p = Math.min((t-t0)/dur,1);
          const ease = 1-Math.pow(1-p,3);
          el.textContent = (target%1?(target*ease).toFixed(1):Math.floor(target*ease))+suffix;
          if(p<1) requestAnimationFrame(tick);
          else el.textContent = target+suffix;
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    },{threshold:.5});
    counters.forEach(c=>cio.observe(c));
  }

  /* -------------------------- LIGHTBOX ----------------------------- */
  const lb = document.querySelector('.lightbox');
  if(lb){
    const lbImg = lb.querySelector('img');
    const items = Array.from(document.querySelectorAll('.g-item img'));
    let idx = 0;
    const open = i=>{idx=i;lbImg.src=items[i].src;lb.classList.add('open');document.body.style.overflow='hidden'};
    const close = ()=>{lb.classList.remove('open');document.body.style.overflow=''};
    const move = d=>{idx=(idx+d+items.length)%items.length;lbImg.src=items[idx].src};
    items.forEach((im,i)=>im.parentElement.addEventListener('click',()=>open(i)));
    lb.querySelector('.lb-close').addEventListener('click',close);
    lb.querySelector('.lb-prev').addEventListener('click',e=>{e.stopPropagation();move(-1)});
    lb.querySelector('.lb-next').addEventListener('click',e=>{e.stopPropagation();move(1)});
    lb.addEventListener('click',e=>{if(e.target===lb)close()});
    document.addEventListener('keydown',e=>{
      if(!lb.classList.contains('open'))return;
      if(e.key==='Escape')close();
      if(e.key==='ArrowLeft')move(-1);
      if(e.key==='ArrowRight')move(1);
    });
  }

  /* ---------------------- GUEST SPOTLIGHT --------------------------- */
  const spot = document.querySelector('.finale-review');
  if(spot){
    const reviews = [
      {en:'Tried the Bistecca alla Fiorentina and it was cooked exactly as asked — best steak I\'ve had in a while.', tr:'Bistecca alla Fiorentina\'yı tam istediğim gibi pişirdiler — uzun zamandır yediğim en iyi biftekti.', name:'Sarah K.', source:'Google Maps'},
      {en:'The tiramisu alone is worth the visit. Being open late is a bonus — this is a monthly stop for me now.', tr:'Sadece tiramisu için bile gelinir. Geç saatlere kadar açık olmaları ayrı bir avantaj — artık ayda bir uğradığım bir mekan oldu.', name:'Emma R.', source:'Instagram · @aurelia.restaurant'},
      {en:'The Spaghetti alla Carbonara was rich and perfectly balanced. Our server walked us through the wine list, and the whole place has a great, relaxed vibe.', tr:'Spaghetti alla Carbonara nefis ve dengeliydi. Garsonumuz şarap listesinde bize rehberlik etti, genel atmosfer de oldukça zarif ve keyifliydi.', name:'Olivia P.', source:'Google Maps'},
      {en:'The Lasagna della Nonna is worth trying — you can really tell the difference. Place stays busy even late at night.', tr:'Lasagna della Nonna mutlaka denenmeli, farkı hemen hissediliyor. Mekan geç saatlerde bile hareketliliğini koruyor.', name:'James T.', source:'Google Maps'},
      {en:'I usually picture places like this as pricey and a bit stiff — this one was the opposite. Warm, easygoing, and genuinely good food.', tr:'Bu tarz mekanları genelde daha resmi bir ortam olarak hayal ederim; burası tam tersine sıcak ve keyifli bir deneyimdi, mutfak da gerçekten çok başarılı.', name:'Sophie L.', source:'Instagram · Story'}
    ];
    const inner = spot.querySelector('.finale-review-inner');
    const dots = Array.from(spot.querySelectorAll('.finale-review-dot'));
    let spotIdx = 0, spotTimer;
    const renderSpot = i=>{
      const lang = getLang() === 'en' ? 'en' : 'tr';
      inner.querySelector('.finale-review-text').textContent = reviews[i][lang];
      inner.querySelector('.finale-review-name').textContent = reviews[i].name;
      inner.querySelector('.finale-review-source').textContent = reviews[i].source;
      dots.forEach((d,di)=>d.classList.toggle('active', di===i));
    };
    const goSpot = i=>{
      inner.style.opacity = 0;
      inner.style.transform = 'translateY(8px)';
      setTimeout(()=>{
        renderSpot(i);
        inner.style.opacity = 1;
        inner.style.transform = 'translateY(0)';
      }, 350);
      spotIdx = i;
    };
    const startSpotTimer = ()=>{
      clearInterval(spotTimer);
      spotTimer = setInterval(()=>goSpot((spotIdx+1)%reviews.length), 6000);
    };
    dots.forEach((d,i)=>d.addEventListener('click', ()=>{ goSpot(i); startSpotTimer(); }));
    renderSpot(0);
    startSpotTimer();
    document.addEventListener('aurelia:langchange', ()=>renderSpot(spotIdx));
  }

  /* --------------------- MENU SEARCH + FILTER ---------------------- */
document.addEventListener('DOMContentLoaded', () => {

const search = document.querySelector('#menuSearch');
const chips = document.querySelectorAll('.chip');
const cats = document.querySelectorAll('.menu-cat');
const noRes = document.querySelector('.no-results');

let activeCat = 'all';

const normalizeText = (str = '') =>
  str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u');

function runFilter() {

  const q = search
    ? normalizeText(search.value.trim())
    : '';

  let visibleTotal = 0;

  cats.forEach(cat => {

    const catId = cat.dataset.cat;

    const categoryMatch =
      activeCat === 'all' ||
      activeCat === catId;

    let shown = 0;

    cat.querySelectorAll('.m-item').forEach(it => {

      const txt = normalizeText(it.textContent);

      const textMatch =
        q === '' || txt.includes(q);

      const visible =
        categoryMatch && textMatch;

      it.style.display = visible ? '' : 'none';

      if (visible) shown++;

    });

    cat.style.display = shown > 0 ? '' : 'none';

    if (activeCat === 'all') {
      cat.style.display = shown > 0 ? '' : 'none';
    }

    visibleTotal += shown;

  });

  if (noRes) {
    noRes.classList.toggle(
      'show',
      visibleTotal === 0
    );
  }
}

if (search) {
  search.addEventListener('input', runFilter);
}

chips.forEach(ch => {

  ch.addEventListener('click', () => {

    chips.forEach(c =>
      c.classList.remove('active')
    );

    ch.classList.add('active');

    activeCat = ch.dataset.filter;

    runFilter();

  });

});

runFilter();

});



})();
/* ---- FLOATING MENU CTA ---- */
(function(){
  const floatCta = document.getElementById('floatCta');
  if(!floatCta) return;
  const toggle = ()=> floatCta.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', toggle, {passive:true});
  toggle();
})();

/* ---- HIDE FLOATING BUTTONS OVER FOOTER ----
   Fixed buttons (WhatsApp, scroll-top, float menu CTA) sit bottom-right
   on every page; once the footer scrolls into view they'd otherwise sit
   on top of its last rows, so fade them out for as long as the footer
   is on screen. */
(function(){
  const footer = document.querySelector('.site-footer');
  const floaters = document.querySelectorAll('.whatsapp-float, .scroll-top, .float-cta');
  if(!footer || !floaters.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      floaters.forEach(el=>el.classList.toggle('over-footer', entry.isIntersecting));
    });
  }, {rootMargin:'0px'});
  io.observe(footer);
})();

/* ---- ANNOUNCEMENT BAR ---- */
(function(){
  const bar = document.querySelector('.announce-bar');
  if (!bar) return;
  const KEY = 'aurelia_announce_dismissed';
  const closeBtn = bar.querySelector('.announce-close');

  function setOffset(px){
    document.documentElement.style.setProperty('--announce-h', px + 'px');
  }

  if (sessionStorage.getItem(KEY)) {
    bar.classList.add('hidden');
    setOffset(0);
  } else {
    // Measure the bar's real height once fonts/layout settle, so the
    // header offset lines up exactly (avoids a jump on first paint).
    requestAnimationFrame(() => setOffset(bar.offsetHeight));
  }

  window.addEventListener('resize', () => {
    if (!bar.classList.contains('hidden')) setOffset(bar.offsetHeight);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.classList.add('hidden');
      setOffset(0);
      sessionStorage.setItem(KEY, '1');
    });
  }
})();

/* ---- STORAGE / PRIVACY NOTICE ---- */
(function(){
  const KEY = 'aurelia_notice_ack';
  if (localStorage.getItem(KEY)) return;
  const t = k => (window.__aureliaT && window.__aureliaT(k)) || '';

  const bar = document.createElement('div');
  bar.className = 'privacy-notice';
  bar.innerHTML = `
    <div class="privacy-notice-inner">
      <p><i class="fas fa-circle-info"></i> <span data-i18n="notice-text">${t('notice-text')}</span></p>
      <button type="button" class="btn btn-primary" id="privacyNoticeOk"><span data-i18n="notice-ok">${t('notice-ok')}</span></button>
    </div>
  `;
  document.body.appendChild(bar);
  requestAnimationFrame(() => bar.classList.add('show'));

  document.getElementById('privacyNoticeOk').addEventListener('click', () => {
    localStorage.setItem(KEY, '1');
    bar.classList.remove('show');
    setTimeout(() => bar.remove(), 400);
  });
})();

