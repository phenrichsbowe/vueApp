import { ref } from "vue";
import DateCarousel from "/components/DateCarousel.js";
import MuscleGroupList from "/components/MuscleGroupList.js"

export default {
  components: {
    DateCarousel,
    MuscleGroupList,
  },
  setup() {
    const currentDate = ref(new Date());
    const workouts = ref([]);
    const showModal = ref(false);
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
        "2025-02-24": [
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
      showModal.value = false;
    };

    fetchWorkouts(currentDate.value);

    return {
      workouts,
      updateDate,
      showModal,
      newExercise,
      saveExercise,
      exerciseNames
    };
  },
  //    <<h1 class="text-center">Fitness App</h1>
  template: `<div class="container mt-4">
    <h2 class="text-center mb-3">Workout History</h2>
    <DateCarousel @dateChanged="updateDate" />
    <div class="workout-history text-center">
      <p v-if="workouts.length === 0">No workouts recorded for this date.</p>
      <MuscleGroupList :workouts="workouts" v-else />
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-success" @click="showModal = true">Add Exercise</button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="baclbsround: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Exercise</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <label class="form-label">Exercise Name</label>
            <select v-model="newExercise.name" class="form-control">
              <option disabled value="">Select an exercise</option>
              <option v-for="exercise in exerciseNames" :key="exercise" :value="exercise">
                {{ exercise }}
              </option>
            </select>
            <label class="form-label mt-2">Sets</label>
            <input v-model="newExercise.sets" class="form-control" type="number" />
            <label class="form-label mt-2">Reps</label>
            <input v-model="newExercise.reps" class="form-control" type="number" />
            <label class="form-label mt-2">Weight</label>
            <input v-model="newExercise.weight" class="form-control" type="number" />
            <label class="form-label mt-2">Time per Set</label>
            <input v-model="newExercise.timePerSet" class="form-control" type="select" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Cancel</button>
            <button type="button" class="btn btn-primary" @click="saveExercise">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}