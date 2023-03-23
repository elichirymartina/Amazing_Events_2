
//codigo viejo
const cargarEventos = async() => {
    try {
        const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        //const respuesta = await fetch('data.json');
        console.log(respuesta);

        const datos = await respuesta.json();
        console.log(datos);


        const tabla1 = document.getElementById("tabla1")
        const eventos = datos.events
        console.log(eventos)
        cargarTabla1(eventos,tabla1)

        const tabla2 = document.getElementById("tabla2")
        const tabla3 = document.getElementById("tabla3")
    
        calcularGanancias(eventos.filter(elemento => elemento.assistance),"Food",tabla2)
        calcularGanancias(eventos.filter(elemento => elemento.estimate),"Food",tabla2)

        introducirTabla2(eventos.filter(elemento => elemento.estimate),tabla2)
        introducirTabla2(eventos.filter(elemento => elemento.assistance),tabla3)


        function cargarTabla1(array, contendor) {

        let mayorCapacidad = array.reduce((evento1, evento2) => {
            if (evento1.capacity > evento2.capacity) return evento1
            return evento2
        })
        console.log(mayorCapacidad)
    
        let mayorAttendance = array.filter(elemento => elemento.assistance).reduce((evento1, evento2) => {
            if ((evento1.assistance / evento1.capacity) > (evento2.assistance / evento2.capacity)) return evento1
            return evento2
        })
        console.log(mayorAttendance)
    
        let menorAttendance = array.filter(elemento => elemento.assistance).reduce((evento1, evento2) => {
            if ((evento1.assistance / evento1.capacity) < (evento2.assistance / evento2.capacity)) return evento1
            return evento2
        })
        console.log(menorAttendance)
    
        let trContenedor = document.createElement('tr')
        trContenedor.innerHTML = `
            <td class="table-light">${mayorAttendance.name}: ${mayorAttendance.assistance/mayorAttendance.capacity*100}%</td>
            <td class="table-light">${menorAttendance.name}: ${menorAttendance.assistance/menorAttendance.capacity*100}%</td>
            <td class="table-light">${mayorCapacidad.name}: ${mayorCapacidad.capacity}</td>`
            contendor.appendChild(trContenedor)
        }
    
        function calcularGanancias (array,nombrecategoria){
    
        let arrayFiltrado = array.filter(elemento => elemento.category == nombrecategoria).reduce((total,evento) =>{
            if(evento.assistance != undefined) return total += evento.price * evento.assistance
            return total += evento.price * evento.estimate
        },0)
        return arrayFiltrado
        }
    
        function introducirTabla2 (array,contenedor){
        let categorias = [... new Set(array.map(elemento => elemento.category))]
    
        let fragmento = document.createDocumentFragment()
    
        for(categoria of categorias){
            let trContenedor = document.createElement('tr')
            trContenedor.innerHTML = `<td class="table-light">${categoria}</td>
            <td class="table-light">${calcularGanancias(array,categoria)} USD</td>
            <td class="table-light">${calcularAsistencia(array,categoria)}%</td>`
            fragmento.appendChild(trContenedor)
        }
        contenedor.appendChild(fragmento)
    
        }
    
        function calcularAsistencia (array,nombrecategoria){
    
        let arrayFiltrado = array.filter(elemento => elemento.category == nombrecategoria).reduce((total,evento) =>{
            if(evento.assistance != undefined) return total += evento.assistance / evento.capacity 
            return total += evento.estimate / evento.capacity
        },0)
        return (arrayFiltrado * 100 /array.filter(elemento => elemento.category == nombrecategoria).length).toFixed(2)
        }
    

    }catch(error){
        console.log(error)
    }
}

cargarEventos();