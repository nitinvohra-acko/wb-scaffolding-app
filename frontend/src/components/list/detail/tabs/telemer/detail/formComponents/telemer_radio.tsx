import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuestionConfig } from '../type';

interface propsType {
  questionText: string[] | null;
  options: QuestionConfig['option'];
  question_id: string;
  handleChange: (value: string | string[]) => void;
}

const TelemerRadio: React.FC<propsType> = ({
  questionText,
  options,
  question_id,
  handleChange,
}) => {
  return (
    <div className="mb-6">
      <p className="font-medium mb-3 font-bold font-italic">
        {questionText &&
          questionText.map((item, index) => <div key={index}>{item}</div>)}
      </p>
      <RadioGroup
        className="space-y-2"
        // defaultValue="no"
        onValueChange={handleChange}
      >
        {options?.map((option, index) => (
          <div className="flex inline-flex  items-center space-x-2" key={index}>
            <RadioGroupItem
              value={option.answer_id}
              id={question_id + '_' + index}
            />
            <Label htmlFor={question_id + '_' + index}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TelemerRadio;
