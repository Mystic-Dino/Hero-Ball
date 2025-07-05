function animations() {
  // Hovering buttons and showing ball
  function HoveringBtns() {
    let img = document.getElementById("character");
    let btns = document.querySelectorAll("#btn");
    let btn = document.getElementById("btn")
    let y = scrollY;
    let x = scrollX;
    btns[0].addEventListener("mouseover", () => {
      img.style.margin = "38pc 0 0 43pc"
      img.style.opacity = "1"
      img.style.animationName = "Rotating"
    })
    btns[1].addEventListener("mouseover", () => {
      img.style.margin = "48pc 0 0 34pc"
      img.style.opacity = "1"
      img.style.animationName = "Rotating"
    })
  }
// Eyes following the Mouse
  let eyes = document.querySelectorAll(".eye");
  eyes.forEach(eye => {
    let eyeRect = eye.getBoundingClientRect();
    document.body.addEventListener("mousemove", eyesFollow);
    function eyesFollow(e) {
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
  HoveringBtns()
}
function loadingBar() {
  let loadingPage = document.querySelector(".loadingPage")
  let percent = document.querySelector(".percent")
  let bar = document.querySelector(".bar");
  let ball = document.querySelector(".loadingImg")
  while (percent != 100) {
    
  }
  setTimeout(stopLoading, 25500)
  function stopLoading() {
    animations()
    loadingPage.classList.add("active")
  }
}

loadingBar()
