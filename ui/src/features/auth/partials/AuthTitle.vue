<template>
  <div class="wrapper mb-6 md:mb-8">
    <h1 class="title">
      <slot />
    </h1>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  text-align: center;
}

.title {
  display: inline-block;
  padding: 0.25rem 3rem;

  font-size: var(--text-xl);
  border: 1px solid var(--color-black);
  border-top: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  background: var(--color-teal-800);
  color: var(--color-white);
}
</style>
