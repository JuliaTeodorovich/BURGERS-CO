const $cards = document.querySelector(".cards");
const $hams = document.querySelectorAll(".ham");
const $info = document.querySelectorAll(".info");
const $stuffList = document.querySelector(".stuff-list");
const $stuffItem = document.querySelectorAll(".stuff");
const $addList = document.querySelector(".add-list");
const $addItem = document.querySelectorAll(".add");
const $checkbox = document.querySelectorAll(".add-list input[type='checkbox']");
const $btnConfirm = document.getElementById("btn-confirm");
const $summary = document.getElementById("summary");
const $cross = document.getElementById("cross");
$stuffList.style.display = "none";
$addList.style.display = "none";
$cross.style.display = "none";
$btnConfirm.style.display = "none";
$summary.style.display = "none";

class Hamburger {
  constructor(size, stuffing, additions) {
    this.size = size;
    this.stuffing = stuffing;
    this.additions = additions;
  }

  calculatePrice() {
    const SMALL_HAMBURGER_PRICE = 50;
    const BIG_HAMBURGER_PRICE = 100;
    const STUFFING_PRICES = {
      cheese: 10,
      salad: 20,
      potato: 15,
    };
    const ADDITIONS_PRICES = {
      seasoning: 15,
      mayonnaise: 20,
    };
    let price = 0;
    switch (this.size) {
      case "small":
        price += SMALL_HAMBURGER_PRICE;
        break;
      case "big":
        price += BIG_HAMBURGER_PRICE;
        break;
      default:
        break;
    }
    price += STUFFING_PRICES[this.stuffing];
    this.additions.forEach((addition) => {
      price += ADDITIONS_PRICES[addition];
    });
    return price;
  }

  calculateCalories() {
    const SMALL_HAMBURGER_CALORIES = 20;
    const BIG_HAMBURGER_CALORIES = 40;
    const STUFFING_CALORIES = {
      cheese: 20,
      salad: 5,
      potato: 10,
    };
    const ADDITIONS_CALORIES = {
      seasoning: 0,
      mayonnaise: 5,
    };
    let calories = 0;
    switch (this.size) {
      case "small":
        calories += SMALL_HAMBURGER_CALORIES;
        break;
      case "big":
        calories += BIG_HAMBURGER_CALORIES;
        break;
      default:
        break;
    }
    calories += STUFFING_CALORIES[this.stuffing];
    this.additions.forEach((addition) => {
      calories += ADDITIONS_CALORIES[addition];
    });
    return calories;
  }
}

let size = "";
let stuffing = "";
let additions = [];

function createHamburgerAndCalculate(size, stuffing, additions) {
  const myHamburger = new Hamburger(size, stuffing, additions);
  const price = myHamburger.calculatePrice();
  const calories = myHamburger.calculateCalories();
  console.log(
    `You chose: ${myHamburger.size} hamburger with ${myHamburger.stuffing}, with addition ${myHamburger.additions}.`
  );
  console.log(`Price: ${price}$. Calories: ${calories}.`);
  $info.forEach((info) => {
    info.innerHTML = `Price: ${price}$. Calories: ${calories}.`;
  });
}

function selectHamburger(ham) {
  size = ham.id;
  $hams.forEach((ham) => (ham.style.display = "none"));
  ham.style.display = "flex";
  $cross.style.display = "block";
  $cards.style.flexDirection = "column";
  $stuffList.style.display = "flex";
}

$hams.forEach((ham) => {
  ham.addEventListener("click", function (event) {
    selectHamburger(event.target.parentElement);
    $hams.forEach((ham) => {
      ham.style.pointerEvents = "none";
    });
  });
});

$stuffItem.forEach((item) => {
  item.addEventListener("click", (event) => {
    stuffing = event.target.innerText.toLowerCase();
    additions = [];
    $stuffList.style.display = "none";
    $addList.style.display = "block";
    $btnConfirm.style.display = "block";
    createHamburgerAndCalculate(size, stuffing, additions);
  });
});

$checkbox.forEach((checkbox) => {
  checkbox.addEventListener("change", function (event) {
    const addition = event.target.parentElement
      .querySelector(".item.add.name")
      .innerText.toLowerCase();
    if (this.checked) {
      additions.push(addition);
    } else {
      const index = additions.indexOf(addition);
      if (index !== -1) {
        additions.splice(index, 1);
      }
    }
    createHamburgerAndCalculate(size, stuffing, additions);
  });
});

$btnConfirm.addEventListener("click", () => {
  $addList.style.display = "none";
  $btnConfirm.style.display = "none";
  $summary.style.display = "flex";
  if (additions.length === 0) {
    $summary.textContent = `You chose: ${size} hamburger with ${stuffing}, no additions.`;
  } else {
    $summary.textContent = `You chose: ${size} hamburger with ${stuffing}, with addition of ${additions.join(
      " and "
    )}.`;
  }
  createHamburgerAndCalculate(size, stuffing, additions);
});

$cross.addEventListener("click", () => {
  size = "";
  stuffing = "";
  additions = [];

  $cards.style.flexDirection = "row";
  if (window.innerWidth <= 500) {
    $cards.style.flexDirection = "column";
  }
  $hams.forEach((ham) => (ham.style.display = "flex"));
  $cross.style.display = "none";
  $stuffList.style.display = "none";
  $addList.style.display = "none";
  $btnConfirm.style.display = "none";
  $summary.style.display = "none";
  createHamburgerAndCalculate(size, stuffing, additions);
  const infoSmall = document.querySelector(".info-small");
  infoSmall.textContent = "Price: 50$. Calories: 20.";
  const infoBig = document.querySelector(".info-big");
  infoBig.textContent = "Price: 100$. Calories: 40.";
  $checkbox.forEach((checkbox) => {
    checkbox.checked = false;
  });
  $hams.forEach((ham) => {
    ham.style.pointerEvents = "auto";
  });
});
