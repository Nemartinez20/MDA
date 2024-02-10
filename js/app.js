


let signaturePad = null;
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


window.addEventListener('DOMContentLoaded', () => {
    const canvasFirmaIngeniero = document.querySelector('#canvasinge');
    canvasFirmaIngeniero.height = canvasFirmaIngeniero.offsetHeight;
    canvasFirmaIngeniero.width = canvasFirmaIngeniero.offsetWidth;

    const canvasFirmaCliente = document.querySelector('#canvascliente');
    canvasFirmaCliente.height = canvasFirmaCliente.offsetHeight;
    canvasFirmaCliente.width = canvasFirmaCliente.offsetWidth;


    signaturePad = new SignaturePad(canvasFirmaCliente, {});
    signaturePad2 = new SignaturePad(canvasFirmaIngeniero, {});

    llenar.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('sadasdas')
        llenarPDF();
    });


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



});







function cambiarEstilo(el) {
    //Estilos input
    if (el.value.trim() !== '') {
        el.classList.add('colorborde');
    } else {
        el.classList.remove('colorborde');
    }

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


    // Agregar texto a la página del PDF
    const signatureImage = signaturePad.toDataURL();
    const signatureImage2 = signaturePad2.toDataURL();


    // Cargar la imagen y agregarla al PDF
    const imageBytes = await fetch(signatureImage).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);

    // Ajustar el ancho y alto de la imagen según sea necesario
    const imageWidth = 155; // Ajusta el ancho de la imagen
    const imageHeight = 50; // Ajusta el alto de la imagen

    page.drawImage(image, {
        x: 400, // Posición X de la imagen
        y: 140, // Posición Y de la imagen
        width: imageWidth,
        height: imageHeight,
    });


    // Cargar la imagen y agregarla al PDF
    const imageBytes2 = await fetch(signatureImage2).then(res => res.arrayBuffer());
    const image2 = await pdfDoc.embedPng(imageBytes2);

    // Ajustar el ancho y alto de la imagen según sea necesario
    const imageWidth2 = 170; // Ajusta el ancho de la imagen
    const imageHeight2 = 50; // Ajusta el alto de la imagen

    page.drawImage(image2, {
        x: 90, // Posición X de la imagen
        y: 140, // Posición Y de la imagen
        width: imageWidth2,
        height: imageHeight2,
    });



    const cedulaingniero = '1055228772';
    page.drawText(ncaso, { x: 100, y: 789 });
    page.drawText(fechaaperturadecaso, { x: 100, y: 774 });
    page.drawText(horaaperturadecaso, { x: 287, y: 774 });
    page.drawText(seccional, { x: 93, y: 747 });
    page.drawText(ccsolicitante, { x: 93, y: 734 });
    page.drawText(solicitante, { x: 384, y: 747 });
    page.drawText(ciudad, { x: 384, y: 734 });
    page.drawText(direccion, { x: 93, y: 721 });
    page.drawText(telefono, { x: 384, y: 721 });
    page.drawText(email, { x: 93, y: 710 });
    page.drawText(despacho, { x: 384, y: 710 });
    page.drawText(falla, { x: 22, y: 688 });
    page.drawText(fechaatenciondecaso, { x: 93, y: 627 });
    page.drawText(horaatenciondecaso, { x: 345, y: 627 });
    page.drawText(ingenieroasignado, { x: 93, y: 617 });
    page.drawText(placaequipo, { x: 93, y: 593 });
    page.drawText(serialequipo, { x: 341, y: 593 });
    page.drawText(marcaequipo, { x: 93, y: 584 });
    page.drawText(modeloequipo, { x: 341, y: 584 });
    page.drawText(sistemaoperativo, { x: 93, y: 565 });
    page.drawText(antivirus, { x: 384, y: 565 });
    page.drawText(versionantivirus, { x: 450, y: 565 });
    page.drawText(diagnostico, { x: 132, y: 448 });
    page.drawText(solucion, { x: 102, y: 387 });
    page.drawText(observacioncliente, { x: 134, y: 327 });
    page.drawText(recomendacionesing, { x: 24, y: 287 });
    page.drawText(solicitante, { x: 400, y: 190 });
    page.drawText(ingenieroasignado, { x: 115, y: 190 });
    page.drawText(ccsolicitante, { x: 365, y: 134 });
    page.drawText(cedulaingniero, { x: 50, y: 134 });



    const modifiedPdfBytes = await pdfDoc.save();

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' }));
    downloadLink.download = `Onsite_${ncaso}.pdf`;
    downloadLink.click();
}

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


function convertirHora12(hora24) {
    const [hora, minutos] = hora24.split(':');
    const ampm = (hora < 12) ? 'AM' : 'PM';
    const hora12 = (hora % 12) || 12;

    return `${hora12}:${minutos} ${ampm}`;
}