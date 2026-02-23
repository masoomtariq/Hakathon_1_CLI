import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction to AI',
      items: [
        'module-1/chapter-1-1',
        'module-1/chapter-1-2',
      ],
    },
    {
      type: 'category',
      label: 'Machine Learning Fundamentals',
      items: [
        'module-2/chapter-2-1',
      ],
    },
  ],
};

export default sidebars;
