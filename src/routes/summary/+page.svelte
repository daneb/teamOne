<script lang="ts">
    import {  saveSummaryData } from '$lib/firebase';

    let health = '';
    let productivity = '';
    let focus = '';
    let docRef: any = null;
  
    const handleSubmit = async() => {
      const summaryData = {
        health,
        productivity,
        focus,
        timestamp: new Date().toISOString(),
      };

      docRef = await saveSummaryData(summaryData);

      if (docRef) {
        console.log('Summary data submitted:', summaryData);
      }
  
    };

    
    const subtractDays = (days: number): Date => {
        const result = new Date();
        result.setDate(result.getDate() - days);
        return result;
    };
  </script>
  
  <div class="summary-container bg-gray-100 p-6 rounded-md shadow-md">
    <h2 class="text-blue-500 text-lg font-semibold mb-4">Weekly Summary for {subtractDays(7).toLocaleDateString('en-ZA')} to {new Date().toLocaleDateString('en-ZA')}</h2>
  
    <div class="mb-4">
        <label for="health" class="block text-gray-700 font-bold mb-2">Rate your mental health this past week (0 - excellent, 10 - overwhelmed):</label>
        <input
          id="health"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="number"
          min="0"
          max="10"
          bind:value={health}
        />
      </div>
  
    <div class="mb-4">
      <label for="productivity" class="block text-gray-700 font-bold mb-2">What did you achieve or learn this week?</label>
      <textarea id="productivity" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" bind:value={productivity}></textarea>
    </div>
  
    <div class="mb-4">
      <label for="focus" class="block text-gray-700 font-bold mb-2">What's your focus for next week?</label>
      <textarea id="focus" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" bind:value={focus}></textarea>
    </div>
  
    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" on:click={handleSubmit}>Submit</button>

    {#if docRef}
        <p class="text-green-600">Summary submitted successfully!</p>
    {:else if docRef === null}
        <p class="text-red-600">Failed to submit summary.</p>
    {/if}
  </div>
  