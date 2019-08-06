const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {};
  [...e.target.elements].forEach((field) => {
    if (['email', 'password'].includes(field.name)) {
      formData[field.name] = field.value;
    }
  });

  const headers = new Headers({
    'Authorization': `Basic ${formData.email}:${formData.password}`,
    'Accept': 'application/json',
  });
  const request = new Request('http://localhost:80/users/auth', {
    method: 'POST',
    headers,
  });
  const loginEl = document.querySelector('.login');
  const alertEl = document.querySelector('.alert');
  const content = document.getElementById('content');

  fetch(request).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alertEl.style.display = 'block';
      alertEl.textContent = 'An error occurred during authentication!';
    }
  }).then((response) => {
    if (response.code === 'SUCCESS') {
      const homeEl = content.querySelector('.home');
      const navEl = document.querySelector('nav');

      loginEl.style.display = 'none';
      homeEl.style.display = 'block';
      navEl.style.display = 'block';
    } else {
      alertEl.style.display = 'block';
      alertEl.textContent = 'Wrong email and password combination';
    }
  }).catch((error) => {
    console.error('Error', error);
  });
});
