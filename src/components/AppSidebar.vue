<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isSidebarOpen = computed(() => {
  // Access the Vuex state for the sidebar's open/close status
  const isOpen = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen;
  // Log the current state
  console.log("Sidebar is open:", isOpen);
  return isOpen;
});
</script>

<template>
  <div class="side-content-wrap">
    <div :class="{ 'is-open': isSidebarOpen }" class="sidebar-left">
      <ul class="navigation-left">
        <li class="nav-item">
          <router-link to="/dashboard">
            <i class="i-Bar-Chart text-3xl"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile">
            <i class="i-Find-User text-3xl"></i>
            <span>Profile</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signIn">
            <i class="i-Checked-User text-3xl"></i>
            <span>Sign In</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signUp">
            <i class="i-Add-User text-3xl"></i>
            <span>Sign Up</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>



<style lang="scss" scoped>
$primary-color: #42b983; // Defining a variable

.side-content-wrap {
    .sidebar-left {
        position: fixed;
        top: 80px;
        left: -120px;
        width: 120px;

        background: #fff;
        box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06),
            0 1px 4px rgba(0, 0, 0, 0.08);
        z-index: 90;
        transition: all 0.24s ease-in-out;
        &.open {
            left: 0;
            transition: all 0.24s ease-in-out;
        }
        .ps {
            height: calc(100vh - 80px);
        }
    }
}
</style>
