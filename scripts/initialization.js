

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
});

if (sessionStorage.guests) {
  if (document.querySelector("#dropdown_guests__text").tagName == 'INPUT') {
    document.querySelector("#dropdown_guests__text").value = sessionStorage.guests;
  } else {
    document.querySelector("#dropdown_guests__text").innerText = sessionStorage.guests;
  }
}

if (sessionStorage.startFullTripDate && sessionStorage.endFullTripDate && document.querySelector('input[name=trip_start]') && document.querySelector('input[name=trip_end]')) {

  document.querySelector('input[name=trip_start]').value = sessionStorage.startFullTripDate;
  document.querySelector('input[name=trip_end]').value = sessionStorage.endFullTripDate;
}

if (sessionStorage.fullTripDates && document.querySelector('.date-full__dates')) {
  document.querySelector('.date-full__dates').innerText = sessionStorage.fullTripDates;
}

//-----------------------------------------
console.log("User-agent header sent: " + navigator.userAgent);
