# Fliplife Enhanced

*FLEH* ist eine Erweiterung für den Browser Chrome, die Euch bei dem Online-Spiel [Fliplife](http://fliplife.com) unter die Arme greift. Fliplife ist in mehrerlei Hinsicht bemerkenswert:

- Es ist kurzweilig und unterhaltsam. Und immer wenn man denkt, es wird langweilig, gibt es ein Update mit interessanten Erweiterungen.
- Es zeigt sehr gut, was man mit PHP, Javascript & HTML5 alles anstellen kann. Wer sich dem gewachsen fühlt, in Köln wohnt und vielleicht schonmal Agavi gesehen oder gar benutzt hat, sollte sich dringend an <dennis.wilson@united-prototype.com> wenden.  
- Es hält viele Menschen von der Arbeit ab. Ich persönlich vermute hier den eigentlichen Beweggrund der Firma, ein solches Spiel zu entwickeln. 
  

## Features

### Übersicht über die Jobs

- Angaben für Cash und XP werden umgerechnet auf relative Angaben (pro Stunde) und angezeigt.
- "Cash pro Stunde" wird außerdem für den Erfolgsfall angezeigt
- die lukrativsten Jobs werden extra gekennzeichnet

### Autopilot

- Jobs werden ganz von alleine zu Ende gebracht.
- Er werden sogar neue Jobs angenommen.
- Die Auswahl der Jobs läßt sich beeinflussen. Dafür stehen mehrere "Strategien" zur Auswahl. Momentan werden keine Jobs angenommen, die mehr als 4 Teilnehmer haben oder länger als 80 Zeiteinheiten dauern.
 - *Keine*: Es werden keine neuen Jobs begonnen. Es werden lediglich schon begonnene Jobs beendet.
 - *Shorties*: Es werden nur Jobs begonnen, die eine Zeiteinheit dauern. Solche gibt es unter Umständen nicht.
 - *Erster*: Es wird der erste passende Job aus der Liste angenommen. Dadurch werden umfangreiche Jobs bevorzugt.
 - *Letzter*: Es wird der letzte passende Job angenommen. Dadurch werden kleine Jobs bevorzugt.  

## Download

- Quelltext: <https://github.com/r3wald/fleh/>
- Chrome Extension: <https://chrome.google.com/webstore/detail/koiigoemgogchccncmfpghkpncmffmhn/>

## Bugs

Momentan keine :-) Neue bitte hier eintragen: <https://github.com/r3wald/fleh/issues> .

## Changelog

### v0.13.2

- Overlays für abgeschlossene Jobs werden automatisch geschlossen.

### v0.13.1

- an aktuelle Fliplife-Version angepaßt
- keine Partyreserve mehr
- Dokumentation

### v0.11 und älter

- Es gibt die Möglichkeit ausschließlich einstündige Jobs anzunehmen.
- Es wird immer ein Punkt Energiereserve aufgehoben (Parties!).
- Es gibt eine Beschreibung der aktuellen Job-Auswahl-Strategie.
- Die Position der Konsole wird gespeichert. Titelzeile hinzugefügt.
- Strategie auswählbar und speicherbar.
- Erste Strategien für die Auswahl neuer Jobs implementiert.
- Cookies umgestellt auf "local storage".
- Der Inhalt der Konsole wird gespeichert. 
- Die Konsole ist verschiebbar.
- Overlay für den Autopiloten und Statusmeldungen hinzugefügt.
- Struktur komplett geändert.
- jQuery zugunsten von Mootools entfernt.
- Fehler in der Berechnung der Gesamtzeit beseitigt.
- Aufgehübscht.


Mit Dank an Christoph und Sven.

Viel Spaß,
Robert