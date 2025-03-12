export default {
  emits: ["delete-exercise"],
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteExercise() {
      this.$emit('delete-exercise', this.exercise);
    },
  },
  template: `
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <p>{{ exercise.name }}</p>
      <span>Sets: {{ exercise.sets }} | Reps: {{ exercise.reps }} | Weight: {{ exercise.weight }} | Time/Set: {{ exercise.timePerSet }}</span>
      <button @click="deleteExercise" class="btn btn-danger btn-sm ml-2">Delete</button>
    </div>
  `,
}
