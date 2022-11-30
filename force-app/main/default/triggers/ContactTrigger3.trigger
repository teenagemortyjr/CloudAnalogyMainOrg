trigger ContactTrigger3 on Contact (after insert , before delete , before update) {
    
    
    if(Trigger.isUpdate && Trigger.isBefore){
        
        ContactTriggerHandler3.changeTrelloName(Trigger.old, Trigger.new);
    }


}