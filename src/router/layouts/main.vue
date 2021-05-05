<template>
  <div>
    <b-navbar variant="dark"> </b-navbar>
    <b-navbar type="dark" class="bg-comments">
      <b-navbar-brand href="#">
        <img src="@assets/images/background.png" />
      </b-navbar-brand>
    </b-navbar>
    <b-card>
      <slot background-color="white" />
    </b-card>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
