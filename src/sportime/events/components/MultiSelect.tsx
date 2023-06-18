import chroma from 'chroma-js';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';

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
        ? '#a5ff1b' // Cambio a color #a5ff1b cuando está seleccionado
        : isFocused
        ? '#a5ff1b'
        : undefined,
      color: '#000000', // Cambio a color negro
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...provided[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#a5ff1b' // Cambio a color #a5ff1b cuando está seleccionado y se hace clic
            : '#a5ff1b'
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
    color: '#fff',
  }),
  multiValueRemove: (provided:any, { data }:{data:any}) => ({
    ...provided,
    ':hover': {
      backgroundColor: '#a5ff1b',
      color: 'black',
    },
  }),
};

const CustomSelect = ({ colorOptions, color, setColor }:{ colorOptions:any, color:any, setColor:any }) => {

  const animatedComponents = makeAnimated();

  const handleChange = (selectedOption:any) => {
    setColor(selectedOption);
  };

  return (
    <Select
      options={colorOptions}
      id="sport"
      value={color}
      isMulti
      required
      onChange={handleChange}
      placeholder="Selecciona colores de las camisetas"
      className="text-lg mt-2"
      styles={colourStyles}
      components={{
        ...components,
        ...animatedComponents,
        IndicatorSeparator: null,
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#a5ff1b', // Agregado primary25 con el color '#a5ff1b'
        },
      })}
    />
  );
};

export default CustomSelect;