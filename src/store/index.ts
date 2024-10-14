import { MetaProfile } from '@/types'
import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type GeneralStoreProps = {
  checkout: any
  setCheckout: (checkout: any) => void
  profile: MetaProfile
  setProfile: (profile: MetaProfile | null) => void
}

export const useGeneralStore = create<GeneralStoreProps>(
  persist(
    set => ({
      profile: {},
      setProfile: (profile: MetaProfile | null) => set(() => ({ profile })),
      checkout: {},
      setCheckout: (checkout: any) => set(() => ({ checkout }))
    }),
    {
      name: 'general-storage' // name of the item in the storage (must be unique)
    }
  ) as unknown as StateCreator<GeneralStoreProps>
)
