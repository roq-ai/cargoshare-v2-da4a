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

import { createTruck } from 'apiSdk/trucks';
import { truckValidationSchema } from 'validationSchema/trucks';
import { PlatformInterface } from 'interfaces/platform';
import { getPlatforms } from 'apiSdk/platforms';
import { TruckInterface } from 'interfaces/truck';

function TruckCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TruckInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTruck(values);
      resetForm();
      router.push('/trucks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TruckInterface>({
    initialValues: {
      name: '',
      cargo_space: 0,
      platform_id: (router.query.platform_id as string) ?? null,
    },
    validationSchema: truckValidationSchema,
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
              label: 'Trucks',
              link: '/trucks',
            },
            {
              label: 'Create Truck',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Truck
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Cargo Space"
            formControlProps={{
              id: 'cargo_space',
              isInvalid: !!formik.errors?.cargo_space,
            }}
            name="cargo_space"
            error={formik.errors?.cargo_space}
            value={formik.values?.cargo_space}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('cargo_space', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<PlatformInterface>
            formik={formik}
            name={'platform_id'}
            label={'Select Platform'}
            placeholder={'Select Platform'}
            fetcher={getPlatforms}
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
              onClick={() => router.push('/trucks')}
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
    entity: 'truck',
    operation: AccessOperationEnum.CREATE,
  }),
)(TruckCreatePage);
