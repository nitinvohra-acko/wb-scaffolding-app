export const questionConfig3 = [
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
      order: 0,
      question_text: [
        'Has anyone covered in this plan smoked or chewed tobacco in the past year?',
      ],
      sub_question_mapping: {
        everyday: ['tobacco_quantity'],
      },
      question_id: 'tobacco',
      type: 'telemer_radio_group',
      required: 1,
      eligibility: {
        male: true,
        female: true,
      },
    },
    question_id: 'tobacco',
    rule_id: 'assessment_question_config',
    section: null,
    eligible_members: [
      { user_id: '1', name: 'member1' },
      { user_id: '2', name: 'member2' },
    ],
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
      order: 0,
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
      eligibility: {
        male: true,
        female: true,
      },
    },
    question_id: 'alcohol',
    rule_id: 'assessment_question_config',
    section: 'Habits',
    eligible_members: [
      { user_id: '1', name: 'Member1' },
      { user_id: '2', name: 'member2' },
    ],
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
      order: 0,
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
      eligibility: {
        male: true,
        female: true,
      },
    },
    question_id: 'alcohol',
    rule_id: 'assessment_question_config',
    section: 'Habits',
    eligible_members: [
      { user_id: '1', name: 'Member1' },
      { user_id: '2', name: 'member2' },
    ],
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
      order: 0,
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
      eligibility: {
        male: true,
        female: true,
      },
    },
    question_id: 'alcohol',
    rule_id: 'assessment_question_config',
    section: 'Habits',
    eligible_members: [{ user_id: '1', name: 'Member1' }],
  },
];
