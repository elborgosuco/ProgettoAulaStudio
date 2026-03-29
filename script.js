const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7T4UBafcHnWBE1uLtOlJBO0XEIH8DOzCGUjqDSV82O1RxyEGHBIs8kOuaByuoTWJcMkeHwIFYWtTV/pub?gid=0&single=true&output=csv";

async function caricaOrari() {
    try {
        const response = await fetch(urlCSV);
        const data = await response.text();
        
        // Dividiamo il CSV in righe
        const righe = data.split("\n");
        const corpoTabella = document.getElementById("corpo-tabella");
        
        // Saltiamo la prima riga (intestazione del foglio) e cicliamo
        for (let i = 1; i < righe.length; i++) {
            if (righe[i].trim() === "") continue; // Salta righe vuote
            
            const colonne = righe[i].split(",");
            const tr = document.createElement("tr");
            
            tr.innerHTML = `
                <td>${colonne[0]}</td>
                <td>${colonne[1]}</td>
            `;
            corpoTabella.appendChild(tr);
        }

        // Nascondiamo il loading e mostriamo la tabella
        document.getElementById("loading").style.display = "none";
        document.getElementById("tabella-orari").style.display = "table";

    } catch (error) {
        console.error("Errore nel caricamento dati:", error);
        document.getElementById("loading").innerText = "Errore nel caricamento degli orari.";
    }
}

caricaOrari();