<template>
  <div>
    <appBar />
    <portadaComponent id="inicio"/>
    <personalCards id="personal" />
    <servicesClinica id="servicios"/>
    <comentariosCards id="comentarios"/>
    <newComentarios/>
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
import newComentarios from '../components/addComentarios'
export default {

  name: 'HomeView',

  components: {
    appBar,
    portadaComponent,
    personalCards,
    servicesClinica,
    comentariosCards,
    footerBottom,
    newComentarios

  },
}
</script>
