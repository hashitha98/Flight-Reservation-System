var cookiesEmail = getCookie("email")
if(cookiesEmail == "") {
    window.location.href = "../../login.html";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) { 
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var URL3 = 'http://127.0.0.1/flight-booking-api/api/get-single-user.php'; //Main API
var URL4 = 'http://127.0.0.1/flight-booking-backup-api/api/get-single-user.php'; //Backup API

GetSpecificUserURLChecking();

function GetSpecificUserURLChecking()
{
    fetch(URL3+"?email="+cookiesEmail,{method:'GET'})
    .then(function(resp) {
        //URL working
        GetSpecificUserResponseChecking(URL3);
    })
    .catch(function(err) {
        //URL not working
        GetSpecificUserResponseChecking(URL4);
    });
}

function GetSpecificUserResponseChecking(URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL3+"?email="+cookiesEmail, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            LoadSpecifiUser(URL);
        } 
        else 
        {
            LoadSpecifiUser(URL4);
        }
    }
request.send()
}

function LoadSpecifiUser(URL){

    fetch(URL3+"?email="+cookiesEmail)
    .then((res) => res.json())
    .then((data) => {

    
        $("#name").text(data.name);
        $("#email").text(data.email);
    })
}

var URL1 = 'http://127.0.0.1/flight-booking-api/api/get-specific-tickets.php?email='+cookiesEmail; //Main API
var URL2 = 'http://127.0.0.1/flight-booking-backup-api/api/get-specific-tickets.php?email='+cookiesEmail; //Backup API

const flightList = document.getElementById('flights-list')

GetTicketsURLChecking();

function GetTicketsURLChecking() 
{
    fetch(URL1,{method:'GET'})
    .then(function(resp) {
        //URL working
        GetTicketsURLResponseChecking(URL1);
    })
    .catch(function(err) {
        //URL not working
        GetTicketsURLResponseChecking(URL2);
    });
}

function GetTicketsURLResponseChecking(URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            //Responsiveed
            GetTickets(URL);
        } 
        else 
        {
            //Not responsive
            GetTickets(URL2);
        }
    }
request.send()
}

function GetTickets(URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            data.forEach(tickets => {

                var flightID = tickets.flight_id;

                var URL = "http://127.0.0.1/flight-booking-api/api/get-single-flight.php?id="+flightID;

                fetch(URL)
                .then((res) => res.json())
                .then((data) => {
            
                    const flightCard = document.createElement('div')
                    flightCard.setAttribute('class', 'flight-card')
    
                    const flight = document.createElement('p')
                    flight.textContent = data.flight
        
                    const date = document.createElement('p')
                    date.textContent = data.date
    
                    const departure = document.createElement('p')
                    departure.textContent = data.departure
    
                    const departureTime = document.createElement('p')
                    departureTime.textContent = data.departureTime
    
                    const arrival = document.createElement('p')
                    arrival.textContent = data.arrival
    
                    const arrivalTime = document.createElement('p')
                    arrivalTime.textContent = data.arrivalTime
    
                    const price = document.createElement('p')
                    price.textContent = data.price

                    const status = document.createElement('p')
                    status.textContent = data.status
           
                    flightCard.appendChild(flight)
                    flightCard.appendChild(date)
                    flightCard.appendChild(departure)
                    flightCard.appendChild(departureTime)
                    flightCard.appendChild(arrival)
                    flightCard.appendChild(arrivalTime)
                    flightCard.appendChild(price)
                    flightCard.appendChild(status)
                    flightList.appendChild(flightCard)
                })

            })
        } 
        else 
        {
            console.log('error')
        }
    }
request.send()
}

$("#logout-btn").click(function(){
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "../../login.html";
})