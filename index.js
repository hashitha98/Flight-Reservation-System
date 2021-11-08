var cookiesEmail = getCookie("email")

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

function param(name) {
    return (location.search.split(name + '=')[1] || '').split('&')[0];
}

var departure = param('departure');
var arrival = param('arrival');

var URL1 = 'http://127.0.0.1/flight-booking-api/api/get-flights.php'; //Main API
var URL2 = 'http://127.0.0.1/flight-booking-backup-api/api/get-flights.php'; //Backup API


if(departure != "" && arrival != "") {
    var URL1 = 'http://127.0.0.1/flight-booking-api/api/get-specific-flights.php?departure='+departure+'+&arrival='+arrival; //Main API
    var URL2 = 'http://127.0.0.1/flight-booking-backup-api/api/get-specific-flights.php?departure='+departure+"&arrival="+arrival; //Backup API

    $("#departing-airport").val(departure);
    $("#destination-airport").val(arrival);
}

const flightList = document.getElementById('flights-list')

GetFlightsURLChecking();

function GetFlightsURLChecking() 
{
    fetch(URL1,{method:'GET'})
    .then(function(resp) {
        //URL working
        GetFlightsURLResponseChecking(URL1);
    })
    .catch(function(err) {
        //URL not working
        GetFlightsURLResponseChecking(URL2);
    });
}


function GetFlightsURLResponseChecking(URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            //Responsiveed
            GetFlights(URL);
        } 
        else 
        {
            //Not responsive
            GetFlights(URL2);
        }
    }
request.send()
}

function GetFlights(URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            data.forEach(flights => {

                const flightCard = document.createElement('div')
                flightCard.setAttribute('class', 'flight-card')

                const flight = document.createElement('p')
                flight.textContent = flights.flight
    
                const date = document.createElement('p')
                date.textContent = flights.date

                const departure = document.createElement('p')
                departure.textContent = flights.departure

                const departureTime = document.createElement('p')
                departureTime.textContent = flights.departureTime

                const arrival = document.createElement('p')
                arrival.textContent = flights.arrival

                const arrivalTime = document.createElement('p')
                arrivalTime.textContent = flights.arrivalTime

                const price = document.createElement('p')
                price.textContent = flights.price

                const buyBtn = document.createElement('button')
                buyBtn.textContent = "Buy"
                buyBtn.setAttribute('style', 'padding: 3px; background-color: rgb(0, 110, 255); color: white; border: none; width: 50px')

                buyBtn.addEventListener('click',
                function () {
                    FlightBookProcess(flights.id);
                },
                false);
       
                flightCard.appendChild(flight)
                flightCard.appendChild(date)
                flightCard.appendChild(departure)
                flightCard.appendChild(departureTime)
                flightCard.appendChild(arrival)
                flightCard.appendChild(arrivalTime)
                flightCard.appendChild(price)
                flightCard.appendChild(buyBtn)
                flightList.appendChild(flightCard)
        
            })
        } 
        else 
        {
            console.log('error')
        }
    }
request.send()
}

var URL3 = 'http://127.0.0.1/flight-booking-api/api/book-ticket.php'; //Main API
var URL4 = 'http://127.0.0.1/flight-booking-backup-api/api/book-ticket.php'; //Backup API

var bookingFlightID;

function FlightBookProcess(flightID) {
    bookingFlightID = flightID;

    if(cookiesEmail == "") {
        window.location.href = "../../login.html";
    } else {
        FlightBookURLChecking(URL3) 
    }
}

function FlightBookURLChecking(URL) 
{
  fetch(URL,{method:'POST'})
  .then(function(resp) {
      //URL working
      FlightBookUrlResponseChecking(URL);
  })
  .catch(function(err) {
      //URL not working
      FlightBookUrlResponseChecking(URL4);
  });
}

function FlightBookUrlResponseChecking(URL) 
{
  var request = new XMLHttpRequest()
  request.open('POST', URL, true)
  request.onload = function() 
  {
      if(request.status >=200 && request.status < 400) 
      {
        FlightBook(URL);
      } 
      else 
      {
        FlightBook(URL4);
      }
  }
request.send()
}

function FlightBook(URL) 
{

  fetch(URL,{
      method:'POST',
      headers: {
          'Accept':'application/json, text/plain, */*',
          'Content-type':'application/json'
      },
      body:JSON.stringify({
          email: cookiesEmail,
          flight_id: bookingFlightID
      })
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data)
      const result = JSON.stringify(data.message);
      if(result === "\"Flight booked succesfully\"") {
        alert(result);
    } else {
        alert(result);
    }
  })
}


$("#flight-search-button").click(function(){
    var departure = $("#departing-airport").val();
    var arrival = $("#destination-airport").val();
  
    if(departure == "" || arrival == "") {
        alert("Fields can not be empty.");
    } else {
        window.location.href = "../../index.html?departure="+departure+"&arrival="+arrival;
    }
});

$("#logout-btn").click(function(){
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "../../login.html";
})