import * as yup from 'yup';

export const truckValidationSchema = yup.object().shape({
  name: yup.string().required(),
  cargo_space: yup.number().integer().required(),
  platform_id: yup.string().nullable(),
});
