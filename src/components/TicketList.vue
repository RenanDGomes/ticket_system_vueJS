<template>
  <div>
    <h2>Lista de Tickets</h2>
    <button @click="fetchTickets">Carregar Tickets</button>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <strong>{{ ticket.client_name }}</strong> - Criado em:
        {{ ticket.created_at }}
        <button @click="viewDetails(ticket.id)">Ver Detalhes</button>
      </li>
    </ul>
    <button @click="goToCreateTicket">Novo Ticket</button>
  </div>
  <button class="reports" @click="goToReports">Reports</button>
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
        this.$router.push("/reports")
    },
  },
  mounted() {
    this.fetchTickets();
  },
};
</script>

