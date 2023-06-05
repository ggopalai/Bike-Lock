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


// captureButton.addEventListener('click', () => {
//     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
//     const maxImageWidth = 600; // Maximum width for the compressed image
//     const maxImageHeight = 600; // Maximum height for the compressed image
    
//     // Create a new canvas element for the compressed image
//     const compressedCanvas = document.createElement('canvas');
//     const compressedContext = compressedCanvas.getContext('2d');
    
//     // Calculate the dimensions for the compressed image while preserving aspect ratio
//     let compressedWidth = canvas.width;
//     let compressedHeight = canvas.height;
//     if (compressedWidth > maxImageWidth) {
//         compressedWidth = maxImageWidth;
//         compressedHeight = (canvas.height / canvas.width) * compressedWidth;
//     }
//     if (compressedHeight > maxImageHeight) {
//         compressedHeight = maxImageHeight;
//         compressedWidth = (canvas.width / canvas.height) * compressedHeight;
//     }
    
//     // Set the dimensions of the compressed canvas
//     compressedCanvas.width = compressedWidth;
//     compressedCanvas.height = compressedHeight;
    
//     // Draw the image onto the compressed canvas
//     compressedContext.drawImage(video, 0, 0, compressedWidth, compressedHeight);
    
//     // Get the compressed image data as a Blob object
//     compressedCanvas.toBlob((blob) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//         // Get the compressed image data as base64 string
//         const compressedPhotoData = reader.result;
    
//         // Get other form data values
//         const recipient = localStorage.getItem('email');
//         const subject = 'ALERT!!!!';
//         const message = 'YOUR BIKE IS BEING STOLEN!!!!!';
//         const gps_lat = '123';
//         const gps_long = '123';
    
//         // Send the POST request to the AWS API
//         try {
//             fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
//             method: 'POST',
//             mode: 'no-cors',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 subject,
//                 message,
//                 recipient,
//                 gps_lat,
//                 gps_long,
//                 photoData: compressedPhotoData,
//             }),
//             })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log('Response:', data);
//                 document.getElementById('sandbox').textContent = data;
//             })
//         } catch (e) {
//             console.log('Exception:', e);
//         }
//         };
//         reader.readAsDataURL(blob);
//     }, 'image/jpeg', 0.7); // Specify the image format and compression quality (0.7 means 70% quality)
// });

export default function sendMail (gps_lat, gps_long) {

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
    
        // Send the POST request to the AWS API
        try {
            fetch('https://y0d50hlxmi.execute-api.us-west-1.amazonaws.com/beta/email', {
            method: 'POST',
            // mode: 'no-cors',
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
};
