const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultContainer = document.getElementById("results-container");

const regexChecker = (str) => {
  const reg = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?(\d{3})[\s-]?(\d{4})$/;
  return reg.test(str);
}

const displayRes = (num) => {
  // <!-- </div><div id="results-div"> ne zaboravi ovo u JS-->
  let text = `Invalid US number: ${num}`;
  if(regexChecker(userInput.value)) {
    text = `Valid US number: ${num}`;
  }
  resultContainer.innerHTML += `<div id="results-div" style="line-height: 1.2rem;
  width: 90%; background-color: white;">${text}</div>`;
}

const clearRes = () => {
  resultContainer.innerText = "";
}

checkButton.addEventListener("click", () => {
  if(userInput.value === "") {
    alert("Please provide a phone number");  
    return;
  } 
  displayRes(userInput.value);
})

clearButton.addEventListener("click", clearRes);



