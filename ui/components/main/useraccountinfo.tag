<useraccountinfo class="toflex" style="flex-flow: row nowrap; justify-content: flex-start; flex: 1 1 100%;">

     <div class='user-account-foto'>
         <img class="account_photo_img" src="cool.png">
     </div>
     <div class="user-account-info toflex">
        <div class="user-account-name">
            Dmitriev Ivan
        </div>
        <div class="user-account-status">
            Status
        </div>
     </div>
     <div class="user-account-settings toflex">
         <div class="dropdown">
        <material-button class="ui" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" style="background:#edeef0">
            <i class="material-icons" style="font-size:36px; color:black">settings</i>
        </material-button>
        <div class="dropdown-content">
            <div class="toflex link" onclick={addContact}><i class="material-icons">add</i><p>Add Contact!</p></div>
        </div>
         </div>
     </div>
    <style>
        .user-account-info {
            flex-flow: column nowrap;
            padding: 25px 10px;
        }
        .user-account-settings {
            align-items: center;
            padding: 10 25;
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