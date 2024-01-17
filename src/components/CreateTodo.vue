<template>
  <div>
    <div>
        <div>
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        v-on:click="openForm"
        v-show="!isCreating"
      >Dodaj zadanie</button>
        </div>
      <div class="mx-4 card bg-white max-w-md p-10 md:rounded-lg my-8 mx-auto" v-show="isCreating">
        <div class="title">
          <h1 class="font-bold text-center">Zadanie</h1>
        </div>
        <div class="form mt-4">
          <div class="flex flex-col text-sm">
            <label for="title" class="font-bold mb-2">Nazwa</label>
            <input
              class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
              type="text"
              placeholder="Określ nazwę zadania"
              v-model="nameText"
              ref="name"
            />
          </div>

          <div class="text-sm flex flex-col">
            <label for="description" class="font-bold mt-4 mb-2">Opis</label>
            <textarea
              class="appearance-none w-full border border-gray-200 p-2 h-40 focus:outline-none focus:border-gray-500"
              placeholder="Zdefiniuj opis"
              v-model="descriptionText"
              ref="project"
            ></textarea>
          </div>
        </div>

        <div class="submit mb-2 mt-1">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full float-left"
            v-on:click="sendForm"
          >Utwórz</button>
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full float-right"
            v-on:click="closeForm"
          >Zamknij</button>
        </div>
      </div>

      <!--<div class="todo-create max-w-sm w-full lg:max-w-full lg:flex" v-show="isCreating">
                <input type="text" placeholder="Określ nazwę zadania" v-model="nameText" ref="name">
                <textarea placeholder="Zdefiniuj opis" v-model="descriptionText" ref="project"></textarea>

                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="sendForm">Utwórz</button>
                <button class="bg-grey-500 hover:bg-gtey-700 text-white font-boldpy-2 px-4 rounded-full" v-on:click="closeForm">Zamknij</button>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateTodo',
  data: function () {
    return {
      isCreating: false,
      nameText: '',
      descriptionText: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    openForm: function () {
      this.isCreating = true
    },
    closeForm: function () {
      this.isCreating = false
    },

    sendForm: function () {
      const name = this.nameText
      const description = this.descriptionText
      const user = this.user.id

      this.$emit('create-todo', {
        name,
        description,
        status: 0,
        user
      })

      this.isCreating = false
    }
  }
}
</script>

<style>
.todo-create {
  margin: 20px;
  width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
}

.todo-create textarea {
  height: 150px;
}
</style>
