<template>
  <div>

    <div class="row">
      <div class="col-sm-12">

        <ul class="list-unstyled">
          <li v-for="o in opportunities">
            <hr>
            <div class="row">
              <div class="col-sm-1">
                <ul class="text-sm-center list-unstyled">
                  <li class="lead">DEC</li>
                  <li class="display-4">10</li>
                </ul>
              </div>
              <div class="col-sm-3">
                <img src="https://pbs.twimg.com/media/CsKukaQUkAA7xzf.jpg" alt="some_text" style="width:200px;height:200px;">
              </div>
              <div class="col-sm-6">
                <h3 class="display-4">{{ o.name }}</h3>
                <p class="lead">{{ o.lead }}</p>
                <p>
                  {{ o.description }}
                </p>
                <ul class="list-inline">
                  <li class="list-inline-item" v-for="c in o.contacts">
                    <a :href="c.link">
                      <i class="material-icons">email</i>
                      {{ c.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-sm-2 text-center">
                <ul class="text-sm-center list-unstyled">
                  <li class="display-4">{{ o.volunteers }} / {{ o.needed }}</li>
                  <li class="smallfont">signed-up / needed</li>
                </ul>
                <p class="text-xs-center">
                  <button class="signup"><a class="simple-link" style="color:#FFFFFF;" href="https://docs.google.com/forms/d/e/1FAIpQLScZF85hD8yyLisRtryvzbCo2AaFo2uMZc3m53SKZcjBXW_IMw/viewform" >Sign up!</a></button>
                 </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-4"  v-for="o in opportunities">
        <div class="card card-inverse" style="background-color: #333; border-color: #333;">
          <div class="card-block">
            <h4 class="card-title">
              <p class="display-4">
                <span class="display-4">10</span>
                <span class="lead">December</span>
              </p>
              {{ o.name }}
            </h4>
            <p class="card-text">{{ o.description }}</p>
            <a href="#" class="btn btn-outline-primary">Sign up</a>
          </div>
        </div>
      </div>
    </div>

    <div id="authorize-div" style="display: none">
      <span>Authorize access to Google Calendar API</span>
      <!--Button for the user to click to initiate auth sequence -->
      <button id="authorize-button" onclick="handleAuthClick(event)">
        Authorize
      </button>
    </div>
    <pre id="output"></pre>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      events:[],
      hello: 'involved',
      opportunities: [{
        name: 'Harvest Home Christmas Party',
        lead: 'On December 10th, Vintage will be hosting the annual Harvet Home Christmas Party. ',
        description: 'We need volunteers on the day to help set up, run crafts and make it an incredible day for the women. For more details, please contact: naomi.richardson@vintagechurchla.com',
        date: "2016-12-10T18:00:00.000Z",
        allDay: false,
        needed: 50,
        volunteers: 8,
        signUpLink:'https://docs.google.com/forms/d/e/1FAIpQLScZF85hD8yyLisRtryvzbCo2AaFo2uMZc3m53SKZcjBXW_IMw/viewform'
      },
      {
        name: 'Westside Thanksgiving Dinner',
        lead: 'This year, the Westside Thanksgiving Dinner are expecting 5,000 people through the doors. ',
        description: 'If you can volunteer on the day, please apply on the website: westsidethanksgiving.org. This dinner is for everyone who feels they have no where to go to celebrate. Even if you can’t give your time, please invite everybody you see to attend - we want the whole of LA to have a personal invitation. If you are able to give some time before the big day, please email: westsidethanksgiving@gmail.com',
        needed: 25,
        volunteers: 10,
        signUpLink:'https://docs.google.com/forms/d/e/1FAIpQLScZF85hD8yyLisRtryvzbCo2AaFo2uMZc3m53SKZcjBXW_IMw/viewform'
      },
      {
        name: 'Angel Tree',
        lead: 'Help us give Christmas gifts to the children of incarcerated parents. ',
        description: 'We need people to write tags, sort donated gifts and deliver them too. For more info and to get involved, email: derrell.warren12@gmail.com or neggie1601@sbcglobal.net',
        needed: 100,
        volunteers: 80,
        signUpLink:'https://docs.google.com/forms/d/e/1FAIpQLScZF85hD8yyLisRtryvzbCo2AaFo2uMZc3m53SKZcjBXW_IMw/viewform'
      },
      {
        name: 'Warm Clothes and Food Donation',
        lead: 'We will be having a donation point for anyone who can bring warm clothing and food for those in need. ',
        description: 'The drop off point will be under the Vintage Christmas tree.',
        contactPerson: 'Bob',
        needed: 5,
        volunteers: 1,
        signUpLink:'https://docs.google.com/forms/d/e/1FAIpQLScZF85hD8yyLisRtryvzbCo2AaFo2uMZc3m53SKZcjBXW_IMw/viewform'
      }]
    };
  }
};
</script>


<script>

  var CLIENT_ID = '651970668294-he7n6h15p0iv9b8tv3mjkd8i86jfn156.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      /**
    * Check if current user has authorized this application.
    */
  window.checkAuth = function() {
    gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
      }, handleAuthResult);
  }

  window.handleAuthResult = function(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      loadCalendarApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  }

  /**
    * Initiate auth flow in response to user clicking authorize button.
    *
    * @param {Event} event Button click event.
    */
  window.handleAuthClick = function(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult);
    return false;
  }

    /**
    * Load Google Calendar client library. List upcoming events
    * once client library is loaded.
    */
  function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
  }

  /**
    * Print the summary and start datetime/date of the next ten events in
    * the authorized user's calendar. If no events are found an
    * appropriate message is printed.
    */
  function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var data= resp.items;

      appendPre('Upcoming events:');

      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var event = data[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }

    });
  }

  /**
    * Append a pre element to the body containing the given message
    * as its text node.
    *
    * @param {string} message Text to be placed in pre element.
    */
  function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

</script>