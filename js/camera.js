const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvasElement');
const captureButton = document.getElementById('captureButton');

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing webcam:', error);
  });

captureButton.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const maxImageWidth = 600; // Maximum width for the compressed image
    const maxImageHeight = 600; // Maximum height for the compressed image
    
    // Create a new canvas element for the compressed image
    const compressedCanvas = document.createElement('canvas');
    const compressedContext = compressedCanvas.getContext('2d');
    
    // Calculate the dimensions for the compressed image while preserving aspect ratio
    let compressedWidth = canvas.width;
    let compressedHeight = canvas.height;
    if (compressedWidth > maxImageWidth) {
        compressedWidth = maxImageWidth;
        compressedHeight = (canvas.height / canvas.width) * compressedWidth;
    }
    if (compressedHeight > maxImageHeight) {
        compressedHeight = maxImageHeight;
        compressedWidth = (canvas.width / canvas.height) * compressedHeight;
    }
    
    // Set the dimensions of the compressed canvas
    compressedCanvas.width = compressedWidth;
    compressedCanvas.height = compressedHeight;
    
    // Draw the image onto the compressed canvas
    compressedContext.drawImage(video, 0, 0, compressedWidth, compressedHeight);
    
    // Get the compressed image data as a Blob object
    compressedCanvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
        // Get the compressed image data as base64 string
        const compressedPhotoData = reader.result;
    
        // Get other form data values
        const recipient = localStorage.getItem('email');
        const subject = 'ALERT!!!!';
        const message = 'YOUR BIKE IS BEING STOLEN!!!!!';
        const gps_lat = '123';
        const gps_long = '123';
    
        // Send the POST request to the AWS API
        try {
            fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
                message,
                recipient,
                gps_lat,
                gps_long,
                photoData: compressedPhotoData,
            }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response:', data);
                document.getElementById('sandbox').textContent = data;
            })
        } catch (e) {
            console.log('Exception:', e);
        }
        };
        reader.readAsDataURL(blob);
    }, 'image/jpeg', 0.7); // Specify the image format and compression quality (0.7 means 70% quality)
});
    

//     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

//     const maxImageWidth = 800; // Maximum width for the compressed image
//     const maxImageHeight = 600; // Maximum height for the compressed image

//     // Create a new canvas element for the compressed image
//     const compressedCanvas = document.createElement('canvas');
//     const compressedContext = compressedCanvas.getContext('2d');

//     // Calculate the dimensions for the compressed image while preserving aspect ratio
//     let compressedWidth = canvas.width;
//     let compressedHeight = canvas.height;
//     if (compressedWidth > maxImageWidth) {
//     compressedWidth = maxImageWidth;
//     compressedHeight = (canvas.height / canvas.width) * compressedWidth;
//     }
//     if (compressedHeight > maxImageHeight) {
//     compressedHeight = maxImageHeight;
//     compressedWidth = (canvas.width / canvas.height) * compressedHeight;
//     }

//     // Set the dimensions of the compressed canvas
//     compressedCanvas.width = compressedWidth;
//     compressedCanvas.height = compressedHeight;

//     // Draw the image onto the compressed canvas
//     compressedContext.drawImage(video, 0, 0, compressedWidth, compressedHeight);

//     // Get the compressed image data as a Blob object
//     compressedCanvas.toBlob((blob) => {
//     // Create a FormData object and append the compressed image
//     const formData = new FormData();
//     formData.append('image', blob, 'compressed.png');

//     // Get other form data values
//     const recipient = localStorage.getItem('email');
//     const subject = 'ALERT!!!!';
//     const message = 'YOUR BIKE IS BEING STOLEN!!!!!';
//     const gps_lat = '123';
//     const gps_long = '123';

//     // Append other form data to the FormData object
//     formData.append('subject', subject);
//     formData.append('message', message);
//     formData.append('recipient', recipient);
//     formData.append('gps_lat', "123");
//     formData.append('gps_long', "123");

//     // Send the FormData in the POST request to the AWS API
//     fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
//         mode: 'no-cors',
//         method: 'POST',
//         body: formData,
//     })
//         .then((response) => response.json())
//         .then((data) => {
//         console.log('Response:', data);
//         // Handle the response
//         })
//         .catch((error) => {
//         console.error('Error:', error);
//         // Handle the error
//         });
//     }, 'image/jpeg', 0.7); // Specify the image format and compression quality (0.7 means 70% quality)
// }
// );


///////////////////////////////////////////////////////////////////////////////
//ORIGINAL CODE
//   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//   const photoData = canvas.toDataURL('image/png');
//   console.log('Captured photo:', photoData);
//   console.log(typeof(photoData));
//   const recipient = localStorage.getItem('email');

//   const formData = new FormData();
//   formData.append('image', JSON.stringify(photoData));
  
//   formData.append('subject', 'ALERT!!!!'); // Add other text data to the FormData
//   formData.append('message', 'YOUR BIKE IS BEING STOLEN!!!!!');
//   formData.append('recipient', recipient);
//   formData.append('gps_lat', '123');
//   formData.append('gps_long', '123');

//   console.log(formData);
//   console.log(recipient);
// //   const photoElement = document.createElement('img');
// //   photoElement.src = photoData;
// //   document.body.appendChild(photoElement);
// try{
//   fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
//           method: 'POST',
//           mode: 'no-cors',
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//           body: JSON.stringify({
//             "subject": "ALERT!!!!",
//             "message": "YOUR BIKE IS BEING STOLEN!!!!!",
//             "recipient": recipient,
//             "gps_lat": 123,
//             "gps_long": 123,
//             "photoData": photoData
//           })
//         // body: formData
//         }) 
//         .then(response => response.json())
//         .then(data => function () {
//           console.log("dataa",data);
//           document.getElementById("sandbox").textContent = data;
//         })
//         .catch(error => function () {
//           console.error("errorr",error);
//           document.getElementById("sandbox").textContent = data;
//         });
//     }catch(e) {
//         console.log("exception is ",e);

//     }
//     });