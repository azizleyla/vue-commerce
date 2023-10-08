<template>
  <router-link
    :to="`/product/${encodeURIComponent(product?.id)}`"
    class="bg-white relative cursor-pointer border-[1px] rounded-md px-5 py-3"
  >
    <div class="w-52 h-52 m-auto">
      <img
        clas
        class="scale-90 hover:scale-100 transition-all w-full"
        src="https://w-t.az/storage/products/2023/09/fgx9XJsP6FHNG4UlQ50SY0HZvhdJli7mGs1DwQMI-full.jpg"
      />
    </div>
    <div class="h-10">
      <p>{{ product?.product_name }}</p>
    </div>
    <div class="my-4 h-11">
      <strong class="flex flex-col text-lg">
        <b class="line-through text-gray-600"> {{ product?.prev_price }}$ </b>
        <b class="text-red-600">{{ product.current_price }}$</b>
      </strong>
    </div>

    <button @click="addFav($event, product)" class="absolute top-2 right-2">
      <Icon v-if="page === 'fav'" icon="iconamoon:close-fill" />

      <Icon
        v-else
        :class="`text-2xl ${product.isFavorite ? 'text-orange-600' : ''}`"
        icon="mdi:heart"
      />
    </button>
    <button
      @click="addCart($event, product)"
      class="bg-[#8DC63F] font-semibold transition-all hover:bg-[#5e822f] w-full flex items-center justify-center gap-2 rounded-md mt-8 py-2 text-white"
    >
      <Icon icon="icon-park-outline:shopping" />
      Add Cart
    </button>
  </router-link>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { toast } from "vue3-toastify";
import CartModal from "@/components/modals/CartModal.vue";
import { useModalStore } from "../../stores/counter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import baseAPI from "../../../axiosClient";

const modalStore = useModalStore();
const addCart = (event, product) => {
  event.preventDefault();
  event.stopPropagation();
  updateCart.mutate(product);

  // toast.success("Product added succeffully");
  modalStore.openModal();
};

const { product, pageType } = defineProps(["product", "pageType"]);
const addFav = (event, product) => {
  event.preventDefault();
  event.stopPropagation();
  updateProductMutation.mutate(product);
};
const addProductToFav = async (product) => {
  const data = { ...product, isFavorite: !product.isFavorite };
  const response = await baseAPI.put(`/products/${product.id}`, data);
  return response.data;
};
const addProductToCart = async (product) => {
  const data = { ...product, isCart: true };
  const response = await baseAPI.put(`/products/${product.id}`, data);
  return response.data;
};
const queryClient = useQueryClient();

const updateProductMutation = useMutation({
  mutationFn: addProductToFav,
  onSuccess: async () => {
    queryClient.invalidateQueries(["products"]);
  },
});
const updateCart = useMutation({
  mutationFn: addProductToCart,
  onSuccess: async () => {
    queryClient.invalidateQueries(["products"]);
    toast.success("Product added to cart succeffully");
  },
});
</script>