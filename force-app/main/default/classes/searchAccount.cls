public class searchAccount {
    
    @AuraEnabled
    Public Static List<Contact> getcontactlist (String sdata){
        String sacc ='%'+sdata+'%';
        List<Contact> ct = [SELECT Name, Account.Name, Title, Phone, Email FROM Contact WHERE Name like:sacc];
        Return ct;
  
    }

}