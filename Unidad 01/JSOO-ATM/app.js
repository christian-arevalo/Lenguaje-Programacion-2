console.log("Todo ok");

const menuM = document.getElementById("principal");
const adminM = document.getElementById("admin");
const clientesM = document.getElementById("clientes");
const operaciones = document.getElementById("operaciones");

adminM.style.display = "none";
clientesM.style.display = "none";

//Variables Globales
let opcionMenu;
let menuSeleccion;
let btnEnviar = document.getElementById("btn-enviar-1");
let mensaje;

let clientes = [];
let clientesInput = [
  "Nombre",
  "Apellido",
  "DNI",
  "Genero",
  "Edad",
  "Cuenta",
  "Saldo S/",
];
let clienteDatos;
let contador;
let dineroAtm = 0;

//Creacion de clases
class Persona {
  constructor(nombre, apellido, dni, genero, edad) {
    this.nombres = {
      nombre,
      apellido,
    };
    this.dni = dni;
    this.genero = genero;
    this.edad = edad;
  }

  saludar() {
    let textoSaludo = "Bienvenido ";

    if (this.genero === "1") {
      textoSaludo += "Sr. ";
    } else if (this.genero === "0") {
      textoSaludo += "Sra. ";
    }

    textoSaludo += this.nombres.nombre + " " + this.nombres.apellido;
    alert(textoSaludo);
  }

  despedida() {
    let textoDespedida = "Gracias y Vuelva Pronto";
    alert(textoDespedida);
  }
}

class Cliente extends Persona {
  constructor(nombre, apellido, dni, genero, edad, cuenta, saldo) {
    super(nombre, apellido, dni, genero, edad);
    this._saldo = saldo;
    this._cuenta = cuenta;
  }

  get saldo() {
    return this._saldo;
  }

  set saldo(newSaldo) {
    this._saldo = newSaldo;
  }

  get cuenta() {
    return this._cuenta;
  }
}

//let persona1 = new Persona("Christian", "Arevalo", 73134712, 1, 28);

btnEnviar.addEventListener("click", function () {
  menuSeleccion = document.getElementById("menu-seleccion-1");
  mensaje = document.getElementById("mensaje-1");
  mensaje.style.color = "tomato";

  opcionMenu = Number(menuSeleccion.value);

  if (opcionMenu > 2 || opcionMenu < 1) {
    mensaje.textContent = "Opción invalida";
  } else {
    switch (opcionMenu) {
      case 1:
        menuM.style.display = "none";
        adminM.style.display = "block";
        menuAdministrador();
        break;
      case 2:
        menuM.style.display = "none";
        clientesM.style.display = "block";
        menuClientes();
        break;
    }
  }
});

function menuAdministrador() {
  menuSeleccion = document.getElementById("menu-seleccion-2");
  btnEnviar = document.getElementById("btn-enviar-2");
  mensaje = document.getElementById("mensaje-2");
  mensaje.style.color = "tomato";

  btnEnviar.addEventListener("click", function () {
    opcionMenu = Number(menuSeleccion.value);

    if (opcionMenu > 3 || opcionMenu < 1) {
      mensaje.textContent = "Opción invalida";
    } else {
      switch (opcionMenu) {
        case 1:
          btnEnviar.disabled = true;
          menuSeleccion.disabled = true;

          for (let i = 0; i < clientesInput.length; i++) {
            let input = document.createElement("input");
            input.classList.add("clientes-datos");
            input.placeholder = clientesInput[i];
            operaciones.appendChild(input);
          }

          let btnEnviar2 = document.createElement("button");
          btnEnviar2.textContent = "Enviar";
          operaciones.appendChild(btnEnviar2);

          clienteDatos = document.getElementsByClassName("clientes-datos");
          clienteDatos[2].addEventListener("keyup", function () {
            clienteDatos[5].value = clienteDatos[2].value;
            clienteDatos[5].disabled = true;
          });

          clienteDatos[6].value = 50;
          clienteDatos[6].disabled = true;

          btnEnviar2.addEventListener("click", function () {
            clienteDatos = document.getElementsByClassName("clientes-datos");
            contador = 0;

            for (let i = 0; i < clienteDatos.length; i++) {
              if (clienteDatos[i].value === "") {
                contador++;
              }
            }

            if (contador > 0) {
              mensaje.textContent = "Debe registrar todos los datos";
            } else {
              mensaje.textContent = "";
              let cliente = new Cliente(
                clienteDatos[0].value,
                clienteDatos[1].value,
                clienteDatos[2].value,
                clienteDatos[3].value,
                Number(clienteDatos[4].value),
                clienteDatos[5].value,
                Number(clienteDatos[6].value)
              );
              clientes.push(cliente);
              cliente.saludar();

              while (operaciones.firstChild) {
                operaciones.removeChild(operaciones.firstChild);
              }
              btnEnviar.disabled = false;
              menuSeleccion.disabled = false;
            }
          });
          break;
        case 2:
          btnEnviar.disabled = true;
          menuSeleccion.disabled = true;
          let inputDinero = document.createElement("input");
          inputDinero.placeholder = "Ingresar Monto";
          operaciones.appendChild(inputDinero);
          let btnEnviar3 = document.createElement("button");
          btnEnviar3.textContent = "Ingresar";
          operaciones.appendChild(btnEnviar3);

          btnEnviar3.addEventListener("click", function () {
            if (Number(inputDinero.value) < 0) {
              mensaje.textContent = "Monto invalido";
            } else {
              mensaje.textContent = "";
              dineroAtm += Number(inputDinero.value);
              alert(
                "Se agrego S/ " + inputDinero.value + " - Total S/ " + dineroAtm
              );
              while (operaciones.firstChild) {
                operaciones.removeChild(operaciones.firstChild);
              }
              btnEnviar.disabled = false;
              menuSeleccion.disabled = false;
            }
          });
          break;
        case 3:
          adminM.style.display = "none";
          menuM.style.display = "block";
          break;
      }
    }
  });
}

