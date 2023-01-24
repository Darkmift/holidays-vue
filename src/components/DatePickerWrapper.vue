<template>
  <div class="date-picker">
    <v-date-picker v-model="dateRange" :is-range="props.range" />
  </div>
</template>

<style lang="scss" scoped>
.date-picker {
  display: flex;
  flex-direction: column;
}
</style>

<script setup>
import { watch, ref } from "vue";

const dateRange = ref({});

const props = defineProps({ range: Boolean, dates: Array });
const emit = defineEmits(["emitDates"]);

watch(
  () => dateRange.value,
  (val) => {
    if (val.start && val.end) {
      emit("emitDates", [val.start, val.end]);
      return;
    }
    emit("emitDates", [val, val]);
    /* ... */
  },
  { deep: true }
);
</script>
