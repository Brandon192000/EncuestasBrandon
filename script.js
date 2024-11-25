//alt 7 para ver comentarios
alert("🎥Bienvenido a la Encuesta Personal🍕")

let seguridad;
do{

    seguridad = prompt("Digite su nombre")
    if(seguridad===null || seguridad.trim() === "" || !isNaN (seguridad)){
        alert("Su nombre esta vacio o solo son numeros, Digite de nuevo su  usurio")
    }else{
        alert("Bienvenido a la Encuesta Personal 🥳, " + seguridad)
    }

}while( seguridad === null||seguridad.trim() === ""|| !isNaN (seguridad));


/*-------------------------------------------------------------------------------------------*/


let respuesta = confirm("Desea continuar? Aceptar ✅ o Cancelar ❌ ");

if (!respuesta) {
    window.location.href = "https://www.google.com";
}


/*----------------------------------------------------------------------------------------------*/

// Referencias a elementos del DOM
let nombre = document.getElementById("nombre");
let edad = document.getElementById("edad");
let menuBebida = document.getElementById("bebida");
let menuComida = document.getElementById("comida");
let BtnEnviar = document.getElementById("Enviar");

// Arreglos y contadores
let arrayOpciones = []; // Arreglo para guardar las opciones

let contadorEdades = []; // Arreglo para guardar las edades de los usuarios

let bebidasContador = { // Objeto para almacenar las bebidas y sus conteos

    "Café": 0,
    "Té": 0,
    "Agua": 0,
    "Gaseosa": 0,
    "No me gustan las bebidas": 0

};

let totalBebidas = 0; // Contador total de bebidas seleccionadas

let comidasContador = {// Otro objeto

    "Pizza": 0,
    "Hamburguesa": 0,
    "Papas Fritas": 0,
    "Gaseosa": 0,
    "Ninguna de las anteriores": 0

}

let totalComidas = 0;//otro contador


let cineContador = {// Otro objeto

    si: 0,
    no: 0

};

let gustosCine = 0;//otro contador


/*--------------------------------------------------------------------------------------------------------------*/
// Validaciones de entrada
nombre.addEventListener("input", function () {
    // Evento que permite solo letras y espacios (mayúsculas y minúsculas de A a Z y \s para espacios).
    nombre.value = nombre.value.replace(/[^a-zA-Z\s]/g, ""); 
});

edad.addEventListener("input", function () {
    /* Permite solo números en el rango de 0-9. 
       El modificador "g" asegura que se eliminen caracteres no válidos
       y los reemplaza con una cadena vacía. */
    edad.value = edad.value.replace(/[^0-9]/g, ""); 
});

/*----------------------------------------------------------------------------------------------------------------*/

