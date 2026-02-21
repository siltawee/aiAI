const API = "http://localhost:3000";

/* REGISTER */
function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.href = "login.html";
    });
}

/* LOGIN */
function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      if (data.username) {
        localStorage.setItem("user", data.username);

        // 👉 ไปหน้าหลัก
        window.location.href = "home.html";
      }
    });
}

/* ===== HOME PAGE CHECK ===== */
if (window.location.pathname.includes("home.html")) {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("welcomeText").innerText =
      "Hello, " + user + " 👋";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}