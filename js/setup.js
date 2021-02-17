'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green']

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

const wizardTemp = [];

for(var i = 0; i < 4; i++) {
    var Random_Name = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)];
    var Random_Surname = WIZARD_SURNAME[Math.floor(Math.random() * WIZARD_SURNAME.length)];
    var Random_Coat = WIZARD_COAT[Math.floor(Math.random() * WIZARD_COAT.length)];
    var Random_Eyes = WIZARD_EYES[Math.floor(Math.random() * WIZARD_EYES.length)];
    wizardTemp.push({
        name: Random_Name +' ' + Random_Surname,
        coatColor: Random_Coat,
        eyesColor: Random_Eyes
    });
    console.log(wizardTemp);
}

var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardTemp.length; i++) {
    fragment.appendChild(renderWizard(wizardTemp[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
