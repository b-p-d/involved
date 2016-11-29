<template>
  <div class="calendar-list">

    <div class="row">
      <div class="col-sm-12">

        <ul class="list-unstyled">
          <li v-for="e in events">
            <hr>
            <div class="row">
              <div class="col-sm-4">
                <ul class="text-sm-center list-unstyled" style="position: absolute; top: 0; left: 0; margin: 5px 20px; z-index: 100; background-color: white; opacity: 0.75; padding-left: 5px; padding-right: 5px;">
                  <li class="lead">{{ e.month }}</li>
                  <li class="display-4">{{ e.day }}</li>
                </ul>
                <img v-if="e.meta && e.meta.image" v-bind:src="e.meta.image" alt="some_text" style="width:300px;height:200px; position: relative;">
                <img v-if="!e.meta || !e.meta.image" src="images/hands.jpg" style="width:300px;height:200px; position: relative;"></img>
              </div>
              <div class="col-sm-6">
                <h3 class="display-4">{{ e.summary }}</h3>
                <!--<p v-if="e.meta" class="lead">{{ e.meta.lead }}</p>-->
                <p>{{ e.description }}</p>
                <p v-if="e.email">
                  <i class="material-icons text-muted" style="vertical-align: middle;">email</i>
                  {{ e.email }}
                </p>
                
                <!-- Spans multiple days-->
                <p v-if="e.multiday === true">
                  <i class="material-icons text-muted" style="vertical-align: middle;">today</i>
                  {{ e.startDate }} to {{ e.endDate }}
                </p>

                <!-- All day-->
                 <p v-if="e.allDay === true && e.multiday == false">
                  <i class="material-icons text-muted" style="vertical-align: middle;">today</i>
                  {{ e.startDate }}
                </p>

                <!-- Specific time-->
                <p v-if="e.allDay == false && e.multiday == false">
                  <i class="material-icons text-muted" style="vertical-align: middle;">today</i>
                  {{ e.startDate }} </br>
                  &#160&#160&#160&#160&#160&#160&#160{{ e.startTime }} - {{ e.endTime }}
                  
                </p>

                <p v-if="e.location">
                  <i class="material-icons text-muted" style="vertical-align: middle;">location_on</i>
                  <a class="simple-link" style="color:#00CCBB" v-bind:href="e.url">{{ e.location }}</a>
                </p>
              </div>
              <div class="col-sm-2 text-center">
                <ul v-if="e.meta && e.meta.needed == null && e.meta.volunteers" class="text-sm-center list-unstyled">
                  <li class="display-4">{{ e.meta.volunteers }}</li>
                  <li class="smallfont">signed-up</li>
                </ul>
                <ul v-if="e.meta && e.meta.needed && e.meta.volunteers == null" class="text-sm-center list-unstyled">
                  <li class="display-4">{{ e.meta.needed }}</li>
                  <li class="smallfont">needed</li>
                </ul>
                <ul v-if="e.meta && e.meta.needed && e.meta.volunteers" class="text-sm-center list-unstyled">
                  <li class="display-4">{{ e.meta.volunteers }} / {{ e.meta.needed }}</li>
                  <li class="smallfont">signed-up / needed</li>
                </ul>
                <p v-if="e.meta && e.meta.signup" class="text-xs-center">
                  <button class="signup"><a  style="color:#FFFFFF" v-bind:href="e.meta.signup" >Sign up!</a></button>
                 </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
var moment = require('moment');

export default {
  name: 'Hello',
  created: function () {
    this.$http.get('http://localhost:3000').then(response => {
      console.log(response);

      var _events = response.body;

      for (var i = 0; i < _events.length; i++) {

        _events[i].url = "http://maps.google.com/?q=" + _events[i].location;

        var start;
        var end;

        if (_events[i].start && _events[i].end) {
            start = moment(_events[i].start);
            end = moment(_events[i].end);
            _events[i].allDay = true;

          
            end.subtract (1,'hour');

            var duration = moment.duration(end.diff(start));
            var days = duration.asDays();

            if (days > 1) {
              console.log("yes multiday");
              _events[i].multiday = true;
            } else {
              console.log("no multiday");
              _events[i].multiday = false;
            }
        }

        if (_events[i].startTime && _events[i].endTime) {
            start = moment(_events[i].startTime);
            end = moment(_events[i].endTime);
            _events[i].startTime =start.format('h:mma');
            _events[i].endTime =end.format('h:mma');
            _events[i].allDay = false;

            var endDateString = moment(_events[i].endTime).format('MMMM Do, YYYY');
            var startDateString = moment(_events[i].startTime).format('MMMM Do, YYYY');

            if (endDateString === startDateString) {
              console.log("they are equal");
               _events[i].multiday = false;
            } else {
              console.log("they are not equal");
              _events[i].multiday = true;
            }
        }

        _events[i].startDate =start.format('dddd MMMM Do');
        _events[i].day = start.date();
        _events[i].month = start.format('MMM');
       _events[i].endDate =end.format('dddd MMMM Do');
      }

      this.events = _events;

    }, response => {
      // error callback
      console.log(response);
    });
  },
  data() {
    return {
      events:[]
    };
  }
};
</script>