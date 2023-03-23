const { createApp } = Vue

  createApp({
    data() {
        return {
            arrayEventos: [],
            categorias: [],
            categorizados: [],
            eventosFiltrados: [],
            nombreIngresado: '',
            checked: [],
            category: [],
            hoy: ''
      }
    },
    async created() {
        
            try {
                const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
                //const respuesta = await fetch('data.json');
                console.log(respuesta);
                const datos = await respuesta.json();
                console.log(datos)

                this.hoy = datos.currentDate
                console.log(this.hoy)
                this.arrayEventos = datos.events.filter(objeto => (objeto.date) > this.hoy)
                
                //console.log(this.arrayEventos)
                const aux = (objeto => objeto.category)  
                this.cartas = this.arrayEventos.filter(aux)
                this.categorizados = this.cartas
                this.categorias = [...new Set(this.cartas.map(aux))]
                
             }
            catch(error){
                console.log(error)
            }
    },
    methods: {
       
    },

    computed:{
        filtro(){
            this.eventosFiltrados = this.categorizados.filter(objeto => 
            (this.checked.includes(objeto.category) || this.checked.length === 0) 
            && objeto.name.toLowerCase().includes(this.nombreIngresado.toLowerCase()))
        }
    }
  }).mount('#app')

















