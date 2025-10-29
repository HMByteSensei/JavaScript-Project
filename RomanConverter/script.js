const numberInput = document.getElementById("number-input");
const output = document.getElementById("output");
const button = document.getElementById("convert-btn");

const romanNumber = (num) => {
  const mapa = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let result = "";
  for (let key in mapa) {
    while (num >= mapa[key]) {
      result += key;
      num -= mapa[key];
    }
  }
  return result;
};

const isValidInput = (num) => {
  output.classList.remove("hidden");
  if (
    Number.isNaN(Number(num.trim(""))) ||
    num.toLowerCase().includes("e") ||
    num < 1 ||
    num != Math.floor(num)
  ) {
    output.classList.remove("output");
    output.classList.add("wrong-output");
    output.innerText = "Please enter a whole number greater than 0";
    return;
  }
  output.classList.remove("wrong-output");
  output.classList.add("output");
  output.innerText = romanNumber(num);
};

button.addEventListener("click", () => {
  const number = numberInput.value;
  isValidInput(number);
});

numberInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    isValidInput(numberInput.value);
  }
});
