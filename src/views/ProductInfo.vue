<template>
  <div class="container mx-auto">
    <div class="flex my-10 gap-x-5 items-center">
      <div class="w-96 h-96">
        <img
          class="w-full h-full rounded-md"
          src="https://lumia-theme.com/cdn/shop/products/2_2d3629e1-0257-47d9-bf8d-b2464b4ddc07.png?crop=center&height=1320&v=1676383031&width=1100"
        />
      </div>
      <div class="">
        <span>{{ product.rating }} reviews</span>
        <h4 class="text-2xl font-medium text-[#314251]">
          {{ product.product_name }}
        </h4>
        <div class="my-4">
          <strong class="flex flex-col">
            <b class="text-xl line-through font-bold text-gray-500">
              {{ product.prev_price }}$
            </b>

            <b class="text-2xl text-red-600">{{ product.current_price }}$</b>
          </strong>
        </div>

        <p class="text-[#314251] font-semibold text-[14px]">
          Code:
          <span class="font-normal underline">{{ product.product_no }}</span>
        </p>
        <p class="text-[14px] font-semibold text-[#314251]">
          Product Type:
          <span class="underline font-normal">
            {{ product.category_name }}</span
          >
        </p>
        <div class="flex gap-x-3 my-5">
          <button
            class="flex items-center gap-x-1 bg-[#99CC33] w-[160px] justify-center rounded-md text-white"
          >
            <Icon icon="fluent:cart-16-regular" />
            Add Cart
          </button>
          <button class="border-[2px] border-[#99CC33] text-lg p-2 rounded">
            <Icon icon="mdi:heart-outline" class="text-lg text-[#333]" />
          </button>
        </div>
      </div>
    </div>
    <div>
      <p class="my-7 text-lg">{{ product.product_name }}</p>
      <h2 class="text-xl mb-4">Features</h2>
      <ul class="max-w-[510px]">
        <li>
          <span class="text-[#808181] text-base w-60">Brand: </span>
          <span>{{ product.brand }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Product Type: </span>
          <span>{{ product.category_name }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Sim Cart: </span>
          <span>{{ product.sim_cart }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Screen size: </span>
          <span>{{ parseFloat(product.screen_size).toFixed(1) }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Operativ storage: </span>
          <span>{{ product.memory }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Operating system: </span>
          <span>{{ product.operating_system }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Weight : </span>
          <span>{{ product.weight }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Color: </span>
          <span>{{ product.color }}</span>
        </li>
        <li>
          <span class="text-[#808181] text-base w-60">Guarantee: </span>
          <span>{{ product.guarantee }} year</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import baseAPI from "../../axiosClient";
const { id } = useRoute().params;
console.log(id);
const fetchProductInfo = async () => {
  const response = await baseAPI.get(`/products/${id}`);
  return response.data;
};

const {
  isLoading,
  isError,
  data: product,
  error,
  refetch,
} = useQuery({
  queryKey: ["productsInfo"],
  queryFn: fetchProductInfo,
});
</script>
<style scoped>
ul li {
  border-top: 1px solid #ededed;
  padding: 14px 0;
  font-size: 14px;
  display: flex;
}
</style>