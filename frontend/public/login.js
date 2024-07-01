document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log(data.message);
          // Redirecionar para página de dashboard ou outra página autorizada
          window.location.href = '/public/dashboard.html'; // página de destino
        } else {
          console.error('Erro:', data.message);
          alert('Credenciais inválidas. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        alert('Erro ao tentar fazer login.');
      }
    });
  });
  