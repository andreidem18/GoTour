import { Country } from 'src/app/shared/interfaces';

export interface LocationForm {
    name:        string;
    description: string;
    lat:         number;
    long:        number;
    address:     string;
    country:     Country;
}
