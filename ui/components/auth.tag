<auth>
<h2>Login</h2>
<button onclick={onClick}>to main</button>

<script>

onClick(){
    console.log('to main')
    riot.route('main')
}
</script>

</auth>