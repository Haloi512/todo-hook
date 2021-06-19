import { Home } from "./pages/home";
import TodoList from "./pages/todo-list";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    exact: true,
  },
  {
    name: "TodoList",
    path: "/todo-list",
    component: TodoList,
    exact: true,
  },
];

export default routes;
