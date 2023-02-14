var $photoUrl = document.querySelector('#photo-url');
var $photoPreview = document.querySelector('#photo-preview');
var $form = document.querySelector('form');

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

renderEntry();