// Mostrar resultado
function mostrarResultado(arrayOpciones) {
    let resultadoDiv = document.getElementById("resultado");

    
    if (!resultadoDiv) {// se crea el div si no existe
        resultadoDiv = document.createElement("div");
        resultadoDiv.id = "resultado";
        resultadoDiv.style.padding = "10px";//estilos para el contenedor  que va a almacenar los resultados de los usuarios
        resultadoDiv.style.backgroundColor = "#eeee";
        resultadoDiv.style.border = "1px solid #ccc";
        resultadoDiv.style.marginTop = "20px";
        resultadoDiv.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"; 
        document.body.appendChild(resultadoDiv); // Agraga el el div al body
    }

    // Creo un nuevo registro con los datos del usuario
    const nuevoRegistro = document.createElement("div");
    nuevoRegistro.style.marginBottom = "15px"; 

    // Aca en estas variables lo que hice fue usar.find que se va a encargar de encontrar el primer elemento que compla la condicion, que en este caso va a ser la que esta dentro de los incluedes y con el split lo que hago es hacer como un separadaro entre la condicion y elelemento encontrado
    const bebidaFavorita = arrayOpciones.find(opcion => opcion.includes("Bebida favorita")).split(": ")[1]; 
    const edadUsuario = parseInt(arrayOpciones.find(opcion => opcion.includes("Edad")).split(": ")[1]);
    const comidaFavorita = arrayOpciones.find(opcion => opcion.includes("Comida favorita")).split(": ")[1];
    const gustoSiNoCine = arrayOpciones.find(opcion => opcion.includes("Gusto por el cine")).split(": ")[1];

    // Muestra la info en el html creando uun bloque dinamicamente
    nuevoRegistro.innerHTML = `
        <h3>Nuevo Usuario:</h3>
        <ul>${arrayOpciones.map(item => `<li>${item}</li>`).join("")}</ul> 
    `; //map me ayuda a convertir cada elementos del arreglo en forma li, con el join lo que voy a hacer es convertir lo que genero map en un solo string sin separadores con ""

    
    const btnEliminar = document.createElement("button");//creo el boton de eliminar
    btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
    btnEliminar.textContent = "Eliminar";

    // Evento para el botón de eliminar
    btnEliminar.addEventListener("click", function () {
        nuevoRegistro.remove(); // elimino el registro del registro

        // Actualizar contadores de bebidas y edades
        bebidasContador[bebidaFavorita]--; // resta al contador de bebidas
        comidasContador[comidaFavorita]--; // resta al contador de comidas
        cineContador[gustoSiNoCine]--; // resta al contador de bebidas
        totalBebidas--; // Quita a el total de bebidas
        totalComidas--; 
        gustosCine--;

        const indexEdad = contadorEdades.indexOf(edadUsuario); // Buscar el índice de la edad
        if (indexEdad > -1) contadorEdades.splice(indexEdad, 1); // Remover la edad del arreglo si existe

        
        calcularPromedioEdades(); // Vuelve a calcular el promedio de edades
        calcularPorcentajeBebidas(); // Vuelve a calcular el porcentaje de bebidas
        calcularComidasPreferidas(); // Vuelve a calcular el porcentaje de comidas
        porcentajePeliculas();// Vuelve a calcular el porcentaje de peliculas


        alert("El registro fue eliminado correctamente."); // Mensaje de exito

    });

    
    nuevoRegistro.appendChild(btnEliminar);// Agrego el btn al nuevo registro

    
    resultadoDiv.appendChild(nuevoRegistro);// Agrego el nuevo registro al contenedor principal
}

// Calcular promedio de edades
function calcularPromedioEdades() {
    
    if (contadorEdades.length > 0) {

        /* Uso reduce para calcular la suma de las edades almacenadas en el array.
           El 0 es el valor inicial del acumulador. */
        const sumaEdades = contadorEdades.reduce((suma, edad) => suma + edad, 0);
        const promedio = sumaEdades / contadorEdades.length; // Se calcula el promedio
        let promedioDiv = document.getElementById("promedio");

        // Crear el div solo si no existe
        if (!promedioDiv) {

            promedioDiv = document.createElement("div");
            promedioDiv.id = "promedio";
            promedioDiv.classList.add("card", "mt-2", "shadow-sm"); // Clases de Bootstrap
            
            // Crear el encabezado de la card
            const cardHeader = document.createElement("div");
            cardHeader.classList.add("card-header", "bg-primary", "text-white", "fw-bold");
            cardHeader.textContent = "Promedio de edades:";
            promedioDiv.appendChild(cardHeader);
            
            // Crear el cuerpo de la card
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "bg-light");
            cardBody.innerHTML = `<p id="promedioText" class="mb-0">Promedio de edades: ${promedio.toFixed(0)}</p>`;
            promedioDiv.appendChild(cardBody);

            document.body.appendChild(promedioDiv); 

        } else {

            // Actualiza solo el texto del promedio si ya existe
            const promedioText = document.getElementById("promedioText");
            promedioText.textContent = `Promedio de edades: ${promedio.toFixed(0)}`;

        }
        
    } else {

        const promedioDiv = document.getElementById("promedio");

        if (promedioDiv) {

            const promedioText = document.getElementById("promedioText");
            if (promedioText) promedioText.textContent = "Promedio de edades: No posee registros";

        }

    }

}


