<script>
    import "../app.css";
    export let title = "TeamOne"; 
  </script>
  
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <div class="bg-sky-900 p-4 text-white shadow-md">
          <div class="container mx-auto flex items-center justify-between">
              <!-- Logo and Title -->
              <div class="flex items-center">
                  <img src="teamone.png" alt="TeamOne Logo" class="h-10 w-10 mr-2" />
                  <h1 class="text-2xl font-bold">{title}</h1>
              </div>
              <nav>
                <a href="/summaryList" class="text-white hover:text-sky-500 mr-4">Dashboard</a>
                <a href="/summary" class="text-white hover:text-sky-500">Summary</a>
              </nav>
          </div>
      </div>
  
      <!-- Content -->
      <div class="flex-grow p-4">
          <slot></slot> <!-- This will render the content of the pages that use this layout -->
      </div>
  </div>
