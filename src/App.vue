<script setup>
import { ref, computed } from "vue";

import { useQuery } from "@tanstack/vue-query";
import formatDate from "./utils/formatDate";

import ToggleDateMode from "./components/ToggleDateMode.vue";
import DatePickerWrapper from "./components/DatePickerWrapper.vue";
import HolidayList from "./components/HolidayList.vue";

const dateMode = ref(1);
const dates = ref([new Date(), new Date()]);

const handleDateMode = (option) => {
  dateMode.value = option;
};

const fetchHolidays = async () => {
  const [startDate, endDate] = dates.value;

  const urlStr = `https://www.hebcal.com/hebcal?v=1&cfg=json&latitude=31.7963186&longitude=35.175359&maj=on&start=${formatDate(
    startDate
  )}&end=${formatDate(endDate)}`;

  const response = await fetch(urlStr);
  const holidays = await response.json();

  return holidays;
};

const {
  isLoading,
  /*isFetching,*/ isError,
  data: holidaysData,
  error,
  refetch,
} = useQuery({
  queryKey: ["dates"],
  queryFn: fetchHolidays,
});

const handleDateChange = (dateArray) => {
  dates.value = dateArray;
  refetch();
};

const onlyHolidays = computed(() =>
  holidaysData.value?.items?.length
    ? holidaysData.value.items.filter((item) => item.category === "holiday")
    : holidaysData.value.items
);
</script>

<template>
  <main class="container">
    <h1>Hebrew Holidays Browser</h1>
    <h3>Select dates on calendar to view holidays</h3>
    <toggle-date-mode :dateMode="dateMode" @setDateMode="handleDateMode" />
    <date-picker-wrapper
      :range="dateMode === 2 ? true : false"
      @emitDates="handleDateChange"
    />
    <div v-if="isLoading">Loading...</div>
    <div v-if="isError">Error fetching {{ error.message }}</div>
    <holiday-list v-if="onlyHolidays?.length" :holidays="onlyHolidays" />
  </main>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
