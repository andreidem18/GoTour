import { Location } from 'src/app/locations/interfaces/Location';
import { User } from 'src/app/shared/interfaces/User';

export interface BasicInfo {
    name:        string;
    guideId:     number;
    locationId:  number;
    description: string;
}

export interface BasicInfoForm {
    name:        string;
    location:    Location;
    guide:       User;
    description: string;
}
