var $photoUrl = document.querySelector('#photo-url');
var $photoPreview = document.querySelector('#photo-preview');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $noEntries = document.querySelector('.no-entries');
var $entryForm = document.querySelector('[data-view=entry-form]');
var $entries = document.querySelector('[data-view=entries]');
var $entriesButton = document.querySelector('#entries-button');
var $newButton = document.querySelector('#new-button');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photo.value,
    notes: $form.elements.notes.value
  };
  formData.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formData);
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $ul.prepend(renderEntry(formData));
  viewSwap('entries');
  if ($noEntries.className === 'row no-entries') {
    toggleNoEntries();
  }
});

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.className = 'row';
  var $columnDiv = document.createElement('div');
  $columnDiv.className = 'column-full column-half';
  $entry.appendChild($columnDiv);
  var $img = document.createElement('img');
  $img.src = entry.photoUrl;
  $columnDiv.appendChild($img);
  var $columnDiv1 = document.createElement('div');
  $columnDiv1.className = 'column-full column-half';
  $entry.appendChild($columnDiv1);
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $columnDiv1.appendChild($h2);
  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $columnDiv1.appendChild($p);
  return $entry;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $entryTree = renderEntry(data.entries[i]);
    $ul.appendChild($entryTree);
  }
});

function toggleNoEntries() {
  if ($noEntries.className === 'row no-entries') {
    $noEntries.className = 'row no-entries hidden';
  } else {
    $noEntries.className = 'row no-entries';
  }
}

function viewSwap(view) {
  if (view === 'entries') {
    $entries.className = 'row';
    $entryForm.className = 'row hidden';
  } else if (view === 'entry-form') {
    $entryForm.className = 'row';
    $entries.className = 'row hidden';
  }
  data.view = view;
}

$entriesButton.addEventListener('click', function () {
  viewSwap('entries');
});

$newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});
