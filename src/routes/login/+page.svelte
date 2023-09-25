<script lang="ts">
  import { onMount } from "svelte";
  import { firebaseApp } from '$lib/firebase';
  import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
  import { ArrowRightOnRectangle } from "svelte-heros";
	import UserSummaries from "../(authed)/userSummaries/UserSummaries.svelte";


  let user : any = null;
  const auth = getAuth(firebaseApp);

  onMount(() => {
    auth.onAuthStateChanged(u => {
      user = u;
    });
  });

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then(result => {
            const credential = GoogleAuthProvider.credentialFromResult(result) || null;
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
      })
      .catch(error => {
        console.error("Error during Google sign-in", error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  }
</script>

<div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Header -->
    <div class="bg-sky-900 p-4 text-white shadow-md">
      <div class="container mx-auto flex items-center justify-between">
        <!-- Logo and Title -->
        <div class="flex items-center space-x-2">
          <img src="teamone.png" alt="TeamOne Logo" class="h-12 w-10" />
          <h2 class="text-2xl font-semibold">Welcome stranger</h2>
        </div>
    </div>
  
    <div class="bg-sky-900 p-4 text-white shadow-md">
        <!-- Navigation -->
        {#if user}
        <nav class="space-x-4">
          <a href="/userSummaries" class="text-white hover:text-sky-500 transition duration-150">Past Submissions</a>
          <a href="/summary" class="text-white hover:text-sky-500 transition duration-150">Summary</a>
          <button on:click={() => auth.signOut()} class="text-white hover:text-sky-500 transition duration-150">Logout</button>
        </nav>
        {:else}
        <nav class="space-x-6 items-center">
          <button on:click={loginWithGoogle} class="flex items-center justify-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-100 transition duration-150">
            <ArrowRightOnRectangle class="w-5 h-5"/>
            <span>Login with Google</span>
          </button>
        </nav>
        {/if}
      </div>
    </div>  
  </div>