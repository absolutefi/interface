export interface SellParam {
  referrer?: string
  start: number
  end: number
  token_sale_amt: number
  cur_info: any
  //   cur_info: AssetInfoUnchecked
  soft_cap: number
  hard_cap: number
  max_cur_alloc_per?: number
  owner_allocation: number
  token_name: string
  token_symbol: string
  token_project: string
  token_description: string
  token_marketing: string
  token_logo: string
  wl_end_time?: number
}

export interface Sale {
  id: number
  created_at: number
  owner: string
  referrer?: string
  start: number
  end: number
  token_addr: string
  token_sale_amt: number
  cur_info: any
  soft_cap: number
  hard_cap: number
  max_cur_alloc_per?: number
  wl_end_time?: number
  owner_allocation: number
  token_name: string
  token_symbol: string
  token_project: string
  token_description: string
  token_marketing: string
  token_logo: string
}

export enum SaleStatus {
  NotStarted,
  Ongoing,
  Ended,
  Filled,
  Failed,
}

export interface SaleProgress {
  token_sold: number
  cur_raised: number
  token_claimed: number
  is_excess_sent: boolean
  cur_excess: number
  token_excess: number
}

export interface SaleProgressPersonal {
  is_claimed: string
  is_refunded: string
  token_got: number
  cur_spent: number
}
