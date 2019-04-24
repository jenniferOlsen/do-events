// Example events
var events = [
  {
    starts_at: 120,
    duration: 45,
    title: "Meeting with Ben",
    location: "Coffee Shop"
  },
  { starts_at: 240, duration: 60, title: "Lunch with Karl", location: "TBA" },
  { starts_at: 75, duration: 60, title: "Sync with John" },
  { starts_at: 360, duration: 25 },
  { starts_at: 420, duration: 120 },
  { starts_at: 245, duration: 90, title: "test" }
];

// Presentational variables
var startTime;
var startHour;
var startOffset;
var endTime;
var height;

getClocktime = function(time) {
  // minutes
  var minutes = time % 60;
  // print it pretty
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // hour
  hour = Math.floor(time / 60);

  // hours offset
  if (hour > 3) {
    clockTime = hour - 3;
  } else {
    clockTime = hour + 9;
  }

  // set suffix var
  if (hour < 3) {
    var suffix = " AM";
  } else {
    var suffix = " PM";
  }

  return (clockTime = clockTime.toString() + ":" + minutes + suffix);
};

getStartTime = function(starts_at) {
  getClocktime(starts_at);
  // get raw start hour for display
  startHour = Math.floor(starts_at / 60);

  // margin offset for starting not on the hour
  var minutes = starts_at % 60;
  if (minutes !== 0) {
    startOffset = Math.floor((minutes / 60) * 45);
  } else {
    startOffset = 0;
  }

  startTime = clockTime;
  return startTime;
};

getEndTime = function(starts_at, duration) {
  var time = starts_at + duration;
  getClocktime(time);
  endTime = clockTime;
  return endTime;
};

getDuration = function(duration) {
  // height of grid - padding
  return (height = Math.floor((duration / 60) * 45 - 10));
};

// Render event to DOM
printEvent = function(
  start,
  startHour,
  end,
  title,
  location,
  height,
  startOffset
) {
  elem = document.getElementById(`hour-block-${startHour}`);
  elem.insertAdjacentHTML(
    "beforeend",
    `
    <div class="event" style="height:${height}px; margin-top:${startOffset}px">
      <div class="text">
        ${title ? `<span>${title}</span>` : ""}
        ${location ? `<span>/ ${location}</span>` : ""}
      </div>
      <div>${start} &mdash; ${end}</div>
    </div>
  `
  );
};

// Global fuction that can be called from the console for testing
window.renderEvents = function(events) {
  events.forEach(function(event) {
    getStartTime(event.starts_at);
    getEndTime(event.starts_at, event.duration);
    getDuration(event.duration);
    printEvent(
      startTime,
      startHour,
      endTime,
      event.title,
      event.location,
      height,
      startOffset
    );
  });
};

// Render to screen on load
renderEvents(events);
