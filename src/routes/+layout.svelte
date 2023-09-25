<script>
  import "../app.css";
  export let title = "TeamOne"; 
</script>


<style lang="postcss">
:global(html) {
  background-color: theme(colors.blue.300);
}
</style>

<div class="min-h-screen flex flex-col bg-gray-100">
  <!-- Header -->
  <div class="bg-sky-900 p-4 text-white shadow-md">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo and Title -->
      <div class="flex items-center space-x-2">
        <img src="teamone.png" alt="TeamOne Logo" class="h-10 w-10" />
        <h1 class="text-2xl font-semibold">{title}</h1>
      </div>
      
      <!-- Navigation -->
      <nav class="space-x-4">
        <a href="/userSummaries" class="text-white hover:text-sky-500 transition duration-150">Dashboard</a>
        <a href="/summary" class="text-white hover:text-sky-500 transition duration-150">Summary</a>
      </nav>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-grow p-4 flex items-center justify-center">
    <slot />
  </div>
</div>
