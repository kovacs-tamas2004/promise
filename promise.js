function loadImage() {
    const imageContainer = document.getElementById('imageContainer');
    const loadingText = document.getElementById('loadingText');
    const loadedImage = document.getElementById('loadedImage');
  
    // Megjelenítjük a "Loading..." szöveget
    loadingText.style.display = 'block';
  
    // Elrejtjük a korábban betöltött képet
    loadedImage.src = '';
    loadedImage.style.display = 'none';
  
    // A kép URL lekéréséhez küldött HTTP kérés
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json()) // Válasz objektum JSON-ra konvertálása
        .then(data => {
            // A kép URL-jének megszerzése a válaszobjektumból
            const imageUrl = data[0].url;
            console.log('A kép URL-je:', imageUrl);

            // Létrehozunk egy Promise-t a kép betöltésére
            const imagePromise = new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = function() {
                    // Sikeres betöltés esetén
                    resolve(imageUrl);
                };
                image.onerror = function() {
                    // Hiba esetén
                    reject('Hiba a kép betöltése során.');
                };
                image.src = imageUrl;
            });

            // Promise kezelése
            imagePromise
                .then((url) => {
                    // Sikeres betöltés esetén
                    loadedImage.src = url;
                    loadedImage.style.display = 'block';
                    loadingText.style.display = 'none';
                })
                .catch((error) => {
                    // Hiba esetén
                    console.error(error);
                    loadingText.innerHTML = 'Hiba történt a kép betöltése során.';
                });
        })
        .catch(error => console.error('Hiba történt:', error));
}
