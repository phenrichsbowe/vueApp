export default {
  emits: ["delete-exercise", "edit-exercise"],
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteExercise() {
      this.$emit("delete-exercise", this.exercise);
    },
    editExercise() {
      this.$emit("edit-exercise", this.exercise);
    },
  },
  template: `
    <div class="list-group-item p-3 border rounded shadow-sm bg-light">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0">{{ exercise.name }}</h5>
        <div>
          <button @click="editExercise" class="btn btn-outline-primary btn-sm me-2">Edit</button>
          <button @click="deleteExercise" class="btn btn-outline-danger btn-sm">Delete</button>
        </div>
      </div>
      <p class="mt-2 mb-0 text-muted">
        <strong>Sets:</strong> {{ exercise.sets }} &nbsp; | &nbsp; 
        <strong>Reps:</strong> {{ exercise.reps }} &nbsp; | &nbsp; 
        <strong>Weight:</strong> {{ exercise.weight }} &nbsp;
        <!-- <strong>Time/Set:</strong> <span v-if="exercise.timePerSet">{{ exercise.timePerSet }}</span> -->
      </p>
    </div>
  `,
};
