import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useShallowEffect } from '@mantine/hooks';
import { Helmet } from 'react-helmet';

import { useInjectSaga, useInjectReducer } from 'utils';
import { Grid, GridCol, TextInput, SingleFileInput, Stack, Button, Typography, LoadingIndicator } from 'components';
import { useGTM } from 'hooks';

import * as Selectors from './selectors';
import * as Actions from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { ActivityManagementProps, StampFormTypes } from './types';

const key = 'activity';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activity: Selectors.makeSelectActivity()
});

export default function ActivityParticipateManagement({ setPageTitle }: ActivityManagementProps) {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { activity, loading } = useSelector(stateSelector);
  useGTM(activity.title);
  const { id } = useParams<{ id: string }>();

  const form = useForm<StampFormTypes>({
    initialValues: {
      activity: '',
      restaurant: '',
      image: null
    },
    validate: {
      image: value => (!value ? messages.participate.error.image : null)
    }
  });

  useShallowEffect(() => {
    if (activity?.id) {
      form.setValues({ id: activity.id, activity: activity.title, restaurant: activity.restaurant?.label });
    }
  }, [activity]);

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.participate.title);
    }
  }, [setPageTitle]);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(Actions.getActivity(id));
      });
    }
    return () => {
      dispatch(Actions.resetRedux('activity'));
    };
  }, [id]);

  const handleSubmit = (activity: StampFormTypes) => {
    dispatch(Actions.stampPassport(activity));
  };

  return (
    <>
      <Helmet titleTemplate={messages.pageTitle} defaultTitle={messages.pageTitle} title={messages.pageTitle} />
      <LoadingIndicator visible={loading} />
      <form style={{ width: '100%' }} onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack sx={{ height: '100%' }} justify="space-between">
          <Grid mx={0}>
            <GridCol span={12} pt={36} px={24}>
              <TextInput
                size="md"
                placeholder={messages.participate.placeholder.activity}
                radius="xl"
                readOnly
                styles={() => ({ input: { backgroundColor: '#f5f5f5', boxShadow: 'none', padding: '0 2rem' } })}
                {...form.getInputProps('activity')}
              />
            </GridCol>
            <GridCol span={12} px={24}>
              <TextInput
                size="md"
                placeholder={messages.participate.placeholder.restaurant}
                radius="xl"
                readOnly
                styles={() => ({ input: { backgroundColor: '#f5f5f5', boxShadow: 'none', padding: '0 2rem' } })}
                {...form.getInputProps('restaurant')}
              />
            </GridCol>
            <GridCol span={12} px={36} pt={24}>
              <SingleFileInput
                label={messages.participate.label.upload}
                icon="attachment"
                {...form.getInputProps('image')}
                onClose={(item: File) => {
                  if (item) {
                    form.setFieldValue('image', null);
                  }
                }}
              />
              {form.errors.image && (
                <Typography size="sm" color="danger">
                  {form.errors.image}
                </Typography>
              )}
            </GridCol>
          </Grid>
          <Grid mx={0}>
            <GridCol span={12} px={36}>
              <Button
                sx={() => ({
                  height: '50px',
                  width: '100%'
                })}
                type="submit"
              >
                <Typography sx={theme => ({ color: theme.white, fontWeight: 600, fontSize: '16px' })} align="center">
                  {messages.participate.label.submit}
                </Typography>
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </form>
    </>
  );
}
