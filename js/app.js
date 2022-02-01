//game area default load
let gameArea = document.getElementById('gameArea');
let secondHome=false;
let secondGreed=false;
let sound=false;

//home page load

const homePage = () => {
    if(!secondHome){

    gameArea.innerHTML = `<p class="character-speak" id="characterSpeak">Welcome Mortal</p>
    
    <p class="upgrade-title">Progress bar upgrades</p>
    <p class="upgrade-text">Increase yellow coins earned</p>
    <input type="button"  onclick="earnProgress()" class="btn idle-upgrade-button" value="Upgrade">
    <div class="cost" id="earnProgressCostDisplay">cost:${earnProgressCost}</div>

    <p class="upgrade-text">Increase progress speed</p>
    <input type='button' onclick="speedProgress()" class="btn idle-upgrade-button" value="Upgrade">
    <div class="cost" id="speedProgressCostDisplay">cost:${speedProgressCost}</div>

    <p class="upgrade-title">New Feature</p>
    <p class="upgrade-text" id="nextUnlockDisplay">${nextUnlock}</p>
    <input type='button' onclick="unlockFeature()" class="btn idle-upgrade-button" value="Upgrade">
    <div class="cost" id="unlockFeatureCostDisplay">cost:${unlockFeatureCost}</div>`
    gameArea.style.background = `url('./media/demon-test.PNG') no-repeat`;
    gameArea.style.backgroundSize = '100%';
    gameArea.style.color = 'white';
    gameArea.style.fontWeight = 600;
    secondHome=true;
}
else{
    gameArea.innerHTML = `<p class="character-speak" id="characterSpeak">Welcome Mortal</p>
    
    <p class="upgrade-title">Progress bar upgrades</p>
    <p class="upgrade-text">Increase yellow coins earned</p>
    <input type="button"  onclick="earnProgress()" class="btn idle-upgrade-button" value="Upgrade">
    <div class="cost" id="earnProgressCostDisplay">cost:${earnProgressCost}</div>

    <p class="upgrade-text">Increase progress speed</p>
    <input type='button' onclick="speedProgress()" class="btn idle-upgrade-button" value="Upgrade">
    <div class="cost" id="speedProgressCostDisplay">cost:${speedProgressCost}</div>

    <p class="upgrade-title">New Feature</p>
    <p class="upgrade-text" id="nextUnlockDisplay">${nextUnlock}</p>
    <input type='button' onclick="unlockFeature()" class="btn idle-upgrade-button" id='nextUpgradeButton' value="More Soon">
    <div class="cost" id="unlockFeatureCostDisplay"></div>`
    gameArea.style.background = `url('./media/demon-test.PNG') no-repeat`;
    gameArea.style.backgroundSize = '100%';
    gameArea.style.color = 'white';
    gameArea.style.fontWeight = 600;
}
    // dropdown only shows once the first feature has been unlocked
    if (greedClickerPage) {
        showDropdown();
        let ddItem = document.querySelectorAll('.dropdown-item-style')
        ddItem.forEach((item) => {
            item.classList.remove('active')
        })
        ddItem[0].classList.add('active');
    }
    gameArea.removeEventListener('click', greedClick, true);
}

//currency declaration

let yellowCoin = document.getElementById('yellowCoin');
let whiteCoin = document.getElementById('whiteCoin');
let greenCoin = document.getElementById('greenCoin');
let blueCoin = document.getElementById('blueCoin');
// console.log(yellowCoin)
// console.log(greenCoin)
// console.log(whiteCoin)
// console.log(blueCoin)

//currency variables

let yellowCoinValue = 0;
let whiteCoinValue = 0;
let greenCoinValue = 0;
let blueCoinValue = 0;

//exp bar declaration

let currentExp = document.getElementById('currentExp');
let toNextLvl = document.getElementById('toNextLvl');
let expProgress = document.getElementById('expProgress');
let expBar = document.getElementById('expBar');
let lvlDisplay = document.getElementById('lvlDisplay');

