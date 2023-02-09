export type RequestType =
    | "Transportation"
    | "Residence"
    | "Food"
    | "Clothing"
    | "Medical"
    | "Warming"
    | "Medicine"
    | "Other";

export type RequestStatus = "New" | "InProgress" | "Done" | "Canceled";

export type RequestSeverity = "critical" | "normal" | "low" | "unclassified";

export type TransportationProps = {
    address: string;
    lat: number;
    lng: number;
};
export type ResidenceProps = {
    address: string;
    lat: number;
    lng: number;
};
export type FoodProps = {};
export type WearProps = {
    gender: "male" | "female";
    size: "children" | "xs" | "s" | "m" | "l" | "xl";
    type: "shoes" | "clothes";
};
export type CleaningProps = {};
export type MedicalProps = {};
export type WarmingProps = {
    type: "wood" | "electricHeater";
};
export type OtherProps = {};

export interface HelpRequest {
    _id: string;
    type: RequestType;
    status: RequestStatus;
    reportedSeverity: RequestSeverity;
    severity: RequestSeverity;
    contactInfo: string;
    phoneNumber: string;
    address: string;
    note: string;
    lat?: number;
    lng?: number;
    props:
        | TransportationProps
        | ResidenceProps
        | FoodProps
        | WearProps
        | CleaningProps
        | MedicalProps
        | WarmingProps
        | OtherProps;
    token: string;

    located: boolean;
    country?: string;
    region?: string;
    city?: string;
}

export interface HelpProvider {
    _id: string;
    type: RequestType;
    contactInfo: string;
    phoneNumber: string;
    address: string;
    note: string;
    lat?: number;
    lng?: number;
    hasCar: boolean;
    token: string;

    located: boolean;
    country?: string;
    region?: string;
    city?: string;
}
