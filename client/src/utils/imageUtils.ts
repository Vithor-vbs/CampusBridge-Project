// Image compression utility
export const compressImage = (
  file: File,
  maxWidth: number = 800,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      const aspectRatio = img.width / img.height;
      let newWidth = img.width;
      let newHeight = img.height;

      if (img.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = maxWidth / aspectRatio;
      }

      // Set canvas size
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert to base64 with compression
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    // Read the file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    console.error("Tipo de arquivo inválido:", file.type);
    return false;
  }

  if (file.size > maxSize) {
    console.error("Arquivo muito grande:", file.size);
    return false;
  }

  return true;
};
