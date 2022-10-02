<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3 class="text-center mt-2">Todo List</h3>
        </v-col>
      </v-row>
      <add-todo></add-todo>
      <todo-list></todo-list>
    </v-container>
  </div>
</template>

<script>

import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
export default {
  name: 'Home',
  components: {
    'add-todo': AddTodo,
    'todo-list': TodoList
  }
}
</script>
