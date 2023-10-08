<template>
  <div
    @click.self="modalStore.closeModal"
    :class="` 
     top-0 ${isOpen ? 'cart-modal fixed' : ''}
   
       right-0 h-[100vh] w-full`"
  >
    <div
      :class="`bg-white h-[100vh] ${
        isOpen ? 'right-0' : '-right-96'
      } fixed cart-content z-50   w-[350px] py-10 p-6`"
    >
      <h3 class="font-semibold border-b-[1px] py-3">
        Shopping Cart ({{ cartProducts?.length }})
      </h3>
      <button
        @click="modalStore.closeModal"
        class="absolute top-4 right-2 text-4xl"
      >
        <Icon icon="iconamoon:close-fill" />
      </button>
      <div class="my-5" v-if="cartProducts.length === 0">
        <p>Your cart is empty now.</p>
      </div>
      <div v-else>
        <div class="my-5">
          <div
            v-for="product in cartProducts"
            :key="product?.id"
            class="flex gap-x-3 py-4 border-b-[1px]"
          >
            <img
              class="w-12"
              src="https://cozaa-store.netlify.app/static/media/product2.84cae10c.jpg"
            />
            <div>
              <p class="text-sm">{{ product?.product_name }}</p>
              <span class="text-[13px] text-[#777]"
                >quantity: {{ product?.qty }}</span
              >
              <p class="text-[13px] text-red-700 font-semibold my-1">
                {{ product?.current_price }}$
              </p>
            </div>
            <button
              @click="handleDelete(product)"
              class="ml-auto text-xl self-start"
            >
              <Icon icon="ph:trash-bold" class="text-red-700" />
            </button>
          </div>
        </div>
        <div>
          Total:
          <span class="font-semibold text-lg">
            {{ totalPrice?.toFixed(2) }}$</span
          >
        </div>
        <router-link
          to="/cart"
          class="bg-[#8DC63F] hover:opacity-90 font-semibold flex items-center m-auto my-4 gap-x-1 px-4 h-12 w-full justify-center rounded-full text-white"
        >
          <Icon icon="fluent:cart-16-regular" class="text-2xl" />
          View my cart
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import baseAPI from "../../../axiosClient";
import { useModalStore } from "../../stores/counter";
const modalStore = useModalStore();
const { isOpen } = defineProps(["isOpen"]);
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
const totalPrice = computed(() => {
  return cartProducts?.value.reduce((a, c) => +a + +c.qty * c.current_price, 0);
});

const handleDelete = async (product) => {
  deleteMutation.mutate(product);
};
const deleteFromCart = async (product) => {
  const data = { ...product, isCart: false, qty: 0 };
  const response = await baseAPI.put(`/products/${product.id}`, data);
  return response.data;
};
const deleteMutation = useMutation({
  mutationFn: deleteFromCart,
  onSuccess: async () => {
    queryClient.invalidateQueries(["products"]);
  },
});

console.log(totalPrice);
</script>
<style scoped>
.cart-content {
  transition: all 0.4s ease 0s;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 3px 6px 0px;
}
.cart-modal {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>