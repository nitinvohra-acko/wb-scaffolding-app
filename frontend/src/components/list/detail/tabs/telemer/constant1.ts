export const questionData = [
  {
    section: 'Habits',
    questions: [
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'tobacco_quantity',
              question_text: ['Please mention the quantity of smoking/tobacco'],
              question_id: 'tobacco_quantity',
              type: 'telemer_textarea',
              required: 0,
            },
          ],
          option: [
            {
              capture_text: 0,
              label: 'No',
              answer_id: 'no',
            },
            {
              capture_text: 0,
              label: 'Yes, everyday',
              answer_id: 'everyday',
            },
            {
              capture_text: 0,
              label: 'Yes, atleast 3-4 times a week',
              answer_id: 'weekly',
            },
            {
              capture_text: 0,
              label: 'Yes, a few times a year',
              answer_id: 'yearly',
            },
          ],
          question_text: [
            'Has anyone covered in this plan smoked or chewed tobacco in the past year?',
          ],
          sub_question_mapping: {
            everyday: ['tobacco_quantity'],
          },
          question_id: 'tobacco',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'tobacco',
      },
      {
        question_config: {
          sub_questions: [
            {
              answer_id: 'alcohol_quantity',
              question_text: [
                'Please mention the quantity of alcohol(Mention the number of drinks of Hard liquor or glasses of wine or bottles of beer)',
              ],
              question_id: 'alcohol_quantity',
              type: 'telemer_textarea',
              required: 0,
            },
          ],
          option: [
            {
              capture_text: 0,
              label: 'No',
              answer_id: 'no',
            },
            {
              capture_text: 0,
              label: 'Yes, everyday',
              answer_id: 'everyday',
            },
            {
              capture_text: 0,
              label: 'Yes, atleast 3-4 times a week',
              answer_id: 'weekly',
            },
            {
              capture_text: 0,
              label: 'Yes, a few times a year',
              answer_id: 'yearly',
            },
          ],
          question_text: [
            'Has anyone covered in this plan consumed alcohol in the past year?',
          ],
          sub_question_mapping: {
            everyday: ['alcohol_quantity'],
            weekly: ['alcohol_quantity'],
          },
          question_id: 'alcohol',
          type: 'telemer_radio_group',
          required: 1,
        },
        question_id: 'alcohol',
      },
    ],
    members: [
      {
        parameters: {
          id: {
            parameter_version: 1,
            value: 'm8b2kio0m9lorcfq0t',
          },
          role: {
            parameter_version: 1,
            value: 'insured',
          },
          relation: {
            parameter_version: 1,
            value: 'Self',
          },
          user_id: {
            parameter_version: 1,
            value: 'fvCiTnou01JeLDtVYSD6ig',
          },
          age: {
            parameter_version: 1,
            value: 45,
          },
          marital_status: {
            parameter_version: 1,
            value: '',
          },
          email: {
            parameter_version: 1,
            value: 'shailesh.singh+ISWv@acko.tech',
          },

          name: {
            parameter_version: 1,
            value: 'selfAutomation',
          },
          gender: {
            parameter_version: 1,
            value: 'female',
          },
        },
        insured_id: 'm8b2kio0m9lorcfq0t',
        insured_number: '1',
        created_on: '2025-03-16T03:21:56.555+00:00',
        updated_on: '2025-03-16T03:22:43.528+00:00',
      },
      {
        parameters: {
          id: {
            parameter_version: 1,
            value: 'm8b2kjq5zm3otslj4fs',
          },
          role: {
            parameter_version: 1,
            value: 'insured',
          },
          relation: {
            parameter_version: 1,
            value: 'Spouse',
          },

          marital_status: {
            parameter_version: 1,
            value: '',
          },
          email: {
            parameter_version: 1,
            value: '',
          },
          name: {
            parameter_version: 1,
            value: 'SpouseAutomation',
          },
          gender: {
            parameter_version: 1,
            value: 'male',
          },
        },
        insured_id: 'm8b2kjq5zm3otslj4fs',
        insured_number: '2',
        created_on: '2025-03-16T03:21:56.555+00:00',
        updated_on: '2025-03-16T03:22:43.528+00:00',
      },
    ],
  },
];
