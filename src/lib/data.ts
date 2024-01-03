import {
  shawarmaOnboarding1,
  shawarmaOnboarding2,
  shawarmaOnboarding3,
  shawarmaOnboarding4,
  shawarmaOnboarding5,
  shawarmaOnboarding6
} from "../../public/pngs";


export interface OnboardingProp {
  id: number;
  tag: string;
    info: string,
    description: string;
  imageSrc: string;
}


export const onboardingCardData: OnboardingProp[] = [
  {
    id: 1,
    tag: "#001",
    info: " Welcome to Dudurewa Admin",
    description: "Basically, this is your record book, sticky note and receipt generator all in one",
    imageSrc: shawarmaOnboarding1
    },
    {
    id: 2,
    tag: "#002",
    info: "Take down your orders in record time",
    description: "You take orders by just copying and pasting from any social media platform, eliminating any need to write. I also kept track of your order history",
    imageSrc: shawarmaOnboarding2
    },
    {
    id: 3,
    tag: "#003",
    info: "Keep track of your inventory",
    description: "When you go to the market, your inventory helps you keep track of the things you bought. This helps you monitor your profit margins for each day, week or month",
    imageSrc: shawarmaOnboarding3
    },
    {
    id: 4,
    tag: "#004",
    info: "Generate receipts and customized sticky notes",
    description: "You can now send automatically generated reciepts and customized sticky notes to your customers for each order. A small hand printer is needed",
    imageSrc: shawarmaOnboarding4
    },
    {
    id: 5,
    tag: "#005",
    info: "Old things are passed away",
    description: "Writing is drastically reduced or eradicated, calculations are done for each business day and no more calculating at night.",
    imageSrc: shawarmaOnboarding5
  },
   {id: 6,
    tag: "#006",
    info: "You have light and dark mode",
    description: "Icon at the lower right corner of your screen can help you switch between modes.",
    imageSrc: shawarmaOnboarding6
  },
]