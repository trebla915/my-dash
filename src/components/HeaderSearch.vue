<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white px-4 py-2 shadow-md">
    <!-- Logo and Hamburger Icon -->
    <div class="flex items-center space-x-4">
      <button @click="toggleSidebar" class="text-gray-500">
        <!-- Hamburger Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <div class="flex justify-center">
        <!-- SVG Logo -->
        <!-- Insert SVG code here -->
      </div>
    </div>

    <!-- Search and Profile Icon -->
    <div class="flex items-center space-x-4">
      <HeaderSearch />
      <div class="flex space-x-2">
        <!-- Icons: GitHub, Notifications, User Profile -->
        <!-- Example for GitHub Icon -->
        <a href="https://github.com/uilibrary/AatroX-vue" target="_blank" class="text-gray-500 hover:text-gray-700">
          <!-- Insert GitHub SVG here -->
        </a>
        <!-- Implement Notifications and User Profile similarly -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import HeaderSearch from '@/components/HeaderSearch.vue'; // Ensure this component exists

const store = useStore();

const toggleSidebar = () => {
  // This example simply toggles a boolean. Adjust to match your Vuex store logic.
  store.commit('toggleSidebar');
};
</script>

<style scoped>
/* Additional styles if necessary */
</style>
