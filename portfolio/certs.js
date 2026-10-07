(function () {
  var tabs = document.getElementById('cert-tabs');
  var grid = document.getElementById('cert-grid');
  var modal = document.getElementById('cert-modal');
  if (!tabs || !grid || !modal) return;

  var cards = grid.querySelectorAll('.cert');
  var empty = document.getElementById('cert-empty');
  var lastFocused = null;
  var current = -1;

  function visibleCards() {
    var list = [];
    for (var i = 0; i < cards.length; i++) {
      if (!cards[i].hidden) list.push(cards[i]);
    }
    return list;
  }

  /* ---- filtering ---- */
  tabs.addEventListener('click', function (event) {
    var btn = event.target.closest('.topic');
    if (!btn) return;

    var cat = btn.getAttribute('data-cat');
    var all = tabs.querySelectorAll('.topic');
    for (var i = 0; i < all.length; i++) {
      var isActive = all[i] === btn;
      all[i].classList.toggle('is-active', isActive);
      all[i].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    var shown = 0;
    for (var j = 0; j < cards.length; j++) {
      var cats = (cards[j].getAttribute('data-cat') || '').split(/\s+/);
      var show = cat === 'all' || cats.indexOf(cat) !== -1;
      cards[j].hidden = !show;
      if (show) shown++;
    }

    if (empty) empty.hidden = shown !== 0;
  });

  /* ---- modal ---- */
  var imgEl = document.getElementById('cert-modal-img');
  var tagEl = document.getElementById('cert-modal-tag');
  var titleEl = document.getElementById('cert-modal-title');
  var orgEl = document.getElementById('cert-modal-org');
  var dateEl = document.getElementById('cert-modal-date');
  var prevBtn = document.getElementById('cert-prev');
  var nextBtn = document.getElementById('cert-next');
  var countEl = document.getElementById('cert-count');

  function render(index) {
    var list = visibleCards();
    if (!list.length) return;
    if (index < 0) index = 0;
    if (index > list.length - 1) index = list.length - 1;
    current = index;

    var card = list[index];
    var name = card.getAttribute('data-name') || '';
    var tag = card.querySelector('.cert__tag');

    titleEl.textContent = name;
    orgEl.textContent = card.getAttribute('data-org') || '\u2014';
    dateEl.textContent = card.getAttribute('data-date') || '\u2014';
    tagEl.textContent = tag ? tag.textContent : '';
    imgEl.src = card.getAttribute('data-img') || 'assets/cert-placeholder.svg';
    imgEl.alt = 'Certificate: ' + name;

    lastFocused = card;
    if (countEl) countEl.textContent = (index + 1) + ' of ' + list.length;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === list.length - 1;
  }

  function step(delta) {
    render(current + delta);
  }

  function openModal(card) {
    render(visibleCards().indexOf(card));
    modal.hidden = false;
    document.body.classList.add('has-modal');
    modal.querySelector('.modal__close').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('has-modal');
    if (lastFocused) lastFocused.focus();
  }

  grid.addEventListener('click', function (event) {
    var card = event.target.closest('.cert');
    if (card) openModal(card);
  });

  modal.addEventListener('click', function (event) {
    if (event.target.closest('[data-close]')) closeModal();
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });

  document.addEventListener('keydown', function (event) {
    if (modal.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });
})();
