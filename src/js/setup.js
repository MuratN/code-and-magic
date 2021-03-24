'use strict';

var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var setupWizardCoat = document.querySelector('.wizard-coat');
var setupWizardEyes = document.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var indexCoat = 0;
var indexEyes = 0;
var indexFireball = 0;

var newCoatColor;
var newEyesColor;
var wizards = [];

var DEBOUNCE_INTERVAL = 500;
var lastTimeout;

setupWizardCoat.addEventListener('click', function () {
  indexCoat = indexCoat + 1;
  setupWizardCoat.style.fill = WIZARD_COAT[indexCoat % WIZARD_COAT.length];
  newCoatColor = setupWizardCoat.style.fill;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function () {
    sortWizards();
    renderWizards();
  }, DEBOUNCE_INTERVAL);
});

setupWizardEyes.addEventListener('click', function () {
  indexEyes = indexEyes + 1;
  setupWizardEyes.style.fill = WIZARD_EYES[indexEyes % WIZARD_EYES.length];
  newEyesColor = setupWizardEyes.style.fill;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function () {
    sortWizards();
    renderWizards();
  }, DEBOUNCE_INTERVAL);
});

setupFireball.addEventListener('click', function () {
  indexFireball = indexFireball + 1;
  setupFireball.style.backgroundColor = FIREBALL_COLOR[indexFireball % FIREBALL_COLOR.length];
});

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var getWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

  return wizardElement;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < 4; j++) {
    fragment.appendChild(getWizardElement(wizards[j]));
  }
  similarListElement.innerHTML = '';
  similarListElement.appendChild(fragment);
};

window.load(function (wizards) {
  window.wizards = wizards;
  sortWizards();
  renderWizards();
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
});

var form = userDialog.querySelector('.setup-wizard-form');
form.addEventListener('submit', function (evt) {
  window.upload(new FormData(form), function (response) {
    userDialog.classList.add('hidden');
  });
  evt.preventDefault();
});

var getRank = function (wizard) {
  var rank = 0;
  if (wizard.colorCoat === newCoatColor) {
    rank += 2;
  }
  if (wizard.colorEyes === newEyesColor) {
    rank += 1;
  }
  return rank;
};

var namesComparator = function (left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

var sortWizards = function () {
  wizards.sort(function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  });
};

