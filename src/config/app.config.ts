interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Business Owner', 'Truck Driver'],
  tenantName: 'Platform',
  applicationName: 'CargoShare v2',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
