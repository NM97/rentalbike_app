<template>
  <div class="dashboard">
    <div class="w-full">
      <div class="flex bg-white">
        <Sidebar />

        <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" id="main-content">
          <div class="p-6 bg-gray-100 mb-20">
            <CreateTodo v-on:create-todo="addTodo"></CreateTodo>
            <TodoList v-bind:todos="todos"></TodoList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import TodoList from '../components/TodoList'
import CreateTodo from '../components/CreateTodo'
export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    TodoList,
    CreateTodo
  },
  data: function () {
    return {
      todos: []
    }
  },

  computed: {
    user () {
      return this.$store.getters.user
    }
  },

  mounted: function () {
    const _self = this
    const user = _self.user.id
    const authorization = {
      headers: {
        Authorization: `Bearer ${this.$store.getters.token}`
      }
    }
    const blank = ''
    axios
      .get('http://127.0.0.1:8000/admin/todos/' + user, blank, authorization)
      .then(function (response) {
        console.log(response)
        _self.todos = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  methods: {
    addTodo: function (todo) {
      this.todos.push(todo)
      const todoData = new URLSearchParams()
      todoData.append('name', todo.name)
      todoData.append('description', todo.description)
      todoData.append('status', todo.status)
      todoData.append('user_id', todo.user)

      const authorization = {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      }
      axios
        .post('http://127.0.0.1:8000/admin/add-todo', todoData, authorization)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log('Błąd ' + error)
        })
    }
  }
}
</script>
