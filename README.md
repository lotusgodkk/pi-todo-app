# Todo App

## Overview

The **Todo App** is a simple yet powerful task management application built using Vue.js. It allows users to create, manage, and organize their tasks efficiently. The app supports multilingual capabilities and themes, providing a customizable and user-friendly experience.

---

## Features

- **Task Management**: Add, edit, delete, and prioritize todos.
- **Multilingual Support**: Currently supports English (`en`) and Spanish (`es`).
- **Theming**: Toggle between light and dark modes.
- **Dynamic Priority Management**: Set task priorities as Critical, Moderate, or Optional.
- **Responsive Design**: Optimized for various devices.
- **Login Functionality**: Secured access with a login form.

---

## Tech Stack

- **Vue.js**: Core framework for building the UI.
- **Vuex**: State management.
- **Vue Router**: Routing for navigation.
- **Cypress**: End-to-end testing.
- **Jest**: Unit testing.
- **i18n**: Internationalization for multilingual support.

---

## Setup

### Prerequisites

- Node.js >= 16.x
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run serve
   ```

4. Open your browser and navigate to `http://localhost:8080`.

---

## Project Structure

todo-app/
├── src/
│   ├── assets/             # Static assets like images
│   ├── components/         # Vue components (e.g., TodoList, AddTodo)
│   ├── i18n/               # Locale files for multilingual support
│   ├── store/              # Vuex store for state management
│   ├── views/              # Application pages
│   ├── App.vue             # Root component
│   ├── main.js             # Entry point
│   └── router.js           # Routing configuration
├── tests/
│   ├── e2e/                # End-to-end tests (Cypress)
│   └── unit/               # Unit tests (Jest)
├── public/                 # Public assets
├── package.json            # Dependency and scripts configuration
└── README.md               # Documentation

---

## Localization

### Adding New Locales

1. Add a new JSON file in `src/i18n/`.
2. Structure the file similarly to existing `en.json` or `es.json`.
3. Update `i18n.js` to include the new locale.

---

## Scripts

- `npm run serve`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase.
- `npm run test:unit`: Runs unit tests using Jest.
- `npm run cypress:open`: Runs end-to-end tests using Cypress.

---

## Testing

### Unit Tests

Unit tests are written using **Jest**. To run them:

```bash
npm run test:unit
```

### End-to-End Tests

E2E tests are written using **Cypress**. To run them:

```bash
npm run cypress:open
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Authors

- **Kamlesh Kushwaha** - Developer
- **Contributors** - See [contributors](https://github.com/lotusgodkk/todo-app/graphs/contributors)

---

## Acknowledgments

- Vue.js documentation for guidance.
- Open-source contributors for libraries and tools.
