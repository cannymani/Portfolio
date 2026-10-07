(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  var groups = [
    '.works__head',
    '.works__grid > *',
    '.worksx__head',
    '.worksx__list > .wcard',
    '.awards__grid > *',
    '.services .split',
    '.services__grid > *',
    '.process .split',
    '.process__grid > *',
    '.experience__grid > *',
    '.logos',
    '.page-head .container > *',
    '.about__grid > *',
    '.domains',
    '.journey__head',
    '.journey__map > .jitem',
    '.skillsx__head',
    '.skillsx__grid > *',
    '.certs__head',
    '.certs__grid > *',
    '.project .prose',
    '.project .factsheet',
    '.project .factsheet__title',
    '.project .cover',
    '.project .nextlink',
    '.cta > *'
  ];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  groups.forEach(function (selector) {
    var items = document.querySelectorAll(selector);
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('reveal');
      items[i].style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
      observer.observe(items[i]);
    }
  });
})();
