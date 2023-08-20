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

import { createRoute } from 'apiSdk/routes';
import { routeValidationSchema } from 'validationSchema/routes';
import { TruckInterface } from 'interfaces/truck';
import { getTrucks } from 'apiSdk/trucks';
import { RouteInterface } from 'interfaces/route';

function RouteCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RouteInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRoute(values);
      resetForm();
      router.push('/routes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RouteInterface>({
    initialValues: {
      origin: '',
      destination: '',
      truck_id: (router.query.truck_id as string) ?? null,
    },
    validationSchema: routeValidationSchema,
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
              label: 'Routes',
              link: '/routes',
            },
            {
              label: 'Create Route',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Route
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.origin}
            label={'Origin'}
            props={{
              name: 'origin',
              placeholder: 'Origin',
              value: formik.values?.origin,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.destination}
            label={'Destination'}
            props={{
              name: 'destination',
              placeholder: 'Destination',
              value: formik.values?.destination,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<TruckInterface>
            formik={formik}
            name={'truck_id'}
            label={'Select Truck'}
            placeholder={'Select Truck'}
            fetcher={getTrucks}
            labelField={'name'}
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
              onClick={() => router.push('/routes')}
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
    entity: 'route',
    operation: AccessOperationEnum.CREATE,
  }),
)(RouteCreatePage);
