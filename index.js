"use strict";

//General count of all elements and point counter variable;
let elementsAmount = 49;
let points = 0;

// points counter
function pointsCounter () {
    document.getElementById("h2").classList.add("h2-open");
    document.getElementById("h2").textContent = `Drifting Gems x ${points}`;
    if (points > 100) {
        document.getElementById("h2").textContent = `How about that, Elon? x ${points}`;
    }
}

//Buttons basic hard code for 1-st mode activation;
let firstButtonActive = true;
let secondButtonActive = false;

// random number function.
// In accordance with a random number I add a css-class with a certain diamond.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// At each iteration I add a random number, then assign a class to this numbers(
// the range is equal to the general number of diamonds).

function diamondsAssignment (element) {
    switch (document.getElementById(element).textContent) {
        case "1" :
            document.getElementById(element).classList.add("m-t__diamond1");
            break;
        case "2" :
            document.getElementById(element).classList.add("m-t__diamond2");
            break;
        case "3" :
            document.getElementById(element).classList.add("m-t__diamond3");
    }
}

for (let i = 1; i < elementsAmount + 1; i++) {
    document.getElementById(i).textContent = (randomNumber(1, 3));
    diamondsAssignment(i);
}

//Function declaration to determine the class of the pressed item and the associated chain.
let actualClass;
function classDetection (actualElement) {
    if (actualElement.classList.contains("m-t__diamond1")) {
        actualClass = "m-t__diamond1";
    } else if (actualElement.classList.contains("m-t__diamond2")) {
        actualClass = "m-t__diamond2";
    } else {
        actualClass = "m-t__diamond3";
    }
    return actualClass;
}

//container for items that are in the "chain" after clicking.
let changeElements = [];

//container for continued "chain" search elements.
let newHorizontal = [];
let newVertical = [];

//SEARCHING ELEMENTS
//classes are searched for from the pressed element.
// The found elements we need become those on the line of which, potentially (on the opposite axis),
// other potential elements can be located. etc., until all the elements are found.
// Css classes with animations are added after searching,
//one-time vertical elements search function.
function verticalCheck (actualElementId) {
    let verticalCount = 0;
    let upCheckStop = false;
    let downCheckStop = false;

    for (let f = 0; f < 5; f++) {
        verticalCount += 7;
        let potentialTop = actualElementId - verticalCount;
        let potentialBottom = parseInt(actualElementId) + verticalCount;

        if (actualElementId - verticalCount > 0 && upCheckStop === false) {
            if (document.getElementById(actualElementId - verticalCount).classList.contains(actualClass) &&
                document.getElementById(actualElementId - verticalCount).classList.contains("m-t__fade-out") === false &&
                document.getElementById(actualElementId - verticalCount).classList.contains("m-t__stars") === false) {
                document.getElementById(actualElementId - verticalCount).classList.add("m-t__stars");
                document.getElementById(actualElementId - verticalCount).classList.add("m-t__fade-out");
                changeElements.push(actualElementId - verticalCount);
                newHorizontal.push(potentialTop);
            }
            if (document.getElementById(actualElementId - verticalCount).classList.contains(actualClass) === false) {
                upCheckStop = true;
            }
        }

        if (parseInt(actualElementId) + verticalCount < 50 && downCheckStop === false) {
            if (document.getElementById(parseInt(actualElementId) + verticalCount).classList.contains(actualClass) &&
                document.getElementById(parseInt(actualElementId) + verticalCount).classList.contains("m-t__fade-out") === false &&
                document.getElementById(parseInt(actualElementId) + verticalCount).classList.contains("m-t__stars") === false) {
                document.getElementById(parseInt(actualElementId) + verticalCount).classList.add("m-t__stars");
                document.getElementById(parseInt(actualElementId) + verticalCount).classList.add("m-t__fade-out");
                changeElements.push(parseInt(actualElementId) + verticalCount);
                newHorizontal.push(potentialBottom);
            }
            if (document.getElementById(parseInt(actualElementId) + verticalCount).classList.contains(actualClass) === false) {
                downCheckStop = true;
            }
        }
    }
    return  newHorizontal;
}