// Calcular porcentaje de bebidas
function calcularPorcentajeBebidas() {
    let bebidasDiv = document.getElementById("bebidas");

    
    if (!bebidasDiv) {
        bebidasDiv = document.createElement("div");
        bebidasDiv.id = "bebidas";
        bebidasDiv.classList.add("card", "mt-2", "shadow-sm"); // Clases de Bootstrap 
        
        // Crear el encabezado de la card
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header", "bg-primary", "text-white", "fw-bold");
        cardHeader.textContent = "Porcentajes de Bebidas Preferidas:";
        bebidasDiv.appendChild(cardHeader);
        
        // Crear el cuerpo de la card
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "bg-light");
        cardBody.innerHTML = "<ul class='list-group list-group-flush' id='bebidasList'></ul>"; // Contenedor para la lista
        bebidasDiv.appendChild(cardBody);

        // Agregar la card al documento
        document.body.appendChild(bebidasDiv);
    }

    // Limpiar contenido previo
    const bebidasList = document.getElementById("bebidasList");
    bebidasList.innerHTML = ""; // Borra la lista anterior para actualizar

    // Recorrer el objeto de bebidas y calcular los porcentajes
    for (const bebida in bebidasContador) {
        const cantidad = bebidasContador[bebida];
        /* Calculo del porcentaje basado en el total de bebidas.
           Si no hay selecciones, el porcentaje es 0. */
        const porcentaje = totalBebidas > 0 ? ((cantidad / totalBebidas) * 100).toFixed(0) : 0;

        // Crear cada elemento de la lista
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item"); // Estilo de lista con Bootstrap
        listItem.textContent = `${bebida}: ${porcentaje}% (Se seleccionó ${cantidad})`;

        // Agregar el elemento a la lista
        bebidasList.appendChild(listItem);
    }
}


function calcularComidasPreferidas() {
    let comidasDiv = document.getElementById("comidas");

    if (!comidasDiv) {
        
        comidasDiv = document.createElement("div");
        comidasDiv.id = "comidas";
        comidasDiv.classList.add("card", "mt-2", "shadow-sm"); 
        
        // Crear el encabezado de la card
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header", "bg-primary", "text-white", "fw-bold");
        cardHeader.textContent = "Porcentaje de comidas preferidas:";
        comidasDiv.appendChild(cardHeader);
        
        // Crear el cuerpo de la card
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "bg-light");
        cardBody.innerHTML = "<ul class='list-group list-group-flush' id='comidasList'></ul>"; 
        comidasDiv.appendChild(cardBody);

        // Agregar la card al documento
        document.body.appendChild(comidasDiv);

    }

    
    const comidasLista = document.getElementById("comidasList");
    
    comidasLista.innerHTML = ""; // Borra la lista anterior para actualizar

    // Recorrer el objeto de comidas y calcular los porcentajes
    for (const comida in comidasContador) {

        const cantidad = comidasContador[comida];
        const porcentajeComida = totalComidas > 0 ? ((cantidad / totalComidas) * 100).toFixed(0) : 0; //aqui con ? se utiliza como operador ternario en este caso para ver cual sera el valor de porcentajeComida (primero se evalua si el valor de contador de total comidas es mayor a 0 y si es verdader se ejecuta el calculo para el porcentaje) si no es verdadera se pone 0.

        // Crear cada elemento de la lista
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item"); // Estilo de lista con Bootstrap
        listItem.textContent = `${comida}: ${porcentajeComida}%, (Se seleccionó ${cantidad})`;

        // Agregar el elemento a la lista
        comidasLista.appendChild(listItem);

    }
}


