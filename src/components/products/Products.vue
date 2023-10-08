<template>
  <div class="my-10 container mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="font-semibold text-xl">Products</h1>

      <div class="flex flex-wrap gap-x-1">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="`${
            activeTab == category.category_name
              ? 'bg-[#99CC33]'
              : 'bg-white text-[#000]'
          } text-white border-[1px] border-[#e1f1f5] rounded text-[15px] font-medium py-1 px-2`"
          @click="activeTab = category.category_name"
        >
          {{ category.category_name }}
        </button>
      </div>
    </div>
    <p>{{ page }}</p>
    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 my-10"
    >
      <ProductItem
        v-for="product in products"
        :key="product?.id"
        :product="product"
        :pageType="pageType"
      />
    </div>
  </div>
  <cart-modal :isOpen="modalStore.isCartModalOpen"></cart-modal>
</template>
<script setup>
import { ref } from "vue";
import baseAPI from "../../../axiosClient";
import ProductItem from "@/components/products/ProductItem.vue";
import CartModal from "@/components/modals/CartModal.vue";
import { useModalStore } from "../../stores/counter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
const modalStore = useModalStore();

const fetchCategories = async () => {
  const response = await baseAPI.get("categories");
  return response.data;
};

const { products, pageType } = defineProps(["products", "pageType"]);

const { data: categories } = useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});

const activeTab = ref("smartphones");
</script>