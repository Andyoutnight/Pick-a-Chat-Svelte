<script>
    import { onMount } from 'svelte';
    import { getSocket } from '../../services/socket';
    import Message from './Message.svelte';
    
    let messages = [];
    let socket;
    
    onMount(() => {
        socket = getSocket();
        
        socket.on('chat message', (msg) => {
            messages = [...messages, msg];
        });
        
        return () => {
            socket.off('chat message');
        };
    });
</script>

<div class="message-list">
    {#each messages as message}
        <Message {message} />
    {/each}
</div>

<style>
    .message-list {
        height: 80vh;
        overflow-y: auto;
        padding: 1rem;
    }
</style>