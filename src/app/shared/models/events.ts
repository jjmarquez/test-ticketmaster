export interface IPager {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IDataFilter {
  keyword: string;
  countryCode?: string;
  city?: string;
  startDateTime?: string;
  endDateTime?: string;
}
