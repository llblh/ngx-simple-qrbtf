const fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
]

export function isPicture(file: File) {
  return fileTypes.includes(file.type);
}

export function toBase64(file: File, aspectRatio: number): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let img = document.createElement('img');
  img.setAttribute('src', URL.createObjectURL(file));

  return new Promise(resolve => {
    img.onload = () => {
      let width: number, height: number;
      if (img.width < img.height) {
        width = img.width;
        height = width / aspectRatio;
      }
      else {
        height = img.height;
        width = height * aspectRatio;
      }
      canvas.setAttribute('width', `${width}`);
      canvas.setAttribute('height', `${height}`);

      ctx!.fillStyle = 'white';
      ctx!.fillRect(0, 0, width, height);
      ctx!.drawImage(img, (img.width - width) / 2, (img.height - height) / 2, width, height, 0, 0, width, height);

      const base64: string = canvas.toDataURL(file.type, 0.8);

      resolve(base64);
    };
  })
}

export function gamma(r: number, g: number, b: number) {
  return Math.pow((Math.pow(r, 2.2) + Math.pow(1.5 * g, 2.2) + Math.pow(0.6 * b, 2.2)) / (1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2)), 1 / 2.2)
}