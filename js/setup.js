'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupUserName = document.querySelector('.setup-user-name');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupWizardCoat = setup.querySelector('.wizard-coat');
var setupWizardEyes = setup.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var indexCoat = 0;
var indexEyes = 0;
var indexFireball = 0;

var onPopupEscPress = function (evt) {
  if (document.activeElement !== setupUserName) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('mousedown', function () {
  if (document.activeElement !== setupUserName) {
    closePopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', function () {
  indexCoat = indexCoat + 1;
  setupWizardCoat.style.fill = WIZARD_COAT[indexCoat % WIZARD_COAT.length];
});

setupWizardEyes.addEventListener('click', function () {
  indexEyes = indexEyes + 1;
  setupWizardEyes.style.fill = WIZARD_EYES[indexEyes % WIZARD_EYES.length];
});

setupFireball.addEventListener('click', function () {
  indexFireball = indexFireball + 1;
  setupFireball.style.backgroundColor = FIREBALL_COLOR[indexFireball % FIREBALL_COLOR.length];
});


var wizardTemp = [];

var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

for (var i = 0; i < 4; i++) {
  var randomName = getRandomElement(WIZARD_NAMES);
  var randomSurname = getRandomElement(WIZARD_SURNAME);
  var randomCoat = getRandomElement(WIZARD_COAT);
  var randomEyes = getRandomElement(WIZARD_EYES);
  wizardTemp.push({
    name: randomName + ' ' + randomSurname,
    coatColor: randomCoat,
    eyesColor: randomEyes
  });
}

var getWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizardTemp.length; j++) {
  fragment.appendChild(getWizardElement(wizardTemp[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
