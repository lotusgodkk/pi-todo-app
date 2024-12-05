import config from "@/lookup/config.json";

const DB_NAME = config.db.name;
const DB_VERSION = 1;
const USERS_STORE = "users";
const TODOS_STORE = "todos";

async function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      //dbInstance = db;

      // Create 'users' store
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const userStore = db.createObjectStore(USERS_STORE, {
          keyPath: "username",
        });
        userStore.createIndex("username", "username", { unique: true });
      }

      // Create 'todos' store
      if (!db.objectStoreNames.contains(TODOS_STORE)) {
        const todoStore = db.createObjectStore(TODOS_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        todoStore.createIndex("username", "username");
        todoStore.createIndex("id", "id", { unique: true });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// User-related Methods
async function signup(user) {
  try {
    const db = await openDb();
    const transaction = db.transaction(USERS_STORE, "readwrite");
    const store = transaction.objectStore(USERS_STORE);
    store.add(user);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function validateUser(username, password) {
  try {
    const db = await openDb();
    const transaction = db.transaction(USERS_STORE, "readonly");
    const store = transaction.objectStore(USERS_STORE);
    const request = store.get(username);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const user = request.result;
        if (user && user.password === password) {
          resolve(user);
        } else {
          reject(new Error("Invalid username or password."));
        }
      };
      request.onerror = () => reject(new Error("Failed to retrieve user."));
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getUser(username) {
  try {
    const db = await openDb();
    const transaction = db.transaction(USERS_STORE, "readonly");
    const store = transaction.objectStore(USERS_STORE);
    const request = store.get(username);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateUser(user) {
  try {
    const db = await openDb();
    const transaction = db.transaction(USERS_STORE, "readwrite");
    const store = transaction.objectStore(USERS_STORE);
    store.put(user);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function addTodo(todo) {
  try {
    const db = await openDb();
    const transaction = db.transaction(TODOS_STORE, "readwrite");
    const store = transaction.objectStore(TODOS_STORE);
    store.add(todo);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getTodos(username, page = 1, limit = config.todo.limit) {
  if (!username || typeof username !== "string") {
    return Promise.reject(new Error("Invalid username"));
  }

  try {
    const db = await openDb();
    const transaction = db.transaction(TODOS_STORE, "readonly");
    const store = transaction.objectStore(TODOS_STORE);
    const index = store.index("username");
    const range = IDBKeyRange.only(username);
    const request = index.openCursor(range);

    const todos = [];
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          todos.push(cursor.value);
          cursor.continue();
        } else {
          resolve(todos.slice((page - 1) * limit, page * limit));
        }
      };
      request.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteTodo(todoId) {
  try {
    const db = await openDb();
    const transaction = db.transaction(TODOS_STORE, "readwrite");
    const store = transaction.objectStore(TODOS_STORE);
    const request = store.delete(todoId);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateTodo(todo) {
  try {
    const db = await openDb();
    const transaction = db.transaction(TODOS_STORE, "readwrite");
    const store = transaction.objectStore(TODOS_STORE);
    const index = store.index("id");
    const request = index.get(todo.id);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const existingTodo = event.target.result;
        if (existingTodo) {
          todo.key = existingTodo.key;
          const updateRequest = store.put(todo);

          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = (error) => reject(error);
        } else {
          reject(new Error(`Todo with ID ${todo.id} does not exist`));
        }
      };
      request.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function clearAllTodos(username) {
  try {
    const db = await openDb();
    const transaction = db.transaction(TODOS_STORE, "readwrite");
    const store = transaction.objectStore(TODOS_STORE);
    const index = store.index("username");
    const range = IDBKeyRange.only(username);
    const request = index.openCursor(range);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          transaction.oncomplete = resolve;
        }
      };
      request.onerror = reject;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  signup,
  getUser,
  updateUser,
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  clearAllTodos,
};
