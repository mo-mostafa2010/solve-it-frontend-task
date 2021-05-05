<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<template>
  <div>
    <button :class="$style.button" @click="goBack" v-on="$listeners">
      Back
      <b-icon font-scale="1" icon="arrow-left"></b-icon>
    </button>
    <hr />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.button {
  cursor: pointer;
  border: none;
  &:disabled {
    cursor: not-allowed;
  }
}
</style>
