document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('http://localhost:3000/api/messages', {
          method: 'GET',
          //credentials: 'include' // Para garantir que os cookies de sessão sejam enviados
      });

      const messages = await response.json();
      const messagesContainer = document.getElementById('messages');

      messages.forEach(message => {
          if (!message.statusLeitura) { // Verifica se statusLeitura é false
              const row = document.createElement('tr');

              const nameCell = document.createElement('td');
              nameCell.textContent = message.name;

              const titleCell = document.createElement('td');
              titleCell.textContent = message.title;

              const buttonCell = document.createElement('td');
              const button = document.createElement('button');
              button.textContent = 'Ver Detalhes';
              button.classList.add('view-details-button');
              button.onclick = () => viewMessage(message.id);
              buttonCell.appendChild(button);

              row.appendChild(nameCell);
              row.appendChild(titleCell);
              row.appendChild(buttonCell);

              messagesContainer.appendChild(row);
          }
      });
  } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      alert('Erro ao carregar mensagens.');
  }

  // Evento de clique para o botão de logout
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', () => {
      // Redirecionar para a página de login
      window.location.href = 'login.html';
  });
});

function viewMessage(messageId) {
  window.location.href = `details.html?messageId=${messageId}`;
}
