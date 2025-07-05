import { create } from "zustand"

type NavigationItem = {
    main: string
    sub: string
}

type StudentState = {
    searchStudent: string
    openModal: boolean
    activeItem: NavigationItem
    setSearchStudent: (searchStudent: string) => void
    setOpenModal: (openModal: boolean) => void
    setActiveItem: (main: string, sub?: string) => void
}

const useStudent = create<StudentState>((set) => ({
    searchStudent: '',
    openModal: false,
    activeItem: {
        main: "Overview",
        sub: ""
    },
    setSearchStudent(searchStudent) {
        set((state) => ({
            ...state,
            searchStudent
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

export default useStudent