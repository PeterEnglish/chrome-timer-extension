const timeElement = document.getElementById("time")
const nameElement = document.getElementById("name")
const timerElement = document.getElementById("timer")

//
function updateTimeElements() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0
    timerElement.textContent = `The timer is at: ${time} seconds`
  })
  //Set current time.
  const currentTime = new Date().toLocaleTimeString()
  timeElement.textContent = `The time is: ${currentTime}`
}

updateTimeElements()
setInterval(updateTimeElements, 1000)

//Set name from storage
chrome.storage.sync.get(["name"], (res) => {
  const name = res.name ?? "???"
  nameElement.textContent = `Your name is: ${name}`
})


//LISTENERS FOR START STOP AND RESET
const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")


//Set isrunning to true
startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  })
})


//Set isrunning to false
stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  })
})

//Set time to 0 and is running to false
resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  })
})

