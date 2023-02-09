export type RequestType =
    "Transportation" |
    "Residence" |
    "Food" |
    "Wear" |
    "Cleaning" |
    "Medical" |
    "Warming" |
    "Other"

export type RequestStatus =
    "New" |
    "InProgress" |
    "Done" |
    "Canceled"

export type RequestSeverity =
    "critical" |
    "normal"

export type TransportationProps = {
    location: string;
    lat: number;
    lon: number;
}
export type ResidenceProps = {
    location: string;
    lat: number;
    lon: number;
}
export type FoodProps = {}
export type WearProps = {
    gender: "male" | "female"
    size: "children" | "xs" | "s" | "m" | "l" | "xl"
    type: "shoes" | "clothes"
}
export type CleaningProps = {}
export type MedicalProps = {}
export type WarmingProps = {
    type: "wood" | "electricHeater"
}
export type OtherProps = {}

export interface HelpRequest {
    type: RequestType;
    status: RequestStatus;
    severity: RequestSeverity;
    contactInfo: string;
    phoneNumber: string;
    location: string;
    note: string;
    lat: number;
    log: number;
    props: TransportationProps | ResidenceProps | FoodProps | WearProps | CleaningProps | MedicalProps | WarmingProps | OtherProps;
}


interface HelpProvider {

}
