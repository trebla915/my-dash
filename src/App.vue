<template>
  <div id="app">
    <AppHeader />
    <div class="main-content">
      <AppSidebar />
      <div class="dashboard">
        <router-view />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';


export default {
  components: {
    AppHeader,
    AppSidebar,
     }
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  min-height: 100vh; /* Full viewport height */
}

.main-content {
  flex-grow: 1; /* Take up remaining space */
  padding: 20px; /* Adjust based on your design */
  margin-left: 250px; /* Adjust based on sidebar width */
  transition: margin-left 0.3s; /* Smooth transition for sidebar toggle */
}
</style>

<style scoped>
@media (max-width: 768px) {
  .main-content {
    margin-left: 0; /* Sidebar overlays content or is hidden */
  }
}
</style>
