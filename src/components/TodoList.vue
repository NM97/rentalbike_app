<template>
  <div>
    <div class="flex flex-col">
      <h2>Nieukończone ({{ uncompletedTodos.length }})</h2>
      <div class="flex flex-row flex-wrap">
        <todo
          v-for="todo in uncompletedTodos"
          :todo="todo"
          :key="todo.id"
          @delete-todo="deleteTodo(todo)"
          @toggle-todo="toggleTodo(todo)"
        ></todo>
      </div>
      <h2>Ukończone ({{ completedTodos.length }})</h2>
      <div class="flex flex-row flex-wrap">
        <todo
          v-for="todo in completedTodos"
          :todo="todo"
          :key="todo.id"
          @delete-todo="deleteTodo(todo)"
          @toggle-todo="toggleTodo(todo)"
        ></todo>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import todo from './todo'

export default {
  name: 'TodoList',
  props: ['todos'],
  components: {
    todo
  },

  computed: {
    completedTodos: function () {
      return this.todos.filter(function (todo) {
        return todo.status === 1
      })
    },
    uncompletedTodos: function () {
      return this.todos.filter(function (todo) {
        return todo.status === 0
      })
    }
  },

  methods: {
    deleteTodo: function (todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos.splice(todoIndex, 1)

      const authorization = {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      }

      axios.post(
        'http://127.0.0.1:8000/admin/delete-todo',
        todo,
        authorization
      )
    },
    toggleTodo: function (todo) {
      if (todo.status === 1) {
        todo.status = 0
      } else {
        todo.status = 1
      }

      const authorization = {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      }

      axios.post(
        'http://127.0.0.1:8000/admin/toggle-todo',
        todo,
        authorization
      )
    }
  }
}
</script>

<style type="text/css">
</style>
