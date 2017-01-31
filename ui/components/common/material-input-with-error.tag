<material-input-with-error>
    <div class="material-input-with-error">
        <material-input error={opts.error} type={opts.type} name={opts.name} value={opts.value} label={opts.label} valueChanged={opts.valueChanged}></material-input>
        <div class='error' show={!!opts.error}><i class="material-icons error_icon" show={!!opts.error}>error_outline</i>{opts.error}</div>
        
    </div>
<style>
    .material-input-with-error {
        position: relative;
    }
    .error {
        color: #941212;
        line-height: 24px;
        max-width: 235px;
    }
</style>
</material-input-with-error>