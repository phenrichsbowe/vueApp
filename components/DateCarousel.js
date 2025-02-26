import { ref, computed } from "vue";

export default {
  emits: ["dateChanged"],
  setup(_, { emit }) {
    const currentDate = ref(new Date());

    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const updateDate = (modifier) => {
      currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() + modifier));
      emit("dateChanged", currentDate.value);
    };

    return {
      formattedDate: computed(() => formatDate(currentDate.value)),
      prevDate: () => updateDate(-1),
      nextDate: () => updateDate(1),
    };
  },
  template: `<div class="d-flex align-items-center justify-content-center gap-3">
    <button class="btn btn-primary" @click="prevDate">&lt;</button>
    <div class="px-4 py-2 border rounded bg-light">{{ formattedDate }}</div>
    <button class="btn btn-primary" @click="nextDate">&gt;</button>
  </div>`
}