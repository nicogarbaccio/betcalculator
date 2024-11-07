function calculateWager() {
  const unitSizeInput = document.getElementById("unit-size");
  const unitsToWinInput = document.getElementById("units-to-win");
  const oddsInput = document.getElementById("odds");
  const resultDiv = document.getElementById("result");

  // Reset borders
  unitSizeInput.style.border = "1px solid var(--input-border)";
  unitsToWinInput.style.border = "1px solid var(--input-border)";
  oddsInput.style.border = "1px solid var(--input-border)";

  const unitSize = parseFloat(unitSizeInput.value);
  const unitsToWin = parseFloat(unitsToWinInput.value);
  const odds = oddsInput.value.trim();

  let hasError = false;
  let errorMessage = "";
  let emptyFieldCount = 0;

  // Check unit size
  if (isNaN(unitSize) || unitSize <= 0) {
    unitSizeInput.style.border = "2px solid red";
    errorMessage = "Please enter a valid unit size.";
    hasError = true;
    if (!unitSizeInput.value) emptyFieldCount++;
  }

  // Check units to win
  if (isNaN(unitsToWin) || unitsToWin <= 0) {
    unitsToWinInput.style.border = "2px solid red";
    errorMessage = "Please enter valid units to win.";
    hasError = true;
    if (!unitsToWinInput.value) emptyFieldCount++;
  }

  // Check odds format
  if (!odds || (odds[0] !== "+" && odds[0] !== "-" && isNaN(odds))) {
    oddsInput.style.border = "2px solid red";
    errorMessage = "Please enter valid odds (e.g. -120, +100, or 100).";
    hasError = true;
    if (!oddsInput.value) emptyFieldCount++;
  }

  if (hasError) {
    if (emptyFieldCount >= 2) {
      errorMessage = "Please fill in all fields";
    }
    resultDiv.textContent = errorMessage;
    return;
  }

  const targetWin = unitSize * unitsToWin;
  let wager;

  if (odds.startsWith("-")) {
    const oddsValue = parseFloat(odds.slice(1));
    wager = (targetWin * oddsValue) / 100;
  } else {
    const oddsValue = parseFloat(odds.replace("+", ""));
    wager = (targetWin * 100) / oddsValue;
  }

  const winnings = wager + targetWin;

  resultDiv.innerHTML = `
      <div class="bet-amount">
        Bet: ${wager.toFixed(2)}
      </div>
      <div>
        To win ${targetWin.toFixed(2)} (${unitsToWin} ${
    unitsToWin === 1 ? "unit" : "units"
  }), you should bet ${wager.toFixed(2)}. 
        Your total winnings will be ${winnings.toFixed(2)}.
      </div>
    `;
}
const toggleSwitch = document.querySelector("#checkbox");
const themeText = document.querySelector("#theme-text");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

toggleSwitch.addEventListener("change", switchTheme);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeText.textContent = "Dark Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeText.textContent = "Light Mode";
  }
}
