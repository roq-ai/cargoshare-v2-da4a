import { BookingInterface } from 'interfaces/booking';
import { RouteInterface } from 'interfaces/route';
import { PlatformInterface } from 'interfaces/platform';
import { GetQueryInterface } from 'interfaces';

export interface TruckInterface {
  id?: string;
  name: string;
  cargo_space: number;
  platform_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  route?: RouteInterface[];
  platform?: PlatformInterface;
  _count?: {
    booking?: number;
    route?: number;
  };
}

export interface TruckGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  platform_id?: string;
}
