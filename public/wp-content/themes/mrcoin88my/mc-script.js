document.addEventListener('DOMContentLoaded', function () {
  var openBtn = document.getElementById('mcBurgerOpen');
  var closeBtn = document.getElementById('mcSidebarClose');
  var sidebar = document.getElementById('mcSidebar');
  var overlay = document.getElementById('mcDrawerOverlay');

  function toggleSidebar(show) {
    if (show) {
      sidebar.classList.add('is-active');
      overlay.classList.add('is-active');
    } else {
      sidebar.classList.remove('is-active');
      overlay.classList.remove('is-active');
    }
  }

  if (openBtn) openBtn.addEventListener('click', function () { toggleSidebar(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { toggleSidebar(false); });
  if (overlay) overlay.addEventListener('click', function () { toggleSidebar(false); });

  // Live transactions strip: so lieu mo phong, chay o client, khong phai
  // giao dich that.
  var liveTop = document.getElementById('mcLiveTop');
  var liveWd = document.getElementById('mcLiveWithdraw');
  if (liveTop && liveWd) {
    var rnd = function (a, b) { return Math.floor(a + Math.random() * (b - a)); };
    var maskedPhone = function () { return '60' + '*'.repeat(rnd(5, 7)) + rnd(100, 999); };
    var fillLive = function () {
      var topHtml = '<div class="mc-live-label">&uarr; Top Up</div>';
      var wdHtml = '<div class="mc-live-label">&darr; Withdraw</div>';
      for (var i = 0; i < 5; i++) {
        topHtml += '<div class="mc-live-row"><span>' + maskedPhone() + '</span><b>RM' + rnd(5, 80) + '.00</b></div>';
        wdHtml += '<div class="mc-live-row"><span>' + maskedPhone() + '</span><b>RM' + rnd(50, 3500) + '.00</b></div>';
      }
      liveTop.innerHTML = topHtml;
      liveWd.innerHTML = wdHtml;
    };
    fillLive();
    setInterval(fillLive, 3500);
  }

  // Hero slider: gop anh promo main + 2 banner (truoc o mc-banner-strip
  // rieng) vao chung 1 carousel tu chay, khong lib ngoai.
  var track = document.getElementById('mcSlideTrack');
  var dotsWrap = document.getElementById('mcSlideDots');
  if (track && dotsWrap) {
    var slides = track.children;
    var dots = dotsWrap.children;
    var idx = 0;
    if (slides.length > 1) {
      setInterval(function () {
        idx = (idx + 1) % slides.length;
        track.style.transform = 'translateX(-' + (idx * 100) + '%)';
        for (var i = 0; i < dots.length; i++) {
          dots[i].className = i === idx ? 'is-active' : '';
        }
      }, 4000);
    }
  }

  // Read-more collapse (tham khao pattern .ekp-more-wrap cua ekplus8.io):
  // content da render du trong DOM, JS chi toggle class de doi max-height.
  document.querySelectorAll('[data-readmore-wrap]').forEach(function (wrap) {
    var content = wrap.querySelector('[data-readmore-content]');
    var btn = wrap.querySelector('[data-readmore-btn]');
    if (!content || !btn) return;
    var label = btn.querySelector('.mc-more-btn-text');

    btn.addEventListener('click', function () {
      var expanded = content.classList.toggle('is-expanded');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      var text = expanded
        ? (btn.getAttribute('data-text-less') || 'Read Less')
        : (btn.getAttribute('data-text-more') || 'Read More');
      if (label) { label.textContent = text; } else { btn.textContent = text; }
    });
  });
});