//exp bar variables

let expValue = 0;
let expNeeded = 10;
let lvl = 1;
let xpMultiplier = 5;
let leftoverXp;
let expProgressBar;

//function for displaying the exp
const expUpdate = () => {
    currentExp.innerHTML = expValue;
    toNextLvl.innerHTML = expNeeded;
    expProgressBar = Number((Number(expValue) / Number(expNeeded)) * Number(expBar.clientWidth));
    expProgress.style.width = `${expProgressBar}px`;
    expProgress.style.minWidth = '3px'
}

//function for increasing exp
const expIncrease = () => {
    if (expValue < expNeeded) {
        expValue += xpMultiplier;
        if (expValue == expNeeded) {
            xpMultiplier = Math.ceil(xpMultiplier * 1.2);
            expNeeded = Math.floor(expNeeded * 1.5);
            expValue = 0;
            lvl++;
            lvlDisplay.innerHTML = lvl;
        } else if (expValue > expNeeded) {
            leftoverXp = parseInt(expValue - expNeeded);
            expValue = leftoverXp;
            xpMultiplier = Math.ceil(xpMultiplier * 1.2);
            expNeeded = Math.floor(expNeeded * 1.5);
            lvl++;
            lvlDisplay.innerHTML = lvl
        }
    }
    expUpdate();
}

//home page upgrades variables

let earnProgressCost = 1;
let speedProgressCost = 10;
let unlockFeatureCost = 25;
let yellowCoinMultiplier = 1;
let greedClickerPage = false;
let nextUnlock = 'Greed Clicker';


//increase yellow coins earned
const earnProgress = () => {
    // upgrade display because of scope
    let earnProgressCostDisplay = document.getElementById('earnProgressCostDisplay');

    if (yellowCoinValue >= earnProgressCost) {
        if (yellowCoinMultiplier <= 10) {
            yellowCoinMultiplier += 4
        } else {
            yellowCoinMultiplier *= 2;
        }
        yellowCoinValue -= earnProgressCost;
        if (earnProgressCost <= 10) {
            earnProgressCost += 4
        } else {
            earnProgressCost *= 3;
        }
        earnProgressCostDisplay.innerHTML = `cost:${earnProgressCost}`;
        yellowCoin.innerHTML = `${yellowCoinValue}`;
    }
}

// increase speed of progress bar

const speedProgress = () => {
    // upgrade display because of scope
    let speedProgressCostDisplay = document.getElementById('speedProgressCostDisplay');
    if (yellowCoinValue >= speedProgressCost) {
        idleBarSpeed -= 2
        yellowCoinValue -= speedProgressCost;//stay
        speedProgressCost *= 3;//adjust maybe
        speedProgressCostDisplay.innerHTML = `cost:${speedProgressCost}`;//new cost
        yellowCoin.innerHTML = `${yellowCoinValue}`;//needed for the cost spent
    }
}

// unlock new feature
const unlockFeature = () => {
    // upgrade display because of scope
    let unlockFeatureCostDisplay = document.getElementById('unlockFeatureCostDisplay');
    if (yellowCoinValue >= unlockFeatureCost && !greedClickerPage) {
        greedClickerPage = true;
        yellowCoinValue -= unlockFeatureCost;//stay
        unlockFeatureCost *= 20;//adjust maybe
        unlockFeatureCostDisplay.innerHTML = ``
        yellowCoin.innerHTML = `${yellowCoinValue}`;//needed for the cost spent
        nextUnlock = 'More Coming Soon'
        gameArea.innerHTML = `<p class="character-speak" id="characterSpeak">Welcome Mortal</p>
    
    <p class="upgrade-title">Progress bar upgrades</p>
    <p class="upgrade-text">Increase yellow coins earned</p>
    <input type="button"  onclick="earnProgress()" class="btn idle-upgrade-button" value="Upgrade">
    <div class="cost" id="earnProgressCostDisplay">cost:${earnProgressCost}</div>

    <p class="upgrade-text">Increase progress speed</p>
    <input type='button' onclick="speedProgress()" class="btn idle-upgrade-button" value="Upgrade">
    <div class="cost" id="speedProgressCostDisplay">cost:${speedProgressCost}</div>

    <p class="upgrade-title">New Feature</p>
    <p class="upgrade-text" id="nextUnlockDisplay">${nextUnlock}</p>
    <input type='button' onclick="unlockFeature()" class="btn idle-upgrade-button" id='nextUpgradeButton' value="More Soon">
    <div class="cost" id="unlockFeatureCostDisplay"></div>`
        showDropdown();
    }
}

