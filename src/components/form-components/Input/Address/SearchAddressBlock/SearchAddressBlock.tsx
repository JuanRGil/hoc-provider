import { ChangeEvent, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import FormValidationProvider from '../../../../../providers/FormValidationProvider';
import { ValidableProps } from '../../../../../types/common';
import ProvinceSelectWithValidators from '../../../../test-components/with-default-validation/ProvinceSelectWithValidators';
import SubmitButton from '../../../SubmitButton/SubmitButton';
import { SEARCH_ADDRESS_STATE } from './searchAddressState';

function SearchAddressBlock(props : ValidableProps & {
    onCheckAddress: (data: {
        province: string;
        address: string;
        ladder?:string;
        floor?: string;
        door?: string;
     })=> void,
     checkAddressResult : string[] | undefined,
    }) {
  const { onCheckAddress, checkAddressResult } = props;
  const [state, setState] = useState<string>(SEARCH_ADDRESS_STATE.INITIAL);

  const [province, setProvince] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [ladder, setLadder] = useState<string|undefined>(undefined);
  const [floor, setFloor] = useState<string|undefined>(undefined);
  const [door, setDoor] = useState<string|undefined>(undefined);

  useEffect(() => {
    if (checkAddressResult) {
      if (!isEmpty(checkAddressResult)) {
        setState(SEARCH_ADDRESS_STATE.ADDRESSES_FOUND);
      } else {
        setState(SEARCH_ADDRESS_STATE.ADDRESS_NOT_FOUND);
      }
    }
  }, [checkAddressResult]);
  const onProvinceSelect = (e: any) => {
    const { value } = e.target;
    setProvince(value.value);
  };

  const handleCheckAddress = () => {
    onCheckAddress({
      province,
      address,
      ladder,
      floor,
      door,
    });
  };

  const handleOnSelectAddress = (completeAddress : string) => {
    const { onChange } = props;
    if (onChange) {
      const eventAddress = {
        target: {
          value: completeAddress,
        },
      };
      onChange(eventAddress as unknown as ChangeEvent<HTMLInputElement>);
    }
    setState(SEARCH_ADDRESS_STATE.SELECTED_ADDRESS);
  };

  const handleOnModify = () => {
    const { onChange } = props;
    if (onChange) {
      const eventAddress = {
        target: {
          value: '',
        },
      };
      onChange(eventAddress as unknown as ChangeEvent<HTMLInputElement>);
    }
    setState(SEARCH_ADDRESS_STATE.ADDRESSES_FOUND);
  };

  return (
    <>
      {
        SEARCH_ADDRESS_STATE.INITIAL === state && (
          <FormValidationProvider contextName="form-search-address">
            <ProvinceSelectWithValidators required name="search-address-provincias" onChange={onProvinceSelect} />
            <SubmitButton onSubmit={handleCheckAddress} label="Comprobar dirección" />
          </FormValidationProvider>
        )
      }
      {
        SEARCH_ADDRESS_STATE.ADDRESS_NOT_FOUND === state && (
          <div>NOT FOUND ADDRESESS</div>
        )
      }
      {
        SEARCH_ADDRESS_STATE.ADDRESSES_FOUND === state && (
          <div>
            <div>RADIO FOUND ADDRESESS</div>
            <button type="button" onClick={() => handleOnSelectAddress('selected address')}> mock select</button>
          </div>
        )
      }
      {
        SEARCH_ADDRESS_STATE.SELECTED_ADDRESS === state && (
          <div>
            <div>SELECTED ADDRESS</div>
            <button type="button" onClick={() => handleOnModify()}> mock modify</button>
          </div>
        )
      }
    </>
  );
}

export default SearchAddressBlock;
