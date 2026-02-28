/* ================================
   🔐 AUTH SECTION
================================ */

// LOGIN
async function login() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("userEmail", email);
      window.location.href = "dashboard.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Backend not reachable.");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}

// CHECK LOGIN (Dashboard Protection)
function checkLogin() {
  const user = localStorage.getItem("userEmail");
  if (!user) {
    window.location.href = "login.html";
  }
}

/* ================================
   🩺 SYMPTOM CHECKER SECTION
================================ */

const symptomData = {
  breast: {
    title: "Breast Cancer Screening",
    symptoms: [
      "Lump in breast or underarm",
      "Change in breast size or shape",
      "Skin dimpling or puckering",
      "Nipple discharge (not milk)",
      "Redness or flaky skin on breast",
      "Pain in any area of the breast",
      "Swelling of all or part of breast",
      "Nipple turning inward",
    ],
    foods: [
      "Broccoli & cruciferous vegetables – May reduce cancer risk",
      "Berries – Rich in antioxidants",
      "Green tea – Contains anti-cancer catechins",
      "Turmeric with black pepper – Anti-inflammatory",
      "Walnuts – Reduce inflammation",
      "Garlic – May help slow tumor growth",
    ],
  },

  pcos: {
    title: "PCOD / PCOS Check",
    symptoms: [
      "Irregular periods",
      "Heavy menstrual bleeding",
      "Excessive hair growth (face/body)",
      "Acne or oily skin",
      "Weight gain around abdomen",
      "Hair thinning or hair loss",
      "Darkening of skin (neck, groin)",
      "Difficulty getting pregnant",
    ],
    foods: [
      "Cinnamon tea – Regulates insulin",
      "Spearmint tea – Reduces androgen levels",
      "Leafy greens – Rich in iron & vitamins",
      "Fatty fish – Reduce inflammation",
      "Flaxseeds – Hormone balancing",
      "Sweet potatoes – Low glycemic index",
    ],
  },

  iron: {
    title: "Iron Deficiency Screening",
    symptoms: [
      "Extreme fatigue or weakness",
      "Pale skin",
      "Shortness of breath",
      "Dizziness or lightheadedness",
      "Cold hands and feet",
      "Brittle nails",
      "Unusual cravings (ice, dirt)",
      "Frequent headaches",
    ],
    foods: [
      "Spinach – Iron rich",
      "Lentils – Plant-based iron",
      "Beetroot juice – Boosts hemoglobin",
      "Pomegranate – Rich in iron",
      "Jaggery – Traditional iron source",
      "Vitamin C fruits – Improve iron absorption",
    ],
  },
};

// LOAD SYMPTOMS BASED ON URL
function loadSymptoms() {
  const listContainer = document.getElementById("symptomList");
  const titleElement = document.getElementById("title");

  if (!listContainer || !titleElement) return;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "breast";

  const data = symptomData[type];

  if (!data) return;

  titleElement.innerText = data.title;
  listContainer.innerHTML = "";

  data.symptoms.forEach((symptom) => {
    listContainer.innerHTML += `
      <label>
        <input type="checkbox" />
        ${symptom}
      </label>
    `;
  });
}

// ANALYZE SYMPTOMS
function analyze() {
  const checkboxes = document.querySelectorAll("#symptomList input:checked");
  const count = checkboxes.length;

  const resultBox = document.getElementById("resultBox");
  const resultText = document.getElementById("resultText");
  const foodList = document.getElementById("foodList");

  if (!resultBox || !resultText || !foodList) return;

  let risk = "";
  let className = "";

  if (count === 0) {
    risk = "No significant symptoms detected.";
    className = "low";
  } else if (count <= 3) {
    risk = "Low Risk";
    className = "low";
  } else if (count <= 6) {
    risk = "Moderate Risk - Consider medical advice.";
    className = "moderate";
  } else {
    risk = "High Risk - Please consult a doctor immediately.";
    className = "high";
  }

  resultBox.classList.remove("hidden");

  resultText.innerHTML = `
    <strong class="${className}">${risk}</strong>
    <br>You selected ${count} symptoms.
  `;

  // Load foods
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "breast";
  const foods = symptomData[type].foods;

  foodList.innerHTML = "";
  foods.forEach((food) => {
    foodList.innerHTML += `<li>${food}</li>`;
  });
}

// RESET
function resetCheck() {
  document
    .querySelectorAll("#symptomList input")
    .forEach((cb) => (cb.checked = false));

  const resultBox = document.getElementById("resultBox");
  if (resultBox) resultBox.classList.add("hidden");
}

/* ================================
   🔄 AUTO LOAD WHEN PAGE OPENS
================================ */

window.addEventListener("DOMContentLoaded", () => {
  loadSymptoms();
});
/* ================================
   🌸 PERIOD TRACKER SECTION
================================ */

function loadPeriods() {
  const saved = localStorage.getItem("pinkguard_periods");
  const periods = saved ? JSON.parse(saved).map((d) => new Date(d)) : [];

  updateUI(periods);
}

function addPeriod() {
  const input = document.getElementById("selectedDate");
  const selectedDate = input.value;

  if (!selectedDate) {
    alert("Please select a date");
    return;
  }

  let saved = localStorage.getItem("pinkguard_periods");
  let periods = saved ? JSON.parse(saved).map((d) => new Date(d)) : [];

  periods.push(new Date(selectedDate));
  periods.sort((a, b) => a - b);

  localStorage.setItem("pinkguard_periods", JSON.stringify(periods));

  input.value = "";
  updateUI(periods);
}

function updateUI(periods) {
  const avgElement = document.getElementById("avgCycle");
  const nextElement = document.getElementById("nextPeriod");
  const historyList = document.getElementById("historyList");
  const historySection = document.getElementById("historySection");

  if (!avgElement) return;

  // Calculate average cycle
  let avgCycle = 28;

  if (periods.length >= 2) {
    let total = 0;
    for (let i = 1; i < periods.length; i++) {
      const diff = (periods[i] - periods[i - 1]) / (1000 * 60 * 60 * 24);
      total += diff;
    }
    avgCycle = Math.round(total / (periods.length - 1));
  }

  avgElement.innerText = avgCycle;

  // Next period prediction
  if (periods.length > 0) {
    const last = periods[periods.length - 1];
    const next = new Date(last);
    next.setDate(next.getDate() + avgCycle);

    nextElement.innerText = next.toDateString();
  }

  // Show history
  if (periods.length > 0) {
    historySection.classList.remove("hidden");
    historyList.innerHTML = "";

    periods
      .slice()
      .reverse()
      .forEach((date) => {
        historyList.innerHTML += `<li>🌸 ${date.toDateString()}</li>`;
      });
  }
}
/* ================================
   🍎 NUTRITION TABS
================================ */

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => tab.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");

  const clickedTab = Array.from(tabs).find((tab) =>
    tab.textContent.toLowerCase().includes(tabId),
  );
  if (clickedTab) clickedTab.classList.add("active");
}

function goDashboard() {
  window.location.href = "dashboard.html";
}
