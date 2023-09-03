<script lang="ts">
    import { onMount } from 'svelte';
    import { getAllSummaryData } from '$lib/firebase';
    import Layout from '../+layout.svelte';

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
      const colors = ["bg-sky-100", "bg-sky-200", "bg-sky-300", "bg-sky-400", "bg-sky-500", "bg-sky-600", "bg-sky-700", "bg-sky-800", "bg-sky-900"];
      return colors[uniqueNumber % colors.length];
    }

</script>
  
{#if summaries.length === 0}
  <p>No data available.</p>
{/if}

<table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
        <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productivity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        {#each summaries as item}
        <tr class={getColorFromDate(item.timestamp)}>
            <td class="px-6 py-4">{item.focus}</td>
            <td class="px-6 py-4">{item.health}</td>
            <td class="px-6 py-4">{item.productivity}</td>
            <td class="px-6 py-4">{item.selectedUser}</td>
            <td class="px-6 py-4">{item.timestamp}</td>
        </tr>
        {/each}
    </tbody>
</table>
 