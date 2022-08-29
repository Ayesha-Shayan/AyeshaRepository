public with sharing class fibnocciSeries {
    
/*Fibnocci Series is the addition of two previous Numbers 
 * Eg ["0,1,1,2,3,5,8,13,..."]*/



    
    public static void getfibnocciseries(){
    Integer num1 = 0;
    Integer num2 = 1;
    Integer[] arr = new Integer[30];
    Integer num1copy = num1;
    Integer num2copy = num2;
    Integer num3;
    String result=' ';
    
    for(integer i=2;i<arr.size();i++){
        num3 = num1+num2;
        result = result + '  '+ num3;
        num1 = num2;
        num2 = num3;
        
    }
    system.debug(num1copy+' '+num2copy+result);


}
    
}
