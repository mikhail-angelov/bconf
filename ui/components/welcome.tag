<welcome>
  <div class="welcome">
    <h2>welcome</h2>
    <button onclick={onClick}>to login</button>
  </div>
<script>

console.log('constructor')
onClick(){
    console.log('yo')
    riot.route('login')
}
</script>

  <style scoped>

  .welcome h2 {
      color: blue;
  }
  </style>

</welcome>