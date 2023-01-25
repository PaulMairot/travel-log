export type PlaceRequest = {
  name: string;
  description: string;
  tripId: string;
  location: {
    "type": string,
    "coordinates": [ number, number ]
  };
  pictureUrl: string;
};
