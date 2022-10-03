<template>
  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <v-form ref="addTodoForm">
          <v-row>
            <v-col cols="10">
              <v-text-field :rules="titleRules" :value="title" @input="SET_TITLE" label="Title" required></v-text-field>
            </v-col>

            <v-col cols="2" class="mt-1">
              <v-btn color="success" class="mr-4" @click="addNewTodo" :disabled="!title">
                Add
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  name: "AddTodo",
  data: () => ({
    valid: true,
    titleRules: [
      v => !!v || 'Title Field is Required',
    ],
  }),

  computed:{
    ...mapState('todo', [
        "title"
    ])
  },
  methods: {
    addNewTodo() {
      this.$refs.addTodoForm.validate()
      this.addTodo()
      this.$refs.addTodoForm.reset()
      this.$refs.addTodoForm.resetValidation()
    },
    ...mapMutations('todo', [
        "SET_TITLE"
    ]),
    ...mapActions('todo', [
        "addTodo"
    ])
  }
}
</script>

<style scoped>

</style>