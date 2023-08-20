import { TransactionInterface } from 'interfaces/transaction';
import { UserInterface } from 'interfaces/user';
import { TruckInterface } from 'interfaces/truck';
import { RouteInterface } from 'interfaces/route';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  guest_id?: string;
  truck_id?: string;
  route_id?: string;
  cargo_space_booked: number;
  booking_cost: number;
  created_at?: any;
  updated_at?: any;
  transaction?: TransactionInterface[];
  user?: UserInterface;
  truck?: TruckInterface;
  route?: RouteInterface;
  _count?: {
    transaction?: number;
  };
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  guest_id?: string;
  truck_id?: string;
  route_id?: string;
}
