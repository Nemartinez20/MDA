//Boton Generar
const llenar = document.querySelector("#btngenerarpdf");

let ncaso = document.getElementById("ncaso");
let fecha_creacion = document.getElementById("fecha_creacion");
let seccional = document.getElementById("seccional");
let ccsolicitante = document.getElementById("ccsolicitante");
let solicitante = document.getElementById("solicitante");
let ciudad = document.getElementById("ciudad");
let direccion = document.getElementById("direccion");
let telefono = document.getElementById("telefono");
let email = document.getElementById("email");
let despacho = document.getElementById("despacho");
let falla = document.getElementById("falla");
let fechaatencion = document.getElementById("fechaatencion");
let ingenieroasignado = document.getElementById("ingenieroasignado");
let cedulaingenieroasignado = document.getElementById(
  "cedulaingenieroasignado"
);
let tiposervicio = document.getElementById("tiposervicio");
let placaequipo = document.getElementById("placaequipo");
let serialequipo = document.getElementById("serialequipo");
let marcaequipo = document.getElementById("marcaequipo");
let modeloequipo = document.getElementById("modeloequipo");
let sistemaoperativo = document.getElementById("sistemaoperativo");
let antivirus = document.getElementById("antivirus");
let versionantivirus = document.getElementById("versionantivirus");
let diagnostico = document.getElementById("diagnostico");
let solucion = document.getElementById("solucion");
let observacioncliente = document.getElementById("observacioncliente");
let recomendacionesing = document.getElementById("recomendacionesing");

document.addEventListener("DOMContentLoaded", function () {
  generarFirmas();
  eventos();
  llenar.addEventListener("click", (e) => {
    e.preventDefault();
    llenarPDF();
  });
});

function eventos() {
  //Muestra campos condicionales  de si si se usa elenmentos de soporte
  const metodoContacto = document.querySelectorAll(
    'input[name="opcioneElemento"]'
  );
  metodoContacto.forEach((input) =>
    input.addEventListener("click", mostrarMetodoSeleccionadoElemento)
  );

  //Muestra campos condicionales de los elemntos
  const inputRadioOtro = document.querySelectorAll('input[name="option1"]');
  inputRadioOtro.forEach((input) =>
    input.addEventListener("click", mostrarCampoOtro)
  );

  //Estilos input
  ncaso.addEventListener("input", () => {
    cambiarEstilo(ncaso);
  });
  fecha_creacion.addEventListener("input", () => {
    cambiarEstilo(fecha_creacion);
  });
  seccional.addEventListener("input", () => {
    cambiarEstilo(seccional);
  });
  ccsolicitante.addEventListener("input", () => {
    cambiarEstilo(ccsolicitante);
  });
  ciudad.addEventListener("input", () => {
    cambiarEstilo(ciudad);
  });
  direccion.addEventListener("input", () => {
    cambiarEstilo(direccion);
  });
  telefono.addEventListener("input", () => {
    cambiarEstilo(telefono);
  });
  solicitante.addEventListener("input", () => {
    cambiarEstilo(solicitante);
  });
  email.addEventListener("input", () => {
    cambiarEstilo(email);
  });
  despacho.addEventListener("input", () => {
    cambiarEstilo(despacho);
  });
  falla.addEventListener("input", () => {
    cambiarEstilo(falla);
  });
  fechaatencion.addEventListener("input", () => {
    cambiarEstilo(fechaatencion);
  });
  ingenieroasignado.addEventListener("input", () => {
    cambiarEstilo(ingenieroasignado);
  });
  cedulaingenieroasignado.addEventListener("input", () => {
    cambiarEstilo(cedulaingenieroasignado);
  });
  // tiposervicio.addEventListener("input", () => {
  //   cambiarEstilo(tiposervicio);
  // });
  placaequipo.addEventListener("input", () => {
    cambiarEstilo(placaequipo);
  });
  serialequipo.addEventListener("input", () => {
    cambiarEstilo(serialequipo);
  });
  marcaequipo.addEventListener("input", () => {
    cambiarEstilo(marcaequipo);
  });
  modeloequipo.addEventListener("input", () => {
    cambiarEstilo(modeloequipo);
  });
  sistemaoperativo.addEventListener("input", () => {
    cambiarEstilo(sistemaoperativo);
  });
  antivirus.addEventListener("input", () => {
    cambiarEstilo(antivirus);
  });
  versionantivirus.addEventListener("input", () => {
    cambiarEstilo(versionantivirus);
  });
  diagnostico.addEventListener("input", () => {
    cambiarEstilo(diagnostico);
  });
  solucion.addEventListener("input", () => {
    cambiarEstilo(solucion);
  });
  // observacioncliente.addEventListener("input", () => {
  //   cambiarEstilo(observacioncliente);
  // });
  recomendacionesing.addEventListener("input", () => {
    cambiarEstilo(recomendacionesing);
  });
}

