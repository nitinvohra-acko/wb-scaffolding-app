import TelemerTextarea from './formComponents/telemer_textarea';
import TelemerSelect from './formComponents/telemer_multiselect';
import TelemerRadio from './formComponents/telemer_radio';
import TeleMerInfo from './formComponents/introduction';

const WidgetMap: Record<string, any> = {
  telemer_textarea: TelemerTextarea,
  telemer_radio_group: TelemerRadio,
  telemer_multi_select: TelemerSelect,
  telemer_info: TeleMerInfo,
};
export default WidgetMap;
