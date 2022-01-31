// let gameArea=document.getElementById('gameArea');
let cheat=false;


const autoClicker=()=>{
    greedClick();
    // console.clear()
    // setInterval(, 5000);
     autoClick();
    }
const autoClick=()=>{
    if(cheat){

        setTimeout(() => {
            autoClicker();
        }, 25);
    }else{
        alert('cheat is currently false');
        return
    }
}

const autoUpgrader=()=>{
    plusOneUpgrade();
    plusFiveUpgrade();
    plusTenUpgrade();
    autoUpgrade();
}
const autoUpgrade=()=>{
    if(cheat){
        setTimeout(() => {
            autoUpgrader()
        },25);
    }else{
        alert('cheat is currently false');
        return
    }
}

