var $photoUrl = document.querySelector('#photo-url');
var $photoPreview = document.querySelector('#photo-preview');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $noEntries = document.querySelector('.no-entries');
var $entryForm = document.querySelector('[data-view=entry-form]');
var $entries = document.querySelector('[data-view=entries]');
var $entriesButton = document.querySelector('#entries-button');
var $newButton = document.querySelector('#new-button');
var $entryFormHeading = document.querySelector('.entry-form-heading');
var $formActions = document.querySelector('#form-actions');
var $deleteButton = document.querySelector('#delete-button');
var $overlay = document.querySelector('#overlay');
var $cancelButton = document.querySelector('#cancel-button');
var $confirmButton = document.querySelector('#confirm-button');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.setAttribute('src', event.target.value);
});

$deleteButton.addEventListener('click', function () {
  $overlay.className = 'row';
});

$cancelButton.addEventListener('click', hideOverlay);

$confirmButton.addEventListener('click', function () {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.entryID === data.entries[i].entryID) {
      data.entries.splice(i, 1);
    }
    var $dataEntryId = document.querySelector('[data-entry-id=' + CSS.escape(data.editing.entryID) + ']');
    $dataEntryId.remove();
    if ($ul.children.length === 0) {
      toggleNoEntries();
    }
  }
  data.editing = null;
  hideOverlay();
  viewSwap('entries');
});

function hideOverlay() {
  $overlay.className = 'row hidden';
}

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photo.value,
    notes: $form.elements.notes.value
  };
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  if (data.editing === null) {
    formData.entryID = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formData);
    $ul.prepend(renderEntry(formData));
  } else if (data.editing !== null) {
    formData.entryID = data.editing.entryID;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === formData.entryID) {
        data.entries[i] = formData;
        var $dataEntryId = document.querySelector('[data-entry-id=' + CSS.escape(formData.entryID) + ']');
        $ul.replaceChild(renderEntry(formData), $dataEntryId);
        $entryFormHeading.textContent = 'New Entry';
        data.editing = null;
      }
    }
  }
  $deleteButton.className = 'hidden';
  $formActions.className = 'flex-end column-full';
  viewSwap('entries');
  if ($noEntries.className === 'column-full no-entries') {
    toggleNoEntries();
  }
});

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.className = 'row entry-item';
  $entry.setAttribute('data-entry-id', entry.entryID);
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
  $h2.className = 'space-between';
  $h2.textContent = entry.title;
  var $i = document.createElement('i');
  $i.className = 'fa fa-pencil';
  $i.setAttribute('aria-hidden', 'true');
  $h2.insertAdjacentElement('beforeend', $i);
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
  } viewSwap(data.view);
  if ($ul.children.length > 0) {
    toggleNoEntries();
  }
});

function toggleNoEntries() {
  if ($noEntries.className === 'column-full no-entries') {
    $noEntries.className = 'column-full no-entries hidden';
  } else {
    $noEntries.className = 'column-full no-entries';
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

$ul.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    var $closestAncestor = event.target.closest('.entry-item');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID.toString() === $closestAncestor.getAttribute('data-entry-id')) {
        data.editing = data.entries[i];
      }
    }
    $form.elements.title.value = data.editing.title;
    $form.elements.photo.value = data.editing.photoUrl;
    $form.elements.notes.value = data.editing.notes;
    $entryFormHeading.textContent = 'Edit Entry';
    $photoPreview.setAttribute('src', data.editing.photoUrl);
    $deleteButton.className = '';
    $formActions.className = 'space-between column-full';
  }
}
