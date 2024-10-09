import Anim from '@/components/global/Anim'
import { Marquee } from '@/components/global/Marquee'
import {
  SiAdidas,
  SiBereal,
  SiCnn,
  SiCreativetechnology,
  SiGarmin,
  SiJordan,
  SiNike
} from 'react-icons/si'

export default function HomePartner() {
  return (
    <>
      <Anim className='overflow-hidden'>
        <div className='container pt-20 pb-8'>
          <h2 className='text-center text-4xl font-bold tracking-tight'>
            Our Partners
          </h2>
        </div>
        <div className='overflow-hidden'>
          <Marquee className='flex overflow-hidden gap-8 mb-20 flex-nowrap'>
            <SiNike size={80} />
            <SiAdidas size={80} />
            <SiJordan size={80} />
            <SiGarmin size={80} />
            <SiBereal size={80} />
            <SiCnn size={80} />
            <SiCreativetechnology size={80} />
          </Marquee>
        </div>
      </Anim>
    </>
  )
}
