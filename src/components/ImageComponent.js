import React from "react";
const ImageComponent = ({ base64Image }) => {
  // Decode the base64 image data
  const decodedImage = window.atob(base64Image);

  // Convert the decoded binary data to a Uint8Array
  const arrayBuffer = new Uint8Array(decodedImage.length);
  for (let i = 0; i < decodedImage.length; i++) {
    arrayBuffer[i] = decodedImage.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([arrayBuffer], { type: "image/png" });

  // Create a URL for the Blob
  const imageUrl = URL.createObjectURL(blob);

  return (
    <div>
      <img src={imageUrl} alt="Decoded" />
    </div>
  );
};

export default ImageComponent;
