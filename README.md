# todos.io Fullstack App : Frontend

![image](https://user-images.githubusercontent.com/74446624/222989864-cfdd3cf5-c658-4718-b9f4-b30124b1f6ed.png)

## Open for Contributions 
### Check What to Contribute and Roadmap sections below to get ideas where to start contributing

Live : https://todos-io.vercel.app

Stack : Next.js, Typescript, Tailwind, Redux Toolkit & Persist

Features :

- Register and login
- Non-login mode (data stored in localstorage)
- Post, delete and mark todo as done
- Smooth animations 

## Running Locally

1. Install dependencies using package manager:

```sh
pnpm i
\\ or
yarn
\\ or
npm i
```

2. Copy `.env.example` to `.env.local`.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
\\ or
yarn dev
\\ or
npm run dev
```


## What to Contribute 

You can contribute on any of these category :

- UI improvement
- Code / component refactoring
- New feature
- Bug fixing
- Performance improvement
- Best practice implementation

## Feature / Improvement Roadmap :

- [x] Edit todo
- [X] Upload and edit profile picture
- [ ] Login and register form validation
- [ ] Reorder todo (drag and drop)
- [ ] Add types to all component props
- [ ] Upgrade to `react-query`, `rtk-query` or `swc` for data fetching
- [ ] Add PWA support
- [ ] Use `next-auth` for storing token instead of localstorage
- [ ] Add dark mode

Interested in the backend implementation? Here is the repo :

https://github.com/fadhilradh/todo.io-backend


Happy contributing !
