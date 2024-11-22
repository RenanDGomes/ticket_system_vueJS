<template>
  <div>
    <h2 v-if="isEditMode">Editar Ticket</h2>
    <h2 v-else>Criar Novo Ticket</h2>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="ticket.client_name"
        placeholder="Nome do Cliente"
        required
      />
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      ticket: { client_name: "" },
      isEditMode: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.isEditMode) {
          await api.put(`/tickets/${this.$route.params.id}`, this.ticket);
        } else {
          await api.post("/tickets", this.ticket);
        }
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao salvar ticket:", error);
      }
    },
    async fetchTicket() {
      if (this.$route.params.id) {
        this.isEditMode = true;
        const response = await api.get(`/tickets/${this.$route.params.id}`);
        this.ticket = response.data;
      }
    },
  },
  mounted() {
    this.fetchTicket();
  },
};
</script>


