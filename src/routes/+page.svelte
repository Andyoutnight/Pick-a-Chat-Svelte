<script lang="ts">
    import { onMount } from 'svelte';
    import { createClient } from '@supabase/supabase-js';
    import { writable } from 'svelte/store';

    const supabaseUrl = 'https://hdxtugyhxvkcjirfysrg.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeHR1Z3loeHZrY2ppcmZ5c3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTMyNTcsImV4cCI6MjA1OTg4OTI1N30.tLB-E5_LnEqn5hScP6fo1dOFy2XBON0SUFdJOSX1js8'; // replace securely in prod
    const supabase = createClient(supabaseUrl, supabaseKey);

    let messages: any[] = [];
    let errorMessage = '';

    const inputMessage = writable('');

    async function getMessages() {
        const { data, error } = await supabase
            .from('Messages')
            .select()
            .order('created_at', { ascending: true });

        if (error) {
            errorMessage = error.message;
            console.error('Error fetching messages:', error.message);
        } else {
            messages = data || [];
        }
    }

    async function sendMessage() {
        const content = $inputMessage.trim();
        if (!content) return;

        const { error } = await supabase
            .from('Messages')
            .insert([{ content }]);

        if (error) {
            console.error('Error sending message:', error.message);
            errorMessage = error.message;
        } else {
            inputMessage.set('');
            getMessages();
        }
    }

    function formatTimestamp(datetime: string): string {
        const date = new Date(datetime);

        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const dayNum = date.toLocaleDateString('en-US', { day: '2-digit' });
        const year = date.toLocaleDateString('en-US', { year: 'numeric' });
        const time = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return `${day}, ${month} ${dayNum}, ${year} - ${time}`;
    }

    onMount(() => {
        getMessages();
    });
</script>

<main>
    <input type="text" bind:value={$inputMessage} placeholder="Type a message..." />
    <button on:click={sendMessage}>SEND</button>

    <div class="messages">
        {#if errorMessage}
            <p style="color: red;">Error: {errorMessage}</p>
        {:else if messages.length === 0}
            <p>No messages found.</p>
        {:else}
            {#each messages as message}
                <p>[{formatTimestamp(message.created_at)}]: {message.content}</p>
            {/each}
        {/if}
    </div>
</main>
