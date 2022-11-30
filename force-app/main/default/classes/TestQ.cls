public class TestQ {
    
    
    
    public static  void q1(){
        
        List<Account> acList =  [Select Id ,StartDate__c, EndDate__c From Account Where Id!= null];
        List<Contact> conList = [Select Id,Name,StartDate__c,EndDate__c,AccountId From Contact Where AccountId In: acList];
        List<Account> updateAcList = new List<Account>();
        Map<Id,List<Contact>> IdVsCon = new Map<Id,List<Contact>>();
        
        
        for(Contact con: conList){
            if(IdVsCon.containsKey(con.AccountId)){
                
                IdVsCon.get(con.AccountId).add(con);
                
            }else{
                IdVsCon.put(con.AccountId,new List<Contact>{con});
            }
            
        }
        
        
        for(Account ac :acLIst){
            
            if(IdVsCon.containsKey(ac.Id)){
                Integer diff = null;
                Date sdate = null;
                Date eDate = null;
                
                
                for(Contact con :IdVsCon.get(ac.Id)){
                    
                    if(diff == null){
                        
                        if(con.StartDate__c !=null && con.EndDate__c != null){
                             diff =  con.StartDate__c.daysBetween(con.EndDate__c);   
                             sDate = con.StartDate__c;
                             eDate = con.EndDate__c;
                        }
                    }else{
                        
                        Integer tempDiff = con.StartDate__c.daysBetween(con.EndDate__c);
                        if(tempDiff<diff){
                             sDate = con.StartDate__c;
                             eDate = con.EndDate__c;
                             diff = tempDiff;
                      }
                        
                      }
                    
                    
                    
                }
                
                if(sDate != null && eDate != null){
                    
                    ac.StartDate__c = sDate;
                    ac.EndDate__c = eDate;
                    updateAcList.add(ac);
                    
                    
                }
            }
            
            
        }
        update updateAcList;
     
        
    }

}