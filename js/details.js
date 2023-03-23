const { createApp } = Vue

  createApp({
    data() {
      return {
            arrayEventos: [],
            eventoFiltrado: undefined,
      }
    },
    async created() {
            try {
                const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
                //const respuesta = await fetch('data.json');
                console.log(respuesta);
                const datos = await respuesta.json();
                console.log(datos)
                this.arrayEventos = datos.events

                let aux = location.search
                let params = new URLSearchParams(aux)
                let id = params.get('id')
                console.log(id)
                this.eventoFiltrado = this.arrayEventos.find(objeto => objeto._id == id)
                console.log(this.eventoFiltrado)


             }
            catch(error){
                console.log(error)
            }
    }
  }).mount('#app')










