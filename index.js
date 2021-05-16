let result = "";
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

// let url = 'https://api.covid19api.com/summary';

async function fetchData(countryName = "Cambodia") {
  const res = await fetch(
    `https://coronavirus-19-api.herokuapp.com/countries/${countryName}`
  )
    .then((responses) => {
      return responses.json();
    })
    .catch((err) => console.error(err));
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
    data = await fetchData(e.target.value);
  }

  if (!data?.country.length > 0 || !data) {
    return (generalCountry.innerText = "Not Found");
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
search.addEventListener("input", (e) => {
  setTimeout(() => {
    updateData(e);
  }, 2000);
});
