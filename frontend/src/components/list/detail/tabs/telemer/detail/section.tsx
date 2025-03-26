import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SectionAccordian: React.FC<{
  title: string;
  toggleSection: Function;
  children: React.ReactElement;
  activeSection: string | null;
  navigateToSection: (vale: 'previous' | 'next') => void;
}> = ({ title, children, toggleSection, activeSection, navigateToSection }) => {
  return (
    <Card className="mb-4 shadow-sm" style={{ backgroundColor: '#F8F9FAFF' }}>
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => toggleSection(title)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <ChevronDown className="w-6 h-6 text-purple-500" />
      </div>

      <CardContent
        className={`p-3 pt-0 content ${
          activeSection === title ? 'block opacity-1' : 'hidden opacity-0'
        }`}
      >
        <div
          className="bg-white border-gray-50 rounded-md p-4"
          style={{
            boxShadow: '0px 0px 1px #171a1f12, 0px 0px 2px #171a1f1F',
          }}
        >
          {children}
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
      </CardContent>
    </Card>
  );
};

export default SectionAccordian;
