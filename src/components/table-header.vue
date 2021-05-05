<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <b-row align-v="end" class="mb-2">
    <b-col sm="3">
      <b-card-title class="h5"> {{ title }} </b-card-title>
      <b-card-sub-title
        class="text-grey"
        sub-title-text-variant="muted"
        variant="primary"
      >
        {{ subtitle }}
      </b-card-sub-title>
      <b-form-input v-if="search" type="search"></b-form-input>
    </b-col>
    <b-col offset="5" sm="4">
      <span class="text-grey">
        Showing {{ limit }} of {{ rows }} Users
        <b-form-select
          v-model="limit"
          :class="$style.perPageSelector"
          :options="[5, 10, 20, 30]"
        ></b-form-select>
        per Page
      </span>
    </b-col>
  </b-row>
</template>

<style lang="scss" module>
@import '@design';
.perPageSelector {
  width: 100px;
}
</style>
