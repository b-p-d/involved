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
                  <li class="lead">DEC</li>
                  <li class="display-4">10</li>
                </ul>
              </div>
              <div class="col-sm-3">
                <img src="https://pbs.twimg.com/media/CsKukaQUkAA7xzf.jpg" alt="some_text" style="width:200px;height:200px;">
              </div>
              <div class="col-sm-6">
                <h3 class="display-4">{{ e.summary }}</h3>
                <p class="lead">{{ e.description }}</p>
                <p>
                  {{ e.location }}
                </p>
                <p>
                  {{ e.start }}
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
                  <li class="display-4">{{ e.volunteers }} / {{ e.needed }}</li>
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

  </div>
</template>

<script>
export default {
  name: 'Hello',
  created: function () {
    this.$http.get('http://localhost:3000').then(response => {
        console.log(response);
        this.events = response.body;
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