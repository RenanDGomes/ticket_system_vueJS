<!-- <template>
    <div>
      <h2>Detalhes do Ticket</h2>
      <p><strong>Cliente:</strong> {{ ticket.client_name }}</p>
      <p><strong>Criado em:</strong> {{ ticket.created_at }}</p>
  
      <h3>Mensagens</h3>
      <ul>
        <li v-for="message in messages" :key="message.id">
          <strong>{{ message.sender }}</strong>: {{ message.content }}
        </li>
      </ul>
  
      <h3>Nova Mensagem</h3>
      <form @submit.prevent="addMessage">
        <input v-model="newMessage" placeholder="Digite sua mensagem" required />
        <button type="submit">Enviar</button>
      </form>
  
      <button @click="goToTickets" class="btn">Voltar para Tickets</button>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        ticket: {},
        messages: [],
        newMessage: "",
      };
    },
    methods: {
      async fetchDetails() {
        const ticketId = this.$route.params.id;
        try {
          const ticketResponse = await api.get(`/tickets/${ticketId}`);
          const messagesResponse = await api.get(`/tickets/${ticketId}/messages`);
          this.ticket = ticketResponse.data;
          this.messages = messagesResponse.data.messages;
        } catch (error) {
          console.error("Erro ao carregar detalhes:", error);
        }
      },
      async addMessage() {
        const ticketId = this.$route.params.id;
        try {
          await api.post(`/tickets/${ticketId}/messages`, {
            sender: "Cliente",
            content: this.newMessage,
          });
          this.newMessage = "";
          this.fetchDetails();
        } catch (error) {
          console.error("Erro ao adicionar mensagem:", error);
        }
      },
      goToTickets() {
        this.$router.push("/tickets");
      },
    },
    mounted() {
      this.fetchDetails();
    },
  };
  </script>
  
  <style scoped>
  .btn {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
   -->