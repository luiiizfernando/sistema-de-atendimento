require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth'); // Importa o módulo de autenticação
const { PubSub } = require('@google-cloud/pubsub');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const pubsub = new PubSub({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    type: 'service_account',
    project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
    private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
    auth_uri: process.env.GOOGLE_CLOUD_AUTH_URI,
    token_uri: process.env.GOOGLE_CLOUD_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_CLOUD_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT_CERT_URL,
  }
});

app.use(bodyParser.json());
app.use(cors()); // Habilitando CORS

// Variável global para armazenar o usuário logado no sistema
let usuarioLogado = null;

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', // Host do serviço SMTP do Outlook
  port: 587, // Porta do serviço SMTP do Outlook
  secure: false, // true para usar SSL/TLS, false para usar STARTTLS
  auth: {
    user: 'suporte.atend@outlook.com', // Seu e-mail do Outlook
    pass: 'Suporte.ti' // Sua senha do e-mail do Outlook
  }
});

// Armazenamento em memória para mensagens
const messagesStore = [];

// Endpoint de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = auth.authenticate(username, password);

  // redefine o usuário logado quando a página de login é acessada
  usuarioLogado = null;

  if (user) {
    usuarioLogado = user;
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

const departmentTopics = {
  'email': 'email-topic',
  'hardware': 'hardware-topic',
  'software': 'software-topic'
};

const departmentSubscriptions = {
  'email': 'email-subscription',
  'hardware': 'hardware-subscription',
  'software': 'software-subscription'
};

app.post('/api/tickets', async (req, res) => {
  const { title, name, email, problemType, description, statusLeitura } = req.body;
  const message = { id: new Date().getTime().toString(), title, name, email, problemType, description, statusLeitura };

  const topicName = departmentTopics[problemType];
  const dataBuffer = Buffer.from(JSON.stringify(message));

  try {
    console.log(`Publicando mensagem no tópico: ${topicName}`);
    await pubsub.topic(topicName).publish(dataBuffer);
    console.log('Mensagem publicada com sucesso');
    res.status(200).send('Chamado enviado com sucesso.');
  } catch (error) {
    console.error(`Erro ao publicar mensagem: ${error}`);
    res.status(500).send('Erro ao enviar chamado.');
  }
});

app.get('/api/messages', (req, res) => {
  const department = usuarioLogado.department;
  const subscriptionName = departmentSubscriptions[department];
  const subscription = pubsub.subscription(subscriptionName);

  subscription.on('message', message => {
    console.log(`Recebida mensagem ${message.id}:`);
    console.log(`Data: ${message.data}`);
    console.log(`Atributos: ${JSON.stringify(message.attributes)}`);

    message.ack();
    const messageData = JSON.parse(message.data.toString());
    messagesStore.push(messageData);
  });

  subscription.on('error', error => {
    console.error('Erro ao receber mensagem:', error);
  });

  setTimeout(() => {
    res.json(messagesStore.filter(msg => msg.problemType === department));
  }, 5000); // Ajuste o tempo conforme necessário
});

app.get('/api/message/:id', (req, res) => {
  const { id } = req.params;
  const message = messagesStore.find(msg => msg.id === id);

  if (message) {
    res.json(message);
  } else {
    res.status(404).send('Mensagem não encontrada.');
  }
});

app.post('/api/message/:id/respond', async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  const messageIndex = messagesStore.findIndex(msg => msg.id === id);

  if (messageIndex === -1) {
    return res.status(404).send('Mensagem não encontrada.');
  }

  try {
    const message = messagesStore[messageIndex];

    // Atualiza o statusLeitura para true
    message.statusLeitura = true;

    const mailOptions = {
      from: 'suporte.atend@outlook.com',
      to: message.email,
      subject: `Resposta ao seu chamado: ${message.title}`,
      text: response
    };

    await transporter.sendMail(mailOptions);

    // Envia a resposta de sucesso
    res.json({ message: 'Resposta enviada com sucesso.', statusLeitura: message.statusLeitura });
  } catch (error) {
    console.error('Erro ao enviar resposta:', error);
    res.status(500).send('Erro ao enviar resposta.');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
