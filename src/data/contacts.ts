interface ContactInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  secondaryEmail: string;
  designation: string;
  company: string;
  mobile: string;
  mobile2: string;
  work: string;
}

export const contacts: Record<string, ContactInfo> = {
  default: {
    id: "default",
    firstName: "Dr. Hans",
    lastName: "Wijayasuriya",
    fullName: "Dr. Hans Wijayasuriya",
    email: "hans@presidentsoffice.lk",
    secondaryEmail: "hans@hw.lk",
    designation: "Chief Advisor to the President on Digital Economy",
    company: "",
    mobile: "+94777330033",
    mobile2: "+94777338833",
    work: "+94112354354",
  },
  coordinator: {
    id: "coordinator",
    firstName: "Dilith",
    lastName: "Achalan",
    fullName: "Dilith Achalan",
    email: "john.doe@hw.lk",
    secondaryEmail: "dilith.achalan@company.com",
    designation: "Project Coordinator",
    company: "HW",
    mobile: "+94777777777",
    mobile2: "+94777338833",
    work: "+94777777777",
  },
};
