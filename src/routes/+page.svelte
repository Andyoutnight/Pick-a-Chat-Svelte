<script>
    import { Router, Route } from 'svelte-spa-router';
    import Login from '../lib/components/Auth/Login.svelte';
    import Register from '../lib/components/Auth/Register.svelte';
    import Chat from '../lib/components/Chat/ChatRoom.svelte';
    
    const routes = {
        '/': Login,
        '/register': Register,
        '/chat': Chat
    };
</script>

<Router {routes} />