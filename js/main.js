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
