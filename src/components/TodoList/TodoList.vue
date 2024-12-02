<template>
  <div class="card card-todo">
    <main>
      <h1 class="text-center">{{ $t("title") }}</h1>

      <!-- Edit Todo Form -->
      <div v-if="editingTodo" class="edit-todo-form">
        <label for="editor">{{ $t("todoList.todoDescription") }}</label>
        <textarea
          id="editor"
          required
          v-model="editedText"
          :placeholder="$t('todoList.edit')"
          :aria-label="$t('todoList.edit')"
        ></textarea>
        <fieldset class="flex">
          <select
            v-model="editedPriority"
            :placeholder="$t('todoList.editPriority')"
          >
            <option value="critical">
              {{ $t("todoList.priorities.critical") }}
            </option>
            <option value="moderate">
              {{ $t("todoList.priorities.moderate") }}
            </option>
            <option value="optional">
              {{ $t("todoList.priorities.optional") }}
            </option>
          </select>
          <div class="flex">
            <button
              @click="cancelEdit"
              :aria-label="$t('todoList.cancelEdit')"
              type="button"
            >
              {{ $t("todoList.cancelEdit") }}
            </button>
            <button
              @click="saveTodo"
              :aria-label="$t('todoList.saveEdit')"
              type="button"
              class="primary"
            >
              {{ $t("todoList.saveEdit") }}
            </button>
          </div>
        </fieldset>
      </div>

      <!-- Add Todo Form -->
      <div v-if="!editingTodo">
        <form @submit.prevent="addTodo">
          <label for="composer">Describe Todo</label>
          <textarea
            id="composer"
            required
            v-model="newTodoText"
            autofocus
            :placeholder="$t('todoList.placeholder')"
            aria-label="New Todo"
          ></textarea>
          <div class="flex">
            <select v-model="newTodoPriority" aria-label="Select Priority">
              <option value="critical">
                {{ $t("todoList.priorities.critical") }}
              </option>
              <option value="moderate">
                {{ $t("todoList.priorities.moderate") }}
              </option>
              <option value="optional">
                {{ $t("todoList.priorities.optional") }}
              </option>
            </select>
            <button class="primary" type="submit">
              {{ $t("todoList.addTodo") }}
            </button>
          </div>
        </form>
      </div>
      <div class="todo-list" v-if="paginatedTodos.length">
        <div class="todo-header">
          <div class="flex">
            <div>
              Sort By<select v-model="sortOrder" aria-label="Sort Todos">
                <option value="priority">Decreasing Priority</option>
                <option value="-priority">Increasing Priority</option>
                <option value="id">Updated Desc</option>
                <option value="-id">Updated Asc</option>
              </select>
            </div>
            <button
              @click="clearAllTodos"
              :aria-label="$t('todoList.clearAll')"
              type="button"
              class="danger"
            >
              {{ $t("todoList.clearAll") }}
            </button>
          </div>
        </div>
        <div class="todo-body">
          <todo-item
            v-for="todo in paginatedTodos"
            :key="todo.id"
            :todo="todo"
            @edit="startEditingTodo"
            @remove="removeTodo"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoItem from "./TodoItem.vue";
import {
  addTodo,
  getTodos,
  clearAllTodos,
  deleteTodo,
  updateTodo,
} from "../../utils/indexedDbUtils.js";
import config from "@/lookup/config.json";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodoText: "",
      newTodoPriority: "moderate",
      editedText: "",
      editedPriority: "moderate",
      todos: [],
      config,
      currentPage: 1,
      pageSize: config.todo.limit,
      loading: false,
      editingTodo: null,
      sortOrder: "priority", // Default sorting is by priority
    };
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),
    paginatedTodos() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.todos.slice(start, start + this.pageSize);
    },
    hasNextPage() {
      return this.todos.length === this.pageSize;
    },
  },
  methods: {
    async addTodo() {
      if (this.newTodoText) {
        const todo = {
          id: Date.now(),
          text: this.newTodoText,
          priority: this.newTodoPriority,
          username: this.getCurrentUser.username,
        };
        await addTodo(todo);
        this.newTodoText = "";
        this.newTodoPriority = "moderate";
        this.loadTodos(); // Reload after adding a new todo
      }
    },
    async removeTodo(id) {
      try {
        await deleteTodo(id);
      } catch (e) {
        //console.error(e);
      }

      this.loadTodos(); // Reload after removing a todo
    },
    async loadTodos() {
      this.loading = true;
      if (this.getCurrentUser) {
        const todos = await getTodos(
          this.getCurrentUser.username,
          this.currentPage,
          this.pageSize
        );
        this.todos = todos || [];
        if (this.todos.length) {
          const priorities = ["critical", "moderate", "optional"];
          const order = this.sortOrder.replace("-", "");
          const sorted = this.todos.slice().sort((a, b) => {
            return order === "priority"
              ? priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
              : a.text - b.text;
          });
          this.todos = this.sortOrder.includes("-") ? sorted.reverse() : sorted;
        }
        this.loading = false;
      }
    },
    startEditingTodo(todo) {
      this.editingTodo = todo;
      this.editedText = todo.text;
      this.editedPriority = todo.priority;
    },
    async clearAllTodos() {
      try {
        if (!this.getCurrentUser) {
          console.warn("No active user found!");
          return;
        }

        await clearAllTodos(this.getCurrentUser.username);
        this.todos = [];
        this.placeholder = "No todos available. Add new ones!";
      } catch (error) {
        alert("Failed to clear todos. Please try again.");
      }
    },
    async saveTodo() {
      if (this.editingTodo) {
        const updatedTodo = {
          ...this.editingTodo,
          text: this.editedText.substring(0, config.todo.maxlength),
          priority: this.editedPriority,
        };
        updateTodo(updatedTodo)
          .then(() => {
            this.editingTodo = null;
            this.loadTodos();
          })
          .catch((error) => console.error("Failed to update todo:", error));
      }
    },
    cancelEdit() {
      this.editingTodo = null;
      this.editedText = "";
      this.editedPriority = "moderate";
    },
    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadTodos();
      }
    },
    loadNextPage() {
      if (this.hasNextPage && !this.loading) {
        this.currentPage++;
        this.loadTodos();
      }
    },
  },
  watch: {
    sortOrder() {
      this.loadTodos();
    },
  },
  created() {
    this.loadTodos(); // Initial load
  },
};
</script>

<style scoped>
.todo-list {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  margin: 3rem 0;
}
.edit-todo-form {
  margin-bottom: 20px;
}
</style>
