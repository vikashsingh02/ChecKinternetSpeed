let message = document.getElementById("message");
let speedDisplay = document.getElementById("speed");

let messageOnline = () => {
  message.textContent = "Internet Connection Available";
  message.style.cssText = "background-color: #e7f6d5; color: #689f38";
  checkInternetSpeed();  // Check internet speed when online
};

let messageOffline = () => {
  message.textContent = "No Internet Connection";
  message.style.cssText = "background-color: #ffdde0; color: #d32f2f";
  speedDisplay.textContent = "";  // Clear speed when offline
};

// Function to check internet speed
let checkInternetSpeed = () => {
  let image = new Image();
  let startTime, endTime;
  let downloadSize = 500000; // Approx 500KB image size
  let imageUrl = "https://via.placeholder.com/500x500"; // Use any publicly available image URL

  image.onload = function () {
    endTime = new Date().getTime();
    let timeDuration = (endTime - startTime) / 1000; // Time in seconds
    let bitsLoaded = downloadSize * 8; // Convert bytes to bits
    let speedBps = (bitsLoaded / timeDuration).toFixed(2); // Bits per second
    let speedKbps = (speedBps / 1024).toFixed(2); // Kilobits per second
    let speedMbps = (speedKbps / 1024).toFixed(2); // Megabits per second

    speedDisplay.textContent = `Download Speed: ${speedMbps} Mbps`;
  };

  image.onerror = function () {
    speedDisplay.textContent = "Error measuring speed";
  };

  startTime = new Date().getTime();
  image.src = imageUrl + "?cache=" + Math.random(); // Randomize the URL to prevent caching
};

// Check connection status initially
if (window.navigator.onLine) {
  messageOnline();
} else {
  messageOffline();
}

// Listen for online and offline events
window.addEventListener("online", messageOnline);
window.addEventListener("offline", messageOffline);
