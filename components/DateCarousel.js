import { ref, computed } from "vue";

export default {
  emits: ["dateChanged"],
  setup(_, { emit }) {
    const TIPS_DISABLED = false;
    const TODAYS_DATE = new Date();

    let totalConsecutiveClicks = 0;
    const currentDate = ref(new Date());
    const showDatePicker = ref(false);

    function increment() {
      totalConsecutiveClicks++;
      if (!TIPS_DISABLED && totalConsecutiveClicks >= 10) {
        console.log('Tip: You can press the date to open a calendar view.');
        totalConsecutiveClicks = 0;
      }
    }

    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const updateDate = (modifier) => {
      const updatedDate = currentDate.value.getDate() + modifier;
      if (updatedDate > TODAYS_DATE.getDate()) {
        console.log("Exiting early, we can't move to the next day");
        return;
      }
      currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() + modifier));
      emit("dateChanged", currentDate.value);
    };

    const selectDate = (date) => {
      currentDate.value = new Date(date);
      showDatePicker.value = false;
      emit("dateChanged", currentDate.value);
    };

    return {
      formattedDate: computed(() => formatDate(currentDate.value)),
      prevDate: () => updateDate(-1),
      nextDate: () => updateDate(1),
      increment,
      showDatePicker,
      selectDate,
      currentDate
    };
  },
  template: `<div class="d-flex align-items-center justify-content-center gap-3">
    <button class="btn btn-primary" @click="prevDate(); increment();">&lt;</button>
    <div class="px-4 py-2 border rounded bg-light" @click="showDatePicker = true">{{ formattedDate }}</div>
    <button class="btn btn-primary" @click="nextDate">&gt;</button>
    
    <v-dialog v-model="showDatePicker" persistent>
      <v-card>
        <v-date-picker v-model="currentDate" @update:modelValue="selectDate"></v-date-picker>
        <v-card-actions>
          <v-btn text @click="showDatePicker = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>`
}
