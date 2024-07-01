document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageId = urlParams.get('messageId');

    try {
        const response = await fetch(`https://sistema-de-atendimento.onrender.com/api/message/${messageId}`, {
            method: 'GET',
            //credentials: 'include' // Para garantir que os cookies de sessão sejam enviados
        });

        const message = await response.json();
        const messageDetailsContainer = document.getElementById('message-details');

        messageDetailsContainer.innerHTML = `
            <p><strong>Nome:</strong> ${message.name}</p>
            <p><strong>Email:</strong> ${message.email}</p>
            <p><strong>Tipo de Problema:</strong> ${message.problemType}</p>
            <p><strong>Descrição:</strong> ${message.description}</p>
        `;
    } catch (error) {
        console.error('Erro ao carregar detalhes da mensagem:', error);
        alert('Erro ao carregar detalhes da mensagem.');
    }

    const responseForm = document.getElementById('response-form');
    responseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const responseText = document.getElementById('response').value;

        try {
            await fetch(`https://sistema-de-atendimento.onrender.com/${messageId}/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ response: responseText }),
                //redentials: 'include' // Para garantir que os cookies de sessão sejam enviados
            });

            alert('Resposta enviada com sucesso.');
            window.location.href = 'dashboard.html'; // Redireciona para a dashboard após enviar a resposta
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
            alert('Erro ao enviar resposta.');
        }
    });
});
