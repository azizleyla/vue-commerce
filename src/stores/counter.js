import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', () => {
  const isCartModalOpen = ref(false)

  function openModal() {
    isCartModalOpen.value = true;
  }
  function closeModal() {
    isCartModalOpen.value = false;

  }
  return { isCartModalOpen, openModal, closeModal }
})
