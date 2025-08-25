import type { Position } from "../Types/type";

// utils/reverseGeocode.ts
export function latLngToKoreanAddress({ lat, lng }: Position): Promise<{
  road?: string;   // 도로명 주소
  jibun?: string;  // 지번 주소
  region?: string; // 시/구/동 한 줄
  full: string;    // 도로명>지번>행정구역 순으로 한 줄 요약
}> {
  return new Promise((resolve, reject) => {
    const kakao = (window as any).kakao;
    if (!kakao?.maps?.services) return reject(new Error("Kakao services not loaded"));
    const geocoder = new kakao.maps.services.Geocoder();

    // 1) 행정구역(시/구/동)
    geocoder.coord2RegionCode(lng, lat, (regRes: any[], regStatus: string) => {
      const region =
        regStatus === kakao.maps.services.Status.OK && regRes.length
          ? (regRes.find((r: any) => r.region_type === "H") ?? regRes[0]).address_name
          : undefined;

      // 2) 도로명/지번 주소
      geocoder.coord2Address(lng, lat, (addrRes: any[], addrStatus: string) => {
        if (addrStatus !== kakao.maps.services.Status.OK) {
          resolve({ region, full: region ?? "" });
          return;
        }
        const road  = addrRes[0]?.road_address?.address_name || undefined;
        const jibun = addrRes[0]?.address?.address_name || undefined;
        resolve({ road, jibun, region, full: road ?? jibun ?? region ?? "" });
      });
    });
  });
}
