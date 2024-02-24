export interface IHousingQueryParams {
  Boligtype: string;
  Tid: string[];
}

export interface IHousingQueryFormParams {
  Boligtype: string;
  TidFrom: string;
  TidTo: string;
}

export interface IDataTypes {
  values?: number[]
  labels?: string[]
}