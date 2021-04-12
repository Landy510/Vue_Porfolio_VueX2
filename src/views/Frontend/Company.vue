<template>
  <div>
    <AlertMessage/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import AlertMessage from '../../components/AlertMessage.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Company',
  data () {
    return {

    }
  },
  components: {
    AlertMessage,
    Footer
  }
}
</script>
