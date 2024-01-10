<template>
  <NuxtLayout name="layout-basic">
    <div class="h-full | px-2">
      <ClientOnly>
        <Calendar
          expanded
          v-model="date"
          :attributes="attrs"
          style="width: 100%; border: 0">
          <template #day-content="data">
            <div
              v-if="!data.day.inNextMonth"
              class="flex flex-col gap-2 | px-0.5 py-2">
              <h3
                class="w-fit | px-1.5 py-.5 mx-auto | rounded-full"
                :class="data.attributes.length ? 'bg-black | text-white' : ''"
                style="font-size: 10px">
                {{ data.day.day }}
              </h3>
              <ul class="flex flex-col gap-.5 | min-h-[40px]">
                <li
                  v-for="index in 1"
                  :key="index"
                  class="flex | w-full overflow-hidden | border | p-0.5">
                  <span class="truncate-2 text-[7px]">오라카이가서 수영하기 오라카이가서 수영하기</span>
                </li>
              </ul>
              {{ log(data) }}
            </div>
          </template>
        </Calendar>
      </ClientOnly>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Calendar } from 'v-calendar'

const date = ref(new Date())

const attrs = ref([
  {
    key: 'today',
    dates: new Date(),
  },
])

const log = (data) => {
  console.log(data)
}
</script>

<style scoped lang="scss">
::v-deep(.vc-container) {
  .vc-weeks {
    margin-top: 20px;
    .vc-day {
    width: 100%;
    overflow: hidden;
    border-top: 1px solid #f3f3f3;

    &.is-not-in-month {
      border: 0;
    }
  }
  }
  
}
</style>