function menuClientes() {
  menuSeleccion = document.getElementById("menu-seleccion-3");
  btnEnviar = document.getElementById("btn-enviar-3");
  mensaje = document.getElementById("mensaje-3");
  mensaje.style.color = "tomato";

  btnEnviar.addEventListener("click", function () {
    opcionMenu = Number(menuSeleccion.value);

    menuSeleccion.disabled = true;
    btnEnviar.disabled = true;

    if (opcionMenu > 4 || opcionMenu < 1) {
      mensaje.textContent = "Opción invalida";
    } else {
      mensaje.textContent = "";
      switch (opcionMenu) {
        case 1:
          let inputCuenta = document.createElement("input");
          let clienteEncontrado;
          inputCuenta.placeholder = "Número de cuenta";
          operaciones.appendChild(inputCuenta);
          let btnClientes = document.createElement("button");
          btnClientes.textContent = "Enviar";
          operaciones.appendChild(btnClientes);

          contador = 0;

          btnClientes.addEventListener("click", function () {
            /*for (let clientesV of clientes) {
              if (inputCuenta.value === clientesV.cuenta) {
                clienteEncontrado = clientesV.cuenta
                contador++
              }
            }*/

            for (let i = 0; i < clientes.length; i++) {
              if (inputCuenta.value === clientes[i].cuenta) {
                clienteEncontrado = clientes[i];
                contador++;
              }
            }

            if (contador > 0) {
              mensaje.textContent = "";
              clienteEncontrado.saludar();
              alert("Su Saldo es S/ " + clienteEncontrado.saldo);

              while (operaciones.firstChild) {
                operaciones.removeChild(operaciones.firstChild);
              }

              menuSeleccion.disabled = false;
              btnEnviar.disabled = false;
            } else {
              mensaje.textContent = "No se encontro cliente";
            }
          });
          break;
        case 2:
          let inputEnvia = document.createElement("input");
          let inputRecibe = document.createElement("input");
          let btnValidar = document.createElement("button");

          inputEnvia.placeholder = "Cuenta de Envio";
          inputRecibe.placeholder = "Cuenta que Recibe";
          btnValidar.textContent = "Validar";

          operaciones.appendChild(inputEnvia);
          operaciones.appendChild(inputRecibe);
          operaciones.appendChild(btnValidar);

          btnValidar.addEventListener("click", function () {
            contador = 0;
            let envio;
            let recibe;
            let saldoEnvia;
            let saldoRecibe;
            if (inputEnvia.value === "" || inputRecibe.value === "") {
              mensaje.textContent = "Debe llenar todos los campos";
            } else {
              mensaje.textContent = "";
              for (let i = 0; i < clientes.length; i++) {
                if (inputEnvia.value === clientes[i].cuenta) {
                  envio = i
                  contador++;
                }

                if (inputRecibe.value === clientes[i].cuenta) {
                  recibe = i
                  contador++;
                }
              }

              if (contador > 1) {
                let tituloRecibe = document.createElement('h3')
                tituloRecibe.textContent = "Transferir a " + clientes[recibe].nombres.nombre + " " + clientes[recibe].nombres.apellido
                operaciones.appendChild(tituloRecibe)
                let inputMonto = document.createElement("input");
                inputMonto.placeholder = "Monto S/";
                operaciones.appendChild(inputMonto);
                let btnTransferir = document.createElement("button");
                btnTransferir.textContent = "Transferir";
                operaciones.appendChild(btnTransferir);

                btnTransferir.addEventListener("click", function () {
                  if (Number(inputMonto.value) > 0) {
                    if (Number(inputMonto.value <= clientes[envio].saldo)) {
                      mensaje.textContent = "";
                      saldoEnvia = clientes[envio].saldo - Number(inputMonto.value)
                      clientes[envio].saldo = saldoEnvia

                      saldoRecibe = clientes[recibe].saldo + Number(inputMonto.value)
                      clientes[recibe].saldo = saldoRecibe

                      alert("Transferencia Exitosa, Su saldo es S/ " + clientes[envio].saldo)

                      while (operaciones.firstChild) {
                        operaciones.removeChild(operaciones.firstChild);
                      }
        
                      menuSeleccion.disabled = false;
                      btnEnviar.disabled = false;

                    } else {
                      mensaje.textContent = "Saldo insuficiente";
                    }
                  } else {
                    mensaje.textContent = "Monto invalido";
                  }
                });
              } else {
                mensaje.textContent = "Cuentas erroneas";
              }
            }
          });

          break;
      }
    }
  });
}

let cliente = new Cliente(
  "Christian",
  "Arevalo",
  "73134712",
  "1",
  28,
  "73134712",
  50
);

let cliente1 = new Cliente(
  "Juan",
  "Mercado",
  "12345678",
  "1",
  21,
  "12345678",
  50
);
clientes.push(cliente);
clientes.push(cliente1);
