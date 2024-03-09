



let signaturePad = null;
//Boton Generar
const llenar = document.querySelector('#btngenerarpdf');

let ncaso = document.getElementById('ncaso');
let fecha_creacion = document.getElementById('fecha_creacion');
let seccional = document.getElementById('seccional');
let ccsolicitante = document.getElementById('ccsolicitante');
let solicitante = document.getElementById('solicitante');
let ciudad = document.getElementById('ciudad');
let direccion = document.getElementById('direccion');
let telefono = document.getElementById('telefono');
let email = document.getElementById('email');
let despacho = document.getElementById('despacho');
let falla = document.getElementById('falla');
let fechaatencion = document.getElementById('fechaatencion');
let ingenieroasignado = document.getElementById('ingenieroasignado');
let cedulaingenieroasignado = document.getElementById('cedulaingenieroasignado');
let tiposervicio = document.getElementById('tiposervicio');
let placaequipo = document.getElementById('placaequipo');
let serialequipo = document.getElementById('serialequipo');
let marcaequipo = document.getElementById('marcaequipo');
let modeloequipo = document.getElementById('modeloequipo');
let sistemaoperativo = document.getElementById('sistemaoperativo');
let antivirus = document.getElementById('antivirus');
let versionantivirus = document.getElementById('versionantivirus');
let diagnostico = document.getElementById('diagnostico');
let solucion = document.getElementById('solucion');
let observacioncliente = document.getElementById('observacioncliente');
let recomendacionesing = document.getElementById('recomendacionesing');



document.addEventListener('DOMContentLoaded', function () {
    firmarDocumento();
    eventos();

    llenar.addEventListener('click', (e) => {
        e.preventDefault();
        llenarPDF();
    });

    limpiarFirmasUsuario();
});


function eventos() {
    //Muestra campos condicionales  de si si se usa elenmentos de soporte
    const metodoContacto = document.querySelectorAll('input[name="opcioneElemento"]');
    metodoContacto.forEach(input => (input.addEventListener('click', mostrarMetodoSeleccionadoElemento)));



    //Muestra campos condicionales de los elemntos
    const inputRadioOtro = document.querySelectorAll('input[name="option1"]');
    inputRadioOtro.forEach(input => (input.addEventListener('click', mostrarCampoOtro)));


    //Estilos input
    ncaso.addEventListener('input', () => {
        cambiarEstilo(ncaso);
    })
    fecha_creacion.addEventListener('input', () => {
        cambiarEstilo(fecha_creacion);
    })
    seccional.addEventListener('input', () => {
        cambiarEstilo(seccional);
    })
    ccsolicitante.addEventListener('input', () => {
        cambiarEstilo(ccsolicitante);
    })
    ciudad.addEventListener('input', () => {
        cambiarEstilo(ciudad);
    })
    direccion.addEventListener('input', () => {
        cambiarEstilo(direccion);
    })
    telefono.addEventListener('input', () => {
        cambiarEstilo(telefono);
    })
    solicitante.addEventListener('input', () => {
        cambiarEstilo(solicitante);
    })
    email.addEventListener('input', () => {
        cambiarEstilo(email);
    })
    despacho.addEventListener('input', () => {
        cambiarEstilo(despacho);
    })
    falla.addEventListener('input', () => {
        cambiarEstilo(falla);
    })
    fechaatencion.addEventListener('input', () => {
        cambiarEstilo(fechaatencion);
    })
    ingenieroasignado.addEventListener('input', () => {
        cambiarEstilo(ingenieroasignado);
    })
    cedulaingenieroasignado.addEventListener('input', () => {
        cambiarEstilo(cedulaingenieroasignado);
    })
    tiposervicio.addEventListener('input', () => {
        cambiarEstilo(tiposervicio);
    })
    placaequipo.addEventListener('input', () => {
        cambiarEstilo(placaequipo);
    })
    serialequipo.addEventListener('input', () => {
        cambiarEstilo(serialequipo);
    })
    marcaequipo.addEventListener('input', () => {
        cambiarEstilo(marcaequipo);
    })
    modeloequipo.addEventListener('input', () => {
        cambiarEstilo(modeloequipo);
    })
    sistemaoperativo.addEventListener('input', () => {
        cambiarEstilo(sistemaoperativo);
    })
    antivirus.addEventListener('input', () => {
        cambiarEstilo(antivirus);
    })
    versionantivirus.addEventListener('input', () => {
        cambiarEstilo(versionantivirus);
    })
    diagnostico.addEventListener('input', () => {
        cambiarEstilo(diagnostico);
    })
    solucion.addEventListener('input', () => {
        cambiarEstilo(solucion);
    })
    observacioncliente.addEventListener('input', () => {
        cambiarEstilo(observacioncliente);
    })
    recomendacionesing.addEventListener('input', () => {
        cambiarEstilo(recomendacionesing);
    })
}

