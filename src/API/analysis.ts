import type { AnalysisType } from "../Types/type";
import { api } from "./client";


export function searchPlaces(body: AnalysisType) {
    const analysis={lat:body.position.lat, lon:body.position.lng, radius_m:body.radius_m}
    return api.post("/analysis/area",analysis).then(r => {console.log(r.data); return r.data});
  }