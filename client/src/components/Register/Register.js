


<div>
  <input value={email} onChange={this.onChange('email')} />
  <input type='password' value={password} onChange={this.onChange('password')} />
  <button onClick={() => this.props.register({ email, password })}>Register</button>
</div>