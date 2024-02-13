import { LightningElement, api } from 'lwc';

export default class ContactForm extends LightningElement {

   @api columns= [];
    fieldValues=[];
    @api rowFields = {};
    

    connectedCallback(){
        try {
            for (const column of this.columns){
                if(column.fieldName !== 'Id' && column.type !== "action"){
                    this.fieldValues.push({
                        ...column,
                        value: this.rowFields[column.fieldName]
                    })
                }
            }
        } catch (error) {
            
        }
    }
    
    handleCloseModal(){
        const closeButton = new CustomEvent('close',);
        this.dispatchEvent(closeButton);
    }
    handleFieldChange(event){
            const fieldName = event.target.dataset.id;
            const fieldValue = event.target.value;
            const rowFields = {...this.rowFields};
            rowFields[fieldName] = fieldValue;
            this.rowFields = rowFields;
            console.log('data senddiiiiing',this.rowFields)
            this.sendFormData()
 
    }
    sendFormData(){
       const saveContact = this.rowFields; 
       const saveEvent= new CustomEvent('send', {
            detail: saveContact 
        });
        this.dispatchEvent(saveEvent);

    }

}