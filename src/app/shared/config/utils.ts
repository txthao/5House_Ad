import * as moment from 'moment';

export class Utils {
    public static isEmail(email: string):boolean {
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
   
    public static isIdentificationExpiredDay(identificationExpiredDay: Date){
        return (new Date()) <  identificationExpiredDay;
    }

    public static isDateEmpty(date: Date) {
        if (date) {
            return false;
        }
        return true;
    }

    public static isName(name: string) {
        let charsCount = name.trim().length;
        return charsCount >= 4 && charsCount <= 25;
    }

    public static isWebsite(websiteUrl: string):boolean {
        let regex=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return regex.test(websiteUrl);
    }

    public static isPhone(tel: string):boolean {
        let regex=/^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
        return regex.test(tel);
    }

    public static isFax(fax: string):boolean {
        let regex=/^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
        return regex.test(fax);
    }

    public static toLocalDateTime(date:string){
        let localString = moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        return localString.toString();
    }

    public static toLocalDate(date:string){
        let localString = moment(date).format(moment.HTML5_FMT.DATE);
        return localString.toString();
    }


    public static toDateTimePicker(date:string){
        let localString = moment(date).format('YYYY-MM-DD H:mm:ss');
        return localString.toString();
    }
}
