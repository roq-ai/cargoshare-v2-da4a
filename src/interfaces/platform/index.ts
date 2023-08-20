import { TransactionInterface } from 'interfaces/transaction';
import { TruckInterface } from 'interfaces/truck';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PlatformInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  transaction?: TransactionInterface[];
  truck?: TruckInterface[];
  user?: UserInterface;
  _count?: {
    transaction?: number;
    truck?: number;
  };
}

export interface PlatformGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
