interface Region {
  _id: string;
  code: string;
  name: string;
  type: string;
  parent: string;
  ancestors: string[];
}

interface RegionSearch {
  types: string[];
  ancestors: string[];
}
