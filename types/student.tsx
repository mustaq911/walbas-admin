interface Guardian {
    name: string;
    relationship: string;
    phone: string;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    avatar: string;
    year: string;
    section: string;
    age: number;
    grade: number;
    status: string;
    address: string;
    birthdate: string;
    gender: string;
    ethnicity: string;
    nationality: string;
    religion: string;
    orderNumber: string;
    chronicDisease: string;
    studentNumber: string;
    yearGroup: string;
    guardians?: Guardian[]; // Add this line
}