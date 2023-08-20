import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  cargo_space_booked: yup.number().integer().required(),
  booking_cost: yup.number().integer().required(),
  guest_id: yup.string().nullable(),
  truck_id: yup.string().nullable(),
  route_id: yup.string().nullable(),
});
