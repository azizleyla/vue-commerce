<template>
  <div class="container mx-auto flex py-10 gap-x-5">
    <div class="w-4/6">
      <h2 class="font-semibold text-xl mb-3">Your Cart</h2>
      <div class="border-[1px] bg-white p-4 rounded">
        <div
          v-for="product in cartProducts"
          :key="product.id"
          class="flex mb-4 border-b-[1px] pb-6"
        >
          <div class="flex w-[40%] gap-x-3 items-center">
            <div>
              <img
                class="w-20 rounded"
                src="https://cozaa-store.netlify.app/static/media/product2.84cae10c.jpg"
              />
            </div>
            <div>
              <h3 class="text-sm">{{ product.product_name }}</h3>
            </div>
          </div>
          <div class="flex w-[60%] justify-between items-center">
            <p>{{ product.current_price }}</p>
            <div class="flex w-[150px] h-11 bg-red-600">
              <button
                class="bg-[#fafafa] text-orange-600 text-xl hover:bg-[#e6e6e6] flex items-center justify-center w-12 text-center border-[1px]"
              >
                <Icon icon="ic:round-minus" />
              </button>
              <input
                type="number"
                class="text-center text-[#666B70] text-lg font-medium"
                :value="product.qty"
              />
              <button
                class="bg-[#fafafa] text-orange-600 text-xl hover:bg-[#e6e6e6] flex items-center justify-center w-12 border-[1px]"
              >
                <Icon icon="ic:round-plus" />
              </button>
            </div>
            <p>{{ totalPrice(product) }}</p>
            <button
              @click="handleDelete(product)"
              class="relative delete w-10 h-10 flex items-center justify-center"
            >
              <Icon icon="ic:baseline-close" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-2/6">
      <h2 class="font-semibold text-xl mb-3">Cart Totals</h2>

      <div class="border-[1px] p-5 bg-white h-[300px] rounded">
        <div class="border-b-[1px] border-dashed">
          <h3>
            Total:
            <span class="font-bold text-xl">{{ subTotal() }}$</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";

import baseAPI from "../../axiosClient";

const queryClient = useQueryClient();

const fetchProducts = async () => {
  const response = await baseAPI.get("products");
  return response.data;
};
const totalPrice = (product) => {
  return product.current_price * +product.qty;
};
const subTotal = () => {
  return cartProducts?.value?.reduce((a, c) => a + c.current_price * c.qty, 0);
};

const handleDelete = (product) => {
  deleteMutation.mutate(product);
};
const deleteProduct = async (product) => {
  const data = { ...product, isCart: false, qty: 1 };
  const response = await baseAPI.put(`/products/${product.id}`, data);
  return response.data;
};
const deleteMutation = useMutation({
  mutationFn: deleteProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(["products"]);
  },
});

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

<style scoped>
input {
  width: calc(100% - 96px);
  appearance: none;
  border-top: 1px solid rgb(230, 230, 230);
  border-bottom: 1px solid rgb(230, 230, 230);
}
.delete::before {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  content: "";
  border-radius: 50%;
  transform: scale(0);
  pointer-events: none;
  background: rgb(242, 122, 26);
}
.delete:hover::before {
  transform: scale(1.5);
  opacity: 0;
  transition: transform 0.5s ease 0s, opacity 0.5s ease 0s,
    visibility 0s ease 0.5s;
}
</style>