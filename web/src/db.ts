export type RequestType =
    "Transportation" |
    "Residence" |
    "Food" |
    "Wear" |
    "Cleaning" |
    "Medical" |
    "Warming" |
    "Other"

export interface HelpRequest {
    requestType: RequestType
    contactInfo: string
}


export interface HelpProvider {
    
}
