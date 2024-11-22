<template>
    <div>
      <h2>Lista de Tickets</h2>
      <button @click="fetchTickets">Carregar Tickets</button>
      <ul>
        <li v-for="ticket in tickets" :key="ticket.id">
          <strong>{{ ticket.client_name }}</strong> - Criado em:
          {{ ticket.created_at }}
          <button @click="viewDetails(ticket.id)">Ver Detalhes</button>
          <button @click="deleteTicket(ticket.id)" class="delete-btn">Remover</button>
        </li>
      </ul>
      <button @click="goToCreateTicket">Novo Ticket</button>
      <button class="reports" @click="goToReports">Reports</button>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        tickets: [],
      };
    },
    methods: {
      async fetchTickets() {
        try {
          const response = await api.get("/tickets");
          this.tickets = response.data;
        } catch (error) {
          console.error("Erro ao carregar tickets:", error);
        }
      },
      viewDetails(ticketId) {
        this.$router.push(`/tickets/${ticketId}/messages`);
      },
      goToCreateTicket() {
        this.$router.push("/tickets/new");
      },
      goToReports() {
        this.$router.push("/reports");
      },
      async deleteTicket(ticketId) {
        const confirmation = confirm("Tem certeza que deseja remover este ticket?");
        if (confirmation) {
          try {
            await api.delete(`/tickets/${ticketId}`);
            this.tickets = this.tickets.filter((ticket) => ticket.id !== ticketId);
            alert("Ticket removido com sucesso.");
          } catch (error) {
            console.error("Erro ao remover ticket:", error);
            alert("Falha ao remover o ticket.");
          }
        }
      },
    },
    mounted() {
      this.fetchTickets();
    },
  };
  </script>
  
  <style scoped>
  .delete-btn {
    margin-left: 10px;
    background-color: #e63946;
    color: white;
  }
  
  .delete-btn:hover {
    background-color: #b02736;
  }
  </style>
  