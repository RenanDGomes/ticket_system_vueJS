<template>
  <div class="reports">
    <h2>Relatórios</h2>
    <form @submit.prevent="fetchReport" class="report-form">
      <div class="form-group">
        <label for="start-date">Data Inicial:</label>
        <input id="start-date" v-model="startDate" type="date" required />
      </div>
      <div class="form-group">
        <label for="end-date">Data Final:</label>
        <input id="end-date" v-model="endDate" type="date" required />
      </div>
      <button type="submit" class="btn">Gerar Relatório</button>
    </form>

    <p v-if="ticketCount !== null" class="report-result">
      Total de Tickets: <strong>{{ ticketCount }}</strong>
    </p>

    <button @click="exportCSV" class="btn export-btn">Exportar CSV</button>
    <button @click="goToTickets" class="btn export-btn">Tickets</button>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "ReportsView",
  data() {
    return {
      startDate: "",
      endDate: "",
      ticketCount: null,
    };
  },
  methods: {
    async fetchReport() {
      try {
        const response = await api.get(`/reports/tickets_count`, {
          params: { start_date: this.startDate, end_date: this.endDate },
        });
        this.ticketCount = response.data.tickets_count;
      } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        alert("Erro ao gerar relatório. Por favor, tente novamente.");
      }
    },
    async exportCSV() {
      try {
        const response = await api.get("/reports/tickets.csv", {
          responseType: "blob", 
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "tickets_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Erro ao exportar CSV:", error);
      }
    },
    goToTickets() {
        this.$router.push("/tickets")
    },
  },
};
</script>

<style scoped>
.reports {
  max-width: 600px;
  margin: 0 auto;
  padding: 50px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  color: #333;
}

.report-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  display: inline-block;

}

.btn:hover {
  background-color: #0056b3;
}

.export-btn {
  margin-top: 60px;
  background-color: #28a745;
  margin: 5px;
  text-align: center;
  display: inline-block;  
}

.export-btn:hover {
  background-color: #1c7c31;
}

.report-result {
  text-align: center;
  font-size: 1.2em;
  color: #444;
}
</style>
