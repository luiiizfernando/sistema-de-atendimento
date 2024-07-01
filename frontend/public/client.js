document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ticket-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const problemType = document.getElementById('problemType').value;
      const description = document.getElementById('description').value;
      let statusLeitura = false;
  
      try {
        const response = await fetch('https://sistema-de-atendimento-pub-sub.onrender.com/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, name, email, problemType, description, statusLeitura })
        });
  
        console.log('Status da resposta:', response.status);
        const result = await response.text();
        console.log('Resultado da resposta:', result);
        alert(result);
      } catch (error) {
        console.error('Erro ao enviar chamado:', error);
        alert('Erro ao enviar chamado.');
      }
    });
  });
  