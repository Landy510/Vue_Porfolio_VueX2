<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent border border-bottom">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-muted">首頁</router-link>
        </li>
        <li class="breadcrumb-item active text-dark" aria-current="page">門市一覽</li>
      </ol>
    </nav>
    <div class="container-fluid">
      <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <select class="form-control rounded-0" v-model="selectlocation" @change="PenTo(selectlocation)">
            <option value="" disabled>請選擇任一間門市</option>
            <option v-for="(item, key) in data" :key="key" :value="item">{{ item["場地名稱"] }}</option>
          </select>
        </div>
        <div>
          <h5 class="font-weight-bold">
            {{ selectlocation["場地名稱"] }}
          </h5>
          <small class="text-muted small-text">{{ selectlocation["地址"] }}</small>
          <br>
          <h5 class="mt-3" v-if="selectlocation.decription!==''">{{ selectlocation.decription }}</h5>
          <img :src="selectlocation.image" :alt="selectlocation['場地名稱']" class="img-thumbnail rounded-0" v-if="selectlocation.image!==''">
        </div>
      </div>
      <div class="col-sm-8">
        <div id="map" class="map-setting"></div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
let osmMap = {}
const storeTile = ['Berserker 美麗華店', 'Berserker 南西店', 'Berserker 西門漢中店', 'Berserker 台中都會店', 'Berserker 佳瑪店', 'Berserker 大江購物店', 'Berserker 家樂福店', 'Berserker 勤美成品店']
const storeImage = ['https://upload.cc/i1/2020/12/24/Rxfch5.jpg', 'https://upload.cc/i1/2021/02/18/CTu2Xn.jpg', 'https://upload.cc/i1/2021/02/18/SbnF9j.jpg', 'https://upload.cc/i1/2021/02/18/cyrh8S.jpg',
  'https://upload.cc/i1/2021/02/18/xmQ32T.jpg', 'https://upload.cc/i1/2021/02/18/hqHAcb.jpg', 'https://upload.cc/i1/2021/02/18/6YeM1q.jpg', 'https://upload.cc/i1/2021/02/18/8OrZQj.jpg']
const storedecription = ['本店有提供飲食控制課程', '本店有提供最全面的重訓教學', '本店可以購買到各種重訓護具', '本店有提供大量的自由重量的訓練器材', '本店主要提供有氧的一些器材', '本店提供阻力訓練還有暴力上槓',
  '本店有提供讓各方健友一起聚聚', '本店主要是讓大家打打籃球和羽球啦']

export default {
  name: 'LocationInfo',
  data () {
    return {
      product_length: 0,
      data: [],
      selectlocation: '',
      isLoading: false
    }
  },
  methods: {
    CounterCoupute (cartTotalLength) {
      this.product_length = cartTotalLength
    },
    updateMap () {
      this.data.forEach(item => {
        L.marker([item['經度'], item['緯度']]).addTo(osmMap).bindPopup(`<strong>據點名稱:${item['場地名稱']}</strong><br>
          <strong>地址:<a href="https://www.google.com.tw/maps/place/${item['地址']}" target="_blank">${item['地址']}</a></strong><br>
          <strong>電話:${item['連絡電話']}</strong>`)
      })
      osmMap.panTo(new L.LatLng(24.130993, 120.721122))
      L.marker([24.130993, 120.721122]).addTo(osmMap).bindPopup(`<strong>據點名稱:Berserker 南西店</strong><br>
          <strong>地址:<a href="https://www.google.com.tw/maps/place/臺中市太平區中興東路99號" target="_blank">臺中市太平區中興東路99號</a></strong><br>
          <strong>電話:04-22289111#51311</strong>`).openPopup()
      this.$store.state.isLoading = false
    },
    PenTo (location) {
      osmMap.panTo(new L.LatLng(location['經度'], location['緯度']))
      L.marker([location['經度'], location['緯度']]).addTo(osmMap).bindPopup(`<strong>據點名稱:${location['場地名稱']}</strong><br>
          <strong>地址:<a href="https://www.google.com.tw/maps/place/${location['地址']}" target="_blank">${location['地址']}</a></strong><br>
          <strong>電話:${location['連絡電話']}</strong>`).openPopup()
    }
  },
  mounted () {
    const vm = this
    vm.axios.defaults.withCredentials = false
    const api = 'https://datacenter.taichung.gov.tw/swagger/OpenData/8f477165-6874-4856-b60d-38029958e723'
    vm.$http.get(api).then((Response) => {
      vm.$store.state.isLoading = true
      vm.data = Response.data
      for (let i = 0; i !== vm.data.length; i++) {
        vm.data[i].image = storeImage[i]
        vm.data[i]['場地名稱'] = storeTile[i]
        vm.data[i].decription = storedecription[i]
      }
      vm.updateMap()
    })
    osmMap = L.map('map', {
      center: [24.130993, 120.721122],
      zoom: 10
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
      maxZoom: 18
    }).addTo(osmMap)
  },
  create () {
    this.getCart()
  }
}
</script>

<style scoped>
#map {
  height: 100vh;
}
.small-text{
  font-size: 14px;
}
.map-setting {
  z-index: 2;
}
</style>
