const userInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceElement = document.getElementById("price");
const moneyCounter = document.getElementById("money-counter");

// Inicijalne vrijednosti koje će testovi mijenjati
let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const denominations = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

priceElement.textContent = `$${price}`;

// Funkcija za prikaz stanja kase
const formatCid = () => {
  moneyCounter.innerHTML = cid
    .map(money => `<p class="money-item">${money[0]}: $${money[1]}</p>`)
    .join('');
};
formatCid(); // Inicijalni prikaz

const calculateChange = (price, cash, currentCid) => {
  let changeDue = Number((cash - price).toFixed(2));
  let totalCid = Number(currentCid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid }; 
  }

  let changeArray = [];
  let cidReversed = [...currentCid].reverse();
  let denominationsReversed = [...denominations].reverse();

  for (let i = 0; i < denominationsReversed.length; i++) {
    let coinName = denominationsReversed[i][0];
    let coinValue = denominationsReversed[i][1];
    let coinAvailable = cidReversed[i][1];
    let coinAmount = 0;

    while (changeDue >= coinValue && coinAvailable > 0) {
      changeDue = Number((changeDue - coinValue).toFixed(2));
      coinAvailable = Number((coinAvailable - coinValue).toFixed(2));
      coinAmount = Number((coinAmount + coinValue).toFixed(2));
    }

    if (coinAmount > 0) {
      changeArray.push([coinName, coinAmount]);
    }
  }

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArray };
};

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(userInput.value);
  
  if (isNaN(cash)) {
    alert("Please enter a valid number.");
    return;
  }
  
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  const currentCid = JSON.parse(JSON.stringify(cid));
  const result = calculateChange(price, cash, currentCid);
  
  let changeMessage = `Status: ${result.status}`;
  
  if (result.status === "INSUFFICIENT_FUNDS") {
    changeDue.textContent = changeMessage;
    return;
  }
  
  if (result.status === "CLOSED") {
    // Za CLOSED, prolazimo kroz vraćeni originalni cid
    result.change.forEach(money => {
      // Test 18 zahtijeva samo PENNY, pa moramo ispisati samo ono što nije nula
      if (money[1] > 0) {
        changeMessage += ` ${money[0]}: $${money[1]}`;
      }
    });
    changeDue.textContent = changeMessage.trim();
    return;
  }
  
  result.change.forEach(coin => {
    changeMessage += ` ${coin[0]}: $${coin[1]}`;
  });
  
  changeDue.textContent = changeMessage;

  // Izračunaj novi cid na temelju vraćenog kusura
  cid = currentCid.map(([name, amount]) => {
      const returned = result.change.find(c => c[0] === name);
      if (returned) {
          return [name, Number((amount - returned[1]).toFixed(2))];
      }
      return [name, amount];
  });
  
  formatCid();
});