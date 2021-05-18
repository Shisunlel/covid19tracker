// let result = "";
const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let generalCountry = document.querySelector(".general-country");
let generalDate = document.querySelector(".general-date");
let newCase = document.querySelector(".cases-new");
let totalCase = document.querySelector(".cases-total");
let newDeath = document.querySelector(".deaths-new");
let totalDeath = document.querySelector(".deaths-total");
let newRecovered = document.querySelector(".recovered-new");
let totalRecovered = document.querySelector(".recovered-total");

const search = document.querySelector("#search");
const language = document.querySelector("#language");
const newTranslate = document.querySelectorAll(".new-translate");
const totalTranslate = document.querySelectorAll(".total-translate");
const caseHeader = document.querySelector(".cases-header");
const deathHeader = document.querySelector(".deaths-header");
const recoveredHeader = document.querySelector(".recovered-header");

// let url = 'https://api.covid19api.com/summary';

async function fetchData(countryName = "Cambodia") {
  const res = await fetch(
    `https://coronavirus-19-api.herokuapp.com/countries/${countryName}`
  )
    .then((responses) => {
      return responses.json();
    })
    .catch((err) => {
      console.error(err);
    });
  return res;
}

// const updateData = async () => {
//     result = await fetchData();
//     const data = result.Countries.filter(e => e.Country == 'Cambodia');
//     generalCountry.innerText = data[0].Country;
//     //covert data
//     generalDate.innerText = createDate(data[0].Date);
//     newCase.innerText = data[0].NewConfirmed;
//     newDeath.innerText = data[0].NewDeaths;
//     newRecovered.innerText = data[0].NewRecovered;
//     totalCase.innerText = data[0].TotalConfirmed;
//     totalDeath.innerText = data[0].TotalDeaths;
//     totalRecovered.innerText = data[0].TotalRecovered;
// }

const updateData = async (e) => {
  reset();

  if (!e) {
    data = await fetchData();
  } else {
    data = await fetchData(e);

    if (data == undefined || e.length === 0) {
      return (generalCountry.innerText = "Not Found");
    }
  }

  generalCountry.innerText = data.country;
  //convert data
  generalDate.innerText = createDate();
  newCase.innerText = data.todayCases;
  newDeath.innerText = data.todayDeaths;
  totalCase.innerText = data.cases;
  totalDeath.innerText = data.deaths;
  totalRecovered.innerText = data.recovered;
};

setInterval(() => {
  updateData();
}, 600000);

function createDate() {
  date = new Date();
  dayString = dayOfWeek[date.getDay()];
  day = date.getDate();
  day = addLeadingZero(day);
  month = date.getMonth() + 1;
  month = addLeadingZero(month);
  year = date.getFullYear();
  hour = date.getHours();
  hour = addLeadingZero(hour);
  minute = date.getMinutes();
  minute = addLeadingZero(minute);
  second = date.getSeconds();
  second = addLeadingZero(second);
  return `${dayString}, ${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

function addLeadingZero(input) {
  if (input < 10) {
    input = "0" + input;
  }
  return input;
}

function reset() {
  generalCountry.innerText = "";
  generalDate.innerText = "";
  newCase.innerText = "";
  newDeath.innerText = "";
  totalCase.innerText = "";
  totalDeath.innerText = "";
  totalRecovered.innerText = "";
}

// run the first time
document.querySelector(".script").style.display = "block";
updateData();

let timeOut;

search.addEventListener("input", function () {
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    updateData(this.value);
  }, 2000);
});

const resetText = () => {
  caseHeader.innerText = "Cases";
  deathHeader.innerText = "Deaths";
  recoveredHeader.innerText = "Recovered";
  newTranslate.forEach((e) => {
    e.innerText = "New: ";
  });
  totalTranslate.forEach((e) => {
    e.innerText = "Total: ";
  });
};

const changeLanguage = function () {
  const flag = "https://www.countryflags.io/kh/shiny/32.png";
  const childrenSrc = this.children[0].src;
  if (childrenSrc === flag) {
    this.children[0].src = "https://www.countryflags.io/gb/shiny/32.png";
    caseHeader.innerText = "ករណីឆ្លង";
    deathHeader.innerText = "ករណីស្លាប់";
    recoveredHeader.innerText = "ករណីជាសះស្បើយ";
    newTranslate.forEach((e) => {
      e.innerText = "ថ្មី: ";
    });
    totalTranslate.forEach((e) => {
      e.innerText = "សរុប: ";
    });
    return;
  }
  this.children[0].src = flag;
  resetText();
};

language.addEventListener("click", changeLanguage);
