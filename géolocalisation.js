if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
    }, (error) => {
        console.error("Erreur de géolocalisation :", error);
    });
} else {
    console.error("Géolocalisation non supportée par ce navigateur.");
}
