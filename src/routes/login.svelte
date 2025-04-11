<script lang="ts">
    import { writeText } from "@tauri-apps/api/clipboard";
    import { writable } from "svelte/store";

    let username = writable('');
    let password = writable('');

    async function sendLoginData() {
        
    }


</script>

<main>
    <input type="text" bind:value={$username} />
    <input type="text" bind:value={$password} />
    <button on:click={sendLoginData}>
        SIGN IN
    </button>
</main>