function cambiarEstilo(el) {
  //Estilos input
  if (el.value.trim() !== "") {
    el.classList.add("colorborde");
    console.log("esta lleno el input");
  } else {
    el.classList.remove("colorborde");
  }
}
function mostrarMetodoSeleccionadoElemento(e) {
  const containerElementos = document.querySelector(".containerElementos");

  if (e.target.value === "1") {
    containerElementos.style.display = "block";
  } else {
    containerElementos.style.display = "none";
  }
}

function mostrarCampoOtro(e) {
  const containerElementoOtro = document.querySelector(".containerel");

  if (e.target.value === "otro") {
    containerElementoOtro.classList.add("mostrar");
  } else if (e.target.value === "X") {
    containerElementoOtro.classList.remove("mostrar");
  }
}

function generarFirmas(e) {
  // Variables globales
  let currentSignatureId = null;
  const canvas = document.getElementById("signature-canvas");
  const ctx = canvas.getContext("2d");
  const signaturePad = document.getElementById("signature-pad");
  const modal = document.getElementById("signature-modal");
  const closeModal = document.querySelector(".close");
  const signaturePreviews = {
    1: document.getElementById("signature-preview-1"),
    2: document.getElementById("signature-preview-2"),
  };
  let drawing = false;
  let savedImageData = {}; // Objeto para almacenar las firmas guardadas por ID

  function resizeCanvas() {
    const rect = signaturePad.getBoundingClientRect();
    const scale = window.devicePixelRatio;

    // Ajustar el tamaño del canvas
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(scale, scale);

    // Redibujar la firma guardada si existe
    const previousImageData = savedImageData[currentSignatureId];
    if (previousImageData) {
      const img = new Image();
      img.src = previousImageData;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width / scale, canvas.height / scale);
      };
    } else {
      // Limpiar el canvas si no hay firma guardada
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // console.log("Canvas resized to:", canvas.width, canvas.height);
  }

  function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  function draw(e) {
    if (drawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  }

  function stopDrawing() {
    drawing = false;
    ctx.closePath();
    // Guardar la firma actual como imagen
    savedImageData[currentSignatureId] = canvas.toDataURL("image/png");
    // console.log("Stop drawing");
  }

  function openModal(signatureId) {
    currentSignatureId = signatureId;
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevenir el scroll del body
    requestAnimationFrame(resizeCanvas);
    // console.log("Modal opened for signature ID:", signatureId);
  }

  function saveSignature(e) {
    html2canvas(canvas, { backgroundColor: null })
      .then((canvasImage) => {
        const imgData = canvasImage.toDataURL("image/png");

        const preview = signaturePreviews[currentSignatureId];
        preview.innerHTML = `<img src="${imgData}" alt="Firma" style="width:100%; height:100%; border:none;" class="imagen${currentSignatureId}">`;
        modal.style.display = "none";
        document.body.style.overflow = ""; // Restaurar el scroll del body
        console.log("Signature saved to preview ID:", currentSignatureId);
        if (currentSignatureId === 1) {
          document.querySelector("#signature-preview-1").style.display =
            "block";
        }
        if (currentSignatureId === 2) {
          document.querySelector("#signature-preview-2").style.display =
            "block";
        }

        //
      })
      .catch((error) => {
        console.error("Error capturing canvas:", error);
      });
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    savedImageData[currentSignatureId] = null; // Limpiar la firma guardada
    // console.log("Canvas cleared");
  }

  document.querySelectorAll(".open-modal").forEach((button) => {
    button.addEventListener("click", () => {
      const signatureId = parseInt(
        button.getAttribute("data-signature-id"),
        10
      );
      openModal(signatureId);
    });
  });

  document.getElementById("clear").addEventListener("click", clearCanvas);
  document.getElementById("clear").addEventListener("click", clearDivFirma);
  document
    .getElementById("save-signature")
    .addEventListener("click", saveSignature);

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Restaurar el scroll del body
    // console.log("Modal closed");
  });

  function clearDivFirma(e) {
    console.log("dando click en clerar");
    console.log(e.target);
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Restaurar el scroll del body
      // console.log("Modal closed by clicking outside");
    }
  });

  // Eventos para el canvas
  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    e.offsetX = e.clientX - rect.left;
    e.offsetY = e.clientY - rect.top;
    startDrawing(e);
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    e.offsetX = e.clientX - rect.left;
    e.offsetY = e.clientY - rect.top;
    draw(e);
  });

  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // Eventos táctiles para dispositivos móviles
  canvas.addEventListener("touchstart", (e) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    startDrawing({ offsetX, offsetY });
    e.preventDefault();
  });

  canvas.addEventListener("touchmove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    draw({ offsetX, offsetY });
    e.preventDefault();
  });

  canvas.addEventListener("touchend", stopDrawing);
  window.addEventListener("resize", resizeCanvas);
}

