<contactinformation>
    <div class="row">
        <div class="col-xs-4 toflex align_items_center">
            <div class="contact_foto">
                {this.opts.contact.firstName.substr(0,1).toUpperCase()}{this.opts.contact.secondName.substr(0,1).toUpperCase()}
            </div>
            <div class="contact_id">
                <i class="material-icons">computer</i>
                id:{this.opts.contact.userId}
            </div> 
        </div>
        <div class="col-xs-8 toflex position_of_right_side overflow">
            
            <div class="contact_main_info">     
                <div class="contact_name">
                    <div>
                    {this.opts.contact.firstName}
                    {this.opts.contact.secondName}
                    </div>
                    <div class="contact_status">"{this.opts.contact.status}"</div>
                </div>
                <div class="contact_buttons">
                    <material-button onclick={startNewChat} class="ui" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" style="background:#cc0044; color: white">
                        <i class="material-icons">chat</i>
                    </material-button>
                    <material-button onclick={chatList} class="ui" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" style="background:#cc0044; color: white">
                        <i class="material-icons">phone</i>
                    </material-button>
                </div>
            </div>
            <div class="contact_inf">
                {this.opts.contact.country},{this.opts.contact.city}
            </div>
            <div class="contact_inf">
                Phone Number: "{this.opts.contact.phoneNumber}"
            </div>
            <div class="contact_inf">
                {this.opts.contact.sex}
            </div>
            <div class="contact_inf">
                Birthday: "{this.opts.contact.birthday}""
            </div>
            <div class="contact_inf">
                "{this.opts.contact.date}"
            </div>
            <div class="contact_extra_information">
                Information: "{this.opts.contact.info}"
            </div>
           
        </div>
    </div>
    <script>
    
    this.startNewChat = ()=>{
        this.opts.chatwith(this.opts.contact);
    }

    </script>
    <style>

    
    .contact_main_info {
        width: 100%;
        position: relative;
        font-size: 24px;
        line-height: normal;
        padding-top: 40px;
        border-bottom: 2px solid #e7e8ec;
        color: #42648b;
        font-weight: 200;
    }

    .contact_name {
        float: left;
        font-size: 1.6em;
        max-width: 600px;
    }

    .contact_foto {
        height: 200px;
        width: 200px;
        border-radius: 50%;
        color: #fff;
        background: #cc0044;
        text-align: center;
        font-size: 120px;
        line-height: 200px;
        margin-top: 90px;
    }

    .contact_buttons {
        float: right;
        margin: 0px 50px 0px 0px;  
    }

    .buttons_font_size {
        font-size: 36;
    }

    .align_items_center {
        align-items: center;
    }

    .contact_extra_information {
        font-size: 20px;
        flex: inherit;
        color: #42648b;
        font-weight: 200;
        line-height: 30px;
    }

    .contact_id{
        line-height: 24px;
    }

    .contact_id i {
        float: left;
    }

    .contact_status {
        font-size: 18px;
        line-height: 2;
        margin-left: 10px;
    }

    .contact_inf {
        font-size: 16px;
        border-bottom: 2px solid #e7e8ec;
        color: #42648b;
        font-weight: 200;
        line-height: 50px;
    }

    .overflow {
        overflow: auto;
        padding: 40px 0px;
    }

    </style>
</contactinformation>