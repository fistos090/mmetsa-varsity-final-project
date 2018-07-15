export class Customer{
    
    id?: number;
    //@Column(length = 30)
    firstname?: string;
    //@Column(length = 30)
    lastname?: string;
    //@Column(length = 40)
    email: string;
    //@Column(length = 50)
    password: string;
    //@Column(length = 15)
    cellphonNumber: string;
    //@Column(length = 7)
    gender: string;
    //@Column(length = 20)
    dateOfBirth: string;
    //@Column(length = 100)
    securityQuestuion: string;
    //@Column(length = 100)
    answer: string;
}