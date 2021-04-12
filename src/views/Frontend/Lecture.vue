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
  name: 'Lecture',
  data () {
    return {
      itemId: ''
    }
  },
  components: {
    AlertMessage,
    Footer
  }
}
</script>
