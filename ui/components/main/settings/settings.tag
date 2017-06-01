<settings>
    <div class="row">
        <div class="col-xs-4 toflex align_items_center">
            <div class="contact_foto" show={getAvatar()}><img src={getAvatar()}></img></div>
            <div class="contact_foto" show={!getAvatar()}>{getInitials()}</div>
            <div class="contact_id">
                <i class="material-icons">computer</i>
                id:{this.opts.user._id}
            </div> 
        </div>
        <div class="col-xs-8 toflex position_of_right_side overflow">
            
            <div class="contact_main_info">     
                <div class="contact_name">
                    <div>
                    {this.opts.user.firstName}
                    {this.opts.user.secondName}
                    </div>
                    <div class="contact_status">"{this.opts.user.status}"</div>
                </div>
            </div>
        </div>
    </div>
<script>
    this.getAvatar = function(){
        return this.opts.user.avatar
    }
    this.getInitials = function(){
        return this.opts.user.firstName.substr(0,1)+this.opts.user.secondName.substr(0,1)
    }
</script>
</settings>