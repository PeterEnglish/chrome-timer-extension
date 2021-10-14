chrome.alarms.create({
  periodInMinutes: 1 / 60,
})


//This alarm listener runs constantly, and results in showing a 
//notification when the timer stops.
chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    const time = res.timer ?? 0
    const isRunning = res.isRunning ?? true
    if (!isRunning) {
      return
    }
    chrome.storage.local.set({
      timer: time + 1,
    })
    chrome.action.setBadgeText({
      text: `${time + 1}`
    })
    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 1000
      if (time % notificationTime == 0) {
        this.registration.showNotification("Chrome Timer Extension", {
          body: `${notificationTime} seconds has passed!`,
          icon: "icon.png",
        })
      }
    })
  })
})
