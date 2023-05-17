import React from 'react';
import chroma from 'chroma-js';
import Select, { components } from 'react-select';

const colourStyles = {
  control: (provided:any) => ({
    ...provided,
    height: '43px',
    backgroundColor: '#181818',
    boxShadow: '0px 3.2px 0px -1px #FFFFFF',
    border: '0px',
    borderColor: '#a5ff1b',
    color: '#FFFFFF',
  }),
  placeholder: (provided:any) => ({
    ...provided,
    color: '#FFFFFF',
  }),
  singleValue: (provided:any) => ({
    ...provided,
    color: '#FFFFFF',
  }),
  option: (provided:any, { data, isDisabled, isFocused, isSelected }:{data:any, isDisabled:any, isFocused:any, isSelected:any}) => {
    const color = chroma(data.color);
    return {
      ...provided,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...provided[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (provided:any, { data }:{data:any}) => {
    const color = chroma(data.color);
    return {
      ...provided,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (provided:any, { data }:{data:any}) => ({
    ...provided,
    color: data.color,
  }),
  multiValueRemove: (provided:any, { data }:{data:any}) => ({
    ...provided,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

const CustomSelect = ({ colorOptions, color, setColor }:{ colorOptions:any, color:any, setColor:any }) => {
  const handleChange = (selectedOption:any) => {
    setColor(selectedOption);
  };

  return (
    <Select
      options={colorOptions}
      id="sport"
      value={color}
      isMulti
      onChange={handleChange}
      placeholder="Selecciona colores de las camisetas"
      className="text-lg mt-2"
      styles={colourStyles}
      components={{
        ...components,
        IndicatorSeparator: null,
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
        },
      })}
    />
  );
};

export default CustomSelect;
