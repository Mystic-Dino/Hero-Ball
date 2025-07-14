let interface = document.querySelector(".interface")
let loadingPage = document.querySelector(".loadingPage")
let cursor = document.querySelector(".cursor")
let contextMenu = document.querySelector(".contextMenu")
let menuBtns = document.querySelectorAll("#menuBtn")
let angryBtns = document.querySelectorAll(".angry")
let refresh = document.querySelector(".refresh")
let closing = document.querySelector(".closing")
let mouth = document.querySelector(".mouth")
let glass = document.querySelector(".glass")
let front = document.querySelector(".front")
let capture = document.querySelector(".capture")
let copy = document.querySelector(".copy")
let paste = document.querySelector(".paste")
let rotation = ["35deg", "-35deg"]
let back = document.querySelector(".back")
let charcPage = document.querySelector(".charactersPage")
let mouseTime;
let shouldLaugh = false; 
// Disabling zoom in and zoom out
document.addEventListener('wheel', function(e) {
  e.preventDefault(); 
}, { passive: false });
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "-")) {
    e.preventDefault();
  }
});
// My own CONTEXT MENU and deleting the default MENU when clicking right click
function newContextMenu() {
  let btnsFunc = [closeWindow, forward, backward, refreshPage, copyText, pasteFunc]
  menuBtns.forEach((mnuBtn, index) => {
    mnuBtn.addEventListener("click", btnsFunc[index])
  })
// Function of clicking on buttons on context menu
  function copyText() {
    shouldLaugh=!shouldLaugh
    laughingEmote();
    setTimeout(()=>{shouldLaugh=!shouldLaugh; defaultEmotion()},2000)
    const textSelected = window.getSelection().toString();
    if (textSelected) {
      let textcopied = navigator.clipboard.writeText(textSelected)
      return textcopied;
    }
  }
  function pasteFunc(input) {
    shouldLaugh=!shouldLaugh
    laughingEmote();
    setTimeout(()=>{shouldLaugh=!shouldLaugh; defaultEmotion()},2000)
    const text = navigator.clipboard.readText();
    input.value = text;
  }
  function refreshPage() {
    shouldLaugh=!shouldLaugh
    laughingEmote();
    setTimeout(() => { location.reload(); }, 2000)
  }
  function forward() {
    history.go(1)
  }
  function backward() {
    history.go(-1)
  }
  function closeWindow() {
    window.close(closWindow);
  }
  menuBtns.forEach((btn) => { btn.addEventListener("mouseover", () => { wideEyes()}) })
  angryBtns.forEach((angryBtn) => { angryBtn.addEventListener("mouseover", () => { angryEmote() }) })
  menuBtns.forEach((menuBtn) => { menuBtn.addEventListener("mouseout", () => { defaultEmotion() }) })
  document.addEventListener("contextmenu", (e) => {
    // Deleting the default MENU
    //e.preventDefault();
    // Creating my own CONTEXT MENU
    contextMenu.style.display = "flex"
    let xPos = e.pageX;
    let yPos = e.pageY;
    contextMenu.style.left = `${xPos + 10}px`
    contextMenu.style.top = `${yPos - 25}px`
  })
  document.addEventListener("click", () => {contextMenu.style.display = "none"})
}

// Cursor Emotions when hover or clicking on the buttons

// Eyes variables
let eye = document.querySelectorAll(".puiple")
// Wide Eyes Emotion
function wideEyes() {
  eye.forEach((puiple) => {
    puiple.style.height = "17px"
    puiple.style.borderRadius = "50%"
  })
  glass.classList.add("non-after")
}
// Laughing Emotion
function laughingEmote() {
  if (!shouldLaugh) { 
    return 
  }
  mouth.style.height = "17px"
  glass.classList.add("non-after")
  eye.forEach((puiple) => {
    puiple.style.height = "4px"
    puiple.style.borderRadius = "0"
  })
}
// Angry Emotion
function angryEmote() {
  cursor.style.backgroundColor = "red"
  glass.classList.add("non-after")
  eye.forEach((puiple, rot) => {
    puiple.style.transform = `rotate(${rotation[rot]})`
    puiple.style.height = "13px"
    puiple.style.borderRadius = "2px 2px 50% 50%"
  })
}

// Returning to default emotion
function defaultEmotion() {
  if (shouldLaugh) { 
    return 
  }
  eye.forEach((puiple) => {
    puiple.style.height = "12px"
    puiple.style.borderRadius = "2px 2px 50% 50%"
    puiple.style.transform = "rotate(0deg)"
  })
  glass.classList.remove("non-after");
  mouth.style.height = "0"
  cursor.style.backgroundColor = "#2696e8"
}

// My own mouse following cursor
function followingCursor() {
  document.addEventListener("mousemove", (e) => {
    let y = e.clientY;
    let x = e.clientX;
    cursor.style.display = "block"
    cursor.style.opacity = "1"
    cursor.style.setProperty("--top", `${y}px`)
    cursor.style.setProperty("--left", `${x}px`)

    function mouseStopped() {
      cursor.style.display = "none"
     }
    clearTimeout(mouseTime)
    mouseTime = setTimeout(mouseStopped, 15000)
  })
    document.addEventListener("mouseout", () => {
      cursor.style.opacity = "0"
    })
}

function interfaceAnimations() {
  // Hovering buttons and showing ball
  function HoveringBtns() {
    let img = document.getElementById("character");
    let btns = document.querySelectorAll("#btn");
    let btn = document.getElementById("btn")
    let mrg = ["37pc 0 0 40pc", "45pc 0 0 37pc", "54.5pc 0 0 32pc"]
    let y = scrollY;
    let x = scrollX;
    function btnsStyle() {
      img.style.opacity = "1"
      img.style.animationName = "Rotating"
    }
    btns.forEach((btna,index) => {
      btna.addEventListener("mouseout", () => {
        btna.style.color = "white";
        img.style.opacity = "0"; 
        defaultEmotion()
      })
      btna.addEventListener("mouseover", () => {
        btna.style.color = "orange"
        wideEyes()
        btnsStyle()
        img.style.margin = mrg[index];
      })
    })
  }
// Eyes following the Mouse
  let eyes = document.querySelectorAll(".eye");
  eyes.forEach(eye => {
  let eyeRect = eye.getBoundingClientRect();
    document.body.addEventListener("mousemove", eyesFollows);
    function eyesFollows(e) {
      requestAnimationFrame(() => {
        let posX = e.pageX;
        let posY = e.pageY;
        let diffX = (eyeRect.x + eyeRect.width / 2) - posX;
        let diffY = (eyeRect.y + eyeRect.height / 2) - posY;
        let angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
        eye.style.setProperty("--eyeAngle", angle.toFixed(2) + "deg");
      });
    }
  })
  function charactersActive() {
    
  }
  HoveringBtns()
}
function loadingBar() {
  let loadingPage = document.querySelector(".loadingPage")
  let percent = document.querySelector(".percent")
  let bar = document.querySelector(".bar");
  let ball = document.querySelector(".loadingImg");
  let load = document.querySelector(".load")
  let num = 0;
  let percentTime = setInterval(precentage, 98)
  function precentage() {
    if (num != 101) {
      percent.innerText = `${num}%`
      bar.style.width = `${num - 3.8}vh`
      num++;
    } else {
      setTimeout(() =>{stopLoading()}, 2000)
    }
  }
  
function stopLoading() {
    interfaceAnimations()
    //loadingPage.style.zIndex = "1"
    //interface.style.zIndex = "100"
    //clearInterval(percentTime)
  }
precentage()
}

loadingBar()
followingCursor()
newContextMenu()
