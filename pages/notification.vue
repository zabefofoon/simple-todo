<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border-b | overflow-hidden"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <button class="flex" @click="router.back()">
          <i
            class="icon icon-arrow-left"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
        <div
          class="w-full | text-lg truncate | cursor-pointer"
          :class="storageStore.getThemeClass('', 'text-white')"
          @click="router.back()">
          {{ $t('Notification') }}
        </div>
      </header>
    </template>
    <div class="w-full h-full | flex flex-col lg:flex-row gap-4">
      <Spinner v-if="loadingStore.todoLoading" class="w-full h-full" />
      <template v-else>
        <div
          v-if="!todoStore.expiredTodos?.length"
          class="w-full h-full | flex items-center justify-center"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ $t('EmptyNotification') }}
        </div>
        <ul v-else class="flex flex-col | w-full overflow-hidden">
          <NuxtLink
            v-for="todo in todoStore.expiredTodos?.slice(0, 30)"
            :key="todo.id"
            :to="`/todo/${todo.id}`">
            <li
              class="flex flex-col gap-0.5 | border-b | p-3 | text-sm lg:text-base"
              :class="{
                [storageStore.getThemeClass('bg-gray-200', 'bg-gray-950 | border-slate-700')]:
                  checkRead(`${todo.id}`),
                'opacity-30': checkRead(`${todo.id}`),
              }">
              <h4 class="relative | flex items-center gap-0.5 | font-bold">
                <div
                  v-if="!checkRead(`${todo.id}`)"
                  class="absolute top-[2px] left-[2px] | aspect-square w-1.5 | bg-red-500 | rounded-full"></div>
                <i
                  class="icon icon-notification | text-lg | flex-shrink-0"
                  :class="storageStore.getThemeClass('', 'text-white')"></i>
                <span :class="storageStore.getThemeClass('', 'text-white')">
                  Check!
                </span>
                <span
                  class="ml-auto | text-xs font-normal"
                  :class="storageStore.getThemeClass('', 'text-white')">
                  {{ todo.date }} {{ todo.time }}
                </span>
              </h4>
              <p
                class="lg:w-[50%] | truncate"
                :class="storageStore.getThemeClass('', 'text-white')">
                {{ todo.description }}
              </p>
            </li>
          </NuxtLink>
        </ul>
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const router = useRouter()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()

const checkRead = (id: string) => {
  return storageStore.readExpiredTodos?.includes(id)
}
</script>

<style></style>
