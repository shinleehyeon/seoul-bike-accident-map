import type { Map as MapLibreMap } from "maplibre-gl";

export const ACCIDENT_ICON_BY_TYPE: Record<string, string> = {
  자전거: "pin-accident-bike",
  보행노인: "pin-accident-elderly",
  // 보호구역 밖(보행어린이)은 빨간색으로 강조 — 보호구역이 못 막는 사각지대를 보여줌
  보행어린이: "pin-accident-child-outzone",
  스쿨존어린이: "pin-accident-child",
};

export const ACCIDENT_FILTER_KEY_BY_TYPE: Record<string, "bike" | "elderly" | "child"> = {
  자전거: "bike",
  보행노인: "elderly",
  보행어린이: "child",
  스쿨존어린이: "child",
};

export const ACCIDENT_ICONS = [
  "pin-accident-bike",
  "pin-accident-bike-fatal",
  "pin-accident-bike-severe",
  "pin-accident-bike-minor",
  "pin-accident-bike-report",
  "pin-accident-elderly",
  "pin-accident-child",
  "pin-accident-child-outzone",
] as const;

/** 자전거 사고 피해정도(TAAS 사고내용)별 핀 아이콘 */
export const BIKE_ACCIDENT_ICON_BY_SEVERITY: Record<string, string> = {
  사망사고: "pin-accident-bike-fatal",
  중상사고: "pin-accident-bike-severe",
  경상사고: "pin-accident-bike-minor",
  부상신고사고: "pin-accident-bike-report",
};

export function roadviewUrl(lat: number, lon: number) {
  return `https://map.kakao.com/link/roadview/${lat},${lon}`;
}

export async function ensureAccidentIcons(map: MapLibreMap) {
  await Promise.all(
    ACCIDENT_ICONS.map(async (name) => {
      if (map.hasImage(name)) return;
      const result = await map.loadImage(`/markers/${name}.png`);
      if (!map.hasImage(name)) {
        map.addImage(name, result.data, { pixelRatio: 2 });
      }
    })
  );
}

/** OpenFreeMap Positron — CARTO light_all과 비슷한 밝은 베이스맵, API 키 불필요 */
export const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

export const SEOUL_CENTER = { longitude: 126.978, latitude: 37.5665, zoom: 11 };

export const EMPTY_FC: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };
