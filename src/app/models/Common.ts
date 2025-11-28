export interface MayHaveSimilarListings {
   similarListings: {
     businesses: any
     promotions: any
     lcs: any
   }
   getSimilarListings(listing_id: number, listingType: string, page: number): Promise<void>
}

export interface MayHaveListingDetailedPreview {
    listingInPreview: any;
    previewState: string;

    changePreviewState(state: string): void
    onSwipeUp(): void
    onSwipeDown(): void
    onClose(): void

}

export interface CanExpandOrCollapse {
    collapsibleState: string
    changeCollapsibleState(state: string): void
}
