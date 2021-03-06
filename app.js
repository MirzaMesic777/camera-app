// Set constraints for the video stream
var constraints = { 
    video: { 
        facingMode: "user" 
    }, 
    audio: false 
};

// Define constants
const cameraView = document.querySelector( "#camera--view" );
const cameraOutput = document.querySelector( "#camera--output" );
const cameraSensor = document.querySelector( "#camera--sensor" );
const cameraTrigger = document.querySelector( "#camera--trigger" );
const promptTrigger = document.querySelector( "#camera--enable" );

// Access the device camera and stream to cameraView
const cameraStart = () => {

    navigator.mediaDevices.getUserMedia( constraints )
    .then( (stream) => {
        track = stream.getTracks()[ 0 ];
        cameraView.srcObject = stream;
        console.log( "Stream successful -> ", stream );
    })
    .catch( (error) => {
        console.error( "Something went wrong. ", error );
        console.log( "Error details message: ", error );
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = () => {

    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;

    cameraSensor.getContext( "2d" ).drawImage( cameraView, 0, 0 );
    cameraOutput.src = cameraSensor.toDataURL( "image/webp" );
    cameraOutput.classList.add( "taken" );
};

promptTrigger.onclick = () => {
    console.log( " invoke prompt AGORA " );
    cameraStart();
}

// Start the video stream when the window loads
window.addEventListener( "load", cameraStart, false );