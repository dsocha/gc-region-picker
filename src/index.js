import React from 'react';
import DropdownControl from './DropdownControl/DropdownControl';
import PropTypes from 'prop-types';

export const GcRegionPicker = (props) => {
  return (
    <DropdownControl
      onSelect={(v) => {
        if (props.onSelect) props.onSelect(v);
      }}
    />
  );
};

GcRegionPicker.propTypes = {
  onSelect: PropTypes.func
};
