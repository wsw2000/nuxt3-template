<script setup lang="ts">
interface Props {
  defaultVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultVisible: false,
})

const visible = ref(props.defaultVisible)

function onEnter(_el: Element, done: () => void) {
  const el = _el as HTMLElement
  el.style.height = '0'
  // el.offsetHeight // Trigger a reflow, flushing the CSS changes
  el.style.height = el.scrollHeight + 'px'
  el.addEventListener('transitionend', done, { once: true })
}

function onBeforeLeave(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = el.scrollHeight + 'px'
  // el.offsetHeight // Trigger a reflow, flushing the CSS changes
}

function onAfterEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = 'auto'
}

function onLeave(_el: Element, done: () => void) {
  const el = _el as HTMLElement
  el.style.height = '0'
  el.addEventListener('transitionend', done, { once: true })
}
</script>

<template>
  <div>
    <div @click="visible = !visible">
      <slot name="header" :visible="visible" />
    </div>
    <Transition
      enter-active-class="overflow-hidden transition-[height] duration-300 ease-out"
      leave-active-class="overflow-hidden transition-[height] duration-300 ease-out"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div v-show="visible">
        <slot />
      </div>
    </Transition>
  </div>
</template>
