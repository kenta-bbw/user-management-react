import { createRouter, createWebHistory } from 'vue-router';

import UpdateForm from '@/components/UpdateForm.vue';
import UserList from '@/components/UserList.vue';
import CreateForm from '@/components/CreateForm.vue';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserList,
    props: false
  },
  {
    path: '/edit-user/:userId',
    name: 'EditUser',
    component: UpdateForm,
    props: true
  },
  {
  path: '/create-user',
  name: 'CreateUser',
  component: CreateForm,
  props: false
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
