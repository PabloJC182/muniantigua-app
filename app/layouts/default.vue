<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
    <Header />
    <main class="flex-grow mx-0">
      <slot />
    </main>
    <Footer />
  </div>
</template>
