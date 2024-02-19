document.addEventListener("DOMContentLoaded", function () {
  let starsSpawned = false; // Variable to track whether stars have been spawned

  setInterval(() => {
    SetClock();
    setGradientBackground();
    setDigitalClock();
  }, 1000);

  const HourHand = document.querySelector("[data-hour-hand]");
  const MinuteHand = document.querySelector("[data-minute-hand]");
  const SecondHand = document.querySelector("[data-second-hand]");

  function SetClock() {
    const CurrentDate = new Date();
    const CurrentHours = CurrentDate.getHours();
    const CurrentMinutes = CurrentDate.getMinutes();
    const CurrentSeconds = CurrentDate.getSeconds();

    const Hours12HourFormat = CurrentHours % 12 || 12;
    const AMPM = CurrentHours >= 12 ? "PM" : "AM";

    const SecondsRatio = CurrentSeconds / 60;
    const MinutesRatio = (SecondsRatio + CurrentMinutes) / 60;
    const HoursRatio = (MinutesRatio + Hours12HourFormat) / 12;
    SetRotation(SecondHand, SecondsRatio);
    SetRotation(MinuteHand, MinutesRatio);
    SetRotation(HourHand, HoursRatio);
  }

  function SetRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
  }

  function setGradientBackground() {
    const currentDate = new Date();
    const hours = currentDate.getHours();

    let gradientColors = [];

    if (hours >= 6 && hours < 18) {
      gradientColors = ["#add8e6", "#87ceeb", "#4682b4"];
      if (!starsSpawned) {
        SpawnStars(50);
        starsSpawned = true;
      } 
    } else if (hours >= 18 && hours < 20) {
      gradientColors = ["#ff7f00", "#ff4500", "#ff8c00"];
      if (!starsSpawned) {
        SpawnStars(25);
        starsSpawned = true;
      } else SpawnStars(75);
    } else {
      gradientColors = ["#296FA7", "#1A4483", "#0F1860"];
      if (!starsSpawned) {
        SpawnStars(100);
        starsSpawned = true;
      } else SpawnStars(200);
    }

    const gradient = `linear-gradient(to right, ${gradientColors.join(", ")})`;

    document.body.style.background = gradient;
  }

  function setDigitalClock() {
    const CurrentDate = new Date();
    let hours = CurrentDate.getHours();
    const minutes = String(CurrentDate.getMinutes()).padStart(2, "0");
    const seconds = String(CurrentDate.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    document.getElementById("digital-hour").textContent = hours;
    document.getElementById("digital-minute").textContent = minutes;
    document.getElementById("digital-second").textContent = seconds;
    document.getElementById("digital-ampm").textContent = ampm;
  }

  /// Stars
  function SpawnStars(NumberOfStars = 20) {
    const StarsContainer = document.querySelector(".stars");
    StarsContainer.innerHTML = ""; // Clear existing stars

    const CoffeeTable = document.querySelector(".coffee-table");
    const Clocks = document.querySelector(".clock-container");

    const TableBounds = CoffeeTable.getBoundingClientRect();
    const ClocksBounds = Clocks.getBoundingClientRect();

    const ExclusionAreas = [
      {
        x1: TableBounds.left,
        y1: TableBounds.top,
        x2: TableBounds.right,
        y2: TableBounds.bottom,
      },
      {
        x1: ClocksBounds.left,
        y1: ClocksBounds.top,
        x2: ClocksBounds.right,
        y2: ClocksBounds.bottom,
      },
    ];

    for (let i = 0; i < NumberOfStars; i++) {
      const Star = document.createElement("div");
      Star.classList.add("star");
      let Left, Top;

      do {
        Left = getRandom(0, 100);
        Top = getRandom(0, 100);
      } while (IsInExclusionAreas(Left, Top, ExclusionAreas));

      Star.style.left = `${Left}vw`;
      Star.style.top = `${Top}vh`;

      const StarDuration = getRandom(10 * 1000, 2 * 60 * 1000);
      Star.style.animationDuration = `${StarDuration / 1000}s`;
      StarsContainer.appendChild(Star);
    }
  }

  function IsInExclusionAreas(x, y, areas) {
    for (const area of areas) {
      if (x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2) {
        return true;
      }
    }
    return false;
  }

  // Utils
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
});

// Clouds
