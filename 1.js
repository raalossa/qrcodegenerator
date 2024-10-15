    // Función para generar el código QR
    function generateQRCode() {
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        //const idType = document.getElementById('idType').value;
        const idNumber = document.getElementById('idNumber').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
  

        const dataPeople = [];

        // Objeto con los datos del formulario
        const formData = {
          na: name,
          lna: lastname,
          //idt: idType,
          id: idNumber,
          ad: address,
          ci: city,
          ph: phone,
          em: email
        };

        dataPeople.push(formData);
        console.log(dataPeople);

  
        // Convertir el objeto a JSON
        const jsonData = JSON.stringify(formData);
  
        // Generar el código QR con los datos
        document.getElementById('qrcode').innerHTML = ""; // Limpiar el QR anterior
        new QRCode(document.getElementById("qrcode"), jsonData);
      }
  
      // Función para escanear el código QR
      function startScan() {
        const video = document.getElementById('video');
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
          video.srcObject = stream;
          video.play();
  
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
  
          setInterval(() => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);
            
            if (code) {
              console.log('Código QR Decodificado:', code.data);
              const qrData = JSON.parse(code.data);
              console.log('Datos en formato JSON:', qrData);
            }
          }, 1000);
        });
      }