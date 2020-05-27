import { Component, OnInit } from '@angular/core';
import {Contact} from './models/contact';
import { ContactsService } from './services/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'contacts-app';
  contactsArray : Contact[];

  constructor(private contactService: ContactsService) {}


  
  selectedContact: Contact= {_id : '', name:"", phone: ""};

  ngOnInit() {
    // ...
    this.getList();
    
  }

  getList(){
    this.contactService.GetList()
        .subscribe((contacts: any) => {this.contactsArray = JSON.parse(contacts._body)
          this.contactsArray = this.contactsArray.filter(x => x.active == true);
        });
  }

  SaveContact(){
    this.contactService.Create(this.selectedContact).subscribe((contact: any) =>{
      this.getList();
    });
  }

  updateContact(){
    this.contactService.Update(this.selectedContact).subscribe((contact: any) =>{
      this.getList();
    });
  }

  deleteContact(){
    this.contactService.Delete(this.selectedContact).subscribe((contact: any) =>{
      this.getList();
    });
  }

  openForEdit(contact: Contact): void 
  {
    this.selectedContact = contact;
  }

  addOrEdit(): void
  { 
    console.log(this.selectedContact._id);
    if(this.selectedContact._id === '') // INSERT
    {
      this.SaveContact();
      
    }else{
      this.updateContact();

    }

    this.selectedContact = {_id : '', name:"", phone: ""};
    
  }

  delete(): void 
  {
    if(confirm('Are you sure you want to delete it?'))
    {
      this.deleteContact();
      // this.contactsArray = this.contactsArray.filter(x => x.active == true);
      this.selectedContact = {_id : '', name:"", phone: ""};
    }
  }

  cancel():void{
    this.selectedContact = {_id : '', name:"", phone: ""};
  }
}
