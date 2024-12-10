<template>
  <UIModal
    modal-name="TodoDetailModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    :content-class="`border-t | w-full h-full | ${storageStore.getThemeClass(
      'bg-white',
      'bg-slate-900 | border-slate-700'
    )}`"
    overlay-class="ml-auto"
    hide-close
    :content-transition="settingStore.screen === 'lg' ? 'none' : 'slide-right'"
    @close="emit('close')">
    <HeaderInner :label="currentTodo?.description || i18n.t('Todo')">
      <ClientOnly>
        <div class="flex items-center gap-1.5">
          <button
            v-if="currentTodo"
            name="Check"
            class="flex | rounded-full"
            :class="
              currentTodo?.done
                ? 'bg-green-500'
                : storageStore.getThemeClass(
                    'border border-slate-400',
                    'border border-white'
                  )
            "
            @click="done">
            <i
              class="icon icon-check"
              :class="
                currentTodo?.done
                  ? 'text-white'
                  : storageStore.getThemeClass('text-slate-500', 'text-white')
              "></i>
          </button>
          <UISelector>
            <template #button="{ showOptions }">
              <button
                class="flex"
                :class="storageStore.getThemeClass('', 'text-white')"
                @click="showOptions()">
                <i class="icon icon-overflow-vertical | text-xl"></i>
              </button>
            </template>
            <template #options="{ showOptions }">
              <div
                class="flex flex-col gap-1.5 | px-4 py-2 | rounded-lg overflow-hidden | whitespace-nowrap"
                :class="storageStore.getThemeClass('', 'text-white')">
                <NuxtLinkLocale
                  :to="editUrl"
                  class="flex items-center gap-1"
                  @click="showOptions(false)">
                  <i class="icon icon-post"></i>
                  <span class="text-sm">{{ i18n.t('DoEdit') }}</span>
                </NuxtLinkLocale>
                <button class="flex items-center gap-1" @click="deleteTodo()">
                  <i class="icon icon-close"></i>
                  <span class="text-sm">{{ i18n.t('DoDelete') }}</span>
                </button>
              </div>
            </template>
          </UISelector>
        </div>
      </ClientOnly>
    </HeaderInner>
    <div
      v-if="loadingStore.todoLoading"
      class="lg:h-full | flex items-center justify-center">
      <Spinner />
    </div>
    <template v-else>
      <div
        class="safe-area-margin-bottom | flex flex-col lg:flex-row gap-3 | h-full overflow-hidden | p-3 lg:p-4">
        <div
          class="w-full h-full | flex flex-col | relative"
          :class="
            currentTodo?.images?.length
              ? 'max-h-[calc(100%-116px)] lg:max-h-[100%]'
              : ''
          ">
          <div
            class="whitespace-pre-wrap | border rounded-lg | overflow-auto h-full resize-none | p-2"
            :class="[
              storageStore.getThemeClass(
                '',
                'bg-slate-900 text-white border-slate-700'
              ),
            ]"
            v-html="escapeHTML(currentTodo?.description)"></div>
          <div class="absolute bottom-2.5 left-3">
            <figcaption
              v-if="
                currentTodo?.leftUptoMinute && currentTodo.leftUptoMinute > 0
              "
              class="w-fit | flex items-center gap-1"
              :class="storageStore.getThemeClass('', 'text-white')">
              <i class="icon icon-timer"></i>
              <span
                v-if="currentTodo?.leftUptoHour && currentTodo.leftUptoHour > 0"
                class="text-xs">
                {{ i18n.t('LeftHours', { hour: currentTodo.leftUptoHour }) }}
              </span>
              <span v-else class="text-xs">
                {{
                  i18n.t('LeftMinits', { minute: currentTodo.leftUptoMinute })
                }}
              </span>
            </figcaption>
          </div>
          <div class="absolute bottom-3 right-3 | flex items-center gap-2">
            <img
              v-if="currentTodo?.linked"
              class="w-[10px]"
              src="~/assets/images/google.svg" />

            <span
              class="text-xs"
              :class="storageStore.getThemeClass('', 'text-white')">
              {{ currentTodo?.createdDate.replaceAll('-', '.').slice(2) }}
            </span>

            <NuxtLinkLocale
              v-if="currentTodo?.tag?.id"
              :to="`/?tags=${currentTodo?.tag.id}`"
              class="w-fit | whitespace-nowrap text-white text-[10px] lg:text-xs px-1.5 py-.5 mx-auto | rounded-full"
              :style="{
                background: currentTodo?.tag?.color || 'black',
              }">
              #{{ currentTodo?.tag?.label }}
            </NuxtLinkLocale>
          </div>
        </div>
        <div
          v-if="currentTodo?.images?.length"
          class="lg:h-full | p-3 mb-4 lg:mb-0 | border rounded-lg"
          :class="storageStore.getThemeClass('', 'border-slate-700')">
          <UICarousel
            v-if="settingStore.screen === 'lg'"
            class="h-full"
            vertical
            perview="auto"
            gap="10px"
            drag-free>
            <UICarouselSlide
              v-for="(image, index) in currentTodo?.images"
              :key="index"
              class="w-[200px] h-[200px] | border rounded-lg overflow-hidden | relative | cursor-grab"
              :class="storageStore.getThemeClass('', 'border-slate-700')"
              @click="showImageModal(index)">
              <img
                class="w-full h-full | object-cover object-center"
                :src="imageSrc(image)" />
            </UICarouselSlide>
          </UICarousel>
          <UICarousel v-else class="w-full" drag-free perview="auto" gap="6px">
            <UICarouselSlide
              v-for="(image, index) in currentTodo?.images"
              :key="index"
              class="w-[80px] h-[80px] | border rounded-lg overflow-hidden | relative"
              :class="storageStore.getThemeClass('', 'border-slate-700')"
              @click="showImageModal(index)">
              <img
                class="w-full h-full | object-cover object-center"
                :src="imageSrc(image)" />
            </UICarouselSlide>
          </UICarousel>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import TodoImageModal from '~/components/TodoImageModal.vue'