//displaying dropdown

const showDropdown = () => {
    gameArea.innerHTML += `<div class="dropdown feature-dropdown">
        <button class="btn btn-secondary dropdown-toggle feature-button" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          Features
        </button>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
          <li><input class="dropdown-item dropdown-item-style active" onclick="homePage()" value="Home Screen"></li>
          <li><input class="dropdown-item dropdown-item-style" onClick="clickerGreed()" value="Greed Clicker"></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Coming soon</a></li>
        </ul>
    </div>`
}

// greed clicker load

const clickerGreed = () => {
    if(!secondGreed){
    gameArea.innerHTML = `
    <p class="greed-speak" id="greedSpeak">Click me!</p>
                            <div class="click-upgrades-div">

                                <p class="upgrade-title">Per Click Upgrades</p>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="plusOneUpgrade()" value="Plus One">
                                    <p class="cost" id="clickPlusOneCostDisplay">cost:${clickPlusOneCost}</p>
                                </div>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="plusFiveUpgrade()" value="Plus Five">
                                    <p class="cost" id="clickPlusFiveCostDisplay">cost:${clickPlusFiveCost}</p>
                                </div>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="plusTenUpgrade()" value="Plus Ten">
                                    <p class="cost" id="clickPlusTenCostDisplay">cost:${clickPlusTenCost}</p>
                                </div>

                                <p class="upgrade-title">Passive Income Upgrades</p>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="passiveAmountUpgrade()" id="clickPassiveDisplay" value="unlock">
                                    <p class="cost" id="clickPassiveAmountCostDisplay">cost:${clickPassiveAmountCost}</p>
                                </div>
                                <div class="upgrade-div" id="clickPassiveUnlock">

                                </div>

                            </div>`;
    gameArea.style.background = `url('./media/greed-better.PNG') no-repeat`;
    gameArea.style.backgroundSize = '100%';
    gameArea.style.color = 'white';
    gameArea.style.fontWeight = 800;
    secondGreed=true;
}
else{
    gameArea.innerHTML = `
    <p class="greed-speak" id="greedSpeak">Click me!</p>
                            <div class="click-upgrades-div">

                                <p class="upgrade-title">Per Click Upgrades</p>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="plusOneUpgrade()" value="Plus One">
                                    <p class="cost" id="clickPlusOneCostDisplay">cost:${clickPlusOneCost}</p>
                                </div>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="plusFiveUpgrade()" value="Plus Five">
                                    <p class="cost" id="clickPlusFiveCostDisplay">cost:${clickPlusFiveCost}</p>
                                </div>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="plusTenUpgrade()" value="Plus Ten">
                                    <p class="cost" id="clickPlusTenCostDisplay">cost:${clickPlusTenCost}</p>
                                </div>

                                <p class="upgrade-title">Passive Income Upgrades</p>
                                <div class="upgrade-div">
                                    <input type="button" class="btn click-upgrade-button" onclick="passiveAmountUpgrade()" id="clickPassiveDisplay" value="x2 Amount Earned">
                                    <p class="cost" id="clickPassiveAmountCostDisplay">cost:${clickPassiveAmountCost}</p>
                                </div>
                                <div class="upgrade-div" id="clickPassiveUnlock">

                                </div>

                            </div>`;
    gameArea.style.background = `url('./media/greed-better.PNG') no-repeat`;
    gameArea.style.backgroundSize = '100%';
    gameArea.style.color = 'white';
    gameArea.style.fontWeight = 800;
}
    //only display passive upgrades if unlocked 

    let clickPassiveUnlock = document.getElementById('clickPassiveUnlock')
    if (clickPassive) {
        clickPassiveUnlock.innerHTML = `
        <input type="button" class="btn click-upgrade-button" onclick="passiveSpeedUpgrade()" value="Increase Speed">
        <p class="cost" id="clickPassiveSpeedCostDisplay">cost:${clickPassiveSpeedCost}</p>`;
    }
    showDropdown();

    //active item in dropdown list

    let ddItem = document.querySelectorAll('.dropdown-item-style')
    ddItem.forEach((item) => {
        item.classList.remove('active')
    })
    ddItem[1].classList.add('active');
    gameArea.addEventListener('click', greedClick, true);
}

