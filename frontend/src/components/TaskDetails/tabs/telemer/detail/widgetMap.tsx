import TelemerTextarea from './formComponents/telemer_textarea';
import TelemerSelect from './formComponents/telemer_multiselect';
import TelemerRadio from './formComponents/telemer_radio';
import TeleMerInfo from './formComponents/introduction';
import NameAndDob from './formComponents/nameAndDob';
import HeightAndWeight from './formComponents/heightAndWeight';

const WidgetMap: Record<string, any> = {
  telemer_textarea: TelemerTextarea,
  telemer_radio_group: TelemerRadio,
  telemer_multi_select: TelemerSelect,
  telemer_info: TeleMerInfo,
  telemer_name_dob: NameAndDob,
  telemer_height_weight: HeightAndWeight,
};
export default WidgetMap;
