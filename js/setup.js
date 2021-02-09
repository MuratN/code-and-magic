'use strict';


var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');

if (setup) {
  setup.classList.remove('hidden');
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function createWizards() {
  var wizards = [];
  for (var i = 0; i < 3; i++) {
    var indexFirstName = randomInteger(0, FIRST_NAMES.length);
    var indexLastName = randomInteger(0, LAST_NAMES.length);
    var indexCoatColor = randomInteger(0, COAT_COLORS.length);
    var indexEyeColor = randomInteger(0, EYES_COLOR.length);
    var wizard = {
      name: FIRST_NAMES[indexFirstName] + ' ' + LAST_NAMES[indexLastName],
      coatColor: COAT_COLORS[indexCoatColor],
      eyesColor: EYES_COLOR[indexEyeColor],
    };
    wizards.push(wizard);
  }
  return wizards;
}

function renderWizards() {
  var template = document.getElementById('similar-wizard-template');
  var wizards = createWizards();
  var list = document.querySelector('.setup-similar-list');
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    var wizard = wizards[i];
    var domWizard = template.content.cloneNode(true);
    var nameWizard = domWizard.querySelector('.setup-similar-label');
    var coatColor = domWizard.querySelector('.wizard-coat');
    var eyesColor = domWizard.querySelector('.wizard-eyes');
    nameWizard.textContent = wizard.name;
    coatColor.style.fill = wizard.coatColor;
    eyesColor.style.fill = wizard.eyesColor;
    documentFragment.appendChild(domWizard);
  }
  list.appendChild(documentFragment);
}

renderWizards();
var setupSimilar = document.querySelector('.setup-similar');
if (setupSimilar) {
  setupSimilar.classList.remove('hidden');
}