// greed clicker declaration
let clickPlusOneCostDisplay = document.getElementById('clickPlusOneCostDisplay');
let clickPlusFiveCostDisplay = document.getElementById('clickPlusFiveCostDisplay');
let clickPlusTenCostDisplay = document.getElementById('clickPlusTenCostDisplay');
let clickPassiveAmountCostDisplay = document.getElementById('clickPassiveAmountCostDisplay');
let clickPassiveSpeedCostDisplay = document.getElementById('clickPassiveSpeedCostDisplay');

//greed clicker variables

// on click default
let clickValue = 1;
let clickValueMultiplier = 2;

//on click upgrade amounts 
let clickPlusOne = 1;
let clickPlusFive = 5;
let clickPlusTen = 10;

// click passive upgrade
let clickPassive = false;
let clickPassiveAmount = 1;
let clickPassiveSpeed = 1000;

// click upgrade cost
let clickPlusOneCost = 1;
let clickPlusFiveCost = 10;
let clickPlusTenCost = 25;

// click passive upgrade cost
let clickPassiveAmountCost = 20;
let clickPassiveSpeedCost = 40;
let cheatUnlock = false;

//click upgrade by 1
const plusOneUpgrade = () => {
    let clickPlusOneCostDisplay = document.getElementById('clickPlusOneCostDisplay');
    if (whiteCoinValue >= clickPlusOneCost) {
        clickValue += 1;
        whiteCoinValue -= clickPlusOneCost;
        clickPlusOneCost *= 2;
        whiteCoin.innerHTML = whiteCoinValue;
        clickPlusOneCostDisplay.innerHTML = `cost:${clickPlusOneCost}`;
    }
}

//click upgrade by 5
const plusFiveUpgrade = () => {
    let clickPlusFiveCostDisplay = document.getElementById('clickPlusFiveCostDisplay');
    if (whiteCoinValue >= clickPlusFiveCost) {
        clickValue += 5;
        whiteCoinValue -= clickPlusFiveCost;
        clickPlusFiveCost *= 2;
        whiteCoin.innerHTML = whiteCoinValue;
        clickPlusFiveCostDisplay.innerHTML = `cost:${clickPlusFiveCost}`;
    }
}

//click upgrade by 10
const plusTenUpgrade = () => {
    let clickPlusTenCostDisplay = document.getElementById('clickPlusTenCostDisplay');
    if (whiteCoinValue >= clickPlusTenCost) {
        clickValue += 10;
        whiteCoinValue -= clickPlusTenCost;
        clickPlusTenCost *= 2;
        whiteCoin.innerHTML = whiteCoinValue;
        clickPlusTenCostDisplay.innerHTML = `cost:${clickPlusTenCost}`;
    }
}

//toggle sound
const soundToggle=()=>{
    let soundDisplay=document.getElementById('soundDisplay');
    if(sound){
        sound=false;
        soundDisplay.innerHTML=`SOUND:OFF`
    }else{
        sound=true;
        soundDisplay.innerHTML=`SOUND:ON`
    }
}

