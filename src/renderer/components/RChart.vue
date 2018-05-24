<template>
    <chart :options="options"></chart>
</template>

<script>
export default {
  props: ['options']
}
</script>

<style>
.echarts {
  height: 300px;
}
</style>
