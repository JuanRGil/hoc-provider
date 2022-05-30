import PropTypes from 'prop-types';
import { ValidableProps } from '../../../../../types/common';
import { Option } from '../../types';
import Select from '../Select';
import { PROVINCIA_SELECT_PLACEHOLDER, PROVINCIA_SELECT_TITLE } from './defaultTexts';
import provincias from './provinces';

function ProvinceSelect(props : ValidableProps
      & {
          label?: string;
          defaultSelectOption?: Option,
          placeholder?: string,
          clearable?: boolean,
          isSearchable?: boolean,
       }): any {
  const { label, placeholder } = props;
  return (
    <Select
      {...props}
      selectOptions={provincias}
      label={label || PROVINCIA_SELECT_TITLE}
      placeholder={placeholder || PROVINCIA_SELECT_PLACEHOLDER}
    />
  );
}
ProvinceSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultSelectOption: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  }),
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  })),

};
ProvinceSelect.defaultProps = {
  defaultSelectOption: undefined,
  placeholder: undefined,
  clearable: false,
  isSearchable: false,
  label: PROVINCIA_SELECT_TITLE,
  selectOptions: provincias,

};
export default ProvinceSelect;
