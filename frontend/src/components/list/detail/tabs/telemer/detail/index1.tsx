'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle, Edit } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TeleMerInfo from './formComponents/introduction';
import { question_Data as config } from '../constant';
import TelemerRadio from './formComponents/telemer_radio';

export default function HealthProfile() {
  const [activeSection, setActiveSection] = useState<string>('demographic');
  const sectionRefs = {
    demographic: useRef<HTMLDivElement>(null),
    habits: useRef<HTMLDivElement>(null),
    preExisting: useRef<HTMLDivElement>(null),
    ongoingSymptoms: useRef<HTMLDivElement>(null),
    pastHospitalization: useRef<HTMLDivElement>(null),
    gynaecological: useRef<HTMLDivElement>(null),
  };

  const sections = [
    {
      id: 'demographic',
      title: 'Demographic details',
      ref: sectionRefs.demographic,
    },
    { id: 'habits', title: 'Habits', ref: sectionRefs.habits },
    {
      id: 'preExisting',
      title: 'Pre existing condition',
      ref: sectionRefs.preExisting,
    },
    {
      id: 'ongoingSymptoms',
      title: 'Ongoing symptoms',
      ref: sectionRefs.ongoingSymptoms,
    },
    {
      id: 'pastHospitalization',
      title: 'Past hospitalisation/surgery details',
      ref: sectionRefs.pastHospitalization,
    },
    {
      id: 'gynaecological',
      title: 'Gynaecological details',
      ref: sectionRefs.gynaecological,
    },
  ];

  const handleSectionToggle = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const navigateToSection = (direction: 'next' | 'previous') => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection,
    );
    let newIndex;

    if (direction === 'next') {
      newIndex =
        currentIndex < sections.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    setActiveSection(sections[newIndex].id);
  };

  // Scroll to active section when it changes
  useEffect(() => {
    const activeRef = sections.find(
      (section) => section.id === activeSection,
    )?.ref;
    if (activeRef?.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);
  const DemographicSection = (data: any) => {
    return (
      <>
        <CardContent>
          <div className="p-4">
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="mb-4">
                So I am talking to "Akash Bhatia", can you please confirm your
                DOB?
              </p>

              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">Akash Bhatia</div>
                  <Edit className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Self | Male | 40 years
                </div>

                <div className="flex mb-2">
                  <div className="w-20 text-gray-600">DOB</div>
                  <div className="flex justify-between flex-1">
                    <div>25 Jan'1985</div>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <p className="my-4">Please tell me your height & weight:</p>

              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex items-center mb-3">
                  <div className="w-20 text-gray-600">Height</div>
                  <div className="flex gap-2">
                    <div className="flex">
                      <Input
                        className="w-16 h-8 rounded-r-none"
                        placeholder=""
                      />
                      <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                        ft
                      </div>
                    </div>
                    <div className="flex">
                      <Input
                        className="w-16 h-8 rounded-r-none"
                        placeholder=""
                      />
                      <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                        in
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 bg-gray-800 text-white text-xs"
                    >
                      ft/in
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      cm
                    </Button>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="w-20 text-gray-600">Weight</div>
                  <div className="flex">
                    <Input className="w-16 h-8 rounded-r-none" placeholder="" />
                    <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                      in kgs
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-20 text-gray-600">BMI</div>
                  <div>NA</div>
                </div>
              </div>
            </div>

            {/* Wife's Details */}
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="mb-4">
                Can you please confirm your wife's name and DOB?
              </p>

              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">Simran Bhatia</div>
                  <Edit className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Spouse | Female | 39 years
                </div>

                <div className="flex mb-2">
                  <div className="w-20 text-gray-600">DOB</div>
                  <div className="flex justify-between flex-1">
                    <div>25 Feb'1986</div>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <p className="my-4">
                Please tell me your wife's height & weight:
              </p>

              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex items-center mb-3">
                  <div className="w-20 text-gray-600">Height</div>
                  <div className="flex gap-2">
                    <div className="flex">
                      <Input
                        className="w-16 h-8 rounded-r-none"
                        placeholder=""
                      />
                      <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                        ft
                      </div>
                    </div>
                    <div className="flex">
                      <Input
                        className="w-16 h-8 rounded-r-none"
                        placeholder=""
                      />
                      <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                        in
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 bg-gray-800 text-white text-xs"
                    >
                      ft/in
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      cm
                    </Button>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="w-20 text-gray-600">Weight</div>
                  <div className="flex">
                    <Input className="w-16 h-8 rounded-r-none" placeholder="" />
                    <div className="bg-white border border-l-0 border-gray-200 px-2 flex items-center rounded-r-md text-sm">
                      in kgs
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-20 text-gray-600">BMI</div>
                  <div>NA</div>
                </div>
              </div>
            </div>

            {/* Daughter's Details */}
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="mb-4">
                Can you please confirm your daughter's name and DOB?
              </p>

              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">Suman Bhatia</div>
                  <Edit className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Child | Female | 9 years
                </div>

                <div className="flex mb-2">
                  <div className="w-20 text-gray-600">DOB</div>
                  <div className="flex justify-between flex-1">
                    <div>29 Sep'2016</div>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  const IntroductionSection = (data: any) => {
    return (
      <CardContent>
        <div>
          {data.questions.map((item: any, index: number) => {
            return (
              <div key={index}>
                <TeleMerInfo label={item.question_config.question_text} />
              </div>
            );
          })}
        </div>
      </CardContent>
    );
  };

  return (
    <div className=" mx-auto  pb-20">
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            ref={section.ref}
            className="border rounded-lg shadow-sm overflow-hidden transition-all duration-1000"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-white"
              onClick={() => handleSectionToggle(section.id)}
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-purple-600 transition-transform duration-1000 ${
                  activeSection === section.id ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown className="w-6 h-6" />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                activeSection === section.id
                  ? 'max-h-[2000px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {section.id === 'habits' && (
                <div className="p-4 bg-white">
                  {/* <TelemerRadio
                    questionText="Please mention the quantity of smoking/tobacco"
                    question_id="smoking"
                    options={[
                      {
                        label: 'No',
                        answer_id: 'no',
                      },
                      {
                        label: 'Yes, everyday',
                        answer_id: 'everyday',
                      },
                      {
                        label: 'Yes, atleast 3-4 times a week',
                        answer_id: 'weekly',
                      },
                      {
                        label: 'Yes, a few times a year',
                        answer_id: 'yearly',
                      },
                    ]}
                    handleChange={()=>{}}
                  /> */}
                  <div className="mb-6">
                    <p className="font-medium mb-3">
                      Has Simran smoked or chewed tobacco in the past year?
                    </p>
                    <RadioGroup defaultValue="no" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="tobacco-no" />
                        <Label htmlFor="tobacco-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="everyday"
                          id="tobacco-everyday"
                        />
                        <Label htmlFor="tobacco-everyday">Everyday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="3-4-week"
                          id="tobacco-3-4-week"
                        />
                        <Label htmlFor="tobacco-3-4-week">
                          3-4 times a week
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="few-year"
                          id="tobacco-few-year"
                          checked
                        />
                        <Label htmlFor="tobacco-few-year">
                          A few times a year
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mb-4">
                    <div className="border rounded-md p-4 bg-gray-50 mb-2">
                      <p className="text-gray-700 mb-2">
                        Please mention the quantity of smoking/tobacco for
                        Simran Bhatia.
                      </p>
                      <p className="text-gray-900">
                        Smokes 1-2 cigarettes every month.
                      </p>
                    </div>

                    {/* <div className="flex space-x-2 mb-6">
                      <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">
                        Completed
                      </div>
                      <div className="border border-green-500 text-green-500 text-xs px-3 py-1 rounded-md">
                        Partially completed
                      </div>
                      <div className="border text-gray-500 text-xs px-3 py-1 rounded-md">
                        Pending
                      </div>
                    </div> */}
                  </div>

                  <div className="mb-6">
                    <p className="font-medium mb-3">
                      Has Simran consumed alcohol in the past year?
                    </p>
                    <RadioGroup defaultValue="yes" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="alcohol-yes" checked />
                        <Label htmlFor="alcohol-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="alcohol-no" />
                        <Label htmlFor="alcohol-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mb-4">
                    <RadioGroup defaultValue="3-4-week" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="everyday"
                          id="alcohol-everyday"
                        />
                        <Label htmlFor="alcohol-everyday">Everyday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="3-4-week"
                          id="alcohol-3-4-week"
                          checked
                        />
                        <Label htmlFor="alcohol-3-4-week">
                          3-4 times a week
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="few-year"
                          id="alcohol-few-year"
                        />
                        <Label htmlFor="alcohol-few-year">
                          A few times a year
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mb-6">
                    <div className="border rounded-md p-4 bg-gray-50 mb-2">
                      <p className="text-gray-700 mb-2">
                        Please mention the quantity of alcohol, in number of
                        drinks of hard liquor or glasses of wine or bottles of
                        beer for Simran Bhatia.
                      </p>
                      <p className="text-gray-900">
                        Consumes 2-3 glasses of wine 3-4 times a month.
                      </p>
                    </div>

                    {/* <div className="flex space-x-2 mb-6">
                      <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">
                        Completed
                      </div>
                      <div className="border border-green-500 text-green-500 text-xs px-3 py-1 rounded-md">
                        Partially completed
                      </div>
                      <div className="border text-gray-500 text-xs px-3 py-1 rounded-md">
                        Pending
                      </div>
                    </div> */}
                  </div>

                  <div className="flex justify-center space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigateToSection('previous')}
                      className="px-6"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigateToSection('next')}
                      className="px-6 bg-gray-900"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {section.id === 'demographic' && (
                <div className="p-4 bg-white">
                  {<DemographicSection data={{}} />}
                  <div className="flex justify-center space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigateToSection('previous')}
                      className="px-6"
                      disabled
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigateToSection('next')}
                      className="px-6 bg-gray-900"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {section.id === 'preExisting' && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">
                    Pre-existing condition information would go here...
                  </p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigateToSection('previous')}
                      className="px-6"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigateToSection('next')}
                      className="px-6 bg-gray-900"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {section.id === 'ongoingSymptoms' && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">
                    Ongoing symptoms information would go here...
                  </p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigateToSection('previous')}
                      className="px-6"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigateToSection('next')}
                      className="px-6 bg-gray-900"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {section.id === 'pastHospitalization' && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">
                    Past hospitalization information would go here...
                  </p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigateToSection('previous')}
                      className="px-6"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigateToSection('next')}
                      className="px-6 bg-gray-900"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {section.id === 'gynaecological' && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">
                    Gynaecological details would go here...
                  </p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigateToSection('previous')}
                      className="px-6"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigateToSection('next')}
                      className="px-6 bg-gray-900"
                      disabled
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
