// ==================== REGISTER ====================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      alert(data.msg || data.message);

      if (res.status === 201) {
        // Redirect to login page after successful registration
        window.location.href = 'login.html';
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
}

// ==================== LOGIN ====================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      alert(data.msg || data.message);

      if (res.status === 200) {
        // Save user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to profile page
        window.location.href = 'profile.html';
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
}

// ==================== PROFILE ====================
const profileDiv = document.getElementById('profileInfo');
if (profileDiv) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    profileDiv.innerHTML = `
      <h2>Welcome, ${user.name}</h2>
      <p>Email: ${user.email}</p>
      <button id="logoutBtn">Logout</button>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  } else {
    profileDiv.innerHTML = '<p>No user logged in.</p>';
  }
}