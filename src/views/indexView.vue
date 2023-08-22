<template>
  <div>
    <appBar />
    <portadaComponent />
    <personalCards />
    <servicesClinica />
    <comentariosCards />
    <footerBottom />
  </div>
</template>

<script>
import appBar from '../components/appBar'
import portadaComponent from '../components/portada'
import personalCards from '../components/personal'
import servicesClinica from '../components/services'
import comentariosCards from '../components/comentarios'
import footerBottom from '../components/footer'
export default {

  name: 'HomeView',

  components: {
    appBar,
    portadaComponent,
    personalCards,
    servicesClinica,
    comentariosCards,
    footerBottom

  },
}
</script>
