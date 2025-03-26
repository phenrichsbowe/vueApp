import { ref, computed } from "vue";

export default {
  emits: ["dateChanged"],
  setup(_, { emit }) {
    const TIPS_DISABLED = false;
    const TODAYS_DATE = new Date();

    let totalConsecutiveClicks = 0;

    function increment() {
      totalConsecutiveClicks++

      console.log(totalConsecutiveClicks)

      if (!TIPS_DISABLED && totalConsecutiveClicks >= 10) {
        console.log('tip you can press the date to open a calender view');
        totalConsecutiveClicks = 0;
      }
    }

    const currentDate = ref(new Date());

    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const updateDate = (modifier) => {
      const updatedDate = currentDate.value.getDate() + modifier;

      if (updatedDate > TODAYS_DATE.getDate()) {
        console.log('Exiting early we can\'t move to the next day')
        return;
      }

      currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() + modifier));
      emit("dateChanged", currentDate.value);
    };

    return {
      formattedDate: computed(() => formatDate(currentDate.value)),
      prevDate: () => updateDate(-1),
      nextDate: () => updateDate(1),
      increment
    };
  },
  template: `<div class="d-flex align-items-center justify-content-center gap-3">
    <button class="btn btn-primary" @click="prevDate(); increment();">&lt;</button>
    <div class="px-4 py-2 border rounded bg-light">{{ formattedDate }}</div>
    <button class="btn btn-primary" @click="nextDate">&gt;</button>

    <v-date-picker hidden></v-date-picker>
  </div>`
}