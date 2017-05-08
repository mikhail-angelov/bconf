<useraccountinfo class="toflex account_info">
     <div class='user-account-foto toflex'>
         <div class="account-foto" show={getAvatar()}><img src={getAvatar()}></img></div>
         <div class="account-foto" show={!getAvatar()}>{getInitials()}</div>
     </div>
     <div class="user-account-info toflex">
        <div class="user-account-name">
            <h2>{getName()}<h2>
        </div>
        <div class="user-account-status toflex">
            <h3 onclick={onChange} show={!editable}>{this.opts.user.status||"change your status"}</h3>
            <input name='status' show={editable} type="text" value={this.opts.user.status} onkeyup={updateStatus} onblur={onFocus}/>
        </div>
     </div>
<script>

    this.onChange = e=>this.changeStatus(e,this.opts.user.status);

    this.editable = false;

    this.getAvatar = function(){
        return this.opts.user.avatar
    }
    this.getInitials = function(){
        return this.opts.user.firstName.substr(0,1)+this.opts.user.secondName.substr(0,1)
    }
    this.getName = function(){
        return this.opts.user.firstName + ' '+this.opts.user.secondName
    }

    this.changeStatus = (e,input)=> {
        this.editable = !this.editable;
        console.log("input show");
        this.onSelectText(input);
        if(this.editable==false){
            console.log('click');
        }
        if(this.editable==true){
            console.log('clack');
        }

    }


    this.updateStatus = (e)=>{
    const value = e.target.value;
    if(e.keyCode=='13'){
        console.log(e.keyCode);
        this.opts.updatestatus(value);
        this.changeStatus();
    }
}


    this.onSelectText = ()=>{
        console.log ('select');
        this.status.setSelectionRange(0, this.status.value.length);
    }

    this.onFocus = ()=>{
        this.editable = false;
    }
    this.onfocusfield = ()=>{
        console.log('focus');
        //this.status.onblur();
        this.status.focus();
    }


</script>

    <style>

        .account_info{
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            flex: 1 1 100%;
            background-color: #fff;
        }

        .user-account-name h2 {
            margin: auto;
        }

        .user-account-info {
            flex-flow: column nowrap;
            padding: 25px 10px;
            flex-grow: 1;
        }

        .user-account-foto {
            height: 40px;
            width: 40px;
            border: 1px solid grey;
            border-radius: 50%;
            background: #cc0044;
            color: white;
            justify-content: center;
            align-items: center;
            margin: 0 10;
        }

        .account-foto {
            margin: auto;
            font-size: 32px;
            font-weight: 300;

        }

        .user-account-settings {
            flex-direction: column;
            align-items: center;
            padding: 10 0;
        }

        .user-account-status h3:hover {
            background-color: #f0f2f5;
        }

        .user-account-status h3 {
            font-weight: 100;
            width: 100%;
            margin: auto;
            font-size: 1em;
        }

        .user-account-status input {
            font-weight: 100;
            width: 100%;
            margin: auto;
            /* padding-top: 10px; */
            font-size: 0.9em;
        }

        .show {
            display: block;
        }

        .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            padding: 12px 16px;
            z-index: 500;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-content .link {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            align-items: center;
        }

        .dropdown-content .link:hover {
            background-color: #f1f1f1;
            cursor: pointer;
        }

    </style>
</useraccountinfo>