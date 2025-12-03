let count = 5;

function updateCounter() {
    document.getElementById("counter").innerText = count;
    if (count >= 0) {
        count --;
        setTimeout(updateCounter, 1200);
    }
    else {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("main_content").classList.remove("hidden");
    }
}

window.onload = updateCounter;

//My Google API key: AIzaSyB_fi2Dfq38_dkzLvXzuZwi1LU4JNTK69k

const holidayCalendars = [
    { country: "United Kingdom", calendarId: "en.gb#holiday@group.v.calendar.google.com" },
    { country: "United States", calendarId: "en.usa#holiday@group.v.calendar.google.com" },
    { country: "India", calendarId: "en.in#holiday@group.v.calendar.google.com" },
    { country: "Canada", calendarId: "en.ca#holiday@group.v.calendar.google.com" },
    { country: "Australia", calendarId: "en.australian#holiday@group.v.calendar.google.com" },
    { country: "Germany", calendarId: "en.german#holiday@group.v.calendar.google.com" },
    { country: "France", calendarId: "en.french#holiday@group.v.calendar.google.com" },
    { country: "Nigeria", calendarId: "en.ng#holiday@group.v.calendar.google.com" }, // unofficial
  ];

  function getCalendarIdByCountry(country) {
    const match = holidayCalendars.find(entry => entry.country.toLowerCase() === country.toLowerCase());
    return match ? match.calendarId : null;
  }

  function checkHolidayTiming(holidayDate, summary) {
    const today = new Date();
    const eventDate = new Date(holidayDate);
    const diffInDays = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      alert(`Today is ${summary}!`);
    } else if (diffInDays === 14) {
      alert(`${summary} is in two weeks!`);
    } else if (diffInDays === 30) {
      alert(`${summary} is in one month!`);
    }
  }

  function fetchHolidaysForCountry(country) {
    const calendarId = getCalendarIdByCountry(country);
    if (!calendarId) {
      document.getElementById("holidaysList").innerText = `No holiday calendar found for ${country}`;
      return;
    }

    gapi.client.init({
      apiKey: 'AIzaSyB_fi2Dfq38_dkzLvXzuZwi1LU4JNTK69k',
    }).then(() => {
      return gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
    }).then(response => {
      const events = response.result.items;
      if (events.length > 0) {
        const listItems = events.map(event => {
          const eventDate = event.start.date || event.start.dateTime;
          checkHolidayTiming(eventDate, event.summary); // Alert logic here
          return `<li>${event.summary} - ${eventDate}</li>`;
        }).join('');
        document.getElementById("holidaysList").innerHTML = `<ul>${listItems}</ul>`;
      } else {
        document.getElementById("holidaysList").innerText = "No upcoming holidays found.";
      }
    }).catch(err => {
      console.error("Error fetching holidays:", err);
      document.getElementById("holidaysList").innerText = "Failed to load holidays.";
    });
  }

  function detectCountryAndFetch() {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const country = data.country_name;
        fetchHolidaysForCountry(country);
      })
      .catch(err => {
        console.error("Geolocation error:", err);
        document.getElementById("holidaysList").innerText = "Unable to detect location.";
      });
  }

  gapi.load('client', detectCountryAndFetch);

const images = {
    0: "my-picture.jgp",
    1: "my_picture.jpg",
    2: "mypicture",
    3: "mypictures"
}

function updateImage() {
    const month = new Date().getMonth();
    const index = math.floor(month / 3);
    const imageContainer = document.getElementById("imageContainer");

    // Remove the old image (if any)
    imageContainer.innerHTML = "";

    const newImg = document.createElement("img");
    newImg.alt = "Seasonal Image";
    newImg.width = 200;

    imageContainer.appendChild(newImg);
}

updateImage()

document.getElementById("year").textContent = new Date().getFullYear()
var lenngth = window.history.length