<template>
  <div
    class="max-w-[700px] m-auto flex items-center flex-col justify-center h-[500px]"
    v-if="favoriteProducts.length === 0"
  >
    <button
      class="bg-[#FFF0E4] w-16 h-16 rounded-full flex items-center justify-center"
    >
      <Icon class="text-4xl text-orange-600" icon="mdi:heart" />
    </button>
    <p class="my-3 text-lg text-orange-600 font-semibold">
      Your Favorites List is Still Empty
    </p>
    <span class="text-sm font-medium"
      >No products found in your favorites list. You can add the products you
      want to your favorites by clicking the "Start Shopping" button.</span
    >
    <router-link
      class="bg-orange-600 my-4 h-10 w-48 flex items-center justify-center text-white rounded-md px-2 py-1"
      to="/"
      >Start Shopping</router-link
    >
  </div>
  <Products v-else :pageType="fav" :products="favoriteProducts" />
</template>
<script setup>
import Products from "@/components/products/Products.vue";
import baseAPI from "../../axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { Icon } from "@iconify/vue";

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
const favoriteProducts = computed(() => {
  return products.value?.filter((item) => item.isFavorite);
});
</script>