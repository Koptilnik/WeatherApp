//запускать с лайв сервера
const selector = document.querySelector('select');
const input = document.getElementById('inp');
const search = document.getElementById('searchBtn');
const spisokEl = document.querySelectorAll('li');
const info = document.getElementById('city-info');
const temperature = document.getElementById('temperature');
const pogodi = document.querySelectorAll('.pogodi');
const dynamicSpisok = document.getElementById('spisok');

let gorod = ""
let lat1 = 0;
let lon1 = 0;

fetch('cities/russian-cities.json')
.then(response => response.json())
.then(data => {
    for(let i = 0; i < data.length; i++)
    {
        let city = document.createElement('option');
        city.innerText = data[i].name;
        selector.appendChild(city);

        let searchCity = document.createElement('li');
        searchCity.innerText = data[i].name;
        dynamicSpisok.appendChild(searchCity);
        dynamicSpisok.children[i].style.display = 'none';
    }  

    input.addEventListener('input', Search)

    let ListElement = dynamicSpisok.children;
    function Search()
    {
        let item;
        for(let i = 0; i < ListElement.length; i++)
        {
            
            if(ListElement[i].innerText.toLowerCase().startsWith(input.value.toLowerCase()) && input.value !== "")
            {
                ListElement[i].style.display = 'block';

                    if(ListElement[i].innerText == data[i].name)
                    {
    
                    lat1 = Number(data[i].coords.lat);
                    lon1 = Number(data[i].coords.lon);
                    gorod = data[i].name;    
                    }
            }
            else
            {
                ListElement[i].style.display = 'none';
            }
            item = ListElement[i];
        }
    }
    for(let j = 0; j < ListElement.length; j++)
    {
            ListElement[j].addEventListener('mouseover', function() { ListElement[j].classList.add("Hselector") })
            ListElement[j].addEventListener('mouseout', function() { ListElement[j].classList.remove("Hselector") })
            ListElement[j].addEventListener('click', function() { findCity(); ListElement[j].classList.add("Hselector-for-click")});
    }
    function findCity()
    {
        const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=df37d6ea911fd6c24034793c7afde041`;
                    
        fetch(weatherData).then(data => data.json())
        .then(vivod => { 
            if(vivod.weather[0].main == 'Clouds')
            {
                pogodi.forEach(el => el.style.display = 'none');
                document.getElementById('clouds').style.display = "inline-block";
            }
            if(vivod.weather[0].main == 'Clear')
            {
                pogodi.forEach(el => el.style.display = 'none');
                document.getElementById('sunny').style.display = "inline-block";
            }
            if(vivod.weather[0].main == 'Rain')
            {
                pogodi.forEach(el => el.style.display = 'none');
                document.getElementById('rain').style.display = "inline-block";
            }
            console.log(vivod) 
            info.innerHTML = ` ${gorod}`;
            temperature.innerText = `${parseInt(vivod.main.temp - 273)} °C`;
        } )
    }
    
        function Select(el)
        {
            let nowValue = el.target.value;
            for(let j = 0; j < data.length; j++)
            {
                if(nowValue == data[j].name)
                {
                lat1 = Number(data[j].coords.lat);
                lon1 = Number(data[j].coords.lon);
                gorod = data[j].name;
                
                const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=df37d6ea911fd6c24034793c7afde041`;
                
                fetch(weatherData).then(data => data.json())
                .then(vivod => {
                    if(vivod.weather[0].main == 'Clouds')
                    {
                        pogodi.forEach(el => el.style.display = 'none');
                        document.getElementById('clouds').style.display = "inline-block";
                    }
                    if(vivod.weather[0].main == 'Clear')
                    {
                        pogodi.forEach(el => el.style.display = 'none');
                        document.getElementById('sunny').style.display = "inline-block";
                    }
                    if(vivod.weather[0].main == 'Rain')
                    {
                        pogodi.forEach(el => el.style.display = 'none');
                        document.getElementById('rain').style.display = "inline-block";
                    }
                    console.log(vivod);
                    info.innerHTML = ` ${gorod}`;
                    temperature.innerText = `${parseInt(vivod.main.temp - 273)} °C`;
                    console.log(vivod.weather[0].main);
                    })
                }
            }
        }
    selector.addEventListener('change', Select);
})



