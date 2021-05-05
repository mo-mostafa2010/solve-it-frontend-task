<script>
export default {
  props: {
    keyName: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      default: 'text-grey',
    },
  },
}
</script>

<template>
  <b-card class="m-0 p-0 text-center">
    <b-card-sub-title class="mt-0 mb-0 pt-0">
      {{ keyName }}
    </b-card-sub-title>
    <h3 :class="'font-weight-bold mt-0 mb-0 pt-0 pb-0 ' + textColor">
      {{ value }}
    </h3>
  </b-card>
</template>

<style lang="scss" module>
@import '@design';
</style>
