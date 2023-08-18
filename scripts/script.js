let ucenici = [
    { id: "1.", ime: "Predrag", prezime: "Babić", skola: "OŠ \"Bane Milenković\"", poeni: 78 },
    { id: "2.", ime: "Andrija", prezime: "Baščarević", skola: "OŠ \"4. Kraljevački bataljon\"", poeni: 32 },
    { id: "3.", ime: "Sara", prezime: "Vesković", skola: "OŠ \"Dimitrije Tucović\"", poeni: 54 },
    { id: "4.", ime: "Nikola", prezime: "Vujović", skola: "OŠ \"Živan Maričić\"", poeni: 66 },
    { id: "5.", ime: "Lazar", prezime: "Vukadinović", skola: "OŠ \"Stana Bačanin\"", poeni: 70 },
    { id: "6.", ime: "Luka", prezime: "Vučićević", skola: "OŠ \"Đura Jakšić\"", poeni: 49 },
    { id: "7.", ime: "Luka", prezime: "Vučković", skola: "OŠ \"Svetozar Marković\"", poeni: 13 },
    { id: "8.", ime: "Andjela", prezime: "Davidović", skola: "OŠ \"Vuk Karadžić\"", poeni: 34 },
    { id: "9.", ime: "Uroš", prezime: "Drndarević", skola: "OŠ \"4. Kraljevački bataljon\"", poeni: 40 },
    { id: "10.", ime: "Anja", prezime: "Đukić", skola: "OŠ \"Svetozar Marković\"", poeni: 90 }
];

const table = document.getElementById("table");
const redovi = table.getElementsByTagName("tr");
const buttonSort = document.getElementsByClassName("sort")[0];
const buttonResult = document.getElementsByClassName("rezultati")[0];
const buttonPaint = document.getElementsByClassName("oboji")[0];
const buttonHighlight = document.getElementsByClassName("izdvoj")[0];

ispis(); // Ispisuju se vrednosti na pocetku zato sto je HTML prazan

function ispis() { // Ispisivanje
    for (var i = 0; i < 10; i++) {
        redovi[i + 1].getElementsByTagName("td")[0].innerHTML = ucenici[i].id;
        redovi[i + 1].getElementsByTagName("td")[1].innerHTML = ucenici[i].ime;
        redovi[i + 1].getElementsByTagName("td")[2].innerHTML = ucenici[i].prezime;
        redovi[i + 1].getElementsByTagName("td")[3].innerHTML = ucenici[i].skola;
        redovi[i + 1].getElementsByTagName("td")[4].innerHTML = ucenici[i].poeni;
    }
}

var c = 0, k = 0, h = 0, s = 0; // Promenjive koje broje klikove na dugmad

function sort() { // Klasicno sortiranje
    var y, id, id1;
    if (s % 2 == 0) { // Na svaki paran klik se sortira po poenima
        for (var i = 0; i < 10; i++) {
            for (var j = i + 1; j < 10; j++) { // Klasika sortiranje
                if (ucenici[i].poeni < ucenici[j].poeni) {
                    y = ucenici[i];
                    ucenici[i] = ucenici[j];
                    ucenici[j] = y;
                }
            }
        }
        buttonSort.innerHTML = "Sortiraj - Rbr";
    }
    else if (s % 2 == 1) { // Na svaki neparan klik se sortira po Rbr
        for (var i = 0; i < 10; i++) {
            for (var j = i + 1; j < 10; j++) {
                id = ucenici[i].id.split(".").join("");
                id1 = ucenici[j].id.split(".").join("");
                if (Number(id1) < Number(id)) {
                    y = ucenici[i];
                    ucenici[i] = ucenici[j];
                    ucenici[j] = y;
                }
            }
        }
        buttonSort.innerHTML = "Sortiraj - Poeni";
    }
    ispis(); // Ispis opet da bismo promenili HTML sa sortiranim vrednostima
    if (k % 2 == 1) { // Ako je pre sorta bilo upaljeno dugme rezultati, promesace se boje, ponavljamo funkciju
        k = 0;
        rezultati();
    }
    s++;
}

function oboji() { // Farbamo svaki drugi red u razlicitu boju
    k = 1;
    rezultati(); // Pozivamo funkciju i k=1 da bi se redovi vratili u belo pre farbanja
    if (h % 2 == 0) {
        for (var i = 1; i < redovi.length; i++) {
            if (i % 2 == 0) {
                redovi[i].style.backgroundColor = "#8e99f3";
            }
            else redovi[i].style.backgroundColor = "white";
        }
    }
    else if (h % 2 == 1) {
        for (var i = 1; i < redovi.length; i++) {
            redovi[i].style.backgroundColor = "white";
        }
    }
    h++;
}

function izdvoj() { // Izdvajamo osobe koje imaju vise od 50 poena
    k = 1;
    rezultati(); // Pozivamo funkciju i k=1 da bi se redovi vratili u belo pre farbanja  
    if (c % 2 == 0) {
        s = 0;
        sort();
        buttonSort.disabled = true; // Disable dugme Sort i Paint jer nemaju svrhu ovde
        buttonPaint.disabled = true;
        buttonSort.style.backgroundColor = "#bbbdce";
        buttonPaint.style.backgroundColor = "#bbbdce";
        for (var i = 0; i < ucenici.length; i++) {
            if (ucenici[i].poeni < 50) {  
                redovi[i + 1].style.opacity = "0.4";
                // redovi[i + 1].style.display = "none";
            }
            else redovi[i + 1].style.opacity = "1";
        }
        buttonHighlight.innerHTML = "Lista učenika";
    }
    else if (c % 2 == 1) {
        s = 1;
        sort();
        buttonSort.disabled = false; // Enable dugme Sort i Paint
        buttonPaint.disabled = false;
        buttonSort.style.backgroundColor = "white";
        buttonPaint.style.backgroundColor = "white";
        for (var i = 0; i < ucenici.length; i++) {
            redovi[i + 1].style.opacity = "1";
            redovi[i + 1].style.backgroundColor = "white";
            // redovi[i + 1].style.display = "";
        }
        buttonHighlight.innerHTML = "Položili";
    }
    c++;
} // Komentari u funkciji iznad su prvi nacin gde nestaju oni koji nisu polozili, ali utvrdili smo da je lepse sa opacity

function rezultati() { // Ko ima vise od 50 poena zelen i suprotno
    if (k % 2 == 0) {
        for (var i = 0; i < ucenici.length; i++) {
            if (ucenici[i].poeni < 50) {
                redovi[i + 1].style.backgroundColor = "#ee9393";
            }
            else redovi[i + 1].style.backgroundColor = "#65df98";
        }
        buttonResult.innerHTML = "Vrati";
    }
    else if (k % 2 == 1) {
        for (var i = 1; i < redovi.length; i++) {
            redovi[i].style.backgroundColor = "white";
        }
        buttonResult.innerHTML = "Rezultati";
    }
    k++;
}