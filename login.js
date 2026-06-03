// Credentials
const CREDS = {
  admin: { username: 'admin', password: 'admin123', redirect: 'admin.html' },
  staff: { username: 'staff', password: 'staff123', redirect: 'staff.html' }
};

let activeRole = 'admin';

// Role Tabs
document.querySelectorAll('.role-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeRole = tab.dataset.role;
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error-msg').classList.remove('show');
  });
});

// Toggle Password Visibility
const pwInput = document.getElementById('password');
const pwToggle = document.getElementById('pw-toggle');
if (pwToggle) {
  pwToggle.addEventListener('click', () => {
    const isText = pwInput.type === 'text';
    pwInput.type = isText ? 'password' : 'text';
    pwToggle.textContent = isText ? '👁' : '🙈';
  });
}

// Login Function
function login() {
  const btn = document.getElementById('login-btn');
  const errMsg = document.getElementById('error-msg');
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  errMsg.classList.remove('show');

  if (!username || !password) {
    showError('Please enter both username and password.');
    return;
  }

  // Show loading state
  btn.classList.add('loading');
  btn.disabled = true;

  setTimeout(() => {
    const cred = CREDS[activeRole];
    if (username === cred.username && password === cred.password) {
      localStorage.setItem('role', activeRole);
      localStorage.setItem('user', username);
      window.location.href = cred.redirect;
    } else {
      btn.classList.remove('loading');
      btn.disabled = false;
      showError('Invalid username or password. Please try again.');
    }
  }, 1200);
}

function showError(msg) {
  const err = document.getElementById('error-msg');
  err.querySelector('span').textContent = msg;
  err.classList.add('show');
}

// Enter key
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') login();
});
