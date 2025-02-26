import ExerciseItem from "/components/ExerciseItem.js"

export default {
  components: { ExerciseItem },
  template: ` <div class="muscle-group-list">
    <div v-for="(group, index) in workouts" :key="index" class="mb-4">
      <h4 class="text-start">{{ group.group }}</h4>
      <ul class="list-group">
        <ExerciseItem
          v-for="(exercise, exIndex) in group.exercises"
          :key="exIndex"
          :exercise="exercise"
        />
      </ul>
    </div>
  </div>`,
  props: {
    workouts: {
      type: Array,
      required: true,
    },
  },
}