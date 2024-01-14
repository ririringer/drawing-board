<template>
  <div>
    <input v-model="userName" type="text" placeholder="ユーザー名を入力">
    <button
    @click="saveUserName">保存</button>
  </div>
</template>

<script>
export default {
  name: 'UserNameForm',
  data() {
    return {
      userName: ''
    };
  },
  methods: {
    saveUserName() {
      localStorage.setItem('userName', this.userName);
      // ユーザー名の保存処理をここに記述
    }
  }
};
</script>

<style>
/* UserNameFormのスタイルをここに記述 */
</style>
