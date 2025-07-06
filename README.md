# 💳 Bank Account Registration Panel

A modern multi-step web application for opening a bank account — built with best practices in UI, form validation, and backend integration. Designed for both performance and scalability.

---

## 🔧 Tech Stack

| Technology                                                                                                                 | Description                                                       |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)                                 | Component-based UI library for building interactive interfaces    |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)                  | Type-safe JavaScript for cleaner and more robust code             |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat)          | Utility-first CSS framework for rapid UI development              |
| ![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&style=flat)                                 | Global state management for predictable and centralized logic     |
| ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white&style=flat) | Performant form handling using React hooks                        |
| ![Zod](https://img.shields.io/badge/-Zod-7C3AED?style=flat&logo=Zod&logoColor=white)                                       | Schema-based form validation with TypeScript support              |
| ![Supabase](https://img.shields.io/badge/-Supabase-3ECF8E?logo=supabase&logoColor=white&style=flat)                        | Backend-as-a-Service (BaaS) for authentication, database, and API |
| ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=black&style=flat)                        | Code formatter to ensure clean and consistent code                |

---

## ✨ Features

- 🔐 **Multi-step account registration** with live validation
- 🧾 **Zod schema validation** per step
- 📦 **Global state management** with Redux
- 💅 **Clean UI** with Tailwind Grid & Flexbox layouts
- 🛡️ **Supabase authentication** (login & protected routes)
- ⚡ Fully **TypeScript-powered** for better DX & maintainability
- 📤 Auto form reset and conditional `trigger` for validation

---

## 🚀 Getting Started

1.  Install dependencies

        npm install

2.  Run the development server

        npm run dev

3.  Connect Supabase

Add your Supabase credentials in .env.local

        SUPABASE_URL=your-url
        SUPABASE_ANON_KEY=your-key

## 📁 Project Structure

```
 src/
├── components/
│ ├── StepOne.tsx
│ ├── StepTwo.tsx
│ └── StepThree.tsx
├── schemas/
│ ├── stepOneSchema.ts
│ ├── stepTwoSchema.ts
│ ├── stepThreeSchema.ts
│ └── mergedSchema.ts
├── store/ # Redux configuration
├── pages/
│ └── index.tsx # Entry point
└── MultiStepForm.tsx # Main form logic

```

## 🧪 Scripts

        npm run dev – Start development

        npm run build – Production build

        npm run lint – Lint codebase

        npm run format – Format using Prettier

## 📌 Notes

Built with 💙 by modern frontend best practices

Can be easily extended with dark mode, server actions, dashboards, and more

## 📄 License

MIT — Free to use, modify and distribute.

## 🌟 Contributing

Developed with 🌻 by Azadeh Sharifi Soltani Feel free to connect and collaborate!
