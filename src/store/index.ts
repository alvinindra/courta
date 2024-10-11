import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type GeneralStoreProps = {
  checkout: any
  setCheckout: (checkout: any) => void
}

export const useGeneralStore = create<GeneralStoreProps>(
  persist(
    set => ({
      checkout: {},
      setCheckout: (checkout: any) => set(() => ({ checkout }))
    }),
    {
      name: 'general-storage' // name of the item in the storage (must be unique)
    }
  ) as unknown as StateCreator<GeneralStoreProps>
)
