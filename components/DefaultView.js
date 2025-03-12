import { ref } from "vue";
import DateCarousel from "../components/DateCarousel.js";
import ExerciseGroupList from "../components/ExerciseGroupList.js"
import AddExerciseModal from "../components/AddExerciseModal.js";

export default {
  components: {
    DateCarousel,
    ExerciseGroupList,
    AddExerciseModal
  },
  setup() {
    const currentDate = ref(new Date());
    const modalVisible = ref(false);
    const workouts = ref([]);
    const newExercise = ref({
      name: "",
      sets: 3,
      reps: 10,
      weight: "",
      timePerSet: "",
    });

    const exerciseNames = ref([
      "Bench Press",
      "Squats",
      "Deadlifts",
      "Pull-ups",
      "Bicep Curls",
      "Tricep Dips",
    ]);

    const fetchWorkouts = (date) => {
      const data = {
        "2025-03-12": [
          {
            group: "Chest",
            exercises: [
              { name: "Bench Press", sets: 3, reps: 10, weight: "80lbs", timePerSet: "45s" },
            ],
          },
          {
            group: "Legs",
            exercises: [
              { name: "Squats", sets: 4, reps: 12, weight: "100lbs", timePerSet: "50s" },
            ],
          },
        ],
        "2025-02-25": [
          {
            group: "Back",
            exercises: [
              { name: "Pull-ups", sets: 3, reps: 8, weight: "Bodyweight", timePerSet: "30s" },
            ],
          },
          {
            group: "Arms",
            exercises: [
              { name: "Bicep Curls", sets: 3, reps: 12, weight: "15lbs", timePerSet: "40s" },
            ],
          },
        ],
      };
      const dateKey = date.toISOString().split("T")[0];
      workouts.value = data[dateKey] || [];
    };

    const updateDate = (newDate) => {
      currentDate.value = newDate;
      fetchWorkouts(newDate);
    };

    const saveExercise = () => {
      if (!newExercise.value.name) {
        // inform the user
        return;
      }

      const exerciseData = { ...newExercise.value };

      if (workouts.value.length > 0) {
        workouts.value[0].exercises.push(exerciseData);
      } else {
        workouts.value.push({ group: "Custom", exercises: [exerciseData] });
      }

      newExercise.value = { name: "", sets: 3, reps: 10, weight: "", timePerSet: "" };
    };

    fetchWorkouts(currentDate.value);

    return {
      workouts,
      updateDate,
      newExercise,
      saveExercise,
      exerciseNames,
      modalVisible,
      fetchWorkouts,
      currentDate
    };
  },
  methods: {
    showModal() {
      this.modalVisible = true  
    },
    closeModal() {
      this.modalVisible = false
    },
    handleDeleteExercise(exerciseToDelete) {
      console.log('hello', exerciseToDelete)

      this.workouts.forEach(element => {
        const exerciseIndex = element.exercises.findIndex(exercise => exercise.name === exerciseToDelete.name);

        if (exerciseIndex !== -1) {
          element.exercises.splice(exerciseIndex, 1); // Remove the exercise at that index
          console.log('Deleted exercise:', exerciseToDelete.name);
        }
      });

      //todo: re-render workout history so we don't have an empty list
    }
  },
  template: `
    <div class="container mt-4">
    <h2 class="text-center mb-3">Workout History</h2>
    <DateCarousel @dateChanged="updateDate" />

    <div class="workout-history text-center">
      <p v-if="workouts.length === 0">No workouts recorded for this date.</p>
      <ExerciseGroupList :workouts="workouts" v-else @delete-exercise="handleDeleteExercise" />
    </div>

    <div class="text-center mt-3">
      <button class="btn btn-success" @click="showModal">Add Exercise</button>
    </div>

    <AddExerciseModal :show="modalVisible" @close-add-exercise="closeModal"/>
  </div>`
}