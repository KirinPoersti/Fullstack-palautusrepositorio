sequenceDiagram
    participant selain
    participant palvelin

    Note right of selain: Käyttäjä menee selaimella osoitteeseen https://studies.cs.helsinki.fi/exampleapp/spa

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate palvelin
    palvelin-->>selain: HTML-dokumentti
    deactivate palvelin

    Note right of selain: Selain lukee HTML-dokumentin ja huomaa CSS- ja JavaScript-tiedostot

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate palvelin
    palvelin-->>selain: CSS-tiedosto
    deactivate palvelin

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate palvelin
    palvelin-->>selain: JavaScript-tiedosto
    deactivate palvelin

    Note right of selain: Selain alkaa suorittaa spa.js-tiedoston JavaScript-koodia

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate palvelin
    palvelin-->>selain: JSON-data, jossa on muistiinpanot
    deactivate palvelin

    Note right of selain: Selain renderöi muistiinpanot sivulle JavaScriptin avulla