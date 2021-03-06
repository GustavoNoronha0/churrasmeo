export type ParticipantsModel = {
  id: string
  barbecue: { id: string }
  name: string
  value: number
  value_suggestions_with_drink: number
  value_suggestions_with_out_drink: number
  created_at?: Date
  updated_at?: Date
}

export type ParticipantsAddParams = {
  barbecue: { id: string }
  name: string
  value: number
  value_suggestion_with_drink: number
  value_suggestion_with_out_drink: number
}