function cambiarEstilo(el) {
    //Estilos input
    if (el.value.trim() !== '') {
        el.classList.add('colorborde');
    } else {
        el.classList.remove('colorborde');
    }

}
function mostrarMetodoSeleccionadoElemento(e) {

    const containerElementos = document.querySelector('.containerElementos');

    if (e.target.value === '1') {

        containerElementos.style.display = "block";
    } else {
        containerElementos.style.display = "none";

    }

}

function mostrarCampoOtro(e) {
    const containerElementoOtro = document.querySelector('.containerel');

    if (e.target.value === 'otro') {
        containerElementoOtro.classList.add('mostrar');
    } else if (e.target.value === 'X') {
        containerElementoOtro.classList.remove('mostrar');
    }

}


function firmarDocumento() {

    const canvasFirmaIngeniero = document.querySelector('#canvasinge');
    canvasFirmaIngeniero.height = canvasFirmaIngeniero.offsetHeight;
    canvasFirmaIngeniero.width = canvasFirmaIngeniero.offsetWidth;

    const canvasFirmaCliente = document.querySelector('#canvascliente');
    canvasFirmaCliente.height = canvasFirmaCliente.offsetHeight;
    canvasFirmaCliente.width = canvasFirmaCliente.offsetWidth;


    signaturePad = new SignaturePad(canvasFirmaCliente, {});
    signaturePad2 = new SignaturePad(canvasFirmaIngeniero, {});
}

