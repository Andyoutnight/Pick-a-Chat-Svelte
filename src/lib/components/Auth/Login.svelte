<script>
    import { login } from '../services/auth';
    import { push } from 'svelte-spa-router';
    
    let username = '';
    let password = '';
    let error = '';
    
    async function handleLogin() {
        const result = await login(username, password);
        if (result.status === 'ok') {
            localStorage.setItem('token', result.token);
            push('/chat');
        } else {
            error = result.message || 'Login failed';
        }
    }
</script>

<div class="auth-box">
    <h2>Login</h2>
    {#if error}<div class="error">{error}</div>{/if}
    <input bind:value={username} type="text" placeholder="Username">
    <input bind:value={password} type="password" placeholder="Password">
    <button on:click={handleLogin}>Login</button>
    <p>Don't have an account? <a href="/register">Register here</a></p>
</div>

<style>
    .auth-box { /* your existing styles */ }
    .error { color: red; }
</style>