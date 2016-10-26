<template>
  <div>
    <h1>{{ hello }}</h1>

    <ul>
      <li v-for="o in opportunities">
        {{ o.name }}
        <br>
        {{ o.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      hello: 'Hello World!',
      opportunities: [{
        name: 'Harvest Home Christmas Party',
        description: 'On December 10th, Vintage will be hosting the annual Harvet Home Christmas Party. We need volunteers on the day to help set up, run crafts and make it an incredible day for the women. For more details, please email: naomi.richardson@vintagechurchla.com'
      },
      {
        name: 'Westside Thanksgiving Dinner',
        description: 'This year, the Westside Thanksgiving Dinner are expecting 5,000 people through the doors. If you can volunteer on the day, please apply on the website: westsidethanksgiving.org. If you are able to give some time before the big day, please email westsidethanksgiving@gmail.com This dinner is for everyone who feels they have no where to go to celebrate. Even if you can’t give your time, please invite everybody you see to attend - we want the whole of LA to have a personal invitation.'
      },
      {
        name: 'Angel Tree',
        description: 'Help us give Christmas gifts to the children of incarcerated parents. We need people to write tags, sort donated gifts and deliver them too. For more info and to get involved, email: derrell.warren12@gmail.com / neggie1601@sbcglobal.net '
      },
      {
        name: 'Warm Clothes and Food Donation',
        description: 'We will be having a donation point for anyone who can bring warm clothing and food for those in need. The drop off point will be under the Vintage Christmas tree.'
      }]
    };
  }
};
</script>
