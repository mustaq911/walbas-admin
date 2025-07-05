export interface User {
    // id: number;
    // email: string;
    // active: string;
    // profile: Profile;
    
    id: number;
    model : string;
    serial_number: string;
    warranty: string;
    date_purchased: string;
    is_active : string;
    created_at: string;
    deleted_at : string | null;
    updated_at : string | null;
}

export interface Profile {
    id: string
    birthdate: string;
    first_name: string;
    middle_name: string;
    last_name: string;

}