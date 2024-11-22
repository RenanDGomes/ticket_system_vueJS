import { createRouter, createWebHistory } from "vue-router";
import TicketList from "@/components/TicketList.vue";
import TicketForm from "@/components/TicketForm.vue";
import TicketMessages from "@/components/TicketMessages.vue";
import ReportsView from "@/components/ReportView.vue";

const routes = [
  { path: "/tickets", component: TicketList },
  { path: "/tickets/new", component: TicketForm },
  { path: "/tickets/:ticketId/messages", component: TicketMessages },
  { path: "/reports", component: ReportsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



