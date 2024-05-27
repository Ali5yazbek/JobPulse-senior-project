export interface company {
    name:string;
    phone:string;
    email:string;
    password:string;
    location:string
}
export interface checkC{
    email:string;
    password:string;
}
export interface companyChange{
    company_Id:number;
    password:string;
}