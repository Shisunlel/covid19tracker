let result = ''
const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let generalCountry = document.querySelector('.general-country')
let generalDate = document.querySelector('.general-date')
let newCase = document.querySelector('.cases-new')
let totalCase = document.querySelector('.cases-total')
let newDeath = document.querySelector('.deaths-new')
let totalDeath = document.querySelector('.deaths-total')
let newRecovered = document.querySelector('.recovered-new')
let totalRecovered = document.querySelector('.recovered-total')


async function fetchData(){
    const res = await fetch('https://api.covid19api.com/summary ')
    const data = await res.json()
    return data;
}

const updateData = async () => {
    result = await fetchData();
    const data = result.Countries.filter(e => e.Country == 'Cambodia');
    generalCountry.innerText = data[0].Country;
    //covert data
    generalDate.innerText = createDate(data[0].Date);
    newCase.innerText = data[0].NewConfirmed;
    newDeath.innerText = data[0].NewDeaths;
    newRecovered.innerText = data[0].NewRecovered;
    totalCase.innerText = data[0].TotalConfirmed;
    totalDeath.innerText = data[0].TotalDeaths;
    totalRecovered.innerText = data[0].TotalRecovered;
}

setInterval(() => {
    updateData()
}, 600000);

function createDate(dateString){
    date = new Date(dateString);
    dayString = dayOfWeek[date.getDay()]
    day = date.getDate()
    day = addLeadingZero(day)
    month = date.getMonth() + 1
    month = addLeadingZero(month)
    year = date.getFullYear()
    hour = date.getHours()
    hour = addLeadingZero(hour)
    minute = date.getMinutes()
    minute = addLeadingZero(minute)
    second = date.getSeconds()
    second = addLeadingZero(second)
    return `${dayString}, ${day}-${month}-${year} ${hour}:${minute}:${second}`
}

function addLeadingZero(input){
    if(input < 10){
        input = '0' + input;
    }
    return input;
}

// run the first time
document.querySelector('.script').style.display = 'block';
updateData()