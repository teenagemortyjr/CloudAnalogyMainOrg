import { LightningElement, track } from 'lwc'
import getUsers from '@salesforce/apex/defaultApex.getUserList'
import getPermission from '@salesforce/apex/defaultApex.getProfileFromId'




const columns = [

    { label: 'Id', fieldName: 'Id',type:'String' },
    { label: 'Name', fieldName: 'Name', type: 'string' },
    { label: 'ProfileId', fieldName: 'ProfileId', type: 'String' }
   
]




export default class UserLWC extends LightningElement {

    @track
    userNameList=''
    @track
    user1Detail ;
    @track
    user2Detail = {}
    @track
    user1Profile = {}
    @track
    user2Profile = {}
    @track
    userList
    @track
    user1ProfileId
    @track
    user2ProfileId
    @track
    selectedUserNameFromCombobox1
    @track
    selectedUserNameFromCombobox2
    @track
    isUserListEmpty = true


    columns = columns;


    


    onCombobox1Click(event){
        this.selectedUserNameFromCombobox1 = event.target.value
        console.log(this.selectedUserNameFromCombobox1)


        for(let i = 0;i<this.userList.length;i++){
            console.log("inside the loop"+this.userList[i].Name )
            if(this.selectedUserNameFromCombobox1  == this.userList[i].Name ){
                console.log("user details"+this.userList[i])
                console.log(JSON.stringify(this.userList[i]))
                this.user1Detail = this.userList[i]
                this.user1ProfileId = this.user1Detail.ProfileId
                console.log("profile id"+this.user1ProfileId)
                console.log(JSON.stringify(this.user1Detail))
                break
            }
       }
       this.data = this.user1Detail
       this.isUserListEmpty = false

       getPermission({ProfileId: this.user1ProfileId}).then(result=>{
        console.log("user list -->" + (result))
        this.user1Profile = result
       } )
       .catch(error => {
           console.log("Error is here" + error)
       })
      
    }


    onCombobox2Click(event){

       this.selectedUserNameFromCombobox2 = event.currentTarget.value

       for(let i = 0;i<this.userList.length;i++){
        console.log("inside the loop"+this.userList[i].Name );
        console.log("selected name "+this.selectedUserNameFromCombobox2 );

            if(this.selectedUserNameFromCombobox2  == this.userList[i].Name ){
                console.log("user details"+this.userList[i])
                this.user2Detail = this.userList[i]
                this.user2ProfileId = this.user2Detail.ProfileId
                console.log("profile id"+this.user2ProfileId)
                break
            }
       }
       this.data = this.user2Detail
       this.isUserListEmpty = false

       getPermission({ProfileId: this.user1ProfileId}).then(result=>{
        console.log("user list -->" + (result))
        this.user2Profile = result
       } )
       .catch(error => {
           console.log("Error is here" + error)
       })


    
    }





    onTransferPermissionSetClick() {

        console.log("clicked on transfer permission set")

    }


    connectedCallback() {

        getUsers()
            .then(result => {
                console.log("user list -->" + JSON.stringify(result))

                let optionvalues = [];
                this.userList = result.userList
                console.log("user complete detail --->"+this.userList)


                for (var key in result.userNameList){
                    console.log(`key--${result.userNameList[key]}   value-->${result.userNameList[key]}`);

                    optionvalues.push({label: result.userNameList[key], value: result.userNameList[key]});

                }
                this.userNameList=optionvalues

                console.log("here is List-->" + JSON.stringify(this.userNameList))


            })
            .catch(error => {
                console.log("Error is here" + error)
            })







    }



}