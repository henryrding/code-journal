var $photoUrl = document.querySelector('#photo-url');
var $photoPreview = document.querySelector('#photo-preview');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.setAttribute('src', event.target.value);
});