//one-time horizontal elements search function declaration. % for prevent horizontal line breaks.
function horizontalCheck(actualElementId) {
    let horizontalCount = 0;
    let leftCheckStop = false;
    let rightCheckStop = false;

    for (let f = 0; f < 5; f++) {
        horizontalCount += 1;
        let potentialLeft = actualElementId - horizontalCount;
        let potentialRight = parseInt(actualElementId) + horizontalCount;

        if (leftCheckStop === false) {
            if ( actualElementId % 7 === 1) {
                leftCheckStop = true;
            } else if ((actualElementId - horizontalCount) % 7 === 1 &&
                document.getElementById(actualElementId - horizontalCount).classList.contains(actualClass) &&
                document.getElementById(actualElementId - horizontalCount).classList.contains("m-t__fade-out") === false &&
                document.getElementById(actualElementId - horizontalCount).classList.contains("m-t__stars") === false) {
                document.getElementById(actualElementId - horizontalCount).classList.add("m-t__stars");
                document.getElementById(actualElementId - horizontalCount).classList.add("m-t__fade-out");
                changeElements.push(actualElementId - horizontalCount);
                leftCheckStop = true;
                newVertical.push(potentialLeft);
            } else if (document.getElementById(actualElementId - horizontalCount).classList.contains(actualClass) &&
                document.getElementById(actualElementId - horizontalCount).classList.contains("m-t__fade-out") === false &&
                document.getElementById(actualElementId - horizontalCount).classList.contains("m-t__stars") === false &&
                (actualElementId - horizontalCount) % 7 !== 0) {
                document.getElementById(actualElementId - horizontalCount).classList.add("m-t__stars");
                document.getElementById(actualElementId - horizontalCount).classList.add("m-t__fade-out");
                changeElements.push(actualElementId - horizontalCount);
                newVertical.push(potentialLeft);
            } else if (document.getElementById(actualElementId - horizontalCount).classList.contains(actualClass) === false) {
                leftCheckStop = true;
            }
        }

        if (rightCheckStop === false) {
            if ( actualElementId % 7 === 0) {
                rightCheckStop = true;
            } else if ((parseInt(actualElementId) + horizontalCount) % 7 === 0 &&
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.contains(actualClass) &&
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.contains("m-t__fade-out") === false &&
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.contains("m-t__stars") === false) {
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.add("m-t__stars");
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.add("m-t__fade-out");
                changeElements.push(parseInt(actualElementId) + horizontalCount);
                rightCheckStop = true;
                newVertical.push(potentialRight);
            } else if (document.getElementById(parseInt(actualElementId) + horizontalCount).classList.contains(actualClass) &&
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.contains("m-t__fade-out") === false &&
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.contains("m-t__stars") === false &&
                (parseInt(actualElementId) + horizontalCount) % 7 !== 1) {
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.add("m-t__stars");
                document.getElementById(parseInt(actualElementId) + horizontalCount).classList.add("m-t__fade-out");
                changeElements.push(parseInt(actualElementId) + horizontalCount);
                newVertical.push(potentialRight);
            } else if (document.getElementById(parseInt(actualElementId) + horizontalCount).classList.contains(actualClass) === false) {
                rightCheckStop = true;
            }
        }
    }
    return  newVertical;
}

//function declaration to continue "chain" action after first-time vertical and horizontal functions call.

function relatedElements (actualElementId) {
    verticalCheck(actualElementId);
    horizontalCheck(actualElementId);
    //The elements added to the array are used to call the function again
    for (let q = 0; q < 3; q++) {
        if (newHorizontal.length !== 0) {
            horizontalCheckContinue();
        }
        if (newVertical.length !== 0) {
            verticalCheckContinue();
        }
    }
}

//fragmentation of action into small functions.Continue the "chain" action.
function horizontalCheckContinue () {
    for (let z = 0; z < newHorizontal.length; z++) {
        horizontalCheck(newHorizontal[z]);
    }
    return newHorizontal = [];
}

function verticalCheckContinue () {
    for(let p = 0; p < newVertical.length; p++) {
        verticalCheck(newVertical[p]);
    }
    return newVertical = [];
}

//Generation a new "diamonds" after "chain" effect. For first Button mode.
function newClassesAssignment (changingElements) {
    let changingElementsRevert = changingElements.reverse();
    let lastOfChanging = changingElementsRevert[0];
    for (let i = 0; i < changingElements.length; i++) {
        let actualNewElement = changingElements[i];
        document.getElementById(actualNewElement).classList.remove(actualClass);
        if (lastOfChanging === actualNewElement) {
            changeElementsPlay ();
        }
        newClassesAssignmentContinue (actualNewElement);
    }
}

//isolation some actions and continue assignment.
function newClassesAssignmentContinue (actualNewElement) {
    document.getElementById(actualNewElement).textContent = (randomNumber(1, 3));
    document.getElementById(actualNewElement).classList.remove("m-t__stars");
    document.getElementById(actualNewElement).classList.remove("m-t__fade-out");
    diamondsAssignment(actualNewElement);
    return  document.getElementById(actualNewElement);
}


