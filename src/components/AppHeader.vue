<script setup>



import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useStore } from 'vuex'

let store = useStore()

const sideBarToggle = () => {
    let sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

    if (sidenav == false) {
        store.commit('largeSidebar/toggleSidebarProperties')
    } else {
        store.commit('largeSidebar/toggleSidebarProperties')
    }
}
</script>

<template>
  <div class="header-wrapper flex justify-between items-center px-4">
    <div class="flex items-center">
      <!-- Logo section -->
      <div class="logo flex justify-center">
          <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
      </div>
      <!-- Hamburger menu button -->
      <div class="mx-0 sm:mx-3">
          <button @click="sideBarToggle" class="menu-toggle cursor-pointer text-gray-500 align-middle focus:outline-none" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
          </button>
      </div>
    </div>
    
     <!-- Mega Menu -->
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton class="btn-sm mx-3 focus:outline-none">
        <span>Mega Menu</span>
        <!-- SVG for dropdown icon -->
      </MenuButton>
      <MenuItems class="absolute mega-menu bg-white rounded-md shadow-lg focus:outline-none">
        <MenuItem>
          <!-- Your Mega Menu content here -->
        </MenuItem>
        <!-- Additional MenuItems as needed -->
      </MenuItems>
    </Menu>
  </div>






</template>

<style scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px; /* Adjust the height as needed */
  z-index: 1000; /* Ensure it's above other content */
  background-color: #FFFFFF; /* Background color */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* Adjust padding as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: adds shadow for depth */
}

.logo-image {
  /* Adjust these as necessary for your logo */
  height: 60px; /* Example height, adjust as needed */
  width: auto; /* Maintains aspect ratio */
}
</style>
