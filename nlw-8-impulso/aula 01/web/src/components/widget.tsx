import {ChatTeardropDots} from 'phosphor-react'
//import { useState } from 'react' o popover ja cuida do estado
import { Popover} from  '@headlessui/react'

export function Widget(){
    /* const [isWidgetOpen,setIsWidgetOpen] = useState(false)

    // function toggleWidgetVisibility(){
    //     setIsWidgetOpen(!isWidgetOpen)
        }*/
    return (
        <Popover className='absolute bottom-5 right-5'>

            <Popover.Panel> Cum, vero est.</Popover.Panel> 
            {/* se vc tiver um condicional onde so tem o if nao tem o else, voce pode trocar o (vdd)?faz isso: se n isso por (vdd) && faz isso */}

            <Popover.Button className='bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group'>
                <ChatTeardropDots className='w-6 h-6'/>
            <span className='max-w-0 overflow-hidden group-hover:max-w-lg transition-all duration-500 ease-linear'>
                 Feedback
            </span>
            </Popover.Button>
        </Popover>
    )
}