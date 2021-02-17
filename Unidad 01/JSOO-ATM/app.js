console.log("Todo ok")

const menuM = document.getElementById('principal')
const adminM = document.getElementById('admin')
const clientesM = document.getElementById('clientes')
const operaciones = document.getElementById('operaciones')

adminM.style.display = 'none'
clientesM.style.display = 'none'

//Variables Globales
let opcionMenu;
let menuSeleccion
let btnEnviar = document.getElementById('btn-enviar-1')
let mensaje

let clientes = []
let clientesInput = ['Nonbre','Apellido','DNI','Genero','Edad','Cuenta','Saldo S/']

//Creacion de clases
class Persona {
    constructor(nombre,apellido,dni,genero,edad){
        this.nombres = {
            nombre,
            apellido
        }
        this.dni = dni
        this.genero = genero
        this.edad = edad
    }

    saludar() {
        let textoSaludo = "Bienvenido "

        if (this.genero === 1 ) {
            textoSaludo += "Sr. "
        } else if (this.genero === 0) {
            textoSaludo += "Sra."
        }

        textoSaludo += this.nombres.nombre + " " + this.nombres.apellido
        alert(textoSaludo)
    }

    despedida() {
        let textoDespedida = "Gracias y Vuelva Pronto"
        alert(textoDespedida)
    }
}


class Cliente extends Persona {
    constructor(saldo, cuenta){
        this.saldo = saldo
        this.cuenta = cuenta
    }


}

let persona1 = new Persona('Christian','Arevalo',73134712,1,28)



btnEnviar.addEventListener('click', function(){

    menuSeleccion = document.getElementById('menu-seleccion-1')
    mensaje = document.getElementById('mensaje-1')
    mensaje.style.color = 'tomato'

    opcionMenu = Number(menuSeleccion.value)

    if (opcionMenu > 2 || opcionMenu < 1) {
        mensaje.textContent = "Opción invalida"
    } else {
        
        switch(opcionMenu) {
            case 1:
                menuM.style.display = 'none'
                adminM.style.display = 'block'
                menuAdministrador()
                break
            case 2:
                menuM.style.display = 'none'
                clientesM.style.display = 'block'
            break
        }
    }
})

function menuAdministrador() {
    menuSeleccion = document.getElementById('menu-seleccion-2')
    btnEnviar = document.getElementById('btn-enviar-2')
    mensaje = document.getElementById('mensaje-2')
    mensaje.style.color = 'tomato'

    btnEnviar.addEventListener('click', function() {
        
        opcionMenu = Number(menuSeleccion.value)

        if(opcionMenu > 3 || opcionMenu < 1) {
            mensaje.textContent = "Opción invalida"
        } else  {
            switch(opcionMenu) {
                case 1:

                btnEnviar.disabled = true
                menuSeleccion.disabled = true

                    for (let i = 0; i < clientesInput.length; i++){
                        let input = document.createElement('input')
                        input.classList.add = "clientes-datos"
                        input.placeholder = clientesInput[i]
                        operaciones.appendChild(input)
                    }

                    let btnEnviar2 = document.createElement('button')
                    btnEnviar2.textContent = 'Enviar'
                    operaciones.appendChild(btnEnviar2)

                    btnEnviar2.addEventListener('click', function () {
                        console.log('otro btn')
                    })
                break
                case 3:
                    adminM.style.display = 'none'
                    menuM.style.display = 'block' 
                break
            }
        }
    })
}