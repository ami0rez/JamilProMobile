import { ListItem } from "../models/list-item";

export enum SalonReachTypes {
  FriendRecomendation,
  SearchEngine,
  SocialMedia,
  Ads,
  RatingWebsites,
  Other,
}

export const SalonReachTypesOptions: ListItem[] = [
  {
    label: $localize`:@@register.recommendedByAFriend:Recommended by a friend`,
    value: SalonReachTypes.FriendRecomendation,
  },
  {
    label: $localize`:@@register.searchEngine:Search engine(eg. Google, Yahoo)`,
    value: SalonReachTypes.SearchEngine,
  },
  {
    label: $localize`:@@register.socialMedia:Social media`,
    value: SalonReachTypes.SocialMedia,
  },
  {
    label: $localize`:@@register.ads:Ads`,
    value: SalonReachTypes.Ads,
  },
  {
    label: $localize`:@@register.ratingsWebsite:Ratings website(e.g. Capterra, Truspilote)`,
    value: SalonReachTypes.RatingWebsites,
  },
  {
    label: $localize`:@@register.other:Other`,
    value: SalonReachTypes.Other,
  },
];
