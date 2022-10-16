export interface IForm {
  title: string;
  description: string;
}

export interface IForms {
  forms: IForm[];
}

export interface IName {
  id: number;
  name: string;
}

export interface ITitle {
    titles: IName[];
  } 
  export interface IDescription {
    description: IName[];
  } 

export interface Idata {
  reference: {
    titles: IName[];
    descriptions: IName[];
  };
}
