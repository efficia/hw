interface ContactInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  designation: string;
  company: string;
  mobile: string;
}

export const contacts: Record<string, ContactInfo> = {
  default: {
    id: 'default',
    firstName: 'Dilith',
    lastName: 'Achalan',
    fullName: 'Dilith Achalan',
    email: 'dilith.achalan@outlook.com',
    designation: 'Systems Engineer',
    company: 'HW',
    mobile: '+94773330060'
  },
  coordinator: {
    id: 'coordinator',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@hw.lk',
    designation: 'Project Coordinator',
    company: 'HW',
    mobile: '+94777777777'
  }
};