<template>
  <div class="holiday-list">
    <h1>holidays</h1>

    <ul class="main-list">
      <li v-for="(holiday, i) in holidaysFiltered" :key="i + uuidV4()">
        <ul v-for="(attr, j) in Object.keys(holiday)" :key="j + uuidV4()">
          <li>
            <span v-capitalize>
              {{ attr }}
            </span>
            :
            {{ holiday[attr] }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.holiday-list {
  .main-list {
    max-height: 400px;
    overflow-y: scroll;
  }
}
</style>

<script setup>
import { computed } from "vue";
import uuidV4 from "../utils/uuid";

const props = defineProps({ holidays: Array });

const holidaysFiltered = computed(() =>
  props.holidays.filter((i) => i.category === "holiday")
);
</script>
