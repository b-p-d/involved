<template>

    <div class="detailForm">

        <div class="row">

            <!-- Empty left column -->
            <div class="col-md-2">
            </div>

            <!-- Form Column -->
                <div class="col-md-8 center">

                <form class="form-horizontal" align="left">
                <fieldset>

                <!-- Form Name -->
                <legend align="center" style="padding-top:50px; padding-bottom:50px">Volunteer Event Details</legend>

                <!-- Text input-->
                <div class="form-group row">
                <label class="col-md-4 col-form-label" for="textinput">Volunteers needed</label>  
                <div class="col-md-8">
                <input id="textinput" name="textinput" type="text" placeholder="Enter a number" class="form-control input-md" v-model="calendarEvent.needed">
                    
                </div>
                </div>

                <!-- Text input-->
                <div class="form-group row">
                <label class="col-md-4 col-form-label" for="textinput">Volunteers signed up</label>  
                <div class="col-md-8">
                <input id="textinput" name="textinput" type="text" placeholder="Enter a number" class="form-control input-md" v-model="calendarEvent.volunteers">
                    
                </div>
                </div>

                <!-- Text input-->
                <div class="form-group row">
                <label class="col-md-4 col-form-label" for="textinput">Contact email</label>  
                <div class="col-md-8">
                <input id="textinput" name="textinput" type="text" placeholder="Enter email address" class="form-control input-md">
                    
                </div>
                </div>

                <!-- Text input-->
                <div class="form-group row">
                <label class="col-md-4 col-form-label" for="textinput">Image url</label>  
                <div class="col-md-8">
                <input id="textinput" name="textinput" type="text" placeholder="Enter image link" class="form-control input-md" v-model="calendarEvent.image">
                    
                </div>
                </div>

                <!-- Text input-->
                <div class="form-group row">
                <label class="col-md-4 col-form-label" for="textinput">Sign up form url</label>  
                <div class="col-md-8">
                <input id="textinput" name="textinput" type="text" placeholder="Enter sign up form link" class="form-control input-md" v-model="calendarEvent.signup">
                    
                </div>
                </div>

                <!-- Button -->
                <div class="form-group row">
                <label class="col-md-4 col-form-label" for="singlebutton"></label>
                <div class="col-md-8 text-md-right">
                    <button type="button" v-on:click="encode" class="btn btn-primary">Submit</button>
                </div>
                </div>

                </fieldset>
                </form>

            </div>

            <!-- Empty right column -->
            <div class="col-md-2">
            </div>
        </div>

         <!-- Output -->
        <div class="row-fluid col-md-12 text-md-center" style="background-color:#F7F7F7;padding:0;width:100%;margin-left:0;margin-right:0">
            <p style="padding-top:20px">{{ displayStringInstructions }}</p>
            <p style="width:500px; height:200px">{{ displayString }}</p>
        </div>

    </div>
    <!--<div>
        <div>
            <label>Volunteers needed</label>
            <input type="text" v-model="calendarEvent.needed">
        </div>
        <div>
            <label>Volunteers signed up</label>
            <input type="text" v-model="calendarEvent.volunteers">
        </div>
        <div>
            <label>Imagelink</label>
            <input type="text" v-model="calendarEvent.image">
        </div>
        <div>
            <label>Sign up link</label>
            <input type="text" v-model="calendarEvent.signup">
        </div>
        <div>
            <button v-on:click="encode">Submit</button>
        </div>
         <div>
            <textarea v-model="displayString">
        </div>
    </div>-->
</template>

<script>
 export default {
     name: 'Builder',
     data () {
         return {
             calendarEvent:{},
             displayString:'',
             displayStringInstructions:''
         }
     },
     methods: {
         encode: function () {
             console.log("hello!!");
             var jsonString = JSON.stringify(this.calendarEvent);
             var encodedString = window.btoa(jsonString);
             var heading = "--- MORE ---";
             this.displayString = (heading + "/n" + encodedString);
             this.displayStringInstructions = "Copy and paste into the Google Calendar event description";
             console.log("hello!");
         }
     }

 }
</script>
