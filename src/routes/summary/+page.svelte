<script lang="ts">
    import {  saveSummaryData } from '$lib/firebase';
    import { afterUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    var health: number = 0;
    var productivity: string;
    var focus: string;
    var docRef: any = null;
    var selectedUser: string; 
    var isDisabled: boolean = true;
    var failedToSend = false;
    const successMessage = `Summary submitted successfully!`
    const failedMessage = `Failed to submit summary.`
  
    const handleSubmit = async() => {

      failedToSend = false;

      const summaryData = {
        health,
        productivity,
        focus,
        selectedUser,
        timestamp: new Date().toISOString(),
      };

      console.log(summaryData);

      docRef = await saveSummaryData(summaryData);

      if (docRef) {
        console.log('Summary data submitted:', summaryData);
        selectedUser = "";
        health = 0;
        productivity = "";
        focus = "";
      } else {
        console.log(failedMessage, summaryData);
        failedToSend = true; 
      }

      goto('/summaryList');


    };

    const allFieldsFilled = (): boolean => {
        return health && productivity && focus && selectedUser ? true : false;
    };
    
    const subtractDays = (days: number): Date => {
        const result = new Date();
        result.setDate(result.getDate() - days);
        return result;
    };

    afterUpdate (() => {
      isDisabled = !allFieldsFilled();
    });

  </script>



  <!-- Main form container -->
<div class="summary-container mx-auto my-2 bg-white p-8 w-full max-w-xl rounded-md shadow-md space-y-6">

  <!-- Form Header -->
  <h2 class="text-gray-800 text-xl font-medium leading-relaxed mb-4">
      Weekly Summary: {subtractDays(7).toLocaleDateString('en-ZA')} to {new Date().toLocaleDateString('en-ZA')}
  </h2>

  <!-- User selection -->
  <div>
      <label for="user" class="block text-gray-600 font-medium mb-1">Select a user:</label>
      <select id="user" class="form-input w-full" bind:value={selectedUser}>
        <option value="">Select a user</option>
        <option value="Dane">Dane</option>
        <option value="Liam">Liam</option>
        <option value="Janay">Janay</option>
        <option value="JP">JP</option>
        <option value="Wiehan">Wiehan</option>
        <option value="Joel">Joel</option>
        <option value="Tristan">Tristan</option>
        <option value="Lauren">Lauren</option>
      </select>
  </div>

  <!-- Health input -->
  <div>
      <label for="health" class="block text-gray-600 font-medium mb-1">Rate your mental health this past week:</label>
      <input id="health" class="form-input w-full" type="number" min="0" max="10" placeholder="0 - excellent, 10 - overwhelmed" bind:value={health} />
  </div>

  <!-- Productivity input -->
  <div>
      <label for="productivity" class="block text-gray-600 font-medium mb-1">Achievements or learnings this week:</label>
      <textarea id="productivity" class="form-input w-full" bind:value={productivity} rows="2"></textarea>
  </div>

  <!-- Focus input -->
  <div>
      <label for="focus" class="block text-gray-600 font-medium mb-1">Focus for next week:</label>
      <textarea id="focus" class="form-input w-full" bind:value={focus} rows="2"></textarea>
  </div>

  <!-- Submit button -->
  <button class="w-full bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out" on:click={handleSubmit} disabled={isDisabled}>Submit</button>

  <!-- Response Messages -->
  {#if docRef }
      <p class="text-green-600">{successMessage}</p>
  {:else if docRef === null && failedToSend}
      <p class="text-red-600">{failedMessage}</p>
  {/if}
</div>

<!-- Styles for form elements -->
<style>
  .form-input {
      width: 100%;
      padding: 0.5rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-input:focus {
      border-color: #a0aec0;
      box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.1); /* Gives a light blue glow on focus */
      outline: none;
  }
</style>
  