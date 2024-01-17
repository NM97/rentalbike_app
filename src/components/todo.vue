<template>
  <div class="todo">
    <div class="">
      <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4">
        <div class="fill-current ">
          <button
            class="todo-complete-icon ml-2"
            :class="{completed: todo.status == 1}"
            @click="toggleTodo(todo)"
          ></button>
        </div>
        <div class="flex flex-col min-h-full" v-show="!editing">
          <div class="px-6 py-4 border-b">
            <div class="text-xl text-center">{{ todo.name }}</div>
          </div>
          <div class="px-6 py-10 flex-grow">
            <p class="text-gray-700 text-base">{{ todo.description }}</p>
          </div>
          <div class="px-5 py-3 border-t bg-gray-100 flex justify-end">
            <button
              class="btn-gradient-default text-gray-600 font-medium text-sm py-1 px-5 rounded mr-3"
              v-on:click="showForm"
            >Edytuj</button>
            <button
              class="btn-gradient-danger text-red-400 font-medium text-sm py-1 px-5 rounded"
              v-on:click="deleteTodo(todo)"
            >Usuń</button>
          </div>
        </div>

        <div class="flex flex-col min-h-full" v-show="editing">
          <div class="px-6 py-4 border-b">
            <div class="text-xl text-center">
              <input type="text" placeholder="Podaj nazwę" v-model="todo.name" ref="name" />
            </div>
          </div>
          <div class="px-6 py-10 flex-grow">
            <div class="text-gray-700 text-base">
              <textarea placeholder="Podaj opis" v-model="todo.description" ref="project"></textarea>
            </div>
          </div>
          <div class="px-5 py-3 border-t bg-gray-100 flex justify-end">
            <button
              class="btn-gradient-default text-gray-600 font-medium text-sm py-1 px-5 rounded mr-3"
              v-on:click="updateTodo(todo.id, todo.name, todo.description, todo.status)"
            >Zaktualizuj</button>
            <button
              class="btn-gradient-danger text-black font-medium text-sm py-1 px-5 rounded"
              v-on:click="closeForm"
            >Zamknij</button>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="flex flex-col justify-center items-center">
            <div class="fill-current">
                <button class="todo-complete-icon" :class="{completed: todo.status == 1}"  @click="toggleTodo(todo)"></button>
            </div>

            <div class="flex-col w-1/3 px-4 py-2 m-2" v-show="!editing">
                <h3>{{ todo.name }}</h3>
                <p>{{ todo.description }}</p>
                <button class="button primary" v-on:click="showForm">Edytuj</button>
                <button class="button alert" v-on:click="deleteTodo(todo)">Usuń</button>
            </div>

            <div class="flex-col large-11" v-show="editing">
                <input type="text" placeholder="Podaj nazwę" v-model="todo.name" ref="name">
                <textarea placeholder="Podaj opis" v-model="todo.description" ref="project"></textarea>

                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full float-left" v-on:click="updateTodo(todo.id, todo.name, todo.description, todo.status)">Zaktualizuj &amp; Zamknij</button>
                <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full float-right" v-on:click="closeForm">Zamknij</button>
            </div>
    </div>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'todo',
  props: ['todo'],
  data: function () {
    return {
      editing: false
    }
  },

  methods: {
    deleteTodo: function (todo) {
      this.$emit('delete-todo', todo)
    },
    toggleTodo: function (todo) {
      this.$emit('toggle-todo', todo)
    },

    showForm: function () {
      this.editing = true
    },
    closeForm: function () {
      this.editing = false
    },
    updateTodo: function (id, name, description, status) {
      const data = {
        id: id,
        name: name,
        description: description,
        status: status
      }

      const authorization = {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      }

      axios.post(
        'http://127.0.0.1:8000/admin/update-todo',
        data,
        authorization
      )

      this.editing = false
    }
  }
}
</script>

<style>
.todo {
  padding: 20px;
  margin-bottom: 20px;
}

.todo-complete-icon {
  width: 40px;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 40px;
  margin-top: 10px;
  position: relative;
  cursor: pointer;
}

.todo-complete-icon.completed {
  border-color: #00c996;
}

.todo-complete-icon.completed:before {
  content: "\2714";
  font-size: 30px;
  position: absolute;
  top: -4px;
  left: 2px;
  color: #00c996;
}
</style>
