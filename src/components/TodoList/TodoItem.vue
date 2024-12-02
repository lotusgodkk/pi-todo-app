<template>
  <div class="todo-item">
    <div v-if="!isEditing" class="flex">
      <span>
        {{ todo.text }}
        <small :class="['badge', todo.priority]">{{
          $t(`todoList.priorities.${todo.priority}`)
        }}</small>
      </span>
      <div class="flex">
        <button
          @click="$emit('remove', todo.id)"
          :aria-label="$t('todoList.delete')"
        >
          {{ $t("todoList.delete") }}
        </button>
        <button @click="$emit('edit', todo)" :aria-label="$t('todoList.edit')">
          {{ $t("todoList.edit") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
  },
};
</script>

<style scoped>
.todo-item {
  margin: 0.2rem 0;
  border: 0.1rem solid var(--secondary-border-color);
  border-radius: 0.3rem;
  padding: 0.3rem 0.5rem;

  button {
    margin-top: 0;
    margin-bottom: 0;
  }
  .badge {
    padding: 0.2rem 0.3rem;
    border-radius: 0.2rem;
    text-transform: uppercase;
    color: var(--constant-text-color);
  }
  .badge.moderate {
    background: var(--moderate);
  }
  .badge.critical {
    background: var(--critical);
  }
  .badge.optional {
    background: var(--optional);
  }
}
</style>
