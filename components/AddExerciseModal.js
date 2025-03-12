import ModalBase from "../components/base/ModalBase.js";

export default {
  emits: ["close-add-exercise"],
  components: {
    ModalBase,
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.$emit('close-add-exercise')
    },
    saveModal() {
      this.showModal = false;
    }
  },
  template: `
    <div v-if="show">
      <!-- ModalBase component receiving the 'show' prop and emitting 'close' event -->
      <ModalBase 
        title="Add Exercise" 
        @close="closeModal"
      >

        <template v-slot:header>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </template>

        <template v-slot:body>
          <form>
            <div class="mb-3">
              <label for="exerciseName" class="form-label">Exercise Name</label>
              <input type="text" class="form-control" id="exerciseName" placeholder="Enter exercise name" />
            </div>
            <div class="mb-3">
              <label for="sets" class="form-label">Sets</label>
              <input type="number" class="form-control" id="sets" placeholder="Number of sets" />
            </div>
            <div class="mb-3">
              <label for="reps" class="form-label">Reps</label>
              <input type="number" class="form-control" id="reps" placeholder="Number of reps" />
            </div>
          </form>
        </template>

        <template v-slot:footer> 
          <div class="mb-3">
            <button type="button" class="btn btn-primary" @click="closeModal">Save Exercise</button>
          </div>
        </template>
      </ModalBase>
    </div>
  `,
};
