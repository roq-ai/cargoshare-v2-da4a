import { BookingInterface } from 'interfaces/booking';
import { PlatformInterface } from 'interfaces/platform';
import { GetQueryInterface } from 'interfaces';

export interface TransactionInterface {
  id?: string;
  booking_id?: string;
  platform_id?: string;
  transaction_amount: number;
  created_at?: any;
  updated_at?: any;

  booking?: BookingInterface;
  platform?: PlatformInterface;
  _count?: {};
}

export interface TransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  booking_id?: string;
  platform_id?: string;
}
