setInterval(() => {
    const apiUrl = "https://ckan2.multimediagdansk.pl/gpsPositions?v=2";
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            postMessage(data)
            console.log(data)
        });


}, 5000);
