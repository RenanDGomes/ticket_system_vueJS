<template>
    <div>
      <h2>Mensagens do Ticket</h2>
      <p v-if="clientName">Cliente: {{ clientName }}</p>
      <ul>
        <li v-for="message in messages" :key="message.id">
          <strong>{{ message.sender }}:</strong> {{ message.content }}
        </li>
      </ul>
      <form @submit.prevent="sendMessage">
        <textarea v-model="newMessage.content" placeholder="Escreva uma mensagem"></textarea>
        <input v-model="newMessage.sender" placeholder="Seu nome" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        clientName: "",
        messages: [],
        newMessage: {
          sender: "",
          content: "",
          ticket_id: this.$route.params.ticketId,
        },
      };
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await api.get(`/tickets/${this.$route.params.ticketId}/messages`);
          this.clientName = response.data.client_name;
          this.messages = response.data.messages;
        } catch (error) {
          console.error("Erro ao carregar mensagens:", error);
        }
      },
      async sendMessage() {
        try {
          await api.post(`/tickets/${this.$route.params.ticketId}/messages`, this.newMessage);
          this.newMessage.sender = "";
          this.newMessage.content = "";
          this.fetchMessages();
        } catch (error) {
          console.error("Erro ao enviar mensagem:", error);
        }
      },
    },
    mounted() {
      this.fetchMessages();
    },
  };
  </script>

