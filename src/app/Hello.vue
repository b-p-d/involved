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
                <p v-if="e.meta" class="lead">{{ e.meta.lead }}</p>
                <p>{{ e.description }}</p>
                <p>
                  <i class="material-icons text-muted" style="vertical-align: middle;">today</i>
                  {{ e.prettyDate }}
                </p>
                <p>
                  <i class="material-icons text-muted" style="vertical-align: middle;">location_on</i>
                  {{ e.location }}
                </p>
                <ul class="list-inline">
                  <!--<li class="list-inline-item" v-for="c in o.contacts">
                    <a :href="c.link">
                      <i class="material-icons">email</i>
                      {{ e.email }}
                    </a>
                  </li>-->
                </ul>
              </div>
              <div class="col-sm-2 text-center">
                <ul class="text-sm-center list-unstyled">
                  <li v-if="e.meta" class="display-4">{{ e.meta.volunteers }} / {{ e.meta.needed }}</li>
                  <li v-if="e.meta" class="smallfont">signed-up / needed</li>
                </ul>
                <p v-if="e.meta && e.meta.signup" class="text-xs-center">
                  <button class="signup"><a class="simple-link" style="color:#FFFFFF;" v-bind:href="e.meta.signup" >Sign up!</a></button>
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
        _events[i].prettyDate = moment(_events[i].start).format('MMMM Do YYYY');
        _events[i].day = moment(_events[i].start).date();
        _events[i].month = moment(_events[i].start).format('MMM');
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