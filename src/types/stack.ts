export interface Technology {
    name: string;
    icon: string;
    level: number;
    category: string;
  }
  
  export interface TechnologyGroup {
    name: string;
    items: Technology[];
  }