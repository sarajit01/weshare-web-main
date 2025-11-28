export interface Cat {
  icon : string ,
  name : string,
  custom_attributes: any[]
}

export interface Category {
  icon: string | null | undefined
  id: number
  parent_cat_id: number | null | undefined
  name: string | null
  sub_count: number | null | undefined
  sub_cats: Category[] | null | undefined
}

export interface CategorySlide {
  categories: Category[]

}

export interface IconsSlide {
  icons: string[]
}