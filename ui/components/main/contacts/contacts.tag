import './contactItem.tag'
import '../searchbar.tag'

<contacts>

<searchbar searchContact={searchContact} />
<contact-item each={item in opts.contacts} contact={item}  select_contact_item={parent.selectContact(item)}  />
          
<script>
    this.selectContact = item => () => this.opts.select_contact(item)
</script>

</contacts>