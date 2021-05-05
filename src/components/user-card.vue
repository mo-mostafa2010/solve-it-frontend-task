<script>
import status from '@components/status.vue'
export default {
  components: {
    status,
  },
}
</script>

<template>
  <b-media>
    <template v-slot:aside>
      <img
        class="rounded-circle"
        width="64"
        alt="placeholder"
        src="@assets/images/avatar.png"
      />
    </template>

    <h5 class="mt-0 mb-0 font-weight-bold">Mohamed Mostafa</h5>
    <p class="text-grey"> mo.mostafa@nu.edu.eg </p>
    <p>
      <status status="Active" />
    </p>
  </b-media>
</template>

<style lang="scss" module>
@import '@design';
</style>
