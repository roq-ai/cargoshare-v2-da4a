import * as yup from 'yup';

export const routeValidationSchema = yup.object().shape({
  origin: yup.string().required(),
  destination: yup.string().required(),
  truck_id: yup.string().nullable(),
});
