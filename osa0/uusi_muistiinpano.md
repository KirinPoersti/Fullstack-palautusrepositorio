sequenceDiagram
    participant selain
    participant palvelin

    Note right of selain: Käyttäjä kirjoittaa uuden muistiinpanon tekstikenttään
    Note right of selain: Käyttäjä painaa Save-nappia

    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate palvelin

    Note right of palvelin: Palvelin vastaanottaa lomakkeen tiedot
    Note right of palvelin: Lähetetty data sisältää input-kentän name="note" tekstin
    Note right of palvelin: Palvelin luo uuden muistiinpanon, jossa on sisältö ja päivämäärä
    Note right of palvelin: Palvelin lisää uuden muistiinpanon tallennettujen muistiinpanojen listaan

    palvelin-->>selain: HTTP 302 uudelleenohjaus osoitteeseen /exampleapp/notes
    deactivate palvelin

    Note right of selain: Selain seuraa uudelleenohjausta ja lataa notes-sivun uudelleen

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate palvelin
    palvelin-->>selain: HTML-dokumentti
    deactivate palvelin

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate palvelin
    palvelin-->>selain: CSS-tiedosto
    deactivate palvelin

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate palvelin
    palvelin-->>selain: JavaScript-tiedosto
    deactivate palvelin

    Note right of selain: Selain alkaa suorittaa JavaScript-koodia

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate palvelin
    palvelin-->>selain: JSON-data, jossa on kaikki muistiinpanot, myös uusi muistiinpano
    deactivate palvelin

    Note right of selain: Selain renderöi muistiinpanot sivulle