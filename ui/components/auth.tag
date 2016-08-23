<auth>
<h2>Login</h2>
<button onclick={onBack}>Back</button>
<button onclick={onLogin}>Login</button>
<script>

onBack(){
    console.log('to welcom')
    riot.route('welcome')
}

onLogin(){
    console.log('login')
    riot.route('main')
}
</script>

</auth>