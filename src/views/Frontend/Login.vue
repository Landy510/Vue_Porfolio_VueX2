<template>
  <div class="wrap login-setting">
    <main class="form-signin">
      <form class="px-2" @submit.prevent="signin">
        <div class="text-center">
          <router-link to="/" class="mx-auto">
            <img class="mb-4 " src="../../assets/img/protectionshield.svg" alt="Berserker Fitness logo" width="72" height="57">
          </router-link>
        </div>
        <h2 class="h3 mb-3 fw-normal">請登入</h2>
        <label for="inputEmail" class="visually-hidden">Email address</label>
        <input type="email" id="inputEmail" class="form-control" v-model="user.username" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="visually-hidden">Password</label>
        <input type="password" id="inputPassword" class="form-control"  v-model="user.password" placeholder="Password" required>
        <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
        </div>
        <button class="w-100 btn btn-lg btn-warning" type="submit">登入</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2021</p>
      </form>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin: function () {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const token = response.data.token
          const expired = response.data.expired
          document.cookie = `Berserkertoken=${token}; expires=${new Date(expired)}`
          vm.$router.push('/admin/orderList')
        }
      })
    }
  },
  components: {
    Footer
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.login-setting {
  margin-top: 56px;
}
</style>
