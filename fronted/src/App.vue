<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  components: {
  },
  data() {
    return {
      users: [],
      editingUser: null,
    };
  },
  methods: {
    fetchUsers() {
    },
    openEditForm(user) {
      this.editingUser = user;
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
