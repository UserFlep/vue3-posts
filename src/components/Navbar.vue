<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">Лого</div>
    <div class="navbar__btns">
      <my-button class="navbar__btn" @click="$router.push('/posts')">Option Api Посты</my-button>
      <my-button class="navbar__btn" @click="$router.push('/about')">О нас</my-button>
      <my-button class="navbar__btn" @click="$router.push('/store')">Viex посты</my-button>
      <my-button class="navbar__btn" @click="$router.push('/composition')">Composition API Посты</my-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .navbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    height: 60px;
    background: lightgrey;
    box-shadow: 2px 2px 4px gray;
  }
  .logo{
    cursor: pointer;
  }
  .navbar__btn {
    margin-left: 10px;
  }
</style>