import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  select,
  color,
  boolean,
  object,
} from '@storybook/addon-knobs/react';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';

import readme from '../readme.md';
import { Map, Wrapper, MapEventProps } from '../index';

const authToken =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkY1UzdXWk01NFoifQ.eyJpc3MiOiI2QlM1OVNDOTQyIiwiaWF0IjoxNTM5ODg4OTU3LjMzLCJleHAiOjE1Mzk4OTA3NTcuMzN9.WnJJuXeEv9k4BWVzxrLhe4S20o5yTjr6_Js_4-TL-jSDFj4GwvcCcpbTlFQQqM6IRSAPSglor8grQ5ZkpKYtlg';

storiesOf('Welcome', module).add('to Storybook', () => (
  <div dangerouslySetInnerHTML={{ __html: readme }} />
));

const mapStories = storiesOf('Map', module);

mapStories.addDecorator(withKnobs);

mapStories
  .add('default', () => (
    <Wrapper
      authorizationCallback={done => {
        done(authToken);
      }}
    >
      <Map
        center={object('center', {
          latitude: 37.33182,
          longitude: -122.03118,
        })}
        mapType={select('mapType', {
          standard: 'standard',
          hybrid: 'hybrid',
          satellite: 'satellite',
        })}
        tintColor={color('tintColor')}
        showsZoomControl={boolean('showsZoomControl', true)}
        showsScale={select('showsScale', {
          adaptive: 'adaptive',
          visible: 'visible',
          hidden: 'hidden',
        })}
        showsCompass={select('showsCompass', {
          adaptive: 'adaptive',
          visible: 'visible',
          hidden: 'hidden',
        })}
        showsUserLocationControl={boolean('showsUserLocationControl', true)}
        isZoomEnabled={boolean('isZoomEnabled', true)}
        isRotationEnabled={boolean('isRotationEnabled', true)}
        isScrollEnabled={boolean('isScrollEnabled', true)}
      />
    </Wrapper>
  ))
  .add('events', () => (
    <Wrapper
      authorizationCallback={done => {
        done(authToken);
      }}
    >
      <Map
        {...Object.values(MapEventProps).reduce((result, current) => {
          result[current] = action(current);
          return result;
        }, {})}
      />
    </Wrapper>
  ));
