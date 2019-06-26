function main() {
    //check if table has any entries
    const rows = document.getElementsByTagName("tr");
    const table = document.querySelector("table");
    console.log(rows.length);
    if (rows.length === 1) {
       const mes = document.createElement("tr");
       for (let i = 0; i < 4; i++) {
            const text = document.createElement("td");
            text.innerText = "--";
            mes.appendChild(text);
       }
       mes.id = "mes";
       table.appendChild(mes);
    } else if (document.getElementById("mes")) {
        table.removeChild(document.getElementById("mes"));
    }

    //check how many calories and dollars have been spent
    const cg = document.querySelector("#cg");
    const cc = document.querySelector("#cc");
    const mg = document.querySelector("#mg");
    const cm = document.querySelector("#cm");
    if (cg.innerText - cc.innerText <= 0) {
        cc.style.color = "red";
    } else if (cg.innerText - cc.innerText <= cg.innerText / 2) {
        cc.style.color = "gold";
    } else {
        cc.style.color = "#5CDB95";
    }
    if (mg.innerText.substring(1) - cm.innerText.substring(1) <= 0) {
        cm.style.color = "red";
    } else if (mg.innerText.substring(1) - cm.innerText.substring(1) <= mg.innerText.substring(1) / 2) {
        cm.style.color = "gold";
    }
    else {
        cm.style.color = "#5CDB95";
    }
}
document.addEventListener('DOMContentLoaded', main);