import { Todo } from '~/models/Todo'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const i18n = useI18n()

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()
const googleStore = useGoogleStore()

const currentTodo = ref<Todo>()
const setCurrentTodo = (todo?: Todo) => (currentTodo.value = todo)

const deleteTodo = async () => {
  if (!confirm(i18n.t('ConfirmDelete'))) return
  currentTodo.value?.linked
    ? googleStore.deleteTodo2([currentTodo.value])
    : await todoStore.deleteTodo(String(toValue(currentTodo)?.id))
  router.back()
}

const done = () => {
  if (!currentTodo.value) return

  currentTodo.value?.linked
    ? googleStore.doneTodo2(
        [currentTodo.value],
        !(currentTodo.value?.done ?? true)
      )
    : todoStore.doneTodo(
        String(toValue(currentTodo)?.id),
        toValue(currentTodo)?.done
      )

  currentTodo.value.done = !toValue(currentTodo)?.done
}

const {
  open: openImageModal,
  close: closeImageModal,
  patchOptions: patchImageModal,
} = useModal({
  component: TodoImageModal,
  attrs: {
    todo: currentTodo.value,
    startIndex: 0,
    onClose: () => {
      history.back()
    },
  },
})

const showImageModal = (index: number) => {
  navigateTo({
    path: route.path,
    query: {
      ...route.query,
      image: index,
    },
  })
}

const editUrl = computed(() => {
  const query = routerUtil.queryToString(route.query)
  const path = route.path
  return !query
    ? `${path}?edit=${currentTodo.value?.id}`
    : `${path}?${query}&edit=${currentTodo.value?.id}`
})

const loadData = async () => {
  const found = todoStore.todos?.find(
    (todo) => todo.id == route.query.todo?.toString()
  )
  if (found) setCurrentTodo(found)

  if (!found?.linked && currentTodo.value) {
    currentTodo.value.images = await todoStore.getImages(
      route.query.todo?.toString() ?? ''
    )
  }
}
const imageSrc = (image: string | Blob) => {
  return typeof image === 'string' ? image : URL.createObjectURL(image)
}
onMounted(() => {
  loadData()
})

watch(
  () => route.query.image,
  (isShow) => {
    isShow ? openImageModal() : closeImageModal()
    if (isShow)
      patchImageModal({
        attrs: {
          todo: currentTodo.value,
          startIndex: Number(isShow),
        },
      })
  }
)

watch(
  () => todoStore.todos?.length,
  async () => {
    loadData()
  }
)

watch(
  () => route.query.edit,
  async (edit) => {
    if (!edit) loadData()
  }
)
</script>
