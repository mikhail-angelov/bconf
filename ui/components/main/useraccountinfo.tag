<useraccountinfo class="toflex account_info white">
     <div class='user-account-foto'>
         <img class="account_photo_img" src="cool.png">
     </div>
     <div class="user-account-info toflex">
        <div class="user-account-name">
            <h2>Dmitriev Ivan<h2>
        </div>
        <div class="user-account-status toflex">
            <h3 onclick={onChange} show={!editable}>{this.opts.status||"change your status"}</h3>
            <input name='status' show={editable} type="text" value={this.opts.status} onkeyup={this.updateStatus} onblur={onFocus}/>
       <!-- <material-button onclick={this.opts.changestatus} class="ui" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" style="background:#edeef0">
                <i class="material-icons" style="color:black">edit</i>
            </material-button> -->
        </div>
     </div>
<script>

    this.onChange = e=>this.changeStatus(e,this.opts.status);

    this.editable = false;

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
    const change = 'change status here';
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
            flex-basis: 100%;
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