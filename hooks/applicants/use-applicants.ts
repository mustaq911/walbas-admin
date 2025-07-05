import { create } from "zustand"

type NavigationItem = {
    main: string
    sub: string
}

type ApplicantState = {
    searchApplicant: string
    openModal: boolean
    activeItem: NavigationItem
    setSearchApplicant: (searchApplicant: string) => void
    setOpenModal: (openModal: boolean) => void
    setActiveItem: (main: string, sub?: string) => void
}

const useApplicant = create<ApplicantState>((set) => ({
    searchApplicant: '',
    openModal: false,
    activeItem: {
        main: "Current & Future",
        sub: ""
    },
    setSearchApplicant(searchApplicant) {
        set((state) => ({
            ...state,
            searchApplicant
        }))
    },
    setOpenModal(openModal) {
        set((state) => ({
            ...state,
            openModal
        }))
    },
    setActiveItem(main, sub = "") {
        set((state) => ({
            ...state,
            activeItem: { main, sub }
        }))
    }
}))

export default useApplicant