<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center my-5">
      <div class="flex gap-x-4 items-center">
        <div class="w-40 h-16">
          <img class="object-cover w-full h-full" src="../assets/logo.png" />
        </div>
        <p class="font-bold text-xl">*2555</p>
      </div>

      <nav>
        <ul class="flex gap-x-5">
          <li>
            <router-link to="/">Ana səhifə</router-link>
          </li>
          <li>
            <router-link to="/about">Məhsullar</router-link>
          </li>
          <li>
            <router-link to="/contact">Əlaqə</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="bg-[#333] py-5 container mx-auto">
    <div class="flex justify-between">
      <div class="flex items-center w-full gap-2">
        <form class="w-[60%] py-3 px-3 items-center rounded bg-white flex">
          <input
            class="w-full outline-none"
            type="text"
            placeholder="Search product..."
          />
          <Icon class="text-2xl font-semibold" icon="ri:search-line" />
        </form>

        <button
          class="text-white hover:text-orange-500 border-[1px] p-2 px-7 rounded font-semibold"
        >
          Companies
        </button>
      </div>
      <div class="flex items-center">
        <div class="text-white flex items-center gap-x-4">
          <router-link to="/" class="text-2xl">
            <Icon icon="mdi:user-outline" />
          </router-link>
          <router-link to="/favorites" class="text-2xl"
            ><Icon icon="mdi:heart-outline" />
          </router-link>
          <button @click="modalStore.openModal" class="text-2xl relative">
            <Icon icon="fluent:cart-16-regular" />
            <div
              class="absolute -top-2 -right-2 bg-orange-600 rounded-full w-5 h-5 flex items-center justify-center"
            >
              <span class="text-sm font-semibold">{{
                cartProducts?.length
              }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "../stores/counter";
const modalStore = useModalStore();
import { Icon } from "@iconify/vue";
import baseAPI from "../../axiosClient";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
const queryClient = useQueryClient();

const fetchProducts = async () => {
  const response = await baseAPI.get("products");
  return response.data;
};

const {
  isLoading,
  isError,
  data: products,
  error,
  refetch,
} = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
});

const cartProducts = computed(() => {
  return (
    (Array.isArray(products.value) &&
      products?.value?.filter((product) => product.isCart)) ||
    []
  );
});
</script>

<style lang="scss" scoped>
</style>