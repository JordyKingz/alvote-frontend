<template>
    <div id="votes">
      {{ votes }}
    </div>
</template>

<script>
export default {
  name: 'component.votes.overview',
  props: {
    votes: Array,
  }
}
</script>

<style>

</style>