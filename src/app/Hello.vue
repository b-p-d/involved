<template>
  <div>
    <div class="row">
      <div class="col-sm-12">

        <ul class="list-unstyled">
          <li v-for="o in opportunities">
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <ul class="text-sm-center list-unstyled">
                  <li class="lead">DEC</li>
                  <li class="display-4">10</li>
                </ul>
              </div>
              <div class="col-sm-9">
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
                <p>
                  <button class="btn btn-sm btn-outline-primary">Sign up!</button>
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
  data() {
    return {
      hello: 'involved',
      opportunities: [{
        name: 'Harvest Home Christmas Party',
        lead: 'On December 10th, Vintage will be hosting the annual Harvet Home Christmas Party. ',
        description: 'We need volunteers on the day to help set up, run crafts and make it an incredible day for the women. For more details, please contact: naomi.richardson@vintagechurchla.com',
        date: "2016-12-10T18:00:00.000Z",
        allDay: false
      },
      {
        name: 'Westside Thanksgiving Dinner',
        lead: 'This year, the Westside Thanksgiving Dinner are expecting 5,000 people through the doors. ',
        description: 'If you can volunteer on the day, please apply on the website: westsidethanksgiving.org. This dinner is for everyone who feels they have no where to go to celebrate. Even if you can’t give your time, please invite everybody you see to attend - we want the whole of LA to have a personal invitation. If you are able to give some time before the big day, please email: westsidethanksgiving@gmail.com'
      },
      {
        name: 'Angel Tree',
        lead: 'Help us give Christmas gifts to the children of incarcerated parents. ',
        description: 'We need people to write tags, sort donated gifts and deliver them too. For more info and to get involved, email: derrell.warren12@gmail.com or neggie1601@sbcglobal.net'
      },
      {
        name: 'Warm Clothes and Food Donation',
        lead: 'We will be having a donation point for anyone who can bring warm clothing and food for those in need. ',
        description: 'The drop off point will be under the Vintage Christmas tree.'
      }]
    };
  }
};
</script>
