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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getBookingById, updateBookingById } from 'apiSdk/bookings';
import { bookingValidationSchema } from 'validationSchema/bookings';
import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { TruckInterface } from 'interfaces/truck';
import { RouteInterface } from 'interfaces/route';
import { getUsers } from 'apiSdk/users';
import { getTrucks } from 'apiSdk/trucks';
import { getRoutes } from 'apiSdk/routes';

function BookingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BookingInterface>(
    () => (id ? `/bookings/${id}` : null),
    () => getBookingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BookingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBookingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/bookings');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BookingInterface>({
    initialValues: data,
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
              label: 'Update Booking',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Booking
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(BookingEditPage);
