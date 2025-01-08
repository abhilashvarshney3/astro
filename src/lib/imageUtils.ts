export const processImage = async (file: File): Promise<string> => {
  // Create a new image element
  const img = document.createElement('img');
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      img.src = reader.result as string;

      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set the desired width and height for the responsive image
        const maxWidth = 800; // Example max width
        const maxHeight = 600; // Example max height
        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // Resize the image
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert the canvas to a data URL
        const resizedImageUrl = canvas.toDataURL('image/jpeg', 0.8); // Adjust quality as needed
        resolve(resizedImageUrl);
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.readAsDataURL(file);
  });
};
