import ExerciseGroupListItem from "../components/ExerciseGroupListItem.js"

export default {
  components: { ExerciseGroupListItem },
  // Forwarded from ExerciseGroupListItem
  emits: ['delete-exercise'],
  props: {
    workouts: {
      type: Array,
      required: true,
    },
  },
  template: `<div v-for="(group, index) in workouts" :key="index" class="card m-3">
    <div class="card-header">
      <h4 style="text-align:left">{{ group.group }}</h4>
    </div>
    <div class="card-body">
      <div class="list-group" v-for="(exercise, exIndex) in group.exercises">
          <ExerciseGroupListItem :exercise="exercise" @delete-exercise="$emit('delete-exercise', exercise)"/>
      </div>
    </div>
  </div>`
}