//SECOND BUTTON ACTIONS
//First, the holes are identified - the elements we have selected. Then non-empty elements are determined that will "fall".

function holesDefinition(changeElements) {
    let actualColumn;
    let fillingUpColumns = [];
    let lastHoleId;
    let holesCount = 0;
    let notHoles = [];
    let elementsAboveLastHole;

    for (let h = 0; h <= changeElements.length - 1; h++) {
        actualColumn = changeElements[h] % 7;
        if (fillingUpColumns.includes(actualColumn) === false) {
            fillingUpColumns.push(actualColumn);
        }
    }

    let columnElement;
    for (let n = 0; n <= fillingUpColumns.length - 1; n++) {
        for (let m = 0; m < 7; m++) {
            if (m === 0) {
                columnElement = fillingUpColumns[n];
                if (fillingUpColumns[n] === 0) {
                    columnElement = 7;
                }
            }
            if (document.getElementById(columnElement).classList.contains("m-t__stars") === true) {
                holesCount++;
                lastHoleId = columnElement;

            } else if (document.getElementById(columnElement).classList.contains("m-t__stars") !== true) {
                notHoles.push(columnElement);
            }
            columnElement += 7;
        }
        notHoles.reverse();
        elementsAboveLastHole = notHoles.filter(function(element) {
            return element < lastHoleId;
        });
        elementsFalling(lastHoleId, holesCount, elementsAboveLastHole);

        holesCount = 0;
        lastHoleId = 0;
        notHoles = [];
    }
}


//Determination of the "fall" distance of each element. "Falling" elements with animation.
function elementsFalling(lastHoleId, holesCount, elementsAboveLastHole) {
    let holesClasses = [];
    let fallingElem = [];
    let orderDistance;
    let actualMovingElement;
    let lastHoleIdMod = lastHoleId;
    let lastHoleIdMod1 = lastHoleId;
    let pxDistance;
    for (let z = 0; z <= elementsAboveLastHole.length - 1; z++) {
        actualMovingElement = elementsAboveLastHole[z];
        orderDistance = lastHoleIdMod - actualMovingElement;
        lastHoleIdMod -= 7;

        holesClasses.push(document.getElementById(actualMovingElement).classList[1]);
        fallingElem.push(actualMovingElement);
        switch (orderDistance) {
            case 7 :
                pxDistance = 80;
                break;
            case 14 :
                pxDistance = 160;
                break;
            case 21 :
                pxDistance = 240;
                break;
            case 28 :
                pxDistance = 320;
                break;
            case 35 :
                pxDistance = 400;
                break;
            case 42 :
                pxDistance = 480;
        }
        document.getElementById(actualMovingElement).animate([{transform: "translate(0, 0)"},
                {transform: `translate(0, ${pxDistance}px)`},
                {transform: `translate(0, ${pxDistance}px)`},
                {transform: `translate(0, ${pxDistance}px)`}]
            ,{duration: 1200});
    }
    //Timer for the animation to render and for the subsequent replacement of classes.
    setTimeout(changeClasses, 1199);
    function changeClasses() {
        for (let m = 0; m < elementsAboveLastHole.length; m++) {
            document.getElementById(elementsAboveLastHole[m]).classList.remove("m-t__diamond1", "m-t__diamond2", "m-t__diamond3",
                "m-t__stars", "m-t__fade-out");
            document.getElementById(lastHoleIdMod1).classList.add(holesClasses[m], "m-t__basic_mod");
            document.getElementById(lastHoleIdMod1).classList.remove(holesClasses[m], "m-t__basic");

            document.getElementById(lastHoleIdMod1).classList.remove("m-t__diamond1", "m-t__diamond2", "m-t__diamond3",
                "m-t__stars", "m-t__fade-out");
            document.getElementById(lastHoleIdMod1).classList.add(holesClasses[m]);
            lastHoleIdMod1 -= 7;
        }
    }
    setTimeout(fillingUp, 1400);
}

//Timer for "filling up" new diamonds in empty places.
function fillingUp() {
    for (let i = 1; i <= 49; i++) {
        document.getElementById(i).classList.remove("m-t__stars");
        document.getElementById(i).classList.remove("m-t__fade-out");
        document.getElementById(i).classList.add("m-t__basic_mod");
        if ((document.getElementById(i).classList.contains("m-t__diamond1") === false &&
            document.getElementById(i).classList.contains("m-t__diamond2") === false &&
            document.getElementById(i).classList.contains("m-t__diamond3") === false) ||
            document.getElementById(i).classList.contains("m-t__fade-out") === true) {
            document.getElementById(i).textContent = (randomNumber(1, 3));
            diamondsAssignment(i);
        }
    }
}

