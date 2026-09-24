type Activity =  {
  id: string
  title: string
  description: string
  date: Date
  category: string
  isCancelled: boolean
  city: string
  venue: string
  latitude: number
  longitude: number
}


type User ={
  id: string,
  email: string,
  dispalyName:  string,
  imageUrl?: string,
}

type LocationIQSuggestion = {
  place_id: string
  osm_id: string
  osm_type: string
  license: string
  lat: string
  lon: string
  boundingbox: string[]
  class: string
  type: string
  display_name: string
  display_place: string
  display_address: string
  address: LocationIQAddress
}

type LocationIQAddress = {
  name: string
  house_number: string
  road: string
  suburb?: string
  town?: string
  village?:string
  city?: string
  county: string
  state: string
  postcode: string
  country: string
  country_code: string
  neighbourhood?: string
}