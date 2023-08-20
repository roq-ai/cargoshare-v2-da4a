import { BookingInterface } from 'interfaces/booking';
import { TruckInterface } from 'interfaces/truck';
import { GetQueryInterface } from 'interfaces';

export interface RouteInterface {
  id?: string;
  origin: string;
  destination: string;
  truck_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  truck?: TruckInterface;
  _count?: {
    booking?: number;
  };
}

export interface RouteGetQueryInterface extends GetQueryInterface {
  id?: string;
  origin?: string;
  destination?: string;
  truck_id?: string;
}
