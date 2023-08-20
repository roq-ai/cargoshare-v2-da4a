import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  transaction_amount: yup.number().integer().required(),
  booking_id: yup.string().nullable(),
  platform_id: yup.string().nullable(),
});
