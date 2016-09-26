<useraccountinfo class="toflex account_info">
     <div class='user-account-foto'>
         <img class="account_photo_img" src="cool.png">
     </div>
     <div class="user-account-info toflex">
        <div class="user-account-name">
            <h2>Dmitriev Ivan<h2>
        </div>
        <div class="user-account-status toflex">
            <h3 onclick={this.opts.changestatus} show={!this.opts.editable}>{this.opts.status}</h3>
            <input id="hidden" show={this.opts.editable} type="text" value={this.opts.status} onkeyup={this.opts.updatestatus}/>
            <!-- <material-button onclick={this.opts.changestatus} class="ui" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" style="background:#edeef0">
                <i class="material-icons" style="color:black">edit</i>
            </material-button> -->
        </div>
     </div>
<script>

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
            font-size: 1.3em;
        }
        .user-account-status input {
            font-weight: 100;
            width: 100%;
            margin: auto;
            /* padding-top: 10px; */
            font-size: 1em;
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