<template>
  <div class="calendar-list">

    <div class="row">
      <div class="col-sm-12">

        <ul class="list-unstyled">
          <li v-for="e in events">
            <hr>
            <div class="row">
              <div class="col-sm-1">
                <ul class="text-sm-center list-unstyled">
                  <li class="lead">{{ e.month }}</li>
                  <li class="display-4">{{ e.day }}</li>
                </ul>
              </div>
              <div class="col-sm-3">
                <img v-if="e.image" v-bind:src="e.image" alt="some_text" style="width:200px;height:200px;">
              </div>
              <div class="col-sm-6">
                <h3 class="display-4">{{ e.summary }}</h3>
                <p v-if="e.meta" class="lead">{{ e.meta.lead }}</p>
                <p>{{ e.description }}</p>
                <p>
                  <i class="material-icons text-muted">location_on</i>
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
                <p class="text-xs-center">
                  <button class="signup"><a class="simple-link" style="color:#FFFFFF;" v-bind:href="e.signup" >Sign up!</a></button>
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