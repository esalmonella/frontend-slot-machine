const TRIES_LIMIT = 3;

const slots = {
  1: "🍒",
  2: "🍋",
  3: "🍊",
  4: "🍇",
  5: "🍉",
  6: "🔔",
  7: "7️⃣",
};

document.addEventListener("DOMContentLoaded", () => {
  const username = prompt("Введіть імʼя");
  if (!username || !username.trim().length) {
    return alert(
      "Ви не ввели імʼя, перезавантажте сторінку та спробуйте ще раз.",
    );
  }

  const {
    container: menuContainer,
    triesCounter,
    generateButton,
  } = createMenu(username);
  const { container: slotContainer } = createSlotMachine();

  let currentTry = 0;

  generateButton.addEventListener("click", async () => {
    currentTry++;

    triesCounter.textContent = `Спроба ${currentTry} з ${TRIES_LIMIT}`;

    for (const row of slotContainer.childNodes) {
      const values = getRandomSlots();
      for (let i = 0; i < row.childNodes.length; ++i) {
        const item = row.childNodes[i];
        item.textContent = values[i];
      }
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });

    const middleItems = Array.from(slotContainer.childNodes).map((row) => {
      return row.childNodes[1];
    });

    const isWin = middleItems.every((item) => {
      return item.textContent === middleItems[0].textContent;
    });

    const message = isWin ? "Ви перемогли!" : "Ви програли :(";

    if (currentTry === TRIES_LIMIT || isWin) {
      alert(message);
      currentTry = 0;
      triesCounter.textContent = `Спроба ${currentTry} з ${TRIES_LIMIT}`;
    }
  });

  const container = document.createElement("div");
  container.classList.add("container");
  container.append(menuContainer, slotContainer);
  document.body.append(container);
});

function getRandomSlots() {
  const values = [];
  for (let i = 0; i < 3; ++i) {
    const value = getRandomSlot(values);
    values.push(value);
  }

  return values;
}

function getRandomSlot(currValues) {
  const value = Math.floor(Math.random() * 7) + 1;

  if (currValues.includes(slots[value])) {
    return getRandomSlot(currValues);
  }

  return slots[value];
}

function createSlotMachine() {
  const container = document.createElement("div");
  container.classList.add("slot-machine-container");

  for (let i = 0; i < 3; ++i) {
    const slotRow = document.createElement("div");
    slotRow.classList.add("slot-machine-row");

    const values = getRandomSlots();
    for (let j = 0; j < 3; ++j) {
      const slotItem = document.createElement("span");
      slotItem.classList.add("slot-machine-item");
      slotItem.textContent = values[j];
      slotRow.append(slotItem);
    }

    container.append(slotRow);
  }

  return {
    container,
  };
}

function createMenu(name) {
  const container = document.createElement("div");
  container.classList.add("menu-container");

  const username = document.createElement("span");
  username.classList.add("menu-username");
  username.textContent = name;

  const triesCounter = document.createElement("span");
  triesCounter.classList.add("menu-tries-counter");
  triesCounter.textContent = `Спроба 0 з ${TRIES_LIMIT}`;

  const generateButton = document.createElement("button");
  generateButton.classList.add("menu-generate-button");
  generateButton.textContent = "Generate";

  container.append(username, triesCounter, generateButton);

  return {
    container,
    triesCounter,
    generateButton,
  };
}
