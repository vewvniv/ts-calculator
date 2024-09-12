import { numbersKeypad, operatorsKeypad, functionKeypad, eraseKey } from './modules/domElements.ts';
import { printOnDisplay, clearDisplay, eraseCharacter } from './modules/eventHandlers.ts';

if (numbersKeypad && operatorsKeypad && functionKeypad && eraseKey) {
  [...numbersKeypad, ...operatorsKeypad].forEach((key) => {
    key?.addEventListener('pointerdown', printOnDisplay);
  });

  functionKeypad.forEach((key) => {
    if (key instanceof HTMLDivElement) {
      key.addEventListener('pointerdown', clearDisplay);
    }
  });

  eraseKey.addEventListener('pointerdown', eraseCharacter);
}
