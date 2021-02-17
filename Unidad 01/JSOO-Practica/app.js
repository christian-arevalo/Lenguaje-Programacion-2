console.log("Todo Ok!")

let menuOperacion = document.getElementById('menu-operacion')
let valorOperacion = document.getElementById('valor-operacion')

let tituloOperacion = document.getElementById('titulo-operacion')
let operaciones = document.getElementById('operaciones')
let mensajeOperacion = document.getElementById('mensaje-operacion')

let clientes = []
let inputClientes = ['Nombres', 'Apellidos', 'Documento', 'Cuenta', 'Saldo $', "Genero"]
const enviarOpcion = document.getElementById('enviar-opcion')

let registrarCliente
let datosInput

//construir nuestro objetos
class Cliente {

    constructor (nombre, apellido,documento,cuenta,saldo,genero) {
        this.nombres = {
            nombre,
            apellido
        }
        this.documento = documento
        this.cuenta = cuenta
        this.saldo = saldo
        this.genero = genero
    }

    saludo() {
        let mensaje = "Bienvenido"

        if (this.genero === "Masculino") {
            mensaje+= " Sr. "
        } else if (this.genero === "Femenino"){
            mensaje+= " Sra. "
        }

        mensaje+= this.nombres.nombre + " " + this.nombres.apellido
        alert(mensaje);
    }

    despedida() {
        alert("Gracias, Vuelva pronto")
    }

    registro() {
        let mensaje = "Se registro correctamente el cliente"

        if (this.genero === "Masculino") {
            mensaje+= " Sr. "
        } else if (this.genero === "Femenino"){
            mensaje+= " Sra. "
        }

        mensaje+= this.nombres.nombre + " " + this.nombres.apellido

        alert(mensaje)
    }
}

enviarOpcion.addEventListener('click', function(){

    let opcion = Number(valorOperacion.value)

    if (opcion > 5 || opcion < 1) {
        mensajeOperacion.textContent = "Opción no valida, intenet nuevamente"
        mensajeOperacion.style.color = 'tomato'
        valorOperacion.value = ""
    } else {
        mensajeOperacion.textContent = ""

        switch(opcion) {
            case 1:
                tituloOperacion.textContent = "Registrar Clientes"
                datosClientes()

        }
    }
})

function datosClientes() {
    
    for (let i = 0; i < 6; i++){
        let datos = document.createElement('input')
        datos.placeholder = inputClientes[i]
        datos.classList.add('datos')
        operaciones.appendChild(datos)
    }

    registrarCliente = document.createElement('button')
    registrarCliente.textContent = 'Registrar'
    operaciones.appendChild(registrarCliente)

    registrarCliente.addEventListener('click', function(){
        datosInput = document.getElementsByClassName('datos')

        let contador = 0

        for(let i = 0; i < datosInput.length; i++) {
            if (datosInput[i].value === "") {
                contador += 1;
            } 
        }

        if (contador > 0) {
            mensajeOperacion.textContent ="Debe llenar todos los datos"
                mensajeOperacion.style.color = 'tomato'
        } else {
            mensajeOperacion.textContent =""
            let cliente = new Cliente(datosInput[0].value,datosInput[1].value,datosInput[2].value,datosInput[3].value,Number(datosInput[4].value),datosInput[5].value)
            clientes.push(cliente)
            cliente.registro();

            for(let i = 0; i < datosInput.length; i++) {
                datosInput[i].value = ""
            }
        }
    })
}