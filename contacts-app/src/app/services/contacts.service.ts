import {
  Injectable
} from '@angular/core';
import {
  AppHttpService
} from './app-http.service';
import {
  Contact
} from './../models/contact';
import {
  Observable,
  of
} from 'rxjs';
import { Body } from '@angular/http/src/body';



@Injectable({
  providedIn: 'root'
})
export class ContactsService {

 
  constructor(private appHttp: AppHttpService) {}

  Create(contact: Contact) {
    let body = JSON.stringify(contact);
    console.log(body)
    return this.appHttp.post("api/contacts", body);
  }

  GetList() {
    return this.appHttp.get("api/contacts");

  }

  GetContact(contact: Contact){
    return this.appHttp.get("api/contacts");
  }

  Update(contact: Contact){

    let body = JSON.stringify(contact);
    return this.appHttp.put("api/contacts",body);

  }

  Delete(contact: Contact) {
    return this.appHttp.delete("api/contacts?id="+contact._id);

  }




}
