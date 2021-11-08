var adminStatus = getCookie("admin")
if(adminStatus == "") {
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


// ########################################### start of get flight  ###########################################
var URL3 = 'http://127.0.0.1/flight-booking-api/api/get-flights.php'; //Main API
var URL4 = 'http://127.0.0.1/flight-booking-backup-api/api/get-flights.php'; //Backup API

const flightList = document.getElementById('flights-list')

GetFlightsURLChecking();

function GetFlightsURLChecking() 
{
    fetch(URL1,{method:'GET'})
    .then(function(resp) {
        //URL working
        GetFlightsURLResponseChecking(URL3);
    })
    .catch(function(err) {
        //URL not working
        GetFlightsURLResponseChecking(URL4);
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
            GetFlights(URL4);
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

                const status = document.createElement('div')
                status.setAttribute('class', 'status')

                const statusInput = document.createElement('input')
                statusInput.setAttribute("id", flights.id);
                statusInput.setAttribute("type", "text");
                statusInput.setAttribute("placeholder", "Status");
                statusInput.value = flights.status

                status.appendChild(statusInput)

                const statusUpdateBtn = document.createElement('button')
                statusUpdateBtn.setAttribute("style", "margin-left:5px;");
                statusUpdateBtn.textContent = "Update"

                status.appendChild(statusUpdateBtn)

                statusUpdateBtn.addEventListener('click',
                function () {
                    UpadateStatus(flights.id);
                },
                false);
       
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
        } 
        else 
        {
            console.log('error')
        }
    }
request.send()
}
// ########################################### end of get flight  ###########################################


// ########################################### start of update status  ###########################################

var updatedFlightID;

var URL5 = 'http://127.0.0.1/flight-booking-api/api/update-status.php'; //Main API
var URL6 = 'http://127.0.0.1/flight-booking-backup-api/api/update-status.php'; //Backup API

function UpadateStatus(flightID) {
    updatedFlightID = flightID;

    var status = $("#"+flightID).val();
    
    if(status == "") {
        alert("Fields can not be empty.");
    } else {
        UpdateStatusURLChecking(URL5);
    }
}

function UpdateStatusURLChecking(URL) 
{
    fetch(URL,{method:'PUT'})
    .then(function(resp) {
        //URL working
        UpdateStatusResponseChecking(URL5);
    })
    .catch(function(err) {
        //URL not working
        UpdateStatusResponseChecking(URL6);
    });
}

function UpdateStatusResponseChecking(URL) 
{
    var request = new XMLHttpRequest()
    request.open('PUT', URL, true)
    request.onload = function() 
    {

        if(request.status >=200 && request.status < 400) 
        {
            UpdateStatus(URL);
        } 
        else 
        {
            UpdateStatus(URL6);
        }
    }
request.send()
}

function UpdateStatus(URL) 
{
    var status = $("#"+updatedFlightID).val();

    fetch(URL,{
        method:'PUT',
        headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id: updatedFlightID,
	        status: status
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        const result = JSON.stringify(data.message);
    })

    location.reload();

}
// ########################################### end of update status  ###########################################


// ########################################### start of add flight  ###########################################
var URL1 = 'http://127.0.0.1/flight-booking-api/api/add-flight.php'; //Main API
var URL2 = 'http://127.0.0.1/flight-booking-backup-api/api/add-flight.php'; //Backup API

$("#flight-add-button").click(function(){
  var flight = $("#flight").val();
  var date = $("#date").val();
  var departure = $("#departure").val();
  var departureTime = $("#departure-time").val();
  var arrival = $("#arrival").val();
  var arrivalTime = $("#arrival-time").val();
  var price = $("#price").val();

  if(flight == "" || date == "" || departure == "" || departureTime == "" || arrival == "" || arrivalTime == "" || price == "") {
      alert("Fields can not be empty.");
  } else {
      AddFlightURLChecking(URL1);
  }
});

function AddFlightURLChecking(URL) 
{
  fetch(URL,{method:'POST'})
  .then(function(resp) {
      //URL working
      AddFlightResponseChecking(URL1);
  })
  .catch(function(err) {
      //URL not working
      AddFlightResponseChecking(URL2);
  });
}

function AddFlightResponseChecking(URL) 
{
  var request = new XMLHttpRequest()
  request.open('POST', URL, true)
  request.onload = function() 
  {
  

      if(request.status >=200 && request.status < 400) 
      {
          AddFlight(URL);
      } 
      else 
      {
          AddFlight(URL2);
      }
  }
request.send()
}

function AddFlight(URL) 
{
  var flight = $("#flight").val();
  var date = $("#date").val();
  var departure = $("#departure").val();
  var departureTime = $("#departure-time").val();
  var arrival = $("#arrival").val();
  var arrivalTime = $("#arrival-time").val();
  var price = $("#price").val();

  fetch(URL,{
      method:'POST',
      headers: {
          'Accept':'application/json, text/plain, */*',
          'Content-type':'application/json'
      },
      body:JSON.stringify({
          flight: flight,
          date: date,
          departure: departure,
          departureTime: departureTime,
          arrival: arrival,
          arrivalTime: arrivalTime,
          price: price,
      })
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data)
      const result = JSON.stringify(data.message);
  })

  $(".add-flights-container").css("display", "none");

  location.reload();

  alert("Flight added succesfully.")
}
// ########################################### end of add flight  ###########################################


//add flight button click function
$(document).ready(function () {
  $(".floating-add-button").click(function () {
      $(".add-flights-container").css("display", "block");
  });
});

//close flight button click function
$(document).ready(function () {
  $("#flight-cancel-button").click(function () {
      $(".add-flights-container").css("display", "none");
  });
});

$("#logout-btn").click(function(){
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "../../login.html";
})