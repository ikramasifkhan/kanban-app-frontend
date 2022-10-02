<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card class="mx-auto">
          <v-app-bar dark color="pink">
            <v-toolbar-title>To Do</v-toolbar-title>
          </v-app-bar>
          <v-container>
            <draggable id="initial" @sort="dragged" group="ssss" :list="getAllInitialTodoList">
              <v-row dense v-for="list in getAllInitialTodoList" :key="list.id" :rowId="list.id">
                <v-col cols="12">
                  <v-card color="#385F73" dark>
                    <v-card-title class="text-h5">
                      {{ list.title }}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </draggable>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="mx-auto">
          <v-app-bar dark color="pink">
            <v-toolbar-title>In Progress</v-toolbar-title>
          </v-app-bar>

          <v-container>
            <draggable @sort="dragged" id="in_progress" group="ssss" :list="getAllInProgressTodoList">
              <v-row dense v-for="list in getAllInProgressTodoList" :key="list.id" :rowId="list.id">
                <v-col cols="12">
                  <v-card color="#385F73" dark>
                    <v-card-title class="text-h5">
                      {{ list.title }}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </draggable>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="mx-auto">
          <v-app-bar dark color="pink">
            <v-toolbar-title>Done</v-toolbar-title>
          </v-app-bar>

          <v-container>
            <draggable @sort="dragged" id="done" group="ssss" :list="getAllTodoDoneList">
              <v-row dense v-for="list in getAllTodoDoneList" :key="list.id" :rowId="list.id">
                <v-col cols="12">
                  <v-card color="#385F73" dark>
                    <v-card-title class="text-h5">
                      {{ list.title }}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </draggable>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import draggable from "vuedraggable";

export default {
  name: "TodoList",
  components: {
    draggable
  },
  computed: {
    ...mapGetters("todo", [
      "getAllInitialTodoList",
      "getAllInProgressTodoList",
      "getAllTodoDoneList"
    ])
  },
  mounted() {
    this.getInitialTodoList()
    this.getInProgressTodoList()
    this.getDoneTodoList()
  },
  methods: {
    ...mapActions("todo", [
      "getInitialTodoList",
      "getInProgressTodoList",
      "getDoneTodoList",
      "changeTodoStatus"
    ]),
    dragged(event){
      const elementId = event.item.getAttribute("rowId")
      const status = event.to.getAttribute("id")

      if(status==='initial'){
        this.getAllInitialTodoList.map((todo, index) => {
          todo.sort = index + 1
        });
        this.changeTodoStatus({
          elementId:elementId,
          status: status,
          sortingElements: this.getAllInitialTodoList
        })
      }

      if(status==='in_progress'){
        this.getAllInProgressTodoList.map((todo, index) => {
          todo.sort = index + 1
        })
        this.changeTodoStatus({
          elementId:elementId,
          status: status,
          sortingElements: this.getAllInProgressTodoList
        })
      }

      if(status==='done'){
        this.getAllTodoDoneList.map((todo, index) => {
          todo.sort = index + 1
        })
        this.changeTodoStatus({
          elementId:elementId,
          status: status,
          sortingElements: this.getAllTodoDoneList
        })
      }
    }
  }
}
</script>

<style scoped>

</style>