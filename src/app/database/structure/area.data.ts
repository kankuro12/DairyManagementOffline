/* eslint-disable @typescript-eslint/naming-convention */

export interface Route {
  id: number;
  name: string;
}

export interface Area {
  id: number;
  name: string;
}

export interface Match {
  id: number;
  name: string;
}

export interface AreaRate {
  id: number;
  area_id: number;
  item_id: number;
  wholesale: string;
  sell_price: string;
  created_at: string;
  updated_at: string;
}

export interface AreaData {
  routes: Route[];
  areas: Area[];
  match: Match[];
  rates: AreaRate[];
}

