(function () {
  var EMAIL = 'mani952@live.com';

  var form = document.getElementById('mailer-form');
  if (!form) return;

  var topics = document.getElementById('mailer-topics');
  var nameEl = document.getElementById('m-name');
  var companyEl = document.getElementById('m-company');
  var subjectEl = document.getElementById('m-subject');
  var messageEl = document.getElementById('m-message');
  var statusEl = document.getElementById('m-status');
  var copyBtn = document.getElementById('m-copy');

  var TEMPLATES = {
    project: {
      subject: 'Project enquiry — design partnership',
      body: 'Hi Mani,\n\nWe are working on {{what}} and are looking for a product designer to shape the experience end to end.\n\nA little context:\n- Problem we are solving:\n- Users / stakeholders involved:\n- Timeline we have in mind:\n- Budget range:\n\nWould you be open to a short call to talk it through?\n\nBest regards,\n{{sign}}'
    },
    role: {
      subject: 'Opportunity — senior product design role',
      body: 'Hi Mani,\n\nI came across your portfolio and would like to talk to you about a role we are hiring for.\n\nRole details:\n- Title:\n- Team and product:\n- Location / work model:\n- Compensation range:\n\nLet me know if you would like the full brief.\n\nBest regards,\n{{sign}}'
    },
    consulting: {
      subject: 'UX consulting — enterprise experience review',
      body: 'Hi Mani,\n\nWe would like your help on an enterprise UX engagement.\n\nWhat we need:\n- Platform / product:\n- Current pain points:\n- Scope we imagine (audit, research, design system, workflow redesign):\n- Engagement duration:\n\nCould we set up an intro call?\n\nBest regards,\n{{sign}}'
    },
    speaking: {
      subject: 'Invitation — speaking / mentoring',
      body: 'Hi Mani,\n\nI would like to invite you to speak with our team / community.\n\nDetails:\n- Event or programme:\n- Audience:\n- Date and format:\n- Topic we had in mind:\n\nHope this is of interest.\n\nBest regards,\n{{sign}}'
    },
    other: {
      subject: 'Hello from your portfolio',
      body: 'Hi Mani,\n\n\n\nBest regards,\n{{sign}}'
    }
  };

  var activeTopic = 'project';
  var subjectTouched = false;
  var messageTouched = false;

  function signature() {
    var who = (nameEl.value || '').trim();
    var company = (companyEl.value || '').trim();
    if (who && company) return who + '\n' + company;
    return who || company || 'Your name';
  }

  function render() {
    var tpl = TEMPLATES[activeTopic] || TEMPLATES.other;
    var who = (nameEl.value || '').trim();
    var company = (companyEl.value || '').trim();

    if (!subjectTouched) {
      subjectEl.value = tpl.subject + (company ? ' — ' + company : '');
    }

    if (!messageTouched) {
      messageEl.value = tpl.body
        .replace('{{what}}', company ? 'a product at ' + company : 'a new product')
        .replace('{{sign}}', signature());
    }

    if (!who && !company) return;
  }

  function setStatus(text) {
    statusEl.textContent = text;
    if (!text) return;
    window.setTimeout(function () {
      if (statusEl.textContent === text) statusEl.textContent = '';
    }, 4000);
  }

  topics.addEventListener('click', function (event) {
    var btn = event.target.closest('.topic');
    if (!btn) return;

    activeTopic = btn.getAttribute('data-topic');

    var all = topics.querySelectorAll('.topic');
    for (var i = 0; i < all.length; i++) {
      var isActive = all[i] === btn;
      all[i].classList.toggle('is-active', isActive);
      all[i].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    render();
  });

  subjectEl.addEventListener('input', function () { subjectTouched = true; });
  messageEl.addEventListener('input', function () { messageTouched = true; });
  nameEl.addEventListener('input', render);
  companyEl.addEventListener('input', render);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var subject = (subjectEl.value || '').trim() || 'Hello from your portfolio';
    var body = (messageEl.value || '').trim();

    window.location.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    setStatus('Opening your mail app…');
  });

  copyBtn.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(function () {
        setStatus('Email address copied.');
      }, function () {
        setStatus(EMAIL);
      });
      return;
    }
    setStatus(EMAIL);
  });

  render();
})();
