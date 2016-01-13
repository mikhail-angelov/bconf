export default function ($http) {
  return {
    getContact:  contactId=> {
      return $http.get('/api/users/' + contactId)
    },
    getAllContacts:  ()=> {
        return $http.get('/api/contacts');
    },
    createGuest:  () =>{
      return $http.post('/api/users/createGuest');
    }
  }
};