// on click
const greedClick = () => {
    let softMoneyClick = document.getElementById('softMoneyClick');
    let greenCoinChance = Math.floor(Math.random() * 2);
    whiteCoinValue += clickValue;
    whiteCoin.innerHTML = `${whiteCoinValue}`;
    greenCoinValue += greenCoinChance;
    greenCoin.innerHTML = greenCoinValue;
    if(sound){
        softMoneyClick.play()
    }
    if (whiteCoinValue >= 2000 && !cheatUnlock) {
        let clickPassiveUnlock = document.getElementById('clickPassiveUnlock');
        clickPassiveUnlock.innerHTML += `<input type="button" class="btn idle-upgrade-button" onclick="cheatUnlocked()" value="CHEAT">`
        cheatUnlock = true;
    }
}

//unlock cheats and display cheat status
const cheatUnlocked = () => {
    let title = document.getElementById('title');
    let cheatDisplay=document.getElementById('cheatDisplay');
    title.innerText = 'Cheater'
    if (!cheat && cheatUnlock) {
        cheat = true;
        clickPassiveUnlock.innerHTML = `
            <div class="upgrade-div" id="clickPassiveUnlock">
            <input type="button" class="btn click-upgrade-button" onclick="passiveSpeedUpgrade()" value="Increase Speed">
            <p class="cost" id="clickPassiveSpeedCostDisplay">cost:${clickPassiveSpeedCost}</p>
        </div>`
        cheatDisplay.innerHTML=`CHEAT:ON`
    } else if (cheat && cheatUnlock) {
        cheat = false;
        cheatDisplay.innerHTML=`CHEAT:OFF`
    } else {
        alert('cheat is currently false');
        return
    }
}


// set interval for the passive income
const clickPassiveInterval = () => {
    setTimeout(clickIdleMomentum = () => {
        whiteCoinValue += clickPassiveAmount;
        whiteCoin.innerHTML = whiteCoinValue;
        return clickPassiveInterval();
    }, clickPassiveSpeed);
}

// click passive income unlock and basic amount increase
const passiveAmountUpgrade = () => {
    let clickPassiveAmountCostDisplay = document.getElementById('clickPassiveAmountCostDisplay');
    if (whiteCoinValue >= clickPassiveAmountCost) {
        if (!clickPassive) {
            let clickPassiveDisplay = document.getElementById('clickPassiveDisplay')
            clickPassive = true;
            clickPassiveUnlock.innerHTML = `
            <input type="button" class="btn click-upgrade-button" onclick="passiveSpeedUpgrade()" value="Increase Speed">
            <p class="cost" id="clickPassiveSpeedCostDisplay">cost:${clickPassiveSpeedCost}</p>`;
            clickPassiveInterval();
            clickPassiveDisplay.value = 'x2 Amount Earned'
        }
        whiteCoinValue -= clickPassiveAmountCost;
        whiteCoin.innerHTML = whiteCoinValue;
        clickPassiveAmount *= 3;
        clickPassiveAmountCost *= 4;
        clickPassiveAmountCostDisplay.innerHTML = `cost:${clickPassiveAmountCost}`;
    }
}

// passive income speed increase
const passiveSpeedUpgrade = () => {
    let clickPassiveSpeedCostDisplay = document.getElementById('clickPassiveSpeedCostDisplay');
    if (whiteCoinValue >= clickPassiveSpeedCost) {
        whiteCoinValue -= clickPassiveSpeedCost;
        clickPassiveSpeed -= 10;
        clickPassiveSpeedCost *= 3;
        clickPassiveSpeedCostDisplay.innerHTML = `cost${clickPassiveSpeedCost}`;
        console.log(clickPassiveSpeed)
    }
}

//idle bar declarations

let idleProgress = document.getElementById('idleProgress');
let idleBarPercent = document.getElementById('idleBarPercent');
let idleToggleStatus = document.getElementById('idleToggleStatus');

