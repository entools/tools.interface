# Tools interface
[![Push To Yandex Cloud CR](https://github.com/entools/tools.interface/actions/workflows/deploy.yml/badge.svg)](https://github.com/entools/tools.interface/actions/workflows/deploy.yml)


### Tech stack
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![Redux](https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux)
![React Router](https://img.shields.io/badge/React_Router-black?style=flat-square&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-black?style=flat-square&logo=vite)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![NPM](https://img.shields.io/badge/-NPM-black?style=flat-square&logo=npm)

# React + TypeScript + Vite
##

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
