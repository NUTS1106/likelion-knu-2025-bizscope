import { useEffect, useState } from "react";

interface Position{
    lat:number;
    lng:number;
}

const getCurrentLocation = () =>
    new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,   // 정확도 ↑ (배터리 소모는 조금 ↑)
        timeout: 5000,              // 5초 안에 응답 없으면 실패
        maximumAge: 60_000,         // 1분 내 캐시 허용
      })
    );

export const useCurrentLocation=()=>{
    const [pos, setPos]=useState<Position>({lat:37, lng:127})
    const [status, setStatus]=useState<"ok"|"error">("error");
    useEffect(()=>{
        if(!("geolocation" in navigator)){
            setStatus("error");
            setPos({lat:37, lng:127});
        }
    getCurrentLocation()
    .then(({coords})=>{
        setPos({lat:coords.latitude, lng:coords.longitude})
        setStatus("ok");
    })
    .catch(()=>{
        setStatus("error");
        setPos({lat:37, lng:127});
    });
    },[])

    return {status, pos};
}