function porcentajePeliculas() {
    let peliculasDiv = document.getElementById("peliculas");


    if (!peliculasDiv) {

        peliculasDiv = document.createElement("div");
        peliculasDiv.id = "peliculas";
        peliculasDiv.classList.add("card", "mt-2", "shadow-sm");

        // Encabezado de la tarjeta
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header", "bg-primary", "text-white", "fw-bold");
        cardHeader.textContent = "Porcentaje de Gustos por el Cine:";
        peliculasDiv.appendChild(cardHeader);

        // Cuerpo de la tarjeta
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "bg-light");
        cardBody.innerHTML = "<ul class='list-group list-group-flush' id='peliculasList'></ul>";
        peliculasDiv.appendChild(cardBody);

        document.body.appendChild(peliculasDiv);

    }

    // Limpio
    const peliculasList = document.getElementById("peliculasList");
    peliculasList.innerHTML = "";

    // Calcular los porcentajes
    for (const gusto in cineContador) {
        const cantidad = cineContador[gusto];
        const porcentajeGusto = gustosCine > 0 ? ((cantidad / gustosCine) * 100).toFixed(0) : 0;

        // Crear el elemento de la lista
        const listaNueva = document.createElement("li");
        listaNueva.classList.add("list-group-item");
        listaNueva.textContent = `${gusto.toUpperCase()}: ${porcentajeGusto}% (Se seleccionó ${cantidad})`;

        // Agregar el elemento a la lista
        peliculasList.appendChild(listaNueva);
    }

}



// Validar al hacer clic en Enviar
BtnEnviar.addEventListener("click", function (e) {
    e.preventDefault(); // Evita que el formulario se recargue 

    const nombrebtn = nombre.value.trim();
    const edadbtn = parseInt(edad.value);
    const menuBebidaBtn = menuBebida.options[menuBebida.selectedIndex].text.trim(); // Obtiene el texto de la opcion
    const menuComidaBtn = menuComida.options[menuComida.selectedIndex].text.trim(); // Obtiene la comida seleccionada

    let bandera = false; // Bandera para saber si hubo errores
    
    const gustoCine = document.querySelector('input[name="gusto"]:checked');// aqui voy a ver el gusto de la persona, verificando en los botones que sean nombre gusto, y que este en estado check

    switch (true) {
        case nombrebtn === "":
            alert("El nombre debe contener texto, no puede estar vacio ni ser solo espacios.");
            bandera = true;
            break;

        case isNaN(edadbtn) || edadbtn < 15 || edadbtn > 75:
            alert("Edad no permitida, debe estar entre 15 y 75 años.");
            bandera = true;
            break;

        case menuBebidaBtn === "Seleccione una opcion":
            alert("Por favor selecciona una bebida.");
            bandera = true;
            break;

        case menuComidaBtn === "Seleccione una opcion":
            alert("Por favor selecciona una comida.");
            bandera = true;
            break;

        case !gustoCine: 
            alert("Por favor seleccione si le gusta el cine o no.")    
            bandera = true;
            break;

        default:

            /* Almacenamos las opciones válidas en el arreglo */
            arrayOpciones = [

                `Nombre: ${nombrebtn}`,
                `Edad: ${edadbtn}`,
                `Bebida favorita: ${menuBebidaBtn}`,
                `Comida favorita: ${menuComidaBtn}`,
                `Gusto por el cine: ${gustoCine.value}`

            ];

            /* Guardo la edad en el arreglo y sea actualiza el contador de bebidas***lo hice asi diferentes a los demas para ver como actua .push */
            contadorEdades.push(edadbtn);

            bebidasContador[menuBebidaBtn]++;
            comidasContador[menuComidaBtn]++;
            totalBebidas++;
            totalComidas++;
            cineContador[gustoCine.value]++;
            gustosCine++;
            
            break;
    }

    // Si no hay errores, muestra resultados y calcula 
    if (!bandera) {
        mostrarResultado(arrayOpciones);
        calcularPromedioEdades();
        calcularPorcentajeBebidas();
        calcularComidasPreferidas(); 
        porcentajePeliculas();
    }
});

 