async function llenarPDF() {
  // Obtener valores de los inputs *********

  let ncaso = document.getElementById("ncaso").value;
  let fecha_creacion = document.getElementById("fecha_creacion").value;
  let seccional = document.getElementById("seccional").value;
  let ccsolicitante = document.getElementById("ccsolicitante").value;
  let solicitante = document.getElementById("solicitante").value;
  let ciudad = document.getElementById("ciudad").value;
  let direccion = document.getElementById("direccion").value;
  let telefono = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;
  let despacho = document.getElementById("despacho").value;
  let falla = document.getElementById("falla").value;
  let fechaatencion = document.getElementById("fechaatencion").value;
  let ingenieroasignado = document.getElementById("ingenieroasignado").value;
  let cedulaingenieroasignado = document.getElementById(
    "cedulaingenieroasignado"
  ).value;
  // let tiposervicio = document.getElementById("tiposervicio").value;
  let requiereEquipoSi = document.getElementById("requiereEquipoSi").value;
  let requiereEquipoNo = document.getElementById("requiereEquipoNo").value;
  let placaequipo = document.getElementById("placaequipo").value;
  let serialequipo = document.getElementById("serialequipo").value;
  let marcaequipo = document.getElementById("marcaequipo").value;
  let modeloequipo = document.getElementById("modeloequipo").value;
  let sistemaoperativo = document.getElementById("sistemaoperativo").value;
  let antivirus = document.getElementById("antivirus").value;
  let versionantivirus = document.getElementById("versionantivirus").value;
  let diagnostico = document.getElementById("diagnostico").value;
  let solucion = document.getElementById("solucion").value;
  // let observacioncliente = document.getElementById("observacioncliente").value;
  let recomendacionesing = document.getElementById("recomendacionesing").value;

  //Calificacion
  let calidisposicion = document.getElementById("calidisposicion").value;
  let calconocimiento = document.getElementById("calconocimiento").value;
  let caltiempo = document.getElementById("caltiempo").value;
  let calinformacion = document.getElementById("calinformacion").value;

  //Fimas
  //Validacion si tengo firma o no ********

  if (!document.querySelector(".imagen1")) {
    FirmaIngeniero = "";
  } else {
    const firma1 = document.querySelector(".imagen1");
    FirmaIngeniero = firma1.getAttribute("src");
  }

  if (!document.querySelector(".imagen2")) {
    firmaCliente = "";
  } else {
    const firma2 = document.querySelector(".imagen2");
    firmaCliente = firma2.getAttribute("src");
  }

  /*==========================================================================
           INCIIO   DE LA CONFIGURACION DE LA HORA Y FECHA
      ==========================================================================*/

  // Verificar si se seleccionó una fecha y hora válida de solicitud
  if (fecha_creacion) {
    // Separar la fecha y la hora utilizando el método split
    const [fechacreacion, horacreacion] = fecha_creacion.split("T");
    convertirFecha(fechacreacion);
    console.log("Fecha:", fechacreacion);
    // console.log("Hora:", horacreacion);

    // Convertir la hora al formato de 12 horas
    const horaaperturadecaso12 = convertirHora12(horacreacion);

    fechaaperturadecaso = convertirFecha(fechacreacion);
    horaaperturadecaso = horaaperturadecaso12;
  } else if (fecha_creacion === "") {
    fechaaperturadecaso = "";
    horaaperturadecaso = "";
  }

  // Verificar si se seleccionó una fecha y hora válida de fechaatencion
  if (fechaatencion) {
    // Separar la fecha y la hora utilizando el método split
    const [fecha_atencion, hora_atencion] = fechaatencion.split("T");

    // console.log("Fecha:", fecha_atencion);
    // console.log("Hora:", hora_atencion);

    // Convertir la hora al formato de 12 horas
    const horaatenciondecaso12 = convertirHora12(hora_atencion);

    fechaatenciondecaso = convertirFecha(fecha_atencion);
    horaatenciondecaso = horaatenciondecaso12;
  } else if (fechaatencion === "") {
    fechaatenciondecaso = "";
    horaatenciondecaso = "";
  }

  /*==========================================================================
           FIN  DE LA CONFIGURACION DE LA HORA Y FECHA
      ==========================================================================*/

  /*==========================================================================
                                  GENRERAR EL PDF
      ==========================================================================*/

  // Ruta del PDF existente
  const pdfUrl = "FORMATO L.pdf";
  // Cargar el PDF existente
  const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer()); //para obtenerlo
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes); //para cargar el pdf
  const { rgb } = window.PDFLib;
  // Establecer el tipo y tamaño de letra para toda la página

  // Establecer el tamaño de la página a "legal"

  const page = pdfDoc.getPages()[0]; // Obtener la primera página del PDF
  const legalPageSize = [612, 999]; // [ancho, alto] para tamaño legal
  page.setSize(...legalPageSize);
  page.setFontSize(9);

  /*==========================================================================
           INICIO  AGREGAR FIRMAS DESDE EL HTML AL PDF
      ==========================================================================*/

  // Ajustar el ancho y alto de la imagen según sea necesario
  const imageWidth = 189; // Ajusta el ancho de la imagen FIRMA Cliente
  const imageHeight = 58; // Ajusta el alto de la imagen FIRMA Cliente

  if (FirmaIngeniero === "") {
    FirmaIngeniero = "";
  } else {
    //1  Cargar de ingeniero  la firma desde el html  y agregarla al PDF
    const imageBytes = await fetch(FirmaIngeniero).then((res) =>
      res.arrayBuffer()
    );
    //2
    const image1 = await pdfDoc.embedPng(imageBytes);

    //Imprimir en el pdf
    page.drawImage(image1, {
      x: 50, // Posición X de la imagen
      y: 210, // Posición Y de la imagen
      width: imageWidth,
      height: imageHeight,
      color: rgb(1, 0, 0), // Rojo
    });
  }
  if (firmaCliente === "") {
    firmaCliente = "";
  } else {
    //1  Cargar de ingeniero  la firma desde el html  y agregarla al PDF
    const imageBytes2 = await fetch(firmaCliente).then((res) =>
      res.arrayBuffer()
    );
    //2
    const image2 = await pdfDoc.embedPng(imageBytes2);

    // // Ajustar el ancho y alto de la imagen según sea necesario
    // const imageWidth = 185; // Ajusta el ancho de la imagen FIRMA Cliente
    // const imageHeight = 54; // Ajusta el alto de la imagen FIRMA Cliente

    //Imprimir en el pdf
    page.drawImage(image2, {
      x: 359, // Posición X de la imagen
      y: 210, // Posición Y de la imagen
      width: imageWidth,
      height: imageHeight,
      color: rgb(1, 0, 0), // Rojo
    });
  }

  /*==========================================================================
           FIN  AGREGAR FIRMAS DESDE EL HTML AL PDF
      ==========================================================================*/

  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
             INICIO        Función para dividir texto en líneas
       ++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  // Función para dividir texto en líneas
  const splitTextIntoLines = (text, fontSize, maxWidth) => {
    const lines = [];
    const words = text.split(" ");
    let line = "";
    const avgCharWidth = fontSize * 0.6; // Estimación promedio del ancho de un carácter

    words.forEach((word) => {
      const testLine = line ? line + " " + word : word;
      if (testLine.length * avgCharWidth > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });

    if (line) lines.push(line);

    return lines;
  };

  // Añadir texto al PDF con interlineado
  const drawTextWithLines = (text, x, y, fontSize, lineHeight) => {
    const maxWidth = 760;
    const lines = splitTextIntoLines(text, fontSize, maxWidth);
    lines.forEach((line, index) => {
      page.drawText(line, { x, y: y - lineHeight * index, size: fontSize });
    });
  };
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
             FIN        Función para dividir texto en líneas
       ++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /*==========================================================================
                            IMPRIMIR VARIABLES AL PDF
      ==========================================================================*/
  const lineHeight = 12; // Ajusta este valor para aumentar/disminuir el espacio entre líneas
  drawTextWithLines(falla, 23, 762, 9, lineHeight);

  diagnosticofinal = `Información de Diagnóstico:   ${diagnostico}`;
  //   getFillColor(diagnosticofinal, 10, 20, "rgb(255, 0, 0)");
  drawTextWithLines(diagnosticofinal, 22, 565, 9, lineHeight);

  const palabra = "Solución entregada y/o Observaciones:  ";

  solucionfinal = `${palabra} ${solucion}`;
  drawTextWithLines(solucionfinal, 22, 493, 9, lineHeight);

  //observacionclientefinal = `OSbservación por el Cliente:   ${observacioncliente}`;
  //drawTextWithLines(observacionclientefinal, 22, 354, 9, lineHeight);

  // Añadir texto al PDF con interlineado
  const drawTextWithLines2 = (text, x, y, fontSize, lineHeight) => {
    const maxWidth = 326;
    const lines = splitTextIntoLines(text, fontSize, maxWidth);
    lines.forEach((line, index) => {
      page.drawText(line, { x, y: y - lineHeight * index, size: fontSize });
    });
  };

  //   observacionclientefinal = `OSbservación por el Cliente: ${solucion}`;
  drawTextWithLines2(recomendacionesing, 22, 384, 9, lineHeight);

  page.drawText(ncaso, { x: 130, y: 861 });
  page.drawText(fechaaperturadecaso, { x: 132, y: 849 });
  page.drawText(horaaperturadecaso, { x: 182, y: 849 });
  page.drawText(seccional, { x: 103, y: 823 });
  page.drawText(ccsolicitante, { x: 103, y: 811 });
  page.drawText(solicitante, { x: 356, y: 823 });
  page.drawText(ciudad, { x: 356, y: 811 });
  page.drawText(direccion, { x: 103, y: 799 });
  page.drawText(telefono, { x: 356, y: 799 });
  page.drawText(email, { x: 103, y: 787 });
  page.drawText(despacho, { x: 356, y: 787 });
  //   page.drawText(falla, { x: 22, y: 708 });
  page.drawText(fechaatenciondecaso, { x: 151, y: 689 });
  page.drawText(horaatenciondecaso, { x: 205, y: 689 });
  page.drawText(ingenieroasignado, { x: 152, y: 677 });
  //page.drawText(tiposervicio, { x: 345, y: 634 });
  page.drawText(requiereEquipoSi, { x: 136, y: 602 });
  page.drawText(requiereEquipoNo, { x: 136, y: 590 });
  page.drawText(placaequipo, { x: 114, y: 652 });
  page.drawText(serialequipo, { x: 339, y: 652 });
  page.drawText(marcaequipo, { x: 114, y: 640 });
  page.drawText(modeloequipo, { x: 339, y: 640 });
  page.drawText(sistemaoperativo, { x: 114, y: 629 });
  page.drawText(antivirus, { x: 339, y: 629 });
  page.drawText(versionantivirus, { x: 540, y: 629 });
  //   page.drawText(diagnostico, { x: 149, y: 486 });
  //   page.drawText(solucion, { x: 117, y: 426 });
  //   page.drawText(observacioncliente, { x: 145, y: 354 });
  //   page.drawText(recomendacionesing, { x: 24, y: 282 });
  page.drawText(solicitante, { x: 393, y: 272 });
  page.drawText(ingenieroasignado, { x: 115, y: 272 });
  page.drawText(ccsolicitante, { x: 385, y: 180 });
  page.drawText(cedulaingenieroasignado, { x: 60, y: 180 });

  // Calificacion
  calidisposicion1 = "X";

  if (calidisposicion === "1") {
    page.drawText(calidisposicion1, { x: 477, y: 337 });
  } else if (calidisposicion === "2") {
    page.drawText(calidisposicion1, { x: 503, y: 337 });
  } else if (calidisposicion === "3") {
    page.drawText(calidisposicion1, { x: 529, y: 337 });
  } else if (calidisposicion === "4") {
    page.drawText(calidisposicion1, { x: 555, y: 337 });
  } else if (calidisposicion === "5") {
    page.drawText(calidisposicion1, { x: 577, y: 337 });
  }
  // Conocimiento
  calconocimiento1 = "X";

  if (calconocimiento === "1") {
    page.drawText(calconocimiento1, { x: 477, y: 325 });
  } else if (calconocimiento === "2") {
    page.drawText(calconocimiento1, { x: 503, y: 325 });
  } else if (calconocimiento === "3") {
    page.drawText(calconocimiento1, { x: 529, y: 325 });
  } else if (calconocimiento === "4") {
    page.drawText(calconocimiento1, { x: 555, y: 325 });
  } else if (calconocimiento === "5") {
    page.drawText(calconocimiento1, { x: 577, y: 325 });
  }
  // Conocimiento
  caltiempo1 = "X";

  if (caltiempo === "1") {
    page.drawText(caltiempo1, { x: 477, y: 313 });
  } else if (caltiempo === "2") {
    page.drawText(caltiempo1, { x: 503, y: 313 });
  } else if (caltiempo === "3") {
    page.drawText(caltiempo1, { x: 529, y: 313 });
  } else if (caltiempo === "4") {
    page.drawText(caltiempo1, { x: 555, y: 313 });
  } else if (caltiempo === "5") {
    page.drawText(caltiempo1, { x: 577, y: 313 });
  }
  // Conocimiento
  calinformacion1 = "X";

  if (calinformacion === "1") {
    page.drawText(calinformacion1, { x: 477, y: 302 });
  } else if (calinformacion === "2") {
    page.drawText(calinformacion1, { x: 503, y: 302 });
  } else if (calinformacion === "3") {
    page.drawText(calinformacion1, { x: 529, y: 302 });
  } else if (calinformacion === "4") {
    page.drawText(calinformacion1, { x: 555, y: 302 });
  } else if (calinformacion === "5") {
    page.drawText(calinformacion1, { x: 577, y: 302 });
  }
  // Serializar el documento PDF a bytes
  const modifiedPdfBytes = await pdfDoc.save();

  // Crear un enlace para descargar el PDF modificado
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(
    new Blob([modifiedPdfBytes], { type: "application/pdf" })
  );
  downloadLink.download = `ON-${ncaso}.pdf`;
  downloadLink.click();
}

function convertirHora12(hora24) {
  const [hora, minutos] = hora24.split(":");
  const ampm = hora < 12 ? "AM" : "PM";
  const hora12 = hora % 12 || 12;

  return `${hora12}:${minutos} ${ampm}`;
}

function convertirFecha(fecha) {
  // Convertir `fecha` a un objeto Date si es una cadena
  const fechaObj =
    typeof fecha === "string"
      ? new Date(fecha + "T00:00:00Z") // Añadir tiempo en UTC
      : fecha;

  // Verificar si la fecha es válida
  if (isNaN(fechaObj)) {
    console.error("Formato de fecha inválido");
    return;
  }

  // Extraer día, mes y año de la fecha original
  const dia = String(fechaObj.getUTCDate()).padStart(2, "0"); // Obtener el día en UTC
  const mes = String(fechaObj.getUTCMonth() + 1).padStart(2, "0"); // Obtener el mes en UTC
  const año = fechaObj.getUTCFullYear(); // Obtener el año en UTC
  console.log(`${dia}-${mes}-${año}`);
  // Devolver la fecha en el formato "DD-MM-YYYY"
  return `${dia}-${mes}-${año}`;
}
