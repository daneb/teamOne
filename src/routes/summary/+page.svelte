<script lang="ts">
    import {  saveSummaryData } from '$lib/firebase';
    import { Icon, ArrowUp, ArrowRightOnRectangle, Home } from "svelte-hero-icons";

    let health = '';
    let productivity = '';
    let focus = '';
    let docRef: any = null;
    let selectedUser = '';
  
    const handleSubmit = async() => {
      const summaryData = {
        health,
        productivity,
        focus,
        selectedUser,
        timestamp: new Date().toISOString(),
      };

      docRef = await saveSummaryData(summaryData);

      if (docRef) {
        console.log('Summary data submitted:', summaryData);
      }
  
    };

    const allFieldsFilled = (): boolean => {
        return health && productivity && focus && selectedUser ? true : false;
    };
    
    const subtractDays = (days: number): Date => {
        const result = new Date();
        result.setDate(result.getDate() - days);
        return result;
    };

    $: isDisabled = !allFieldsFilled();

  </script>
  
  
 
  <div class="summary-container bg-blue-50 p-8 rounded-md shadow-md space-y-6">
    <h2 class="text-sky-700 text-xl font-semibold mb-4 leading-relaxed">
      Weekly Summary: {subtractDays(7).toLocaleDateString('en-ZA')} to {new Date().toLocaleDateString('en-ZA')}
    </h2>
  
    <div>
      <label for="user" class="block text-gray-700 font-bold mb-2">Select a user:</label>
      <select
        id="user"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
        bind:value={selectedUser}
      >
      <option value="">Select a user</option>
      <option value="Dane">Dane</option>
      <option value="Liam">Liam</option>
      <option value="Janay">Janay</option>
      <option value="JP">JP</option>
      <option value="Wiehan">Wiehan</option>
      <option value="Joel">Joel</option>
      <option value="Tristan">Tristan</option>
      <option value="Lauren">Lauren</option>
        <!-- options -->
      </select>
    </div>
  
    <div>
      <label for="health" class="block text-gray-700 font-bold mb-2">Rate your mental health this past week (0 - excellent, 10 - overwhelmed):</label>
      <input
        id="health"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
        type="number"
        min="0"
        max="10"
        bind:value={health}
      />
    </div>
  
    <div>
      <label for="productivity" class="block text-gray-700 font-bold mb-2">What did you achieve or learn this week?</label>
      <textarea 
        id="productivity" 
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 resize-y" 
        bind:value={productivity}
        rows="2"
      ></textarea>
    </div>
  
    <div>
      <label for="focus" class="block text-gray-700 font-bold mb-2">What's your focus for next week?</label>
      <textarea 
        id="focus" 
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 resize-y" 
        bind:value={focus}
        rows="2"
      ></textarea>
    </div>
  
    <button 
      class="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out" 
      on:click={handleSubmit}
      disabled={false}
    >
      Submit
    </button>
  
    {#if docRef}
      <p class="text-green-600">Summary submitted successfully!</p>
    {:else if docRef === null &&  isDisabled === false }
      <p class="text-red-600">Failed to submit summary.</p>
    {/if}
  </div>
  