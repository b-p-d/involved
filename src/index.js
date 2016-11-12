import Vue from 'vue';
import Hello from './app/Hello.vue';

import './index.scss';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Hello
      }
    }
  ]
});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view'),
  data:{
    events:[],
    CLIENT_ID = '651970668294-he7n6h15p0iv9b8tv3mjkd8i86jfn156.apps.googleusercontent.com',
    SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"],
  },
  ready:function(){
    checkAuth();
  },
  methods: {
    checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      },

      handleAuthResult(authResult) {
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
      },

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      },

       /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      },

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      listUpcomingEvents() {
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

          this.$nextTick(function () {
            this.$set(events,data);
          });

          console.log (events);

          appendPre('Upcoming events:');

          if (data.length > 0) {
            for (i = 0; i < data.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }

          console.log ("hello");

        });
      },

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
  }
});
