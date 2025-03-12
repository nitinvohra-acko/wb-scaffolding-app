// import DateRangeFilter from "./DateRangeFilter";
import MultiSelectFilter from './MultiSelectFilter';
const FilterComponents: Record<string, any> = {
  string: (props: any) => <MultiSelectFilter {...props} />,
  //   range: (props: any) => <DateRangeFilter {...props} />,
};
export default FilterComponents;
