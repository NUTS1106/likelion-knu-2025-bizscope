import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useCurrentLocation } from "../Hooks/useCurrentLocation";
import type { Filters, MarkerInfo } from "../Types/type.ts";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchPlaces } from "../API/analysis.ts";
import { latLngToKoreanAddress } from "../utils/reverseGeocode.ts";
import { radiusToLevel } from "../utils/radiusCalculate.ts";

const MapPageWrapper = styled.div`
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
  padding: 32px;
  gap: 20px;
  display: flex;
  flex-direction: row;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 16px;
  max-height: 728px;
  max-width: 452px;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 420px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid #ceced3;
  font-size: 16px;
  padding-left: 8px;
  &:focus {
    border: 1.5px solid #1d90ff;
    outline: none;
  }
`;

const AddressSearchDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: rgba(655, 655, 655, 0.4);
`;

const DaumPostCardDiv = styled.div`
  position: relative;
  top: 20px;
  width: 600px;
  height: 400px;
  border: 2px solid black;
`;

const SearchLabel = styled.label`
  font-size: 16px;
  margin-left: 4px;
`;

const SearchFilter = styled.span`
  font-size: 20px;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  height: 34px;
  border-radius: 6px;
  border: none;
  background: #098ef0;
  color: white;
`;

const KaKaoMap = styled(Map)`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
`;

const KaKaoMapDiv = styled.div`
  flex: 1 1 auto;
  flex-direction: row;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.span``;

function MapPage() {
  const { status, pos } = useCurrentLocation();
  const [searchOpened, setSearchOpened] = useState<Boolean>(false);
  const [filter, setFilter] = useState<Filters>({
    position: { lat: 27, lng: 127 },
    district: "서울",
    radius: 500,
  });
  const [addrReady, setAddrReady] = useState(false);

  const [marker, setMarker] = useState<MarkerInfo>({ lat: 27, lon: 127 });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status !== "ok") return;
    let cancelled = false;
    (async () => {
      try {
        const r = await latLngToKoreanAddress({ ...pos });
        if (!cancelled) {
          setFilter({ ...filter, district: r.full });
          setAddrReady(true);
        }
      } catch (_) {
        if (!cancelled) {
          setFilter({ ...filter, district: "" });
          setAddrReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pos.lat, pos.lng, status]);

  useEffect(() => {
    formRef.current?.requestSubmit();
  }, [filter]);

  const searchMut = useMutation({
    mutationFn: searchPlaces,
    onSuccess: (data) => {
      setMarker(data);
    },
  });

  const { data } = useQuery({
    queryKey: ["searchMarker"], // 스냅샷이므로 변하지 않음
    queryFn: () =>
      searchPlaces({ position: filter.position, radius_m: filter.radius }), // 반드시 Non-null 시점만 실행
    staleTime: Infinity, // 다시는 refetch 안 함
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  useEffect(() => {
    setMarker(data);
  }, [data]);

  //각각의 인풋값이 바뀌면 filter 값이 바뀐다
  //추가적인 입력값 체크가 필요하면 수정필요
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name;
    const value = e.target.value;
    setFilter({ ...filter, [type]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const geocoder = new kakao.maps.services.Geocoder();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.addressSearch(filter.district, (res: any[], status: string) => {
      if (status !== kakao.maps.services.Status.OK || !res.length)
        return alert("주소를 찾지 못했습니다.");
      const lat = parseFloat(res[0].y),
        lng = parseFloat(res[0].x);
      console.log(lat, lng);
      setFilter({ ...filter, position: { lat, lng } });
    });
    searchMut.mutate({ position: filter.position, radius_m: filter.radius });
  };

  const onAdressClick = () => {
    setSearchOpened(true);
  };

  const onAdressSubmit = (data: any) => {
    setSearchOpened(false);
    setFilter({ ...filter, district: data.address });
  };

  const allReady = status === "ok" && addrReady;

  return (
    <MapPageWrapper>
      {!allReady ? (
        "로딩중"
      ) : (
        <>
          <SearchWrapper>
            <SearchForm ref={formRef} onSubmit={onSubmit}>
              <SearchFilter>Search Filter</SearchFilter>
              <SearchField>
                <SearchLabel>업종</SearchLabel>
                <SearchInput
                  name="category"
                  value={filter.category ?? ""}
                  onChange={onChange}
                />
              </SearchField>
              <SearchField>
                <SearchLabel>예산</SearchLabel>
                <SearchInput
                  name="budget"
                  type="number"
                  value={filter.budget ?? ""}
                  onChange={onChange}
                />
              </SearchField>
              <SearchField>
                <SearchLabel>주소</SearchLabel>
                <SearchInput
                  name="district"
                  value={filter.district ?? ""}
                  onClick={onAdressClick}
                  readOnly
                ></SearchInput>
                {searchOpened && (
                  <AddressSearchDiv
                    onClick={() => {
                      setSearchOpened(false);
                    }}
                  >
                    <DaumPostCardDiv>
                      <DaumPostcodeEmbed
                        style={{ width: "100%", height: "100%" }}
                        onComplete={onAdressSubmit} // 선택된 전체 주소
                        autoClose
                      />
                    </DaumPostCardDiv>
                  </AddressSearchDiv>
                )}
              </SearchField>
              <SearchField>
                <SearchLabel>반경</SearchLabel>
                <SearchInput
                  name="radius"
                  step={100}
                  type="number"
                  value={filter.radius ?? 500}
                  onChange={onChange}
                />
              </SearchField>
              <SubmitButton type="submit">Apply Filter</SubmitButton>
            </SearchForm>
          </SearchWrapper>
          <KaKaoMapDiv>
            <KaKaoMap
              center={{ lat: filter.position.lat, lng: filter.position.lng }}
              level={radiusToLevel(filter.radius)}
            >
              <Circle
                center={{ lat: filter.position.lat, lng: filter.position.lng }}
                radius={filter.radius ?? 500}
                strokeWeight={3}
                strokeColor={"#75B8FA"} // 선의 색깔입니다
                strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일 입니다
                fillOpacity={0} // 채우기 불투명도 입니다
              />
              <MapMarker
                image={{
                  src: "../../public/location.png",
                  size: { width: 36, height: 36 },
                }}
                key={"marker"}
                position={{ lat: marker.lat, lng: marker.lon }}
              ></MapMarker>
            </KaKaoMap>
            <ContentWrapper>
              <Content>{`반경 ${filter.radius}m 내에 총 ${marker.reasoning?.competitor_count}개, 개인 카페가 ${marker.reasoning?.personal_count}개, 경쟁업체 수가 ${marker.reasoning?.competitor_count}개로 다소 많은 편이므로, 이 점을 고려해야 합니다.`}</Content>
            </ContentWrapper>
          </KaKaoMapDiv>
        </>
      )}
    </MapPageWrapper>
  );
}

export default MapPage;