async function llenarPDF() {


    let ncaso = document.getElementById('ncaso').value;
    let fecha_creacion = document.getElementById('fecha_creacion').value;
    let seccional = document.getElementById('seccional').value;
    let ccsolicitante = document.getElementById('ccsolicitante').value;
    let solicitante = document.getElementById('solicitante').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    let despacho = document.getElementById('despacho').value;
    let falla = document.getElementById('falla').value;
    let fechaatencion = document.getElementById('fechaatencion').value;
    let ingenieroasignado = document.getElementById('ingenieroasignado').value;
    let cedulaingenieroasignado = document.getElementById('cedulaingenieroasignado').value;
    let tiposervicio = document.getElementById('tiposervicio').value;
    let placaequipo = document.getElementById('placaequipo').value;
    let serialequipo = document.getElementById('serialequipo').value;
    let marcaequipo = document.getElementById('marcaequipo').value;
    let modeloequipo = document.getElementById('modeloequipo').value;
    let sistemaoperativo = document.getElementById('sistemaoperativo').value;
    let antivirus = document.getElementById('antivirus').value;
    let versionantivirus = document.getElementById('versionantivirus').value;
    let diagnostico = document.getElementById('diagnostico').value;
    let solucion = document.getElementById('solucion').value;
    let observacioncliente = document.getElementById('observacioncliente').value;
    let recomendacionesing = document.getElementById('recomendacionesing').value;

    //Calificacion
    let calidisposicion = document.getElementById('calidisposicion').value;
    let calconocimiento = document.getElementById('calconocimiento').value;
    let caltiempo = document.getElementById('caltiempo').value;
    let calinformacion = document.getElementById('calinformacion').value;

    console.log(typeof (calidisposicion));

    // Verificar si se seleccionó una fecha y hora válida de solicitud
    if (fecha_creacion) {
        // Separar la fecha y la hora utilizando el método split
        const [fechacreacion, horacreacion] = fecha_creacion.split('T');

        console.log('Fecha:', fechacreacion);
        console.log('Hora:', horacreacion);

        // Convertir la hora al formato de 12 horas
        const horaaperturadecaso12 = convertirHora12(horacreacion);

        fechaaperturadecaso = fechacreacion;
        horaaperturadecaso = horaaperturadecaso12;
    } else if (fecha_creacion === '') {
        fechaaperturadecaso = '';
        horaaperturadecaso = '';
    }


    // Verificar si se seleccionó una fecha y hora válida de fechaatencion
    if (fechaatencion) {
        // Separar la fecha y la hora utilizando el método split
        const [fecha_atencion, hora_atencion] = fechaatencion.split('T');

        console.log('Fecha:', fecha_atencion);
        console.log('Hora:', hora_atencion);

        // Convertir la hora al formato de 12 horas
        const horaatenciondecaso12 = convertirHora12(hora_atencion);

        fechaatenciondecaso = fecha_atencion;
        horaatenciondecaso = horaatenciondecaso12;
    } else if (fechaatencion === '') {
        fechaatenciondecaso = '';
        horaatenciondecaso = '';
    }


    // Ruta del PDF existente
    const pdfUrl = 'FORMATO.pdf';

    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

    // Establecer el tipo y tamaño de letra para toda la página

    // Establecer el tamaño de la página a "legal"
    const legalPageSize = [612, 940]; // [ancho, alto] para tamaño legal
    const page = pdfDoc.getPages()[0];
    page.setSize(...legalPageSize);
    page.setFontSize(9);
    const fontSize = 12;


    // Agregar texto a la página del PDF
    const signatureImage = signaturePad.toDataURL();
    const signatureImage2 = signaturePad2.toDataURL();


    // Cargar la imagen y agregarla al PDF
    const imageBytes = await fetch(signatureImage).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);

    // Ajustar el ancho y alto de la imagen según sea necesario
    const imageWidth = 185; // Ajusta el ancho de la imagen FIRMA Cliente
    const imageHeight = 54; // Ajusta el alto de la imagen FIRMA Cliente

    page.drawImage(image, {
        x: 350, // Posición X de la imagen
        y: 122, // Posición Y de la imagen
        width: imageWidth,
        height: imageHeight,
    });


    // Cargar la imagen y agregarla al PDF
    const imageBytes2 = await fetch(signatureImage2).then(res => res.arrayBuffer());
    const image2 = await pdfDoc.embedPng(imageBytes2);

    // Ajustar el ancho y alto de la imagen según sea necesario
    const imageWidth2 = 170; // Ajusta el ancho de la imagen
    const imageHeight2 = 54; // Ajusta el alto de la imagen

    page.drawImage(image2, {
        x: 90, // Posición X de la imagen
        y: 122, // Posición Y de la imagen
        width: imageWidth2,
        height: imageHeight2,
    });


    // const maxWidth = 500; // Ancho máximo de la línea en unidades de PDF
    // const lines = splitTextIntoLines(falla, page, fontSize, maxWidth);



    // // Agregar las líneas de texto al documento
    // page.drawText(falla, { x: 22, y: 688 });


    // for (const line of lines) {
    //     page.drawText(line, { x: 22, y: 688, size: fontSize });
    //     y -= fontSize + 2; // Ajusta la posición y para la siguiente línea
    // }

    page.drawText(ncaso, { x: 110, y: 805 });
    page.drawText(fechaaperturadecaso, { x: 102, y: 793 });
    page.drawText(horaaperturadecaso, { x: 287, y: 794 });
    page.drawText(seccional, { x: 100, y: 767 });
    page.drawText(ccsolicitante, { x: 100, y: 754 });
    page.drawText(solicitante, { x: 355, y: 767 });
    page.drawText(ciudad, { x: 355, y: 754 });
    page.drawText(direccion, { x: 100, y: 743 });
    page.drawText(telefono, { x: 355, y: 743 });
    page.drawText(email, { x: 100, y: 732 });
    page.drawText(despacho, { x: 355, y: 732 });
    page.drawText(falla, { x: 22, y: 708 });
    page.drawText(fechaatenciondecaso, { x: 110, y: 647 });
    page.drawText(horaatenciondecaso, { x: 345, y: 647 });
    page.drawText(ingenieroasignado, { x: 100, y: 634 });
    page.drawText(tiposervicio, { x: 345, y: 634 });
    page.drawText(placaequipo, { x: 100, y: 608 });
    page.drawText(serialequipo, { x: 341, y: 608 });
    page.drawText(marcaequipo, { x: 100, y: 596 });
    page.drawText(modeloequipo, { x: 341, y: 596 });
    page.drawText(sistemaoperativo, { x: 100, y: 585 });
    page.drawText(antivirus, { x: 341, y: 585 });
    page.drawText(versionantivirus, { x: 526, y: 585 });
    page.drawText(diagnostico, { x: 149, y: 486 });
    page.drawText(solucion, { x: 117, y: 426 });
    page.drawText(observacioncliente, { x: 145, y: 354 });
    page.drawText(recomendacionesing, { x: 24, y: 282 });
    page.drawText(solicitante, { x: 393, y: 182 });
    page.drawText(ingenieroasignado, { x: 115, y: 182 });
    page.drawText(ccsolicitante, { x: 365, y: 101 });
    page.drawText(cedulaingenieroasignado, { x: 60, y: 101 });


    // Calificacion
    calidisposicion1 = 'X'

    if (calidisposicion === '1') {
        page.drawText(calidisposicion1, { x: 475, y: 230 });
    } else if (calidisposicion === '2') {
        page.drawText(calidisposicion1, { x: 500, y: 230 });
    } else if (calidisposicion === '3') {
        page.drawText(calidisposicion1, { x: 529, y: 230 });
    } else if (calidisposicion === '4') {
        page.drawText(calidisposicion1, { x: 555, y: 230 });
    } else if (calidisposicion === '5') {
        page.drawText(calidisposicion1, { x: 577, y: 230 });
    }
    // Conocimiento
    calconocimiento1 = 'X'

    if (calconocimiento === '1') {
        page.drawText(calconocimiento1, { x: 475, y: 218 });
    } else if (calconocimiento === '2') {
        page.drawText(calconocimiento1, { x: 500, y: 218 });
    } else if (calconocimiento === '3') {
        page.drawText(calconocimiento1, { x: 529, y: 218 });
    } else if (calconocimiento === '4') {
        page.drawText(calconocimiento1, { x: 555, y: 218 });
    } else if (calconocimiento === '5') {
        page.drawText(calconocimiento1, { x: 577, y: 218 });
    }
    // Conocimiento
    caltiempo1 = 'X'

    if (caltiempo === '1') {
        page.drawText(caltiempo1, { x: 475, y: 206 });
    } else if (caltiempo === '2') {
        page.drawText(caltiempo1, { x: 500, y: 206 });
    } else if (caltiempo === '3') {
        page.drawText(caltiempo1, { x: 529, y: 206 });
    } else if (caltiempo === '4') {
        page.drawText(caltiempo1, { x: 555, y: 206 });
    } else if (caltiempo === '5') {
        page.drawText(caltiempo1, { x: 577, y: 206 });
    }
    // Conocimiento
    calinformacion1 = 'X'

    if (calinformacion === '1') {
        page.drawText(calinformacion1, { x: 475, y: 196 });
    } else if (calinformacion === '2') {
        page.drawText(calinformacion1, { x: 500, y: 196 });
    } else if (calinformacion === '3') {
        page.drawText(calinformacion1, { x: 529, y: 196 });
    } else if (calinformacion === '4') {
        page.drawText(calinformacion1, { x: 555, y: 196 });
    } else if (calinformacion === '5') {
        page.drawText(calinformacion1, { x: 577, y: 196 });
    }




    const modifiedPdfBytes = await pdfDoc.save();

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' }));
    downloadLink.download = `Onsite_${ncaso}.pdf`;
    downloadLink.click();
}



function limpiarFirmasUsuario() {
    //Borrar firmas
    const limpiaringe = document.getElementById("limpiaringe");
    limpiaringe.addEventListener('click', () => {
        limpiarFirma2();


    });
    const limpiarcliente = document.getElementById("limpiarcliente");
    limpiarcliente.addEventListener('click', () => {
        limpiarFirma();


    });
    function limpiarFirma() {
        // Limpia el canvas
        signaturePad.clear();
    }
    function limpiarFirma2() {
        // Limpia el canvas
        signaturePad2.clear();
    }

}

function convertirHora12(hora24) {
    const [hora, minutos] = hora24.split(':');
    const ampm = (hora < 12) ? 'AM' : 'PM';
    const hora12 = (hora % 12) || 12;

    return `${hora12}:${minutos} ${ampm}`;
}