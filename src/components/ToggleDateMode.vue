<script setup>
import uuidV4 from "../utils/uuid";

const props = defineProps({ dateMode: Number });

const emit = defineEmits(["setDateMode"]);

const options = [
  { id: uuidV4(), value: 1, text: "Single" },
  { id: uuidV4(), value: 2, text: "Range" },
];
</script>

<template>
  <div class="toggle-date-mode">
    <label :for="option.id" :key="option.id" v-for="(option, index) in options">
      {{ option.text }}
      <input
        type="radio"
        name="date-mode"
        :value="option.value"
        :checked="props.dateMode === option.value"
        :id="option.id"
        :key="index"
        @input="(evt) => emit('setDateMode', +evt.target.value)"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
.toggle-date-mode {
  display: flex;
  label {
    display: flex;
    justify-content: center;
    gap: 10px;
    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>
