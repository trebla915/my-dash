const largeSidebar = {
    namespaced: true,
    state: {
      sidebarToggleProperties: {
        isSideNavOpen: true, // Consider starting with the sidebar closed
      }
    },
    getters: {
      getSideBarToggleProperties: state => state.sidebarToggleProperties
    },
    mutations: {
      toggleSidebarProperties: state => {
        state.sidebarToggleProperties.isSideNavOpen = !state.sidebarToggleProperties.isSideNavOpen;
      }
    },
  }
  
  export default largeSidebar;
  