//CLICK EVENTS
//Click event on some element.Call a functions to find all "chain" elements, delete and create some new. Check the second button state, and
document.getElementById("box").addEventListener("click", function() {
    if (+(event.target.id) >= 1 || +(event.target.id) <= 1) {
        clickAudioPlay();
        let actualElement = document.getElementById(event.target.id);
        classDetection(actualElement);
        let actualElementId = event.target.id;
        changeElements.push(parseInt(actualElementId));
        actualElement.classList.add("m-t__stars");
        actualElement.classList.add("m-t__fade-out");
        relatedElements(actualElementId);
        if (firstButtonActive === true) {
            setTimeout(newClassesAssignment, 1000, changeElements);
        } else if (secondButtonActive === true) {
            let newChangeElements = [];
            holesDefinition(changeElements);
        }
        points += parseInt(changeElements.length);
        pointsCounter();
        changeElements = [];
    }
});

document.getElementById("musicOn").addEventListener("click", function() {
    document.getElementById("musicOn").classList.add("music-section__button_active");
    document.getElementById("musicOff").classList.remove("music-section__button_active");
});

document.getElementById("musicOff").addEventListener("click", function() {
    document.getElementById("musicOff").classList.add("music-section__button_active");
    document.getElementById("musicOn").classList.remove("music-section__button_active");
});

document.getElementById("appWrapper").addEventListener("click", function() {
    if ( event.target.id === "secondButton") {
        buttonAudioPlay()
        document.getElementById("leftBorder").classList.add("app__button-border_off");
        document.getElementById("firstButton").classList.add("app__change-mode-button_off");
        document.getElementById("rightBorder").classList.remove("app__button-border_off");
        document.getElementById("secondButton").classList.remove("app__change-mode-button_off");
        firstButtonActive = false;
        secondButtonActive = true;
    }
    if ( event.target.id === "firstButton") {
        buttonAudioPlay()
        document.getElementById("rightBorder").classList.add("app__button-border_off");
        document.getElementById("secondButton").classList.add("app__change-mode-button_off");
        document.getElementById("leftBorder").classList.remove("app__button-border_off");
        document.getElementById("firstButton").classList.remove("app__change-mode-button_off");
        firstButtonActive = true;
        secondButtonActive = false;
        for (let i = 1; i <= elementsAmount; i++) {
            document.getElementById(i).classList.add("m-t__basic");
            document.getElementById(i).classList.remove("m-t__basic_mod");
        }
    }
});

//ANIMATIONS
//I choose strange way, cause I never created such an animation, and thought that the css animation would be less heavy.
//animation is built on different ways of execution.

//random call of a "stars" classes, with random coordinates
setInterval(animationAction, (randomNumber(4, 7)) * 1000, animationEnd);
let actualAnimation ;

function animationAction() {
    actualAnimation = "app__animation-element" + (randomNumber(1, 9));
    document.getElementById("animationElement").classList.add(actualAnimation);
    setTimeout(animationEnd, 3000);
}

function animationEnd () {
    document.getElementById("animationElement").classList.remove( actualAnimation);
}

// h2 styles animations.
setInterval(h2AnimationOn, 8000);
setInterval(h2AnimationOff, 8300);

function h2AnimationOn () {
    document.getElementById("h2").classList.add("h2-animation");
}

function h2AnimationOff () {
    document.getElementById("h2").classList.remove("h2-animation");
}

//AUDIO
//(Background audio released on html).

function clickAudioPlay() {
    let clickAudio1 = new Audio;
    let clickAudio2 = new Audio;
    clickAudio1.src = "./sounds/Click-a6.mp3";
    clickAudio2.src = "./sounds/Click-b6.mp3";
    clickAudio1.volume = 0.7;
    clickAudio2.volume = 0.7;
    let audioCase = randomNumber(1, 2);
    audioCase === 1 ? clickAudio1.play() : audioCase;
    audioCase === 2 ? clickAudio2.play() : audioCase;
}

function buttonAudioPlay() {
    let buttonAudio = new Audio;
    buttonAudio.src = "./sounds/spaceStationSound.mp3";
    buttonAudio.volume = 0.1;
    buttonAudio.play();
}

function changeElementsPlay () {
    let changeAudio = new Audio;
    changeAudio.src = "./sounds/breath.mp3";
    changeAudio.volume = 0.2;
    changeAudio.play();
}
//Thank's for watching)
