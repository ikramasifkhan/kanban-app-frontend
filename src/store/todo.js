import axios from "axios";
import notification from "../helper/notification";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/todos/";
export default {
    namespaced: true,
    state: {
        title: '',
        initialTodos: [],
        inProgressTodos: [],
        doneTodos: []
    },
    getters: {
        getAllInitialTodoList(state) {
            return state.initialTodos
        },
        getAllInProgressTodoList(state) {
            return state.inProgressTodos;
        },
        getAllTodoDoneList(state) {
            return state.doneTodos;
        },
    },
    mutations: {
        SET_TITLE(state, playLoad) {
            state.title = playLoad
        },
        CREATE_NEW_TODO(state, newTodo) {
            const todos = state.initialTodos
            todos.unshift(newTodo)
        },
        SET_INITIAL_TODO_LIST(state, todos) {
            state.initialTodos = todos
        },
        SET_IN_PROGRESS_TODO_LIST(state, todos) {
            state.inProgressTodos = todos
        },
        SET_DONE_TODO_LIST(state, todos) {
            state.doneTodos = todos
        },
    },
    actions: {
        getInitialTodoList({state, commit}) {
            try {
                axios.get("initial")
                    .then(({data}) => {
                        commit("SET_INITIAL_TODO_LIST", data.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        },
        getInProgressTodoList({state, commit}) {
            try {
                axios.get("in-progress")
                    .then(({data}) => {
                        commit("SET_IN_PROGRESS_TODO_LIST", data.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        },
        getDoneTodoList({state, commit}) {
            try {
                axios.get("done")
                    .then(({data}) => {
                        commit("SET_DONE_TODO_LIST", data.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        },
        addTodo({state, commit}) {
            try {
                axios.post('store', {
                    title: state.title,
                })
                    .then(({data}) => {
                        commit("CREATE_NEW_TODO", data.data)
                        commit("SET_TITLE", '')
                        notification.successNotification("New task added to Todo list")
                    }).catch((error) => {
                    notification.errorNotification('Oppas Something Went Wrong')
                })

            } catch (error) {
                console.log(error)
            }
        },

        changeTodoStatus({state, commit}, dragInfo){
            try {
                axios.put('change-status', {
                    dragInfo: dragInfo
                })
                    .then(({data}) => {
                        console.log(data)
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        }
    }
}