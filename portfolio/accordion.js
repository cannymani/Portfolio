(function () {
  var items = document.querySelectorAll('.acc');
  if (!items.length) return;

  function setOpen(item, open) {
    var head = item.querySelector('.acc__head');
    var body = item.querySelector('.acc__body');
    if (!head || !body) return;
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
    item.classList.toggle('is-open', open);
    body.hidden = !open;
  }

  for (var i = 0; i < items.length; i++) {
    (function (item) {
      var head = item.querySelector('.acc__head');
      if (!head) return;
      setOpen(item, head.getAttribute('aria-expanded') === 'true');
      head.addEventListener('click', function () {
        var willOpen = head.getAttribute('aria-expanded') !== 'true';
        for (var j = 0; j < items.length; j++) setOpen(items[j], false);
        setOpen(item, willOpen);
      });
    })(items[i]);
  }
})();
