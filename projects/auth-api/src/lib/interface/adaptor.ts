export interface Adaptor {
  adapt(data: any): any;
  adaptError(data: any): any;
}
