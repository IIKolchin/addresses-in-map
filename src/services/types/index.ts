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

export interface IMarker {
  lat: number;
  lng: number;
}

export interface IAddress {
  city: string;
  road: string;
  house_number: string;
}

export interface Idata {
  reference: {
    titles: IName[];
    descriptions: IName[];
  };
}
