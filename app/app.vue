<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import CMS from '@/utils/CMS'; // Adjust the path based on where your CMS.js file is located

onMounted(async () => {
  try {
    const allData = await CMS.get('todos');
    console.log("Fetched all data:", allData); // Log the fetched data
  } catch (error) {
    console.error("Error fetching data:", error); // Log any errors
  }
});
</script>
