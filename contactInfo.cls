public with sharing class contactInfo {

    @AuraEnabled
    public static List<Contact> getContact(){
        try {
         List<Contact> contactInfo = [SELECT Id, FirstName, LastName, Email FROM Contact ];
            return contactInfo;
        } catch (Exception e) {
        System.debug(e.getMessage());
        throw e;

         }
    }
    @AuraEnabled
    public static Contact updateContact(String contactId, string firstNameRecord, string lastNameRecord, string emailRecord){
        try {
            Contact updateCreated = new Contact(
                Id = contactId
            );
            updateCreated.FirstName = firstNameRecord;
            updateCreated.LastName = lastNameRecord;
            updateCreated.Email = emailRecord;
            update updateCreated;
            return updateCreated;

    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Contact addContact( string firstNameRecord, string lastNameRecord, string emailRecord){
        try {
            Contact addContact = new Contact(
            );
            addContact.FirstName = firstNameRecord;
            addContact.LastName = lastNameRecord;
            addContact.Email = emailRecord;
            insert addContact;
            return addContact;

    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Contact deleteContact(String contactId){
        try {
            Contact deleteContact = new Contact(
                Id = contactId
            );
            delete deleteContact;
            return deleteContact;

    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}