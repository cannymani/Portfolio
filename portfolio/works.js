(function () {
  var filters = document.getElementById('filters');
  var list = document.getElementById('works-list');
  var empty = document.getElementById('works-empty');
  if (!filters || !list || !empty) return;

  var pills = filters.querySelectorAll('.filter-pill');
  var cards = list.querySelectorAll('.wcard');

  function apply(active) {
    var shown = 0;

    for (var i = 0; i < cards.length; i++) {
      var tags = (cards[i].getAttribute('data-tags') || '').split(/\s+/);
      var match = active === 'all' || tags.indexOf(active) !== -1;
      cards[i].hidden = !match;
      if (match) {
        cards[i].classList.add('is-visible');
        shown++;
      }
    }

    empty.hidden = shown > 0;

    for (var j = 0; j < pills.length; j++) {
      var isActive = pills[j].getAttribute('data-filter') === active;
      pills[j].classList.toggle('is-active', isActive);
      pills[j].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }
  }

  filters.addEventListener('click', function (event) {
    var pill = event.target.closest('.filter-pill');
    if (!pill) return;
    apply(pill.getAttribute('data-filter'));
  });
})();
