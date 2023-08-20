import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBooking } from 'apiSdk/bookings';
import { bookingValidationSchema } from 'validationSchema/bookings';
import { UserInterface } from 'interfaces/user';
import { TruckInterface } from 'interfaces/truck';
import { RouteInterface } from 'interfaces/route';
import { getUsers } from 'apiSdk/users';
import { getTrucks } from 'apiSdk/trucks';
import { getRoutes } from 'apiSdk/routes';
import { BookingInterface } from 'interfaces/booking';

function BookingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BookingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBooking(values);
      resetForm();
      router.push('/bookings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BookingInterface>({
    initialValues: {
      cargo_space_booked: 0,
      booking_cost: 0,
      guest_id: (router.query.guest_id as string) ?? null,
      truck_id: (router.query.truck_id as string) ?? null,
      route_id: (router.query.route_id as string) ?? null,
    },
    validationSchema: bookingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Bookings',
              link: '/bookings',
            },
            {
              label: 'Create Booking',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Booking
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Cargo Space Booked"
            formControlProps={{
              id: 'cargo_space_booked',
              isInvalid: !!formik.errors?.cargo_space_booked,
            }}
            name="cargo_space_booked"
            error={formik.errors?.cargo_space_booked}
            value={formik.values?.cargo_space_booked}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('cargo_space_booked', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Booking Cost"
            formControlProps={{
              id: 'booking_cost',
              isInvalid: !!formik.errors?.booking_cost,
            }}
            name="booking_cost"
            error={formik.errors?.booking_cost}
            value={formik.values?.booking_cost}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('booking_cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'guest_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<TruckInterface>
            formik={formik}
            name={'truck_id'}
            label={'Select Truck'}
            placeholder={'Select Truck'}
            fetcher={getTrucks}
            labelField={'name'}
          />
          <AsyncSelect<RouteInterface>
            formik={formik}
            name={'route_id'}
            label={'Select Route'}
            placeholder={'Select Route'}
            fetcher={getRoutes}
            labelField={'origin'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/bookings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'booking',
    operation: AccessOperationEnum.CREATE,
  }),
)(BookingCreatePage);
