export type Position={
    lat:number;
    lng:number;
}

export type Filters={
  position:Position
  category?:string;
  budget?:number;
  district:string;
  radius:number;
}

export type AnalysisType={
  lat:number;
  lon:number;
  radius_m:number;
}

export type MarkerInfo={
    suitability_score?:number;
    reasoning?: {
      competitor_count?:number;
      franchise_count?: number;
      personal_count?: number;
      floating_population?:number;
      radius_km?: number;
    };
    competitor_analysis?: {
      count?:number;
      types?: {
        franchise?: number;
        personal?: number;
      };
      avg_rating?: number;
    };
    lat:number;
    lon:number;
}