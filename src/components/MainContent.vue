<template>
  <div class="dashboard" @dragover.prevent="allowDrop" @drop.prevent="onDrop">
    <DraggableResizableVue
      v-for="widget in widgets"
      :key="widget.id"
      :x="widget.x"
      :y="widget.y"
      :w="widget.width"
      :h="widget.height"
      :minW="100"
      :minH="100"
      :isActive="widget.isActive"
      @resizing="onResize(widget.id, $event)"
      @dragging="onDrag(widget.id, $event)"
    >
      <component :is="widget.component" :key="widget.id"></component>
    </DraggableResizableVue>
  </div>
</template>

<script>
import { ref } from 'vue';
import DraggableResizableVue from 'draggable-resizable-vue3';

export default {
  components: {
    DraggableResizableVue,
  },
  setup() {
    const widgets = ref([]);

    const onResize = (id, event) => {
      const widget = widgets.value.find(w => w.id === id);
      if (widget) {
        widget.width = event.width;
        widget.height = event.height;
      }
    };

    const onDrag = (id, event) => {
      const widget = widgets.value.find(w => w.id === id);
      if (widget) {
        widget.x = event.x;
        widget.y = event.y;
      }
    };

    const allowDrop = (event) => {
      event.preventDefault();
    };

    const onDrop = (event) => {
      event.preventDefault();
      const dashboardRect = event.currentTarget.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/json'));

      

      // Convert drop coordinates to relative positions within the dashboard
      const x = event.clientX - dashboardRect.left;
      const y = event.clientY - dashboardRect.top;

      const newWidget = {
        id: Date.now(), // Ensure a unique ID
        component: data.component,
        x: x < 0 ? 0 : x, // Ensure widget is placed within bounds
        y: y < 0 ? 0 : y, // Ensure widget is placed within bounds
        width: 200, // Default width
        height: 200, // Default height
        isActive: false, // Default active state
      };
      widgets.value.push(newWidget);
    };

    return {
      widgets,
      onResize,
      onDrag,
      allowDrop,
      onDrop,
    };
  },
};
</script>

<style scoped>
.dashboard {
  position: relative;
  margin-left: 250px; /* Ensure this matches the actual sidebar width */
  width: calc(100% - 250px); /* Ensure this calculation matches the layout */
  height: 100vh;
  background-color: #222;
}
</style>
