import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import styled from "styled-components";

const MapPageWrapper=styled.div`
    height:100%;
    width:100%;
    padding:32px;
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

declare global {
  interface Window {
    // 일시적으로 막아놓기
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

//예산
//반경
//업종
//위치
interface Filters{
    category?:string;
    budget?:number;
    district?:string;
    footTraffic?:string;
}


function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter]=useState<Filters>({})

  useEffect(() => {
    const { kakao } = window;
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(35.8714, 128.6014),
      level: 5,
    });
    new kakao.maps.Marker({
      position: new kakao.maps.LatLng(35.8714, 128.6014),
      map,
    });
  }, []);

  //각각의 인풋값이 바뀌면 filter 값이 바뀐다
  //추가적인 입력값 체크가 필요하면 수정필요
  const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const type=e.target.name;
    const value=e.target.value;
    setFilter({...filter, [type]:value});
  }

  const onSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(`category: ${filter.category}`);
    console.log(`budget: ${filter.budget}`); 
    console.log(`district: ${filter.district}`);
    console.log(`footTraffic: ${filter.footTraffic}`);
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
                    <SearchLabel>유동인구</SearchLabel>
                    <SearchInput name="footTraffic" value={filter.footTraffic??""} onChange={onChange}/>
                </SearchField>
                <SubmitButton type="submit">Apply Filter</SubmitButton>
            </SearchForm>
        </SearchWrapper>
        <MapPageWrapper>
                <div ref={mapRef} style={{ width: "900px", height: "480px" }} />
        </MapPageWrapper>
    </MapPageWrapper>
  );
}

export default MapPage;