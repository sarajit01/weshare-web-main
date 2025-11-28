export interface AvailableCollaboratorsReq {
  services: number[]
  date: any
}

export interface AppointmentBooking{
  business_id: number
  listing_type: string
  listing_id: number
  service_id: number
  business_user_id: number
  date: string
  start_time: string
  end_time: string | undefined | null
  status: string | undefined | null
}

export interface AppointmentBookingRequest{
  business_id: number
  customer_id: number
  customer_name: string | null | undefined
  customer_email: string | null | undefined
  customer_phone: string | null | undefined
  customer_notes: string | undefined | null
  appointments: AppointmentBooking[]
}