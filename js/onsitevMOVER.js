(() => {
  // console.log("desde onsite v2 2025");

  const llenar2 = document.querySelector("#btngenerarpdf");

  let infoCaso = [];

  document.addEventListener("DOMContentLoaded", function () {
    generarFirmas();

    llenar2.addEventListener("click", (e) => {
      e.preventDefault();
      llenarPDF();
    });
  });

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

      // Guardar la firma como imagen en el objeto
      canvas.toBlob((blob) => {
        // Crear una URL para el blob
        const url = URL.createObjectURL(blob);
        savedImageData[currentSignatureId] = url; // Guardar la URL del blob
        // console.log("Stop drawing");
        // console.log(savedImageData); // Mostrar el objeto en la consola

        if (currentSignatureId == 1) {
          infoCaso.imagen1 = blob;
        } else {
          infoCaso.imagen2 = blob;
        }
      }, "image/png");
    }

    // Función para guardar la firma
    function saveSignature() {
      if (currentSignatureId === null) {
        console.error("No se ha seleccionado un ID de firma.");
        return;
      }

      const imgUrl = savedImageData[currentSignatureId]; // Obtener la imagen guardada

      const preview = signaturePreviews[currentSignatureId];
      // URL.revokeObjectURL(savedImageData[currentSignatureId]);
      // console.log(preview.firstChild);

      if (imgUrl) {
        if (preview) {
          preview.innerHTML = `<img src="${imgUrl}" name="imgfirma${currentSignatureId}" class="imagen${currentSignatureId}" alt="Firma" style="width:100%; height:100%; border:none;">`;
          preview.style.display = "block"; // Mostrar la vista previa
          modal.style.display = "none";
          document.body.style.overflow = ""; // Restaurar el scroll del body
          // console.log("Signature saved to preview ID:", currentSignatureId);
          if (currentSignatureId === 1) {
            document.querySelector("#signature-preview-1").style.display =
              "block";
          }
          if (currentSignatureId === 2) {
            document.querySelector("#signature-preview-2").style.display =
              "block";
          }
        } else {
          console.error(
            "Preview no encontrado para el ID:",
            currentSignatureId
          );
        }
      }
    }
    function openModal(signatureId) {
      currentSignatureId = signatureId;
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevenir el scroll del body
      requestAnimationFrame(resizeCanvas);
      // console.log("Modal opened for signature ID:", signatureId);
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // console.log( currentSignatureId);
      savedImageData[currentSignatureId] = null; // Limpiar la firma guardada
      // console.log("Canvas cleared");
      // console.log(savedImageData);
      // console.log(currentSignatureId);
      const preview = signaturePreviews[currentSignatureId];

      preview.innerHTML = "";
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
    document
      .getElementById("save-signature")
      .addEventListener("click", saveSignature);

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Restaurar el scroll del body
      // console.log("Modal closed");
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Restaurar el scroll del body
        console.log("Modal closed by clicking outside");
        console.log("diste click y se cerrro");
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

  //LENAR PDF

  async function llenarPDF() {
    const tabla = document.querySelector("#tablabd");
    let ncaso = document.getElementById("ncaso").value;
    let fecha_creacion = document.getElementById("fecha_creacion").value;
    let seccional = document.getElementById("seccional").value;
    let ccsolicitante = document.getElementById("ccsolicitante").value;
    let id_funcionario = document.getElementById("id_funcionario").value;
    let solicitante = document.getElementById("solicitante").value;
    let ciudad = document.getElementById("ciudad").value;
    let ciudadKey1 = document.getElementById("ciudadKey").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let despacho = document.getElementById("despacho").value;
    let falla = document.getElementById("falla").value;
    let fechaatencion = document.getElementById("fechaatencion").value;
    let id_ing_asignado = document.getElementById("id_ing_asignado").value;
    let ingenieroasignado = document.getElementById("ingenieroasignado").value;
    let cedulaingenieroasignado = document.getElementById(
      "cedulaingenieroasignado"
    ).value;
    // let tiposervicio = document.getElementById("tiposervicio").value;
    let requiereRepuesto = document.getElementById("requiereRepuesto").value;

    let requiereEquipo = document.getElementById("requiereEquipo").value;
    // let requiereEquipoNo = document.getElementById("requiereEquipoNo").value;
    let idEquipoAsigando = document.getElementById("idEquipoAsigando").value;
    let placaequipo = document.getElementById("placaequipo").value;
    let serialequipo = document.getElementById("serialequipo").value;

    let marcaequipo = document.getElementById("marcaequipo").value;
    let modeloequipo = document.getElementById("modeloequipo").value;
    let sistemaoperativo = document.getElementById("sistemaoperativo").value;
    let AntivirusActualizado = document.getElementById(
      "AntivirusActualizado"
    ).value;
    let versionantivirus = document.getElementById("versionantivirus").value;
    let diagnostico = document.getElementById("diagnostico").value;
    let solucion = document.getElementById("solucion").value;
    // let observacioncliente =
    //   document.getElementById("observacioncliente").value;
    // let recomendacionesing =
    //   document.getElementById("recomendacionesing").value;

    //Calificacion
    let calidisposicion = document.getElementById("calidisposicion").value;
    let calconocimiento = document.getElementById("calconocimiento").value;
    let caltiempo = document.getElementById("caltiempo").value;
    let calinformacion = document.getElementById("calinformacion").value;

    //Fimas

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

    // Ruta del PDF existente
    const pdfUrl = "/MDA/public/views/admin/onsite/FORMATOODV3 L.pdf";

    const existingPdfBytes = await fetch(pdfUrl).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

    // Establecer el tipo y tamaño de letra para toda la página

    // Establecer el tamaño de la página a "legal"
    // const legalPageSize = [612, 792]; // [ancho, alto] para tamaño legal tamaño carta
    const legalPageSize = [612, 936]; // [ancho, alto] para tamaño legal tamaño oficio
    const page = pdfDoc.getPages()[0];
    page.setSize(...legalPageSize);
    page.setFontSize(9);
    //Para negrita
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
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
        y: 180, // Posición Y de la imagen
        width: imageWidth,
        height: imageHeight,
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

      //Imprimir en el pdf
      page.drawImage(image2, {
        x: 359, // Posición X de la imagen
        y: 180, // Posición Y de la imagen
        width: imageWidth,
        height: imageHeight,
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
      const maxWidth = 750;
      const lines = splitTextIntoLines(text, fontSize, maxWidth);
      lines.forEach((line, index) => {
        page.drawText(line, { x, y: y - lineHeight * index, size: fontSize });
      });
    };
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
             FIN        Función para dividir texto en líneas
       ++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

    /*==========================================================================
                 INICIO   IMPRIMIR VARIABLES AL PDF
      ==========================================================================*/
    const lineHeight = 12; // Ajusta este valor para aumentar/disminuir el espacio entre líneas
    drawTextWithLines(falla, 23, 736, 9, lineHeight);

    diagnosticofinal = `Información de Diagnóstico:   ${diagnostico}`;
    //   getFillColor(diagnosticofinal, 10, 20, "rgb(255, 0, 0)");
    drawTextWithLines(diagnosticofinal, 22, 488, 9, lineHeight);

    const palabra = "Solución entregada y/o Observaciones:  ";

    solucionfinal = `${palabra} ${solucion}`;
    drawTextWithLines(solucionfinal, 22, 430, 9, lineHeight);

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
    // drawTextWithLines2(recomendacionesing, 22, 384, 9, lineHeight);

    page.drawText(ncaso, {
      x: 130,
      y: 833,
      // font: fontBold, // 🔹 Usa fuente en negrita
      // color: PDFLib.rgb(0, 0, 0), // 🔹 Negro
    });
    page.drawText(fechaaperturadecaso, { x: 132, y: 821 });
    page.drawText(horaaperturadecaso, { x: 182, y: 821 });
    page.drawText(seccional, { x: 112, y: 795 });
    page.drawText(ccsolicitante, { x: 112, y: 784 });
    page.drawText(solicitante, { x: 360, y: 795 });
    page.drawText(ciudad, { x: 360, y: 784 });
    page.drawText(direccion, { x: 112, y: 772 });
    page.drawText(telefono, { x: 360, y: 772 });
    page.drawText(email, { x: 112, y: 760 });
    page.drawText(despacho, { x: 360, y: 760 });
    //   page.drawText(falla, { x: 22, y: 708 });
    page.drawText(fechaatenciondecaso, { x: 151, y: 662 });
    page.drawText(horaatenciondecaso, { x: 205, y: 662 });
    page.drawText(ingenieroasignado, { x: 151, y: 650 });
    //page.drawText(tiposervicio, { x: 345, y: 634 });
    // page.drawText(infoCaso.requiereRepuestoSi, { x: 151, y: 526 });
    // page.drawText(infoCaso.requiereRepuestoNo, { x: 151, y: 514 });
    // page.drawText(requiereEquipoSi, { x: 457, y: 526 });
    // page.drawText(requiereEquipoNo, { x: 457, y: 514 });
    page.drawText(placaequipo, { x: 113, y: 625 });
    page.drawText(serialequipo.toUpperCase(), { x: 341, y: 625 });
    page.drawText(marcaequipo, { x: 113, y: 614 });
    page.drawText(modeloequipo, { x: 341, y: 614 });
    page.drawText(sistemaoperativo, { x: 113, y: 575 });
    page.drawText(AntivirusActualizado, { x: 339, y: 600 });
    page.drawText(versionantivirus, { x: 490, y: 575 });
    //   page.drawText(diagnostico, { x: 149, y: 486 });
    //   page.drawText(solucion, { x: 117, y: 426 });
    //   page.drawText(observacioncliente, { x: 145, y: 354 });
    //   page.drawText(recomendacionesing, { x: 24, y: 282 });
    // page.drawText(solicitante, { x: 393, y: 272 });
    // page.drawText(ingenieroasignado, { x: 115, y: 272 });
    page.drawText(ccsolicitante, { x: 380, y: 160 });
    page.drawText(cedulaingenieroasignado, { x: 57, y: 160 });
    // page.drawText(infoCaso.hashArchivo_casosmds, { x: 50, y: 170 });

    if (requiereEquipo === "Si") {
      requiereEquipo = "X";
      page.drawText(calidisposicion1, { x: 477, y: 331 });
    } else if (calidisposicion === "No") {
      requiereEquipo = "------*";
      page.drawText(calidisposicion1, { x: 503, y: 331 });
    }

    // Calificacion
    calidisposicion1 = "X";

    if (calidisposicion === "1") {
      page.drawText(calidisposicion1, { x: 477, y: 331 });
    } else if (calidisposicion === "2") {
      page.drawText(calidisposicion1, { x: 503, y: 331 });
    } else if (calidisposicion === "3") {
      page.drawText(calidisposicion1, { x: 527, y: 331 });
    } else if (calidisposicion === "4") {
      page.drawText(calidisposicion1, { x: 552, y: 331 });
    } else if (calidisposicion === "5") {
      page.drawText(calidisposicion1, { x: 577, y: 331 });
    }
    // Conocimiento
    calconocimiento1 = "X";

    if (calconocimiento === "1") {
      page.drawText(calconocimiento1, { x: 477, y: 321 });
    } else if (calconocimiento === "2") {
      page.drawText(calconocimiento1, { x: 503, y: 321 });
    } else if (calconocimiento === "3") {
      page.drawText(calconocimiento1, { x: 527, y: 321 });
    } else if (calconocimiento === "4") {
      page.drawText(calconocimiento1, { x: 552, y: 321 });
    } else if (calconocimiento === "5") {
      page.drawText(calconocimiento1, { x: 577, y: 321 });
    }
    // Conocimiento
    caltiempo1 = "X";

    if (caltiempo === "1") {
      page.drawText(caltiempo1, { x: 477, y: 309 });
    } else if (caltiempo === "2") {
      page.drawText(caltiempo1, { x: 503, y: 309 });
    } else if (caltiempo === "3") {
      page.drawText(caltiempo1, { x: 527, y: 309 });
    } else if (caltiempo === "4") {
      page.drawText(caltiempo1, { x: 552, y: 309 });
    } else if (caltiempo === "5") {
      page.drawText(caltiempo1, { x: 577, y: 309 });
    }
    // Conocimiento
    calinformacion1 = "X";

    if (calinformacion === "1") {
      page.drawText(calinformacion1, { x: 477, y: 297 });
    } else if (calinformacion === "2") {
      page.drawText(calinformacion1, { x: 503, y: 297 });
    } else if (calinformacion === "3") {
      page.drawText(calinformacion1, { x: 527, y: 297 });
    } else if (calinformacion === "4") {
      page.drawText(calinformacion1, { x: 552, y: 297 });
    } else if (calinformacion === "5") {
      page.drawText(calinformacion1, { x: 577, y: 297 });
    }
    /*==========================================================================
                 FIN   IMPRIMIR VARIABLES AL PDF
      ==========================================================================*/

    console.log(requiereRepuesto);

    /*==========================================================================
                INICIO PARA FECH API G BD
      ==========================================================================*/

    const zonaHoraria = "America/Bogota"; // Cambia esto a la zona horaria que necesites
    let fecha_creacionFormat = formatearFechaparaMysql2(
      fecha_creacion,
      zonaHoraria
    );
    let fecha_AtencionFormat = formatearFechaparaMysql2(
      fechaatencion,
      zonaHoraria
    );

    //Pasar a mayusculas
    serialequipomayus = serialequipo.toUpperCase();

    infoCaso.ncaso = ncaso;
    infoCaso.fecha_creacion = fecha_creacionFormat;
    infoCaso.id_funcionario = id_funcionario;
    infoCaso.ccsolicitante = ccsolicitante;
    infoCaso.ciudad = ciudadKey1;
    infoCaso.falla = falla;
    infoCaso.ingenieroasignado = id_ing_asignado;
    //infoCaso.tiposervicio = tiposervicio;
    infoCaso.fechaatencion = fecha_AtencionFormat;

    // console.log(tabla.value);
    if (tabla.value === "computadores") {
      // console.log("es computador");
      infoCaso.idEquipos = {
        equipo: idEquipoAsigando,
        impresora: "",
        escaner: "",
      };
      infoCaso.idEquipos = JSON.stringify(infoCaso.idEquipos);
    }
    if (tabla.value === "impresoras") {
      // console.log("es impresoras");
      infoCaso.idEquipos = {
        equipo: "",
        impresora: idEquipoAsigando,
        escaner: "",
      };
      infoCaso.idEquipos = JSON.stringify(infoCaso.idEquipos);
    }
    if (tabla.value === "escaners") {
      // console.log("es escaners");
      infoCaso.idEquipos = {
        equipo: "",
        impresora: "",
        escaner: idEquipoAsigando,
      };
      infoCaso.idEquipos = JSON.stringify(infoCaso.idEquipos);
    }

    infoCaso.requiereRepuesto = requiereRepuesto;
    infoCaso.requiereEquipoSi = requiereEquipoSi;
    infoCaso.requiereEquipoNo = requiereEquipoNo;
    infoCaso.idEquipo = idEquipoAsigando;
    infoCaso.diagnostico = diagnostico;
    infoCaso.solucion = solucion;
    //infoCaso.observacioncliente = observacioncliente;
    infoCaso.recomendacionesing = "";
    infoCaso.solucion = solucion;
    infoCaso.FirmaIngeniero = FirmaIngeniero;
    infoCaso.firmaCliente = firmaCliente;
    infoCaso.serialequipomayus = serialequipomayus;
    infoCaso.calificacionSerivicio = {
      calidisposicion: calidisposicion,
      calconocimiento: calconocimiento,
      caltiempo: caltiempo,
      calinformacion: calinformacion,
    };
    calificacion_casosmds = JSON.stringify(infoCaso.calificacionSerivicio);

    if (infoCaso.id_funcionario && infoCaso.idEquipo) {
      async function agregarDatosBD(infoCaso) {
        const datos = new FormData();

        datos.append("number_casosmds", infoCaso.ncaso);
        datos.append("fecha_created_casosmds", infoCaso.fecha_creacion);
        datos.append("ccsolicitante_casosmds", infoCaso.ccsolicitante);
        if (infoCaso.id_funcionario === "") {
          datos.append("solicitante_casosmds", "");
        } else {
          datos.append("solicitante_casosmds", infoCaso.id_funcionario);
        }

        datos.append("falla_casosmds", infoCaso.falla);
        datos.append("ingeniero_casosmds", infoCaso.ingenieroasignado);
        datos.append("tipo_servicio_casosmds", infoCaso.ncaso);
        datos.append("fecha_atencion_casosmds", infoCaso.fechaatencion);
        datos.append("serialequipo_casosmds", infoCaso.serialequipomayus);
        datos.append("idequipo_casosmds", infoCaso.idEquipos);
        datos.append("requiereEquipoSi", infoCaso.requiereEquipoSi);
        datos.append("requiereEquipoNo", infoCaso.requiereEquipoNo);
        // if (infoCaso.idEquipo === "") {
        //   datos.append("idequipo_casosmds", "");
        // } else {
        //   datos.append("idequipo_casosmds", infoCaso.idEquipo);
        // }
        datos.append("diagnostico_casosmds", infoCaso.diagnostico);
        datos.append("solucion_casosmds", infoCaso.solucion);
        datos.append("observacion_cliente_casosmds", "Ninguna ");
        datos.append("recomendacion_ing_casosmds", infoCaso.recomendacionesing);
        datos.append("calificacion_casosmds", calificacion_casosmds);
        if (infoCaso.FirmaIngeniero == "") {
          datos.append("firma_ing_casosmds", "");
        } else {
          datos.append(
            "firma_ing_casosmds",
            infoCaso.imagen1,
            infoCaso.FirmaIngeniero
          );
        }

        if (infoCaso.firmaCliente == "") {
          datos.append("firma_cliente_casosmds", "");
        } else {
          datos.append(
            "firma_cliente_casosmds",
            infoCaso.imagen2,
            infoCaso.firmaCliente
          );
        }
        datos.append(
          "archivopdf_casosmds",
          infoCaso.archivopdf,
          infoCaso.nombrearc
        );
        datos.append("hashArchivo_casosmds", infoCaso.hashArchivo_casosmds);
        // datos.append("caso_usuario_updated", infoCaso.ingenieroasignado);
        datos.append("caso_ciudad", infoCaso.ciudad);

        // console.log([...datos]);

        try {
          //Para mirar que estoy enviando en el formData
          // console.log([...datos]);

          const url = "/MDA/admin/Api/generarOnsite";
          const respuesta = await fetch(url, {
            method: "POST",
            body: datos,
          });

          const resultado = await respuesta.json();
          // console.log('una',resultado);
          console.log("respuesta de javascript fetch", resultado.guardar);

          //Alerta
          if (resultado.guardar) {
            toastr("success", "Onsite generado.");
          }
          //Obtener el id de sujetos
          // idsujetos = resultado.id;
        } catch (error) {
          console.log(error);
        }
      }

      //Descargar pdf
      const modifiedPdfBytes = await pdfDoc.save();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(
        new Blob([modifiedPdfBytes], { type: "application/pdf" })
      );
      infoCaso.archivopdf = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });

      // async function generateSHA256(fileBytes) {
      //   const hashBuffer = await crypto.subtle.digest("SHA-256", fileBytes);
      //   const hashArray = Array.from(new Uint8Array(hashBuffer));
      //   return hashArray
      //     .map((byte) => byte.toString(16).padStart(2, "0"))
      //     .join("");
      // }
      // // 🔹 Generar el hash SHA-256 del PDF
      // const hash = await generateSHA256(modifiedPdfBytes);
      // console.log("Hash SHA-256 del PDF modificado:", hash);

      // infoCaso.hashArchivo_casosmds = hash;
      // pdfDoc.setSubject(`Hash SHA-256: ${hash}`);

      infoCaso.nombrearc = `ON-${ncaso}.pdf`;
      downloadLink.download = `ON-${ncaso}.pdf`;
      downloadLink.click();

      //------------------------------------

      // GENERAR HASH

      // saveAndDownloadPdf();

      //=+++++++++++++++++++++++++++++++++++++++++++++++++++++=

      // agregarDatosBD(infoCaso);
    } else {
      // console.log("usuario vacio");
      toastr("error", "Debes consultar un Funcionario y/o Equipo");
    }
  }

  function convertirHora12(hora24) {
    const [hora, minutos] = hora24.split(":");
    const ampm = hora < 12 ? "AM" : "PM";
    const hora12 = hora % 12 || 12;

    return `${hora12}:${minutos} ${ampm}`;
  }

  function formatearFechaparaMysql2(fecha, zonaHoraria) {
    // Crea un objeto Date con la fecha y hora seleccionadas
    const fechaObj = new Date(fecha);

    // Convertir la fecha a la zona horaria deseada
    const opciones = {
      timeZone: zonaHoraria,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato de 24 horas
    };

    const fechaLocal = fechaObj
      .toLocaleString("en-GB", opciones)
      .replace(",", "");

    // Extraer partes de la fecha formateada
    const [fechaPartes, horaPartes] = fechaLocal.split(" ");
    const [dia, mes, anio] = fechaPartes.split("/");
    const [horas, minutos, segundos] = horaPartes.split(":");

    // Formatear para MySQL
    const fechaFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

    return fechaFormateada;
  }

  function toastr(tipo, text) {
    var Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: tipo,
      title: text,
    });
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
    // console.log(`${dia}-${mes}-${año}`);
    // Devolver la fecha en el formato "DD-MM-YYYY"
    return `${dia}-${mes}-${año}`;
  }
})();