//idle bar variables
let idleProgressHeight = 0;
let idleBarSpeed = 25;
let realIdle = false;

// recieve yellow coins when idle bar event listener activates

const idlePay = () => {
    yellowCoinValue += yellowCoinMultiplier;
    yellowCoin.innerHTML = `${yellowCoinValue}`;
}

// on mouse move reset progress bar to 0 and payout currency/exp
const _mouseMove_ = () => {
    let impactSound=document.getElementById('impactSound');
    idleProgressHeight = 0;
    idleProgress.style.height = `${idleProgressHeight}%`;
    idleProgressTop = (400 / 100) * (100 - idleProgressHeight);
    idleProgress.style.top = `${idleProgressTop}px`;
    idleBarPercent.innerHTML = `${idleProgressHeight}%`
    // console.log(idleProgressHeight);
    if(sound){
        impactSound.play()
    }
    idleInterval();
    expIncrease();
    idlePay();
    window.removeEventListener('mousemove', _mouseMove_);
    window.removeEventListener('click', _mouseMove_);
}

// function idleInterval(){
const idleInterval = () => {
    let impactSound=document.getElementById('impactSound');
    if (!realIdle) {
        setTimeout(idleMomentum = () => {
            if (idleProgressHeight < 100) {
                idleProgressHeight++;
                idleProgress.style.height = `${idleProgressHeight}%`;
                idleProgressTop = (400 / 100) * (100 - idleProgressHeight);
                idleProgress.style.top = `${idleProgressTop}px`;
                idleBarPercent.innerHTML = `${idleProgressHeight}%`;
                // console.log(idleProgressHeight);
                return idleInterval();
            } else if (idleProgressHeight = 100) {
                idleBarPercent.innerHTML = `READY`;
                window.addEventListener('mousemove', _mouseMove_);
                window.addEventListener('click', _mouseMove_);
            } else { console.log('error') }
        }, idleBarSpeed);
    } else {
        setTimeout(idleMomentum = () => {
            if (idleProgressHeight < 100) {
                idleProgressHeight++;
                idleProgress.style.height = `${idleProgressHeight}%`;
                idleProgressTop = (400 / 100) * (100 - idleProgressHeight);
                idleProgress.style.top = `${idleProgressTop}px`;
                idleBarPercent.innerHTML = `${idleProgressHeight}%`;
                // console.log(idleProgressHeight);
                return idleInterval();
            } else if (idleProgressHeight = 100) {
                idleProgressHeight = 0;
                idleProgress.style.height = `${idleProgressHeight}%`;
                idleProgressTop = (400 / 100) * (100 - idleProgressHeight);
                idleProgress.style.top = `${idleProgressTop}px`;
                idleBarPercent.innerHTML = `${idleProgressHeight}%`
                // console.log(idleProgressHeight);
                if(sound){
                    impactSound.play()
                }
                idleInterval();
                expIncrease();
                idlePay();
                // idleBarPercent.innerHTML = `READY`;
                // window.addEventListener('mousemove', _mouseMove_);
            } else { console.log('error') }
        }, idleBarSpeed * 2);
    }
}

//Anti-Idle/Idle toggle
idleToggleStatus.addEventListener('click', () => {
    if (!realIdle) {
        realIdle = true;
        idleToggleStatus.innerText = 'ON';
        idleToggleStatus.style.backgroundColor = 'green';
    } else {
        realIdle = false;
        idleToggleStatus.innerText = 'OFF';
        idleToggleStatus.style.backgroundColor = 'darkred'
    }
})

// login prompt
const login = () => {
    let name = document.getElementById('name');
    let user = prompt('username');
    if (user != '') {
        name.innerText = user;
    } else {
        user = prompt('plz add a username');
        name.innerText = user;
        if (name.innerText == '@username') {
            login();
        }
    }
}

//default page load
window.addEventListener('load', e => {
    e.preventDefault();
    login();
    homePage();
    idleInterval();
    // clickerGreed();
})