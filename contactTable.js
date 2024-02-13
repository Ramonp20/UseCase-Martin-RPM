import { LightningElement } from 'lwc';
import getContact from '@salesforce/apex/contactInfo.getContact';
import updateContact from '@salesforce/apex/contactInfo.updateContact';
import addContact from '@salesforce/apex/contactInfo.addContact';
import deleteContact from '@salesforce/apex/contactInfo.deleteContact';
//import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class LightningTable extends LightningElement {
    data = [];
    rowFields = {};
    isDelete =false;
    isEdit = false;
    isNew = false;

    actions = [
        {label: "Show Details", name: 'showDetails'},
        {label: "Delete", name: 'delete'}
    ];
    columns = [
        { label: "Id", fieldName: 'Id' },
        { label: "First Name", fieldName: 'FirstName' },
        { label: "Last Name", fieldName: 'LastName' },
        { label: "Email", fieldName: 'Email' },
        { type: "action", typeAttributes: { rowActions: this.actions } }
    ];
   
    displayModal = false;
    lstContacts = [];
    

    async connectedCallback() {
        try {
            const contacts = await getContact();
            this.lstContacts = contacts;
        } catch (error) {
            console.error(error);
        }
    }

   
    handleOpenModal(){
       this.displayModal = true;
    }
    async handleSave(){
        const saveEvent = this.jsnRowFields;
        if (this.isEdit = true){
            console.log('data to use-----',saveEvent)
            await this.updateContact(
                saveEvent.FirstName, saveEvent.LastName, saveEvent.Email, saveEvent.Id
            );
            this.handleCloseModal();
        }
        if(this.isNew= true){
            await this.addContact(
                saveEvent.FirstName, saveEvent.LastName, saveEvent.Email
            );
            this.handleCloseModal();
        }
        if(this.deleteContact= true){
            await this.deleteContact(
                saveEvent.Id
            );
            this.handleCloseModal();
        }
    

    }
    createContact(){
        this.isNew = true;
        this.handleOpenModal();
    }
    

    handleCloseModal(){
        this.isNew=false;
        this.isEdit = false;
        this.isDelete = false;
        this.displayModal= false;
    }

    handleCardButton(){
       this.handleOpenModal();

    }
    
    
    async obtainContacts() {
        try {
            const contacts = await getContact();
            this.lstContacts = contacts;
        } catch (error) {
            console.error(error);
        }
    }
    async updateContact(firstNameRecord, lastNameRecord, emailRecord, ContactId){
        try {
            const contact = await updateContact({
                firstNameRecord: firstNameRecord,
                lastNameRecord: lastNameRecord,
                emailRecord: emailRecord,
                contactId: ContactId}

            );
            
        } catch (error) {
            console.error(error);
        }
    }
    async addContact(firstNameRecord, lastNameRecord, emailRecord){
        try {
            const contacts = await addContact({
                firstNameRecord: firstNameRecord,
                lastNameRecord: lastNameRecord,
                emailRecord: emailRecord});
        } catch (error) {
            console.error(error);
        }
    }
    async deleteContact(contactId){
        try {
            const contacts = await deleteContact({
                contactId: contactId});
        } catch (error) {
            console.error(error);
        }
    }

    
    handleRowAction(event){
        const actionName = event.detail.action.name;
        this.rowFields= event.detail.row;

        switch(actionName){
            case 'showDetails': 
                this.isEdit= true;
                this.handleOpenModal();
                break;
            case 'delete':
                this.isDelete= true;
                this.handleOpenModal();
                this.title='Delete';

                break;
        }
}

recieveFormData(formData){
        console.log('data recieveing',formData.detail)
        this.jsnRowFields = formData.detail
}
    
 }
