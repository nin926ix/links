const config = {
    text: "MARKO KONTAKT ⬇️",
    widthToSpikeLengthRatio: 0.025
};

const colorConfig = {
    particleOpacity: 0.2,
    baseHue: 300,
    hueRange: 9,
    hueSpeed: 0.04,
    colorSaturation: 100,
    lightness: 20
};

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    addTo(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    setLength(length) {
        const angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    setAngle(angle) {
        const length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
}

class Planet {
    constructor(x, y, g) {
        this.pos = new Vector(x, y);
        this.g = g;
    }

    draw(ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, spikeLength);
    }

    move(force) {
        if (force) {
            this.vel.addTo(force);
        }
        if (this.vel.getLength() > spikeLength) {
            this.vel.setLength(spikeLength);
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        let p2 = this.pos.add(this.vel);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}

let canvas, ctx, w, h, hue, particles, spikeLength, planets, A, B, a, b, tick;

function setup() {
    tick = 0;
    planets = [];
    let len = Math.round(Math.random() * 3 + 3);
    for (let i = 0; i < len; i++) {
        let p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
        planets.push(p);
    }
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("resize", reset);
    reset();
}

function reset() {
    hue = colorConfig.baseHue;
    w = canvas.width = window.innerWidth;
    h = window.innerWidth >= 768 ? window.innerHeight  : window.innerHeight * 0.3;
    canvas.height = h;
    spikeLength = w * config.widthToSpikeLengthRatio;
    A = w / 2.2;
    B = h / 2.2;
    a = Math.round(Math.random() + 2);
    b = Math.round(Math.random() + 2);

    const arrow = document.getElementById('arrow');
    if (window.innerWidth < 768) {
        arrow.style.visibility = "hidden";
    }
    else {
        arrow.style.top = `${h * 0.85}px`;
    }



    drawText();
}

function draw(now) {
    clear();
    requestAnimationFrame(draw);
    updateParticles();
    updatePlanets();
    tick = now / 50;
}

function clear() {
    ctx.clearRect(0, 0, w, h);
}

function drawText() {
    ctx.save();
    let fontSize = w * 0.1;
    ctx.font = "bold " + fontSize + "px Arial, Helvetica, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.strokeText(config.text.split(' ')[0], w / 2, h / 2.2);
    ctx.strokeText(config.text.split(' ')[1], w / 2, h / 1.8);
    ctx.restore();
    let imageData = ctx.getImageData(0, 0, w, h);

    particles = [];

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            let i = (x + w * y) * 4;
            let average = (imageData.data[i] +
                imageData.data[i + 1] +
                imageData.data[i + 2] +
                imageData.data[i + 3]) / 4;
            if (average > 200) {
                let particle = new Particle(x, y);
                particles.push(particle);
            }
        }
    }
    clear();
}

function updatePlanets() {
    let len = planets.length;
    for (let i = 1; i < len; i++) {
        let angle = Math.PI * 2 / (len - 1) * i;
        let x = A * Math.sin(a * tick / 100 + angle) + w / 2;
        let y = B * Math.sin(b * tick / 100 + angle) + h / 2;
        let p = planets[i];
        p.pos.x = x;
        p.pos.y = y;
        p.draw(ctx);
    }
}

function updateParticles() {
    hue += colorConfig.hueSpeed;
    let h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;

    ctx.strokeStyle = `hsla(${h}, ${colorConfig.colorSaturation}%, ${colorConfig.lightness}%, ${colorConfig.particleOpacity})`;
    particles.forEach(p => {
        planets.forEach(planet => {
            let d = p.pos.sub(planet.pos);
            let length = d.getLength();
            let g = planet.g / length;
            if (g > 40) {
                g = 40;
            }
            d.setLength(g);
            p.move(d);
        });
        p.draw(ctx);
    });
}

function scrollDown() {
    document.querySelector('.content').scrollBy({
        top: canvas.height * 0.70,
        behavior: 'smooth'
    });
}

setup();
draw(1);

document.getElementById('arrow').addEventListener('click', scrollDown);


document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('backgroundVideo');
    var fallbackImage = document.getElementById('backgroundImage');

    // Attempt to play the video
    var playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Video is playing, do nothing
        }).catch(error => {
            // Video failed to play, show fallback image
            video.style.display = 'none'; // Hide the video
            fallbackImage.style.display = 'block'; // Show the fallback image
        });
    }
});