let targetCount = 0;
let gameDuration = 5;
let gameSummaryScreenDuration = 5;

/**
 * Remove all children for the given HTML element from the DOM.
 */
function clearChildren(element) {
    while (element.firstChild) {
        let c = element.lastChild;
        clearChildren(c)
        c.remove();
    }
}

function createDigitalSignagePage() {
    const root = window.document.getElementById("root");
    clearChildren(root);
    window.document.body.style.background = "white";
    const headerElement = document.createElement("div");
    const subheaderElement = document.createElement("div");
    const bodyElement = document.createElement("div");
    const imageElement = document.createElement("div");

    headerElement.className = "header";
    subheaderElement.className = "subheader";
    bodyElement.className = "body";
    imageElement.className = "main-image";
    root.appendChild(headerElement);
    root.appendChild(subheaderElement);
    root.appendChild(bodyElement);
    root.appendChild(imageElement);
}

function createGameMenu() {
    const root = window.document.getElementById("root");
    clearChildren(root);

    window.document.body.style.background = "black";
    const headerElement = document.createElement("div");
    headerElement.innerText = "Button Clicker";
    headerElement.className = "header";
    root.appendChild(headerElement);

    const bodyElement = document.createElement("div");
    bodyElement.className = "body";
    const bodyParagraph = document.createElement("p");
    bodyParagraph.innerText = `Click start to begin. You have ${gameDuration} seconds to click as many targets as you can!`
    bodyElement.appendChild(bodyParagraph);
    root.appendChild(bodyElement);

    const startButton = document.createElement("button");
    startButton.className = "glowing-btn";
    const glowingText = document.createElement("span");
    glowingText.className = "glowing-txt";
    const faultyLetter = document.createElement("span");
    faultyLetter.className = "faulty-letter";
    faultyLetter.innerText = "T";
    glowingText.append("S");
    glowingText.append(faultyLetter);
    glowingText.append("ART");
    startButton.onclick = () => {
        targetCount = 0;
        startGameTimer();
        createNewTarget();
    };
    startButton.appendChild(glowingText);
    root.appendChild(startButton);
}

function createEndGameScreen() {
    const root = window.document.getElementById("root");
    clearChildren(root);

    const headerElement = document.createElement("div");
    headerElement.innerText = targetCount < gameDuration ? "are you even trying?!" : "Congrats!";
    headerElement.className = "header";
    const subheaderElement = document.createElement("div");
    subheaderElement.className = "subheader";
    subheaderElement.innerText = `You got ${targetCount} target${targetCount === 1 ? '' : 's'}!`;

    root.appendChild(headerElement);
    root.appendChild(subheaderElement);

    window.gb.send("fromElectron", { type: 'game-completed', value: targetCount });

    setTimeout(() => {
        createGameMenu();
    }, gameSummaryScreenDuration*1000);
}

function startGameTimer() {
    setTimeout(() => {
        createEndGameScreen();
    }, gameDuration*1000);
}

/**
 * Creates a new target and renders it in a random location on the screen.
 */
function createNewTarget() {
    const root = window.document.getElementById("root");
    clearChildren(root);
    const target = document.createElement("button");
    target.className = "glowing-btn";
    target.onclick = () => {
        targetCount++;
        createNewTarget();
    };
    target.style.position = "absolute";
    target.style.top = `${Math.floor(Math.random()*90)}%`;
    target.style.left = `${Math.floor(Math.random()*90)}%`;

    root.appendChild(target);
}

/**
 * Subscribes to events from the GumbandWrapper class.
 */
window.gb.receive("fromGumband", (data) => {

});

function addStaticCopy() {
    createDigitalSignagePage();
    const header = document.getElementsByClassName('header')[0];
    const subheader = document.getElementsByClassName('subheader')[0];
    const body = document.getElementsByClassName('body')[0];
    const image = document.getElementsByClassName("main-image")[0];

    header.innerText = "Gumband SDK";
    subheader.innerText = "Tutorial";
    body.innerText = "In this tutorial, you'll learn how to integrate an existing project into Gumband with the Gumband SDK.";
    let imageContent = document.createElement('img');
    imageContent.src = `../seed-images/gumband-ecosystem.png`;
    image.appendChild(imageContent);
}

addStaticCopy();