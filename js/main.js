// @CR: Hey Idan, i left you some comments inside your code :)
// @CR: To summarize, you code is very very good, i can see you understand the subject.
// You did some really cool stuff here, the game looks and acts very nice! :)
// Just keep in mind, that i want you to work by the rules we teach, i know it was the first time and today i will like to see
// you write in our coding convention, change in data then renderBalloons(), your render function should know to draw the element
// exactly from the data, and know how to take into account all the properties relevent to the view
// Again, awesome work! and please keep it up!!! :))
'use strict'
var gTitleChanged = false;
var gId = 0;
var gBalloons = [];
var gGameInterval;
var gTitle; // @CR: Naming! "gTitleInterval"
var gColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple']
var gWidth = window.innerWidth;
var gHeight = window.innerHeight;
var gPoppedBalloonsCount = 0;

function init() {
    createBalloons(+prompt('How many balloons?'));
    setInterval(function () {
        var h1 = document.querySelector('h1');
        h1.style.color = gColors[getRandomInt(1, 5)];
    }, 500);
    gTitle = setInterval(changeTitle, 2000);
    gGameInterval = setInterval(gameOn, 100);
    new Audio('inflate.mp3').play();
    renderBalloons();
}
function createBalloons(num) {
    var strHTML = '<style>';
    for (var i = gBalloons.length; i < num; i++) {
        // @CR: Instead of this, i would like to see a createBallon() func that return an balloon object
        gBalloons.push({ id: gId++, spaceFromBottom: 0, spaceFromLeft: getRandomInt(100, gWidth - 100), color: gColors[getRandomInt(0, 5)], isPopped: false, speed: 0 });
        // @CR: This strategy is very cool, but it has its fallbacks, try to stick to the inline style inside the render func
        strHTML +=
            `.balloon.balloon${i} {
            background-color:${gBalloons[i].color};
            bottom:0px;
            left:${gBalloons[i].spaceFromLeft}px;}`;
    }
    strHTML += '</style>';
    document.querySelector('head').innerHTML += strHTML;
}
function gameOn() { // @CR: Naming!, use a verb, "playGame".
    move();
    check();
}

function renderBalloons() {
    var strHTML = '';
    var elSky = document.querySelector('.sky');

    for (var i = 0; i < gBalloons.length; i++) {
        if (!gBalloons[i].isPopped) {
            // @CR: Aluf! i loved the styling of the ballons!
            // @CR: of course i would like to see here inline style
            // var style = `background-color:${gBalloons[i].color};bottom:0px;left:${gBalloons[i].spaceFromLeft}px;}`
            // and then add it to the strHTML
            strHTML += `<div class="balloon balloon${i}" onclick="popBalloon(${i},this)" onmouseover="speedUp(${i})"><div class="shine"></div><div class="tail"></div></div>`;
            elSky.innerHTML = strHTML;
        }
    }
}
function move() { // @CR: Naming :) what are you moving? moveBalloons
    // @CR: No need to catch all the balloons from the html, if you have a nice render function
    var balloonStyle = document.querySelectorAll('.balloon');  //get all elements of baloons
    for (var i = 0; i < gBalloons.length; i++) {                //loop through each balloon
        if (!gBalloons[i].isPopped) {
            gBalloons[i].spaceFromBottom += gBalloons[i].speed + getRandomInt(1, 10);                             //moves balloons up randomly+ add if speed increased
            gBalloons[i].spaceFromLeft += (Math.random() > 0.5) ? getRandomInt(1, 10) : -getRandomInt(1, 10);     //moves balloons left/right randomly
            // @CR: if you have a good enough render function you can call it to apply all the changes you made to the data
            balloonStyle[i].style.bottom = gBalloons[i].spaceFromBottom + 'px';                                   //applying changes in balloon style
            balloonStyle[i].style.left = gBalloons[i].spaceFromLeft + 'px';
        }
    }
}

function check() { // @CR: Naming! what are you checking? isBalloonDone? handleBalloonOutOfScreen

    for (var i = 0; i < gBalloons.length; i++) {
        if (!gBalloons[i].isPopped && parseInt(gBalloons[i].spaceFromBottom) > gHeight + 300) {     //loop through balloons and if a balloon that is active went out of screen, end game.
            clearInterval(gGameInterval);
            alert('You lost a balloon!');
            location.reload();
            return;
            // @CR: here you can maybe call the init function? no need to reload all the page
        }
    }
    if (gPoppedBalloonsCount === gBalloons.length) {
        clearInterval(gGameInterval);
        alert('Great! You popped all the balloons!');
        var h1 = document.querySelector('h1');
        h1.innerHTML = 'Good Job!<br /><button onclick=location.reload()> Start Again</button>'
        return;
    }
}



function speedUp(balloonId) {
    gBalloons[balloonId].speed += getRandomInt(1, 10);
}
function popBalloon(balloonId, elBalloon) {
    new Audio('pop.mp3').play();
    gBalloons[balloonId].isPopped = true;
    elBalloon.style.opacity = 0;
    gPoppedBalloonsCount++;
}

function changeTitle() {
    // @CR: "document.title" exists and you can use it :)
    var title = document.querySelector('title');
    if (gTitleChanged) {
        title.innerHTML = '🎈Balloon Pop🎈';
        gTitleChanged = false;
    } else {
        title.innerHTML = 'Let\'s Play!';
        gTitleChanged = true;
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}