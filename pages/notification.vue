<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border | overflow-hidden">
        <button class="flex" @click="router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div
          class="w-full | text-lg truncate | cursor-pointer"
          @click="router.back()">
          Notification
        </div>
      </header>
    </template>
    <div class="w-full h-full | flex flex-col lg:flex-row gap-4">
      <div
        v-if="!todoStore.expiredTodos?.length"
        class="w-full h-full | flex items-center justify-center">
        Empty notification
      </div>
      <ul v-else class="flex flex-col | w-full overflow-hidden">
        <NuxtLink
          v-for="todo in todoStore.expiredTodos.slice(0, 30)"
          :key="todo.id"
          :to="`/todo/${todo.id}`">
          <li
            class="flex flex-col gap-0.5 | border-b | p-3 | text-sm lg:text-base"
            :class="{
              'bg-gray-200': checkRead(`${todo.id}`),
              'opacity-30': checkRead(`${todo.id}`),
            }">
            <h4 class="relative | flex items-center gap-0.5 | font-bold">
              <div
                v-if="!checkRead(`${todo.id}`)"
                class="absolute top-[2px] left-[2px] | aspect-square w-1.5 | bg-red-500 | rounded-full"></div>
              <i class="icon icon-notification | text-lg | flex-shrink-0"></i>
              <span>Check!</span>
              <span class="ml-auto | text-xs font-normal">
                {{ todo.date }} {{ todo.time }}
              </span>
            </h4>
            <p class="lg:w-[50%] | truncate">
              {{ todo.description }}
            </p>
          </li>
        </NuxtLink>
      </ul>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const router = useRouter()

const todoStore = useTodoStore()
const storageStore = useStorageStore()

const checkRead = (id: string) => {
  return storageStore.readExpiredTodos?.includes(id)
}
</script>

<style></style>
