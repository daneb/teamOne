<script lang="ts">
    import { onMount } from 'svelte';
    import { getAllSummaryData } from '$lib/firebase';
  
    let summaries: string | any[] = [];
  
    onMount(async () => {
      summaries = await getAllSummaryData();
  
      if (summaries) {
        console.log('Summary data retrieved:', summaries);
      }
    });
  
    function getColorFromDate(dateStr: Date) {
      const date = new Date(dateStr);
      const uniqueNumber = date.getDate() + (date.getMonth() + 1) * 100 + date.getFullYear() * 10000;
      const colors = ["bg-sky-100 ", "bg-sky-200 ", "bg-sky-300 ", "bg-sky-400 ", "bg-sky-500 ", "bg-sky-600 ", "bg-sky-700 ", "bg-sky-800 ", "bg-sky-900 "];
      return colors[uniqueNumber % colors.length];
    }
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    {#if summaries.length === 0}
      <div class="bg-white p-6 rounded-md shadow-md text-gray-700 text-center">
        <p>No data available.</p>
      </div>
    {:else}
      <div class="bg-white overflow-hidden shadow-md rounded-lg w-full">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Focus</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Health</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Productivity</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each summaries as item}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">{item.focus}</td>
                <td class="px-6 py-4 whitespace-nowrap">{item.health}</td>
                <td class="px-6 py-4 whitespace-nowrap">{item.productivity}</td>
                <td class="px-6 py-4 whitespace-nowrap">{item.selectedUser}</td>
                <td class="px-6 py-4 whitespace-nowrap {getColorFromDate(item.timestamp)}">{new Date(item.timestamp).toLocaleDateString('en-ZA')}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
   