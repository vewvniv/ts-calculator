import { display } from "./domElements";

export function clearDisplay(this: HTMLDivElement, event: PointerEvent) {
  const context = this.children[0] as HTMLSpanElement;
  if (context.innerText === "C") {
    if (display) {
      display.innerText = '0';
      calc();
    }
  }
}

export function isOperator(char: string) {
  const operators = ["×", "÷", "−", "+"];
  return operators.includes(char);
}

export function printOnDisplay(this: HTMLDivElement, event: PointerEvent) {
  const buttonValue = (this.children[0] as HTMLSpanElement).innerText;
  const displayContent = display?.innerText;
  const lastInputIndex = display ? display.innerText.length - 1 : 0;
  let hasOperator = false;

  if (displayContent)
    if (isOperator(displayContent?.charAt(lastInputIndex))) hasOperator = true;

  if (display) {

    if (displayContent && buttonValue === '.') {
      if (displayContent.charAt(displayContent.length - 1) !== '.') {
        display.innerText += buttonValue;
      }
    } else {
      if (buttonValue !== "=") {
        if (displayContent?.charAt(0) === '0') {
          if (isOperator(buttonValue) && displayContent?.length === 1)
            display.innerText = 0 + buttonValue;
          else if (!isOperator(buttonValue) && displayContent?.length === 1)
            display.innerText = buttonValue;
          else
            display.innerText += buttonValue;
        } else {
          display.innerText += buttonValue;
        }
      }

      if (hasOperator && isOperator(buttonValue))
        display.innerText =
          display.innerText.substring(0, lastInputIndex) + buttonValue;
    }
  }

  calc();
}

function calc() {
  const displayContent = display?.innerText;
  let toCalc = displayContent?.match(/(\d+(\.\d+)?|[×÷−\+])/g);
  if (!toCalc) return;

  let index = 0;
  while (index < toCalc.length) {
    let symb = toCalc[index];
    if (symb === '×') {
      let result = Number(toCalc[index - 1]) * Number(toCalc[index + 1]);
      toCalc.splice(index - 1, 3, String(result));
      index--;
    } else if (symb === '÷') {
      let result = Number(toCalc[index - 1]) / Number(toCalc[index + 1]);
      toCalc.splice(index - 1, 3, String(result));
      index--;
    } else {
      index++;
    }
  }

  index = 0;
  while (index < toCalc.length) {
    let symb = toCalc[index];
    if (symb === '+') {
      let result = Number(toCalc[index - 1]) + Number(toCalc[index + 1]);
      toCalc.splice(index - 1, 3, String(result));
      index--;
    } else if (symb === '−') {
      let result = Number(toCalc[index - 1]) - Number(toCalc[index + 1]);
      toCalc.splice(index - 1, 3, String(result));
      index--;
    } else {
      index++;
    }
  }

  if (toCalc[0] !== 'NaN') {
    console.log(toCalc);
    const result = document.querySelector<HTMLDivElement>('.result');
    if (result)
      result.innerText = toCalc[0];
  }
}


export function eraseCharacter(this: HTMLDivElement, event: PointerEvent) {
  if (display) {
    if (display.innerText !== '0') {
      const lastInputIndex = display.innerText.length - 1;
      display.innerText = display.innerText.substring(0, lastInputIndex);
    }

    if (display.innerText.length === 0) {
      display.innerText = '0';
    }

    calc();
  }
}
