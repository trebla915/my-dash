<template>
  <div class="widget calendar-widget">
    <div class="widget-header">
      Calendar
    </div>
    <vue-cal class="vue-cal-custom" :time="false" :hide-view-selector="true" />
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
};
</script>

<style scoped>
.widget {
  background-color: #f0f0f0; /* Widget background */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Shadow for depth */
  padding: 10px; /* Padding for content */
  margin: 10px 0; /* Margin for spacing between widgets */
}

.widget-header {
  font-size: 18px; /* Larger font size for headers */
  margin-bottom: 10px; /* Space between header and calendar content */
  text-align: center; /* Center-align the header text */
}

.vue-cal-custom {
  --vuecal-bg-color: #ffffff; /* Adjust background color to match widget */
  --vuecal-text-color: #333333; /* Text color for better readability */
  --vuecal-toolbar-bg-color: #eeeeee; /* Toolbar background to differentiate */
  border-radius: 10px; /* Rounded corners for the calendar to match widget style */
}
</style>
