var $ = function (id) { return document.getElementById(id); };

var activeTab = 'url';
var qr = null;
var qrData = '';

var titles = { url: 'Enter URL', text: 'Enter Text', contact: 'Contact Information' };

function formatUrl(url) {
  url = url.trim();
  if (!url) return '';
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(url) ? url : 'https://' + url;
}

// Escape characters that have meaning in vCard values
function esc(v) {
  return v.trim().replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');
}

function makeVCard() {
  var first = $('firstName').value, last = $('lastName').value;
  var phone = $('phone').value, email = $('email').value;
  var org = $('organization').value, site = $('website').value;
  if (!(first.trim() || last.trim() || phone.trim() || email.trim())) return '';

  var lines = ['BEGIN:VCARD', 'VERSION:3.0',
    'FN:' + esc(first + ' ' + last),
    'N:' + esc(last) + ';' + esc(first) + ';;;'];
  if (org.trim()) lines.push('ORG:' + esc(org));
  if (phone.trim()) lines.push('TEL:' + esc(phone));
  if (email.trim()) lines.push('EMAIL:' + esc(email));
  if (site.trim()) lines.push('URL:' + esc(site));
  lines.push('END:VCARD');
  return lines.join('\n');
}

function update() {
  if (activeTab === 'url') qrData = formatUrl($('url').value);
  else if (activeTab === 'text') qrData = $('text').value.trim() ? $('text').value : '';
  else qrData = makeVCard();

  var has = qrData !== '';
  $('result').hidden = !has;
  $('empty').hidden = has;
  $('actions').hidden = !has;
  $('data-box').hidden = !has;
  if (!has) return;

  $('data').textContent = qrData;
  $('error').hidden = true;
  try {
    if (!qr) qr = new QRious({ element: $('qr'), size: 600, level: 'M', background: 'white', foreground: 'black' });
    qr.value = qrData;
  } catch (e) {
    $('error').textContent = 'Too much data for one QR code. Shorten the input.';
    $('error').hidden = false;
  }
}

function setTab(tab) {
  activeTab = tab;
  $('form-title').textContent = titles[tab];
  ['url', 'text', 'contact'].forEach(function (t) { $('panel-' + t).hidden = t !== tab; });
  document.querySelectorAll('.tab').forEach(function (b) {
    var on = b.dataset.tab === tab;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
  });
  update();
}

document.querySelectorAll('.tab').forEach(function (b) {
  b.addEventListener('click', function () { setTab(b.dataset.tab); });
});
document.querySelectorAll('input, textarea').forEach(function (el) {
  el.addEventListener('input', update);
});

$('clear').addEventListener('click', function () {
  document.querySelectorAll('input, textarea').forEach(function (el) { el.value = ''; });
  update();
});

$('download').addEventListener('click', function () {
  if (!qrData) return;
  var a = document.createElement('a');
  a.href = $('qr').toDataURL('image/png');
  a.download = 'qr-code.png';
  a.click();
});

$('copy').addEventListener('click', function () {
  if (!qrData) return;
  navigator.clipboard.writeText(qrData).then(function () {
    $('copy-icon').hidden = true;
    $('check-icon').hidden = false;
    $('copy-label').textContent = 'Copied!';
    setTimeout(function () {
      $('copy-icon').hidden = false;
      $('check-icon').hidden = true;
      $('copy-label').textContent = 'Copy Data';
    }, 2000);
  }, function (err) { console.error('Failed to copy text: ', err); });
});

// Theme toggle
$('theme-toggle').addEventListener('click', function () {
  var root = document.documentElement;
  var next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

setTab('url');
