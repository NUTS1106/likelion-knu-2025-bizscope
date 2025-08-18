import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useCurrentLocation } from "../Hooks/useCurrentLocation";

const MapPageWrapper=styled.div`
    height:100%;
    width:100%;
    padding:32px;
    gap:20px;
    display: flex;
    flex-direction:row;
`

const SearchWrapper=styled.div`
    position:relative;
    display: flex;
    flex-direction:row;
    padding:16px;
    max-height:728px;
    max-width:452px;
    border-radius:16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
`

const SearchForm=styled.form`
    display: flex;
    flex-direction:column;
    gap:12px;
`

const SearchField=styled.div`
    display: flex;
    flex-direction:column;
`

const SearchInput=styled.input`
    width:420px;
    height:34px;
    border-radius:6px;
    border: 1px solid #ceced3;
    font-size:16px;
    padding-left:8px;
    &:focus{
        border:1.5px solid #1d90ff;
        outline:none;
    }
`

const SearchLabel=styled.label`
    font-size:16px;
    margin-left: 4px;
`

const SearchFilter=styled.span`
    font-size:20px;
`

const SubmitButton=styled.button`
    margin-top:8px;
    height:34px;
    border-radius:6px;
    border:none;
    background:#098ef0;
    color:white;
`

const KaKaoMap=styled(Map)`
    width:100%;
    height:100%;
    border-radius:15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
`

//예산
//반경
//업종
//위치
interface Filters{
    category?:string;
    budget?:number;
    district:string;
    radius?:number;
}

interface Position{
    lat:number;
    lng:number;
}

function MapPage() {
  const {status, pos}=useCurrentLocation();
  const [filter, setFilter]=useState<Filters>({district:"서울"})
  const [center, setCenter]=useState<Position>({lat:37, lng:127})

  useEffect(()=>{
    if(status==="ok")
        setCenter(pos);
  }, [pos, status])

  //각각의 인풋값이 바뀌면 filter 값이 바뀐다
  //추가적인 입력값 체크가 필요하면 수정필요
  const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const type=e.target.name;
    const value=e.target.value;
    setFilter({...filter, [type]:value});
  }

  const onSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const geocoder=new kakao.maps.services.Geocoder();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.addressSearch(filter.district, (res: any[], status: string) => {
        if (status !== kakao.maps.services.Status.OK || !res.length) return alert("주소를 찾지 못했습니다.");
        const lat = parseFloat(res[0].y), lng = parseFloat(res[0].x);
        console.log(`lat: ${lat} lng: ${lng}`);
        setCenter({lat:lat, lng:lng});
      });
  }

  return (
    <MapPageWrapper>
        <SearchWrapper>
            <SearchForm onSubmit={onSubmit}>
                <SearchFilter>
                    Search Filter
                </SearchFilter>
                <SearchField>
                    <SearchLabel>업종</SearchLabel>
                    <SearchInput name="category" value={filter.category??""} onChange={onChange}/>
                </SearchField>
                <SearchField>
                    <SearchLabel>예산</SearchLabel>
                    <SearchInput name="budget" type="number" value={filter.budget??""} onChange={onChange}/>
                </SearchField>
                <SearchField>
                    <SearchLabel>지역</SearchLabel>
                    <SearchInput name="district" value={filter.district??""} onChange={onChange}/>
                </SearchField>
                <SearchField>
                    <SearchLabel>반경</SearchLabel>
                    <SearchInput name="footTraffic" type="number" value={filter.radius??""} onChange={onChange}/>
                </SearchField>
                <SubmitButton type="submit">Apply Filter</SubmitButton>
            </SearchForm>
        </SearchWrapper>
        <KaKaoMap center={{ lat: center.lat, lng: center.lng }}>
                  
        </KaKaoMap>
    </MapPageWrapper>
  );
}

export default MapPage;