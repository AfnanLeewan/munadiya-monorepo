# School Web

Frontend application for School website.

## Development Guideline

https://skilllane.atlassian.net/wiki/spaces/PLUT/pages/2486731026/Development+guideline

## Project structure

Basic project structure example

```
└── src/
    ├── components/
    │   ├── atoms/
    │   │   ├── Button.react.tsx
    │   │   └── Input.react.tsx
    │   ├── molecules/
    │   │   ├── SearchBox.react.tsx
    │   │   └── ButtonGroup.react.tsx
    │   ├── organisms/
    │   │   ├── Navbar.react.tsx
    │   │   └── Dropdown.react.tsx
    │   ├── templates/
    │   │   └── ProfileLayout.react.tsx
    │   └── pages/
    │       ├── TeacherProfilePage.react.tsx
    │       └── StudentProfilePage.react.tsx
    ├── hooks/
    │   └── useClickOutside.ts
    ├── utils/
    │   └── studentUtils.ts
    ├── services/
    │   └── schoolService.ts
    ├── api/
    │   └── studentApi.ts
    ├── tests/
    │   ├── studentUtils.test.ts
    │   └── schoolService.test.ts
    └── providers/
        └── StudentContextProvider.tsx
```

- components: following [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) pattern.
- hooks: contains **reusable** React hooks.
- utils: each file contains helper functions groupped by its usage.
- api: responsible for interact with backend server.
- services: encapsulate implementional detail code on the `api` layer. This keep `api` layer clean and more mangeable.
- tests: unit tests for helpers, services, and **complex** components.
- providers: contain any kind of top level `<Provider>` that share functionalities or data to child components. For example, `<ThemeProvider>`
