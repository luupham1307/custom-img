export const fileToDataUri = (file) => new Promise((resolve, reject) => {
    try {

        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    } catch (err) {
        reject(err);
    }
})

export const isImageFile = (url) => RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(url);