<template>
  <div class="container">
    <AppSidebar class="sidebar" @add-widget="addWidget" />
    <div class="dashboard">
      <MainContent :widgets="activeWidgets" @add-widget="addWidget" @update-widgets="updateWidgets" />
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import MainContent from '@/components/MainContent.vue';

export default {
  components: {
    AppSidebar,
    MainContent,
  },
  data() {
    return {
      activeWidgets: [],
    };
  },
  methods: {
    addWidget(widget) {
  console.log("Adding widget:", widget);
  const isWidgetActive = this.activeWidgets.some(activeWidget => activeWidget.component === widget.component);
  if (!isWidgetActive) {
    // Assuming default size and position for new widgets
    const defaultSizeAndPosition = {
      x: 10, // Default starting X position
      y: 10, // Default starting Y position
      width: 200, // Default width
      height: 200, // Default height
      isActive: false, // Default active state
    };
    const newWidget = {
      ...widget,
      id: Date.now(), // Ensure a unique ID
      ...defaultSizeAndPosition,
    };
    this.activeWidgets.push(newWidget);
  }
},

    updateWidgets(updatedWidgets) {
      this.activeWidgets = updatedWidgets;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  background-color: black; /* Black background for the whole container */
}

.sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: #333; /* Dark grey for the sidebar */
  color: #fff; /* White text color for contrast */
}

.dashboard {
  margin-left: 150px; /* Adjust based on sidebar width and desired spacing */
  flex-grow: 1;
  background-color: #222; /* Slightly lighter grey for the dashboard */
  padding: 20px;
  color: #fff; /* White text color for the dashboard */
}

@media (max-width: 768px) {
  .sidebar, .dashboard {
    position: static;
    width: 100%;
    margin-left: 0;
    padding: 10px;
  }
}
</style>