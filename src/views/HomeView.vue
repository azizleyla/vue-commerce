<script setup>
import Products from "@/components/products/Products.vue";

import baseAPI from "../../axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

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
</script>

<template>
  <main>
    <Products :pageType="main" :products="products" />
  </main>
</template>

