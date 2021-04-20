import { IAddress } from "./IAddress";
import { INumber } from "./INumber";
import { ISocialMedia } from "./ISocialMedia";

export interface ICustomer {
    idCustomer: number;
    name: string;
    birthdayDate: Date;
    cpfNumber: string;
    rgNumber: string;

    numbers: Array<INumber>;
    addresses: Array<IAddress>;
    socialMedias: Array<ISocialMedia>;
  }