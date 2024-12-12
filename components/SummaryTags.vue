<template>
  <div
    class="flex flex-col gap-3 | w-full min-w-[200px] | border border-theme rounded-lg | p-4 | bg-theme-3">
    <div
      v-if="loadingStore.todoLoading"
      class="w-full aspect-video lg:aspect-square | flex items-center justify-center">
      <Spinner />
    </div>
    <div
      v-else
      class="my-auto | flex items-center justify-center"
      :class="
        Object.keys(tagLength).length >= 3
          ? 'aspect-square'
          : 'lg:aspect-square'
      ">
      <canvas ref="canvas" width="100%" @click="goTo"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const i18n = useI18n()

const todoStore = useTodoStore()
const settingStore = useSettingStore()
const loadingStore = useLoadingStore()
const storageStore = useStorageStore()
const localePath = useLocalePath()
const canvas = ref<HTMLCanvasElement>()

const tooltipActiveKey = ref<string>('')

const tagLength = computed(() => {
  const result =
    settingStore.setting?.tags.reduce<
      Record<string, Record<string, number | string>>
    >((acc, current) => {
      acc[current.label] = {
        length:
          todoStore.todos?.filter((todo) => todo.tagId === current.id).length ||
          0,
        color: current.color,
        id: current.id,
      }
      return acc
    }, {}) || {}

  return Object.entries(result)
    .sort(([, countA], [, countB]) => countB.length - countA.length)
    .reduce<Record<string, number>>((acc, [key, { color, length, id }]) => {
      acc[key] = { color, length, id }
      return acc
    }, {})
})

const doneLengthByTag = computed(() => {
  return Object.keys(tagLength.value).flatMap(
    (key) =>
      todoStore.todos
        ?.filter((todo) => todo.tag?.label === key)
        .filter((todo) => todo.done).length
  )
})

const undoneLengthByTag = computed(() => {
  return Object.keys(tagLength.value).flatMap(
    (key) =>
      todoStore.todos
        ?.filter((todo) => todo.tag?.label === key)
        .filter((todo) => !todo.done).length
  )
})

const goTo = () => {
  if (!chartEl.value) return
  const { tooltip } = chartEl.value
  if (tooltip?.opacity) {
    const key = `${tooltip.dataPoints[0].label}_${tooltip.dataPoints[0].dataset?.label}`

    if (key === tooltipActiveKey.value) {
      navigateTo({
        path: localePath('/'),
        query: {
          tags: tagLength.value[tooltip.title].id,
          filter: tooltip.dataPoints[0].dataset?.label,
        },
      })
    }
    tooltipActiveKey.value = key
  } else {
    tooltipActiveKey.value = ''
  }
}

const chartEl = ref<Chart>()

watch(canvas, async () => {
  if (!canvas.value) return
  Chart.register(ChartDataLabels)
  chartEl.value = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: Object.keys(tagLength.value).map((key) => `${key}`),
      datasets: [
        {
          label: 'Done',
          backgroundColor(item) {
            return Object.values(tagLength.value)[item.dataIndex]?.color
          },
          borderColor(item) {
            return Object.values(tagLength.value)[item.dataIndex]?.color
          },
          borderWidth: 1,
          data: doneLengthByTag.value,
        },
        {
          label: 'Undone',
          backgroundColor: storageStore.getThemeClass(
            'rgba(71, 85, 105, .2)',
            'rgba(71, 85, 105, .8)'
          ),
          borderColor: storageStore.getThemeClass(
            'rgba(71, 85, 105, .2)',
            'rgba(71, 85, 105, .8)'
          ),
          borderWidth: 1,
          data: undoneLengthByTag.value,
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: false,
          stacked: true,
          ticks: {
            color: storageStore.getThemeClass('', 'white'),
          },
          grid: {
            color: storageStore.getThemeClass(
              'rgba(0, 0, 0, .1)',
              'rgba(255, 255, 255, .1)'
            ),
          },
        },
        y: {
          stacked: true,
          display: false,
          ticks: {
            color: storageStore.getThemeClass('', 'white'),
          },
          grid: {
            color: storageStore.getThemeClass(
              'rgba(0, 0, 0, .1)',
              'rgba(255, 255, 255, .1)'
            ),
          },
        },
      },
      maintainAspectRatio: false, // false로 설정하면 canvas 크기가 변경됩니다.
      aspectRatio: 1, // 원하는 가로:세로 비율로 설정
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          external(context): void {
            // 커스텀 툴팁 구현
            const tooltipModel = context.tooltip

            // DOM 요소가 이미 있는지 확인
            let tooltipEl = document.getElementById('chartjs-tooltip')
            if (!tooltipEl) {
              tooltipEl = document.createElement('div')
              tooltipEl.id = 'chartjs-tooltip'
              tooltipEl.classList.add('custom-tooltip')
              document.body.appendChild(tooltipEl)
            }

            // 툴팁 숨김 처리
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = '0'
              return
            }

            // 툴팁 내용 설정
            if (tooltipModel.body) {
              const bodyLines = tooltipModel.body.map((item) => item.lines)

              tooltipEl.innerHTML = bodyLines
                .map((line) => {
                  return `${i18n.t(line[0].split(':')[0].trim())}: ${line[0]
                    .split(':')[1]
                    .trim()}`
                })
                .join('')
            }

            // 툴팁 위치 설정
            const position = context.chart.canvas.getBoundingClientRect()
            tooltipEl.style.opacity = '1'
            tooltipEl.style.left =
              position.left + window.scrollX + tooltipModel.caretX + 'px'
            tooltipEl.style.top =
              position.top + window.scrollX + tooltipModel.caretY + 'px'
          },
        },
        datalabels: {
          align: 'end',
          anchor: 'end',
          color() {
            return storageStore.getThemeClass('rgba(71, 85, 105, 1)', 'white')
          },
          font() {
            return {
              size: 13,
            }
          },
          formatter(_, context: any) {
            return context.datasetIndex === 1
              ? `#${context.chart.data.labels?.[context.dataIndex]}`
              : ''
          },
        },
      },
      layout: {
        padding: {
          right: 40,
        },
      },
    },
  })
})
</script>
<style lang="scss">
.custom-tooltip {
  position: absolute;
  padding: 4px 6px;
  color: white;
  pointer-events: none;
  background: rgba(0 0 0 / 70%);
  border-radius: 5px;
  transition: all 300ms ease;
  font-size: 12px;
}
</style>
