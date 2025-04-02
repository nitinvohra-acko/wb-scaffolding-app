import React from 'react';

interface QuestionTextProps {
  question_text: string[];
  required?: number;
}

const QuestionText: React.FC<QuestionTextProps> = ({
  question_text,
  required,
}) => {
  return (
    <>
      {question_text.map((question, index) => (
        <div key={index}>
          <div
            className="font-bold mb-4 text-base"
            style={{ color: '#171A1FFF' }}
          >
            {question}{' '}
            {required === 1 && index === 0 && (
              <span className="text-red-500">*</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionText;
