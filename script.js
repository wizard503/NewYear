var gravedad = .5;
var numHijos = 35;

var numParticulas = 200;
var particulasCreadas = 0;

let dayBox = document.getElementById("day-box");
let hrBox = document.getElementById("hr-box");
let minBox = document.getElementById("min-box");
let secBox = document.getElementById("sec-box");
let endDate = new Date(2023, 0, 1, 00, 00);
let endTime = endDate.getTime();

function arbol() {
    for (var i = 20; i >= 0; i--) {
        document.write("<br/>");
        for (var j = 0; j <= 20; j++) {
            if (i >= j) { document.write("&nbsp"); }
            else { document.write("*"); }
        }
    }
    for (var i = 0; i <= 1; i++) {
        document.write("<br/>");
        for (var j = 0; j <= 40; j++) {
            if (j > 10 && j < 21) {
                document.write("*");
            } else {
                document.write("&nbsp");
            }
        }
    }
    return "&nbsp"
}
function countdown() {
    let todayDate = new Date();
    let todayTime = todayDate.getTime();
    let remainingTime = endTime - todayTime;
    let oneMin = 60 * 1000;
    let oneHr = 60 * oneMin;
    let oneDay = 24 * oneHr;

    let addZeroes = (num) => (num < 10 ? `0${num}` : num);

    if (endTime < todayTime) {
        clearInterval(i);
        document.querySelector(".heading").innerHTML = `<h1>Happy New Year!</h1>`;
        document.querySelector(".countdown").innerHTML=``;
        document.querySelector(".footer").innerHTML = `<h1>2023</h1>`;
        window.onload = function () {
            start();

            update();
        };

    } else {
        let daysLeft = Math.floor(remainingTime / oneDay);
        let hrsLeft = Math.floor((remainingTime % oneDay) / oneHr);
        let minsLeft = Math.floor((remainingTime % oneHr) / oneMin);
        let secsLeft = Math.floor((remainingTime % oneMin) / 1000);

        dayBox.textContent = addZeroes(daysLeft);
        hrBox.textContent = addZeroes(hrsLeft);
        minBox.textContent = addZeroes(minsLeft);
        secBox.textContent = addZeroes(secsLeft);
    }
}

function crearParticula() {
    var particula = document.createElement("div");
    particula.className = "particula";

    var y = window.innerHeight;
    var x = Math.random() * window.innerWidth;

    particula.style.top = y + "px";
    particula.style.left = x + "px";

    var velocidadY = -15 - (Math.random() * 15);

    particula.setAttribute("data-velocidad-y", velocidadY);
    particula.setAttribute("data-velocidad-x", "0");
    particula.setAttribute("data-padre", "true");

    particula.style.background = getRandomColor();

    document.getElementsByTagName("body")[0].append(particula);

    particulasCreadas++;

    if (particulasCreadas < numParticulas) {
        setTimeout(crearParticula, 50 + (Math.random() * 150));
    }
}

function start() {
    crearParticula();
}

function update() {
    var particulas = document.getElementsByClassName("particula");
    for (var p = 0; p < particulas.length; p++) {
        var particula = particulas[p];

        var velocidadY = parseFloat(particula.getAttribute("data-velocidad-y"));
        velocidadY += gravedad;

        particula.setAttribute("data-velocidad-y", velocidadY);

        var top = particula.style.top ? particula.style.top : "0"; //10px
        top = parseFloat(top.replace("px", ""));
        top += velocidadY;
        particula.style.top = top + "px";

        var velocidadX = parseFloat(particula.getAttribute("data-velocidad-x"));

        var left = particula.style.left ? particula.style.left : "0";
        left = parseFloat(left.replace("px", ""));
        left += velocidadX;
        particula.style.left = left + "px";

        var padre = particula.getAttribute("data-padre");

        if (velocidadY >= 0 && padre === "true") {
            explotar(particula);
        }

        if (top > window.innerHeight) {
            particula.remove();
        }
    }

    setTimeout(update, 20);
}

function explotar(particula) {

    for (var h = 0; h < numHijos; h++) {
        var hijo = document.createElement("div");
        hijo.className = "particula";

        hijo.style.top = particula.style.top;
        hijo.style.left = particula.style.left;
        hijo.style.background = particula.style.background;

        var velocidadY = (Math.random() * 20) - 18;
        hijo.setAttribute("data-velocidad-y", velocidadY);
        var velocidadX = (Math.random() * 16) - 8;
        hijo.setAttribute("data-velocidad-x", velocidadX);


        hijo.setAttribute("data-padre", false);

        document.getElementsByTagName("body")[0].append(hijo);
    }

    particula.remove();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let i = setInterval(countdown, 1000);
countdown();
