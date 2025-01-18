export interface Topic {
    name?: string;
    status?: 'completed' | 'in-progress' | 'planned';
    description?: string;
    startDate?: Date;
    endDate?: Date;
    resources?: string[];
  }