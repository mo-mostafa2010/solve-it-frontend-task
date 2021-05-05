<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <span :class="status === 'Active' ? 'text-success' : 'text-grey'">
    <b-icon
      font-scale="0.5"
      :variant="status === 'Active' ? 'success' : 'secondary'"
      icon="circle-fill"
    ></b-icon>
    {{ status }}
  </span>
</template>

<style lang="scss" module>
@import '@design';
</style>
