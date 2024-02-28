<template>
  <div class="todo-list-widget">
    <div class="widget-header">
      <h2>Todo List</h2>
      <button @click="removeWidget" class="remove-btn">&#8722;</button>
    </div>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTask" placeholder="Add new task..." class="task-input" />
      <button type="submit" class="add-btn">Add</button>
    </form>
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <input type="checkbox" v-model="task.completed" />
        <span :class="{ 'task-completed': task.completed }">{{ task.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoListWidget',
  props: ['widgetId'],
  data() {
    return {
      tasks: [],
      newTask: '',
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ description: this.newTask, completed: false });
        this.newTask = ''; // Reset input after adding
      }
    },
    removeWidget() {
      this.$emit('remove-widget', this.widgetId);
    },
  },
};
</script>

<style scoped>
.todo-list-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.widget-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* Space between title and task list */
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 24px;
}

.task-input, .add-btn {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.add-btn {
  cursor: pointer;
  background-color: #5cb85c;
  color: white;
}

.task-list {
  width: 100%;
}

.task-item {
  list-style: none;
  margin-bottom: 10px;
}

.task-completed {
  text-decoration: line-through;
  color: #999;
}
</style>
