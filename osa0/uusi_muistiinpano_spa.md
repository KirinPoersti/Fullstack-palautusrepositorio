sequenceDiagram
    participant selain
    participant palvelin

    Note right of selain: Käyttäjä kirjoittaa uuden muistiinpanon tekstikenttään
    Note right of selain: Käyttäjä painaa Save-nappia

    Note right of selain: JavaScriptin tapahtumankäsittelijä estää lomakkeen normaalin lähetyksen
    Note right of selain: Selain luo uuden muistiinpano-olion, jossa on sisältö ja päivämäärä
    Note right of selain: Selain lisää uuden muistiinpanon paikalliseen muistiinpanolistaan
    Note right of selain: Selain renderöi muistiinpanot uudelleen ilman sivun uudelleenlatausta

    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate palvelin

    Note right of palvelin: Palvelin vastaanottaa uuden muistiinpanon JSON-muodossa
    Note right of palvelin: Palvelin tallentaa uuden muistiinpanon

    palvelin-->>selain: Vastaus onnistuneesta tallennuksesta
    deactivate palvelin

    Note right of selain: Sivu ei lataudu uudelleen