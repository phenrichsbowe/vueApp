export default {
  template: `<li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="exercise-details">
      <h6 class="mb-1">{{ exercise.name }}</h6>
      <small>Sets: {{ exercise.sets }} | Reps: {{ exercise.reps }} | Weight: {{ exercise.weight }} | Time/Set: {{ exercise.timePerSet }}</small>
    </div>
    <span class="badge bg-primary">{{ exercise.sets }} x {{ exercise.reps }}</span>
  </li>